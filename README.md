# Viin — Website Văn phòng Kiến trúc sư

Website giới thiệu **Văn phòng Kiến trúc sư Viin**: dự án, dịch vụ, studio, liên hệ.

InfinityFree là hosting miễn phí **chỉ chạy PHP/HTML tĩnh, không chạy được Node.js**. Vì vậy dự án dùng Node.js
làm **công cụ build**: render template EJS thành các trang HTML tĩnh trong thư mục `dist/`, sau đó upload `dist/`
lên `htdocs` của InfinityFree (thủ công hoặc tự động bằng GitHub Actions).

## Tính năng

- Trang chủ, Dự án (lọc theo loại hình), trang chi tiết cho từng dự án, Dịch vụ (kèm hỏi đáp), Studio, Liên hệ, trang 404
- URL sạch: `/du-an/`, `/du-an/nha-gach-lo/`… (không cần rewrite)
- Ảnh minh hoạ kiến trúc tự sinh dạng SVG cho đến khi có ảnh công trình thật
- SEO: meta/Open Graph, Schema.org, `sitemap.xml`, `robots.txt` tự sinh
- Responsive, hỗ trợ bàn phím, tôn trọng `prefers-reduced-motion`
- `.htaccess` cho Apache của InfinityFree: trang 404, cache, nén gzip
- Chỉ một thư viện: `ejs` (máy chủ chạy thử viết bằng module có sẵn của Node)

## Cấu trúc

```
src/
  config/site.js       ← tên, địa chỉ, điện thoại, email, menu, endpoint form
  data/projects.js     ← danh sách dự án (mỗi dự án = 1 trang)
  data/content.js      ← dịch vụ, quy trình, đội ngũ, giải thưởng, hỏi đáp…
  views/               ← giao diện EJS (layout, partials/, pages/)
  assets/              ← css/, js/, images/
  static/              ← file copy thẳng vào gốc website (.htaccess)
  lib/art.js           ← bộ sinh ảnh minh hoạ SVG
scripts/
  build.js             ← build ra dist/
  dev.js               ← máy chủ chạy thử + tự tải lại
  chay-thu.ps1         ← chạy thử với thư viện cài ở thư mục tạm
.github/workflows/deploy.yml  ← tự động deploy lên InfinityFree khi push
```

## Chạy thử trên máy (thư viện cài vào thư mục tạm)

Thư mục dự án nằm trên Google Drive, nơi không nên chứa `node_modules`. Script dưới đây cài thư viện và ghi bản
build vào `%TEMP%\viin-website`, còn mã nguồn vẫn sửa tại chỗ:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\chay-thu.ps1
```

Mở http://localhost:4000 — sửa file trong `src/` là trình duyệt tự tải lại.
Chỉ build (không chạy máy chủ): thêm `-Build`. Bản build nằm ở `%TEMP%\viin-website\dist`.

Nếu dự án nằm trên ổ thường (không phải Google Drive) thì dùng lệnh npm bình thường:

```bash
npm install
npm run dev      # chạy thử tại http://localhost:4000
npm run build    # build ra dist/
```

## Sửa nội dung

- **Thông tin văn phòng:** `src/config/site.js`
- **Dự án:** thêm/sửa trong `src/data/projects.js`. Mỗi dự án cần `slug` (dùng làm URL, không dấu, nối bằng `-`).
- **Ảnh thật:** chép ảnh vào `src/assets/images/du-an/` (JPG/WebP, rộng ~1600–2000 px, tỉ lệ 4:3), rồi thêm vào dự án:
  ```js
  images: ['/assets/images/du-an/nha-gach-lo-1.jpg', '/assets/images/du-an/nha-gach-lo-2.jpg'],
  captions: ['Mặt tiền', 'Giếng trời']
  ```
  Ảnh đầu tiên là ảnh đại diện; ảnh thứ 2 trở đi hiện trong thư viện ảnh của trang dự án.

## Form liên hệ

InfinityFree **chặn hàm gửi mail của PHP**, nên form dùng một dịch vụ form miễn phí:

1. Đăng ký [Formspree](https://formspree.io) (hoặc Web3Forms, Getform…), tạo form, lấy endpoint dạng `https://formspree.io/f/abcdwxyz`.
2. Dán vào `formEndpoint` trong `src/config/site.js` (hoặc biến `FORM_ENDPOINT` khi build).

Khi chưa cấu hình, nút Gửi sẽ mở ứng dụng email của khách với nội dung đã điền sẵn gửi tới email văn phòng.

## Đưa lên GitHub

Tạo repository trống trên GitHub, rồi trong thư mục `viin-website`:

```bash
git init
git add .
git commit -m "Khởi tạo website Viin"
git branch -M main
git remote add origin https://github.com/<tai-khoan>/<ten-repo>.git
git push -u origin main
```

## Deploy lên InfinityFree

### Chuẩn bị (một lần)

1. Đăng ký tại [infinityfree.com](https://www.infinityfree.com), tạo hosting account và chọn tên miền
   (vd: `viin.infinityfreeapp.com` hoặc tên miền riêng).
2. Trong **Client Area → Account → FTP Details**, ghi lại: *FTP Hostname* (`ftpupload.net`), *FTP Username*
   (`if0_xxxxxxxx`), *FTP Password*.
3. SSL: tên miền miễn phí của InfinityFree (vd: `viistudio.site.je`) có sẵn HTTPS. Nếu dùng tên miền riêng, cài SSL
   miễn phí trong **Client Area → SSL Certificates** trước — `src/static/.htaccess` luôn chuyển http sang https.

### Cách 1 — Tự động bằng GitHub Actions (khuyên dùng)

1. Trên GitHub: **Settings → Secrets and variables → Actions**
   - Tab *Secrets*: tạo `FTP_SERVER` = `ftpupload.net`, `FTP_USERNAME`, `FTP_PASSWORD`
   - Tab *Variables*: tạo `SITE_URL` = `https://<ten-mien-cua-ban>` và (tuỳ chọn) `FORM_ENDPOINT`
2. Push lên nhánh `main` → tab **Actions** sẽ chạy “Deploy lên InfinityFree”: build rồi upload `dist/` vào `/htdocs/`.
   Có thể chạy lại bằng tay qua nút **Run workflow**.

Lần đầu upload toàn bộ; các lần sau chỉ upload file thay đổi.

### Cách 2 — Upload thủ công

1. Build: `powershell -ExecutionPolicy Bypass -File scripts\chay-thu.ps1 -Build`
   (đặt `$env:SITE_URL="https://<ten-mien>"` trước nếu muốn sitemap đúng tên miền).
2. Mở **File Manager** của InfinityFree (hoặc FileZilla với thông tin FTP ở trên), vào thư mục `htdocs`,
   xoá file mặc định `index2.html`, rồi upload **toàn bộ nội dung bên trong** `dist` (gồm cả `.htaccess`).

> Tên miền mới trên InfinityFree có thể mất tới 72 giờ để hoạt động ở mọi nơi; nếu xoá cache trình duyệt vẫn thấy
> trang cũ, hãy chờ thêm hoặc thử bằng mạng khác.
