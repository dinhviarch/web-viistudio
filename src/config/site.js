// Thông tin chung của văn phòng — sửa tại đây, build lại là toàn bộ website cập nhật.
// SITE_URL có thể ghi đè bằng biến môi trường khi build (dùng cho sitemap, Open Graph).

module.exports = {
  name: 'Viin',
  fullName: 'Văn phòng Kiến trúc sư Viin',
  tagline: 'Kiến trúc của ánh sáng và khoảng lặng',
  description:
    'Viin là văn phòng kiến trúc sư thiết kế nhà ở, công trình văn hoá và không gian nội thất — tối giản, bền vững và gắn với khí hậu nhiệt đới Việt Nam.',
  url: (process.env.SITE_URL || 'https://viin.infinityfreeapp.com').replace(/\/$/, ''),
  // Đặt '/ten-thu-muc' nếu website nằm trong thư mục con thay vì gốc tên miền
  basePath: process.env.BASE_PATH || '',
  locale: 'vi_VN',
  founded: 2014,

  contact: {
    phone: '0900 000 000',
    email: 'studio@viin.vn',
    address: 'Tầng 3, 25 Phố Hàng Chuối, Hai Bà Trưng, Hà Nội',
    hours: 'Thứ 2 – Thứ 6 · 8:30 – 17:30',
    mapQuery: '25 Hàng Chuối, Hai Bà Trưng, Hà Nội'
  },

  // InfinityFree không hỗ trợ gửi email bằng PHP mail(). Dán endpoint của dịch vụ form
  // (Formspree: https://formspree.io/f/xxxx, Web3Forms, Getform…) để nhận liên hệ qua email.
  // Để trống: form sẽ mở ứng dụng email của khách với nội dung đã điền sẵn.
  formEndpoint: process.env.FORM_ENDPOINT || '',

  social: [
    { label: 'Facebook', href: 'https://facebook.com/' },
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Behance', href: 'https://behance.net/' }
  ],

  nav: [
    { label: 'Dự án', href: '/du-an/' },
    { label: 'Dịch vụ', href: '/dich-vu/' },
    { label: 'Studio', href: '/gioi-thieu/' },
    { label: 'Liên hệ', href: '/lien-he/' }
  ]
};
