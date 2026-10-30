// Máy chủ chạy thử: build vào dist/, phục vụ tại http://localhost:4000,
// tự build lại và tải lại trình duyệt khi sửa file trong src/ (tắt bằng --no-watch).
// Mô phỏng cách Apache của InfinityFree xử lý: thư mục → index.html, không tìm thấy → 404.html.

const fs = require('fs');
const path = require('path');
const http = require('http');
const { build, DIST, SRC } = require('./build');

const PORT = Number(process.env.PORT) || 4000;
const watch = !process.argv.includes('--no-watch');
const clients = new Set();

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2'
};
const RELOAD = '<script>new EventSource("/__livereload").onmessage=()=>location.reload()</script>';

function send(res, status, file) {
  const ext = path.extname(file);
  let data = fs.readFileSync(file);
  if (watch && ext === '.html') data = data.toString().replace('</body>', `${RELOAD}</body>`);
  res.writeHead(status, { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(data);
}

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  if (pathname === '/__livereload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write('\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  const file = path.join(DIST, pathname);
  if (!file.startsWith(DIST)) return send(res, 404, path.join(DIST, '404.html'));

  const stat = fs.existsSync(file) && fs.statSync(file);
  if (stat && stat.isDirectory()) {
    if (!pathname.endsWith('/')) {
      res.writeHead(301, { Location: `${pathname}/` });
      return res.end();
    }
    const index = path.join(file, 'index.html');
    if (fs.existsSync(index)) return send(res, 200, index);
  } else if (stat) {
    return send(res, 200, file);
  }
  send(res, 404, path.join(DIST, '404.html'));
});

build()
  .then(() => {
    server.listen(PORT, () => console.log(`→ Viin đang chạy tại http://localhost:${PORT}${watch ? ' (tự tải lại khi sửa src/)' : ''}`));
    if (!watch) return;
    let timer;
    fs.watch(SRC, { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        build()
          .then(() => clients.forEach((c) => c.write('data: reload\n\n')))
          .catch((err) => console.error('✗ Lỗi build:', err.message));
      }, 150);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
