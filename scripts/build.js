// Build website tĩnh: render EJS → HTML vào thư mục dist/ (thư mục này được upload lên htdocs của InfinityFree).
// Dùng URL "sạch" dạng /du-an/ten-du-an/ bằng cách tạo du-an/ten-du-an/index.html — không cần rewrite.

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const VIEWS = path.join(SRC, 'views');
// VIIN_DIST cho phép build ra thư mục tạm (xem scripts/chay-thu.ps1), mặc định là dist/
const DIST = path.resolve(process.env.VIIN_DIST || path.join(ROOT, 'dist'));

// Đọc lại dữ liệu mỗi lần build để chế độ dev cập nhật ngay khi sửa file
function load(rel) {
  const file = require.resolve(path.join(SRC, rel));
  delete require.cache[file];
  return require(file);
}

function write(rel, content) {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function prepareProjects(projects, renderArt) {
  const captions = ['Phối cảnh tổng thể', 'Công trình lúc hoàng hôn', 'Chi tiết mặt đứng', 'Chi tiết về đêm'];
  const variants = [{}, { variant: 'dusk' }, { detail: true }, { variant: 'dusk', detail: true }];

  return projects.map((p, i) => {
    let images = p.images;
    if (!images || !images.length) {
      images = variants.map((opts, n) => {
        const rel = `assets/images/du-an/${p.slug}-${n + 1}.svg`;
        write(rel, renderArt(p.art, opts));
        return `/${rel}`;
      });
    }
    const gallery = images.map((src, n) => ({ src, caption: (p.captions && p.captions[n]) || captions[n] || p.title }));
    return {
      ...p,
      url: `/du-an/${p.slug}/`,
      cover: images[0],
      gallery,
      prev: projects[(i - 1 + projects.length) % projects.length],
      next: projects[(i + 1) % projects.length]
    };
  });
}

async function build() {
  const started = Date.now();
  const site = load('config/site.js');
  const content = load('data/content.js');
  const { categories, projects: rawProjects } = load('data/projects.js');
  const { renderArt } = load('lib/art.js');

  fs.rmSync(DIST, { recursive: true, force: true });
  fs.cpSync(path.join(SRC, 'assets'), path.join(DIST, 'assets'), { recursive: true });
  fs.cpSync(path.join(SRC, 'static'), DIST, { recursive: true });

  const projects = prepareProjects(rawProjects, renderArt);
  const catLabel = (id) => (categories.find((c) => c.id === id) || {}).label || id;

  const pages = [
    { view: 'home', path: '/', title: `${site.fullName} — ${site.tagline}` },
    { view: 'projects', path: '/du-an/', title: 'Dự án', description: 'Tuyển chọn các công trình nhà ở, công cộng, văn phòng và nội thất do Viin thiết kế.' },
    { view: 'services', path: '/dich-vu/', title: 'Dịch vụ', description: 'Thiết kế kiến trúc, nội thất, cải tạo và giám sát tác giả — quy trình làm việc của Viin.' },
    { view: 'about', path: '/gioi-thieu/', title: 'Studio', description: 'Câu chuyện, triết lý thiết kế và đội ngũ kiến trúc sư của Viin.' },
    { view: 'contact', path: '/lien-he/', title: 'Liên hệ', description: 'Đặt lịch tư vấn miễn phí với kiến trúc sư Viin.' },
    { view: '404', path: '/404.html', file: '404.html', title: 'Không tìm thấy trang', noindex: true },
    ...projects.map((project) => ({
      view: 'project',
      path: project.url,
      title: project.title,
      description: project.summary,
      image: project.cover,
      data: { project }
    }))
  ];

  const version = started.toString(36);
  const url = (p = '/') => site.basePath + p;

  for (const page of pages) {
    const locals = {
      site,
      content,
      categories,
      projects,
      catLabel,
      url,
      asset: (p) => `${url(p)}?v=${version}`,
      year: new Date().getFullYear(),
      page: { description: site.description, ...page },
      ...page.data
    };
    const body = await ejs.renderFile(path.join(VIEWS, 'pages', `${page.view}.ejs`), locals);
    const html = await ejs.renderFile(path.join(VIEWS, 'layout.ejs'), { ...locals, body });
    write(page.file || path.join(page.path, 'index.html'), html);
  }

  const today = new Date().toISOString().slice(0, 10);
  const urls = pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${site.url}${url(p.path)}</loc><lastmod>${today}</lastmod></url>`);
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}${url('/sitemap.xml')}\n`);

  console.log(`✓ Build xong ${pages.length} trang → ${DIST} (${Date.now() - started} ms)`);
}

if (require.main === module) {
  build().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { build, DIST, SRC };
