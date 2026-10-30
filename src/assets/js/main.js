// Viin — tương tác phía trình duyệt: menu, header, hiệu ứng xuất hiện, lọc dự án, form liên hệ.
(function () {
  'use strict';

  // Header đổi viền khi cuộn
  const header = document.querySelector('[data-header]');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu di động
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  function setNav(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Đóng menu' : 'Mở menu';
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setNav(false));
    window.matchMedia('(min-width: 901px)').addEventListener('change', () => setNav(false));
  }

  // Hiệu ứng xuất hiện khi cuộn tới
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Lọc dự án theo loại hình
  const filters = document.querySelector('[data-filters]');
  const grid = document.querySelector('[data-project-grid]');
  if (filters && grid) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      const value = btn.dataset.filter;
      filters.querySelectorAll('[data-filter]').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      grid.querySelectorAll('[data-category]').forEach((card) => {
        card.hidden = value !== 'all' && card.dataset.category !== value;
        card.classList.add('is-visible');
      });
    });
  }

  // Form liên hệ: gửi tới dịch vụ form (nếu cấu hình) hoặc mở ứng dụng email
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    const button = form.querySelector('button[type="submit"]');

    const setStatus = (text, type) => {
      status.textContent = text;
      status.className = 'form-status' + (type ? ' is-' + type : '');
    };

    const validate = () => {
      let firstInvalid = null;
      form.querySelectorAll('.field').forEach((field) => {
        const input = field.querySelector('input, textarea, select');
        const old = field.querySelector('.field-error');
        if (old) old.remove();
        field.classList.remove('is-invalid');
        input.value = input.value.trim();
        if (input.checkValidity()) return;
        field.classList.add('is-invalid');
        const msg = document.createElement('p');
        msg.className = 'field-error';
        msg.textContent = input.validity.valueMissing ? 'Vui lòng điền thông tin này.' : 'Thông tin chưa hợp lệ.';
        field.appendChild(msg);
        firstInvalid = firstInvalid || input;
      });
      if (firstInvalid) firstInvalid.focus();
      return !firstInvalid;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.elements._gotcha.value) return;
      if (!validate()) return setStatus('Vui lòng kiểm tra lại các trường được đánh dấu.', 'error');

      const data = new FormData(form);
      const endpoint = form.dataset.endpoint;

      if (!endpoint) {
        const body = [
          'Họ tên: ' + data.get('name'),
          'Điện thoại: ' + data.get('phone'),
          'Email: ' + (data.get('email') || '—'),
          'Loại công trình: ' + data.get('type'),
          'Địa điểm: ' + (data.get('location') || '—'),
          '',
          data.get('message')
        ].join('\n');
        const subject = 'Yêu cầu tư vấn — ' + data.get('name');
        window.location.href = 'mailto:' + form.dataset.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        return setStatus('Ứng dụng email của bạn đang mở với nội dung đã điền sẵn — chỉ cần bấm Gửi.', 'success');
      }

      button.disabled = true;
      setStatus('Đang gửi…');
      try {
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus('Cảm ơn bạn! Kiến trúc sư của Viin sẽ liên hệ lại trong vòng một ngày làm việc.', 'success');
      } catch (err) {
        setStatus('Chưa gửi được. Vui lòng thử lại hoặc email trực tiếp tới ' + form.dataset.email + '.', 'error');
      } finally {
        button.disabled = false;
      }
    });
  }
})();
