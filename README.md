# HCMUTE Developer Student Club – Website

Website chính thức của **CLB Sinh viên Lập trình HCMUTE (HCMUTE DSC)**: [hcmute-dsc.io.vn](https://hcmute-dsc.io.vn).

Trang được xây dựng bằng [Docusaurus 2](https://docusaurus.io/) và hiện chỉ phục vụ tiếng Việt.

> 🎉 Năm 2026 CLB tròn 5 tuổi (20/07/2021 – 20/07/2026). Trang kỷ niệm **Memoryland** nằm ở repo riêng [hcmute-dsc/memoryland](https://github.com/hcmute-dsc/memoryland) – [memoryland.hcmute-dsc.io.vn](https://memoryland.hcmute-dsc.io.vn).

## Nội dung trang

| Mục | Đường dẫn | Nguồn |
| --- | --- | --- |
| Trang chủ (giới thiệu, timeline, kỷ niệm 5 năm) | `/` | [src/pages/index.tsx](src/pages/index.tsx), [src/data/timeline.ts](src/data/timeline.ts) |
| Hoạt động – lưu trữ bài đăng Fanpage, có danh mục, tag, lưu trữ theo năm | `/news` | [news/](news/) |
| Blog – bài chia sẻ kiến thức của thành viên | `/blog` | [blog/](blog/), tác giả trong [blog/authors.yml](blog/authors.yml) |
| Showcase – các dự án của CLB | `/showcase` | [src/data/projects.tsx](src/data/projects.tsx), ảnh trong [src/data/showcase/](src/data/showcase/) |
| Thư viện ảnh | `/gallery` | [src/data/gallery.js](src/data/gallery.js) (sinh tự động) |
| Tutorial | `/docs` | [docs/](docs/) |

## Cấu trúc thư mục

```
├── blog/                  # Bài blog (mỗi bài một thư mục yyyy-mm-dd-slug/)
├── news/                  # Bài "Hoạt động" (plugin blog thứ hai, id: news)
├── docs/                  # Tutorial
├── config/                # Cấu hình được tách nhỏ
│   ├── site.js            #   hằng số: URL, mạng xã hội, email, link Memoryland
│   ├── presets.js         #   docs, blog, theme, sitemap
│   ├── plugins.js         #   ideal-image, mermaid, plugin news
│   ├── navbar.js
│   └── footer.js
├── src/
│   ├── pages/             # Trang tuỳ biến (home, showcase, gallery, news...)
│   ├── components/        # Component React
│   ├── data/              # Dữ liệu: timeline, dự án, gallery, taxonomy news
│   ├── clientModules/     # Lightbox xem ảnh
│   └── css/custom.css
├── static/                # File tĩnh (logo, favicon, social card...)
├── scripts/facebook-archive/  # Script nhập bài từ Facebook (Python)
├── i18n/en/               # Bản dịch tiếng Anh (tạm ngừng, giữ lại cho sau này)
└── docusaurus.config.js
```

## Bắt đầu

Yêu cầu: **Node.js 18+** (CI dùng Node 18) và npm.

```bash
npm install      # cài dependencies
npm start        # chạy dev server tại http://localhost:3000
npm run build    # build ra thư mục build/
npm run serve    # xem thử bản build
npm run clear    # xoá cache .docusaurus khi gặp lỗi lạ
npm run typecheck
```

Cấu hình đặt `onBrokenLinks: 'throw'`, nên link hỏng sẽ làm build thất bại – hãy chạy `npm run build` trước khi mở PR.

## Đóng góp nội dung

### Viết bài blog

1. Tạo thư mục `blog/yyyy-mm-dd-ten-bai/` chứa `index.md` (ảnh để cùng thư mục).
2. Thêm front matter:

   ```yaml
   ---
   title: Tiêu đề bài viết
   authors: [ten-tac-gia]   # khai báo trong blog/authors.yml
   tags: [git, github]
   ---
   ```

3. Dùng `<!--truncate-->` để ngắt phần tóm tắt hiển thị ở danh sách bài.

Bài trong `news/` có cấu trúc tương tự, danh mục được định nghĩa trong [src/data/newsTaxonomy.json](src/data/newsTaxonomy.json).

### Thêm dự án vào Showcase

Thêm một mục vào [src/data/projects.tsx](src/data/projects.tsx) và đặt ảnh chụp màn hình vào [src/data/showcase/](src/data/showcase/).

### Nhập bài từ Facebook

Thư mục [scripts/facebook-archive/](scripts/facebook-archive/) chứa các script Python dùng để chuyển bài từ Fanpage và group CLB thành bài viết:

| Script | Việc làm |
| --- | --- |
| `fetch_images.py` | Tải ảnh của các bài đã cào, nén sang WebP |
| `build_news.py` | Sinh bài trong `news/` và file `src/data/gallery.js` |
| `build_group_blog.py` | Sinh bài blog từ các bài chia sẻ kiến thức trong group (chỉ những bài tác giả đã đồng ý công khai) |

Dữ liệu thô nằm ở `scripts/facebook-archive/data/` và **không được commit** vì chứa thông tin cá nhân. Chạy từ thư mục gốc, ví dụ `python scripts/facebook-archive/build_news.py` (cần Pillow). Không sửa tay `src/data/gallery.js` – file này được sinh lại mỗi lần chạy script.

## Triển khai

Trang được deploy tự động lên GitHub Pages bằng GitHub Actions:

- [.github/workflows/deploy.yml](.github/workflows/deploy.yml): mỗi lần push lên `master`, build và đẩy thư mục `build/` sang nhánh `gh-pages`.
- [.github/workflows/test-deploy.yml](.github/workflows/test-deploy.yml): build thử cho mỗi pull request vào `master`.

Lần đầu thiết lập repo, vào **Settings → Actions → General → Workflow permissions** và chọn **Read and write permissions** để workflow có quyền đẩy lên `gh-pages`.

Nếu cần deploy thủ công:

```bash
USE_SSH=true npm run deploy
# hoặc
GIT_USER=<github-username> npm run deploy
```

## Liên hệ

- Facebook: [facebook.com/hcmute.dsc](https://www.facebook.com/hcmute.dsc)
- Discord: [discord.gg/2kjBGGtrE](https://discord.gg/2kjBGGtrE)
- Email: [clb.dsc@student.hcmute.edu.vn](mailto:clb.dsc@student.hcmute.edu.vn)
- GitHub: [github.com/hcmute-dsc](https://github.com/hcmute-dsc)
