---
sidebar_position: 2
sidebar_label: 30 Days SQL Challenge
title: 30 Days SQL Challenge
description: Khoá học SQL 30 ngày của HCMUTE DSC trên PostgreSQL 16, với một bộ dữ liệu chung, ví dụ chạy thật và bài tập có đáp án.
keywords: [sql, postgresql, học sql, khoá học sql, hcmute dsc]
---

# 🗄️ 30 Days SQL Challenge

Học SQL mỗi ngày một bài, từ `SELECT` đầu tiên tới tối ưu truy vấn và bảo mật database. Khoá học dành cho thành viên CLB và bất kỳ ai muốn **hiểu và vận dụng được** SQL trong dự án thật.

:::tip Bắt đầu học

👉 **[sql-challenge.hcmute-dsc.io.vn](https://sql-challenge.hcmute-dsc.io.vn/)** — toàn bộ bài học, sơ đồ và bài tập.

Mã nguồn và dữ liệu thực hành: [github.com/hcmute-dsc/sql-challenge](https://github.com/hcmute-dsc/sql-challenge)

:::

## Khoá học có gì

- **Một hệ quản trị:** toàn bộ khoá dùng PostgreSQL 16. Khi cú pháp khác MySQL hay SQL Server, bài có ghi chú riêng.
- **Một bộ dữ liệu xuyên suốt:** cửa hàng đồ công nghệ **DSC Shop** với 7 bảng, cố ý có NULL và dữ liệu "bẩn" như ngoài đời. Thêm 1 triệu đơn hàng cho các bài hiệu năng.
- **Kết quả thật:** mọi bảng kết quả và số đo trong bài đều chạy thật trên PostgreSQL. Bạn chạy lại sẽ ra đúng như vậy.
- **Bài tập 3 mức có đáp án:** cơ bản, vận dụng, thử thách. Đáp án ẩn sẵn để bạn tự làm trước.
- **Dự án cuối khoá:** tự thiết kế và xây một database hoàn chỉnh, chấm theo rubric 100 điểm cùng mentor CLB.

![Sơ đồ ERD của bộ dữ liệu DSC Shop: 7 bảng categories, products, customers, employees, orders, order_items, payments và các khoá ngoại nối chúng](./img/erd-dsc-shop.png#gh-light-mode-only)
![Sơ đồ ERD của bộ dữ liệu DSC Shop: 7 bảng categories, products, customers, employees, orders, order_items, payments và các khoá ngoại nối chúng](./img/erd-dsc-shop-dark.png#gh-dark-mode-only)

## Lộ trình 30 ngày

| Chặng | Ngày | Nội dung |
| --- | --- | --- |
| **1. Nền tảng** | 1–7 | Cài môi trường, bảng và ràng buộc, `SELECT`/`WHERE` và NULL, sắp xếp và phân trang, hàm chuỗi và ngày giờ, thêm/sửa/xoá dữ liệu an toàn |
| **2. Tổng hợp và kết hợp** | 8–14 | Hàm tổng hợp, `GROUP BY`/`HAVING`, `JOIN`, subquery và CTE, `UNION`/`INTERSECT`/`EXCEPT`, `CASE` và báo cáo |
| **3. Index, transaction, đối tượng DB** | 15–21 | Index, transaction và isolation level, function/procedure, trigger, view, đọc `EXPLAIN` |
| **4. SQL trong thực tế** | 22–30 | JSONB, kết nối từ ứng dụng, import/export CSV, partition, SQL và NoSQL, thiết kế CSDL, tối ưu truy vấn, window function và truy vấn đệ quy, bảo mật |

Ngày 7, 14 và 21 là bài ôn tập. Học xong 30 ngày, bạn làm dự án cuối khoá.

## Bắt đầu trong 3 bước

Cần cài sẵn [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
# 1. Lấy repo về
git clone https://github.com/hcmute-dsc/sql-challenge.git
cd sql-challenge

# 2. Dựng PostgreSQL đã nạp sẵn dữ liệu (kèm Adminer ở http://localhost:8080)
docker compose up -d

# 3. Mở psql và gõ SQL
docker compose exec db psql -U postgres -d sql_challenge
```

Không dùng Docker? Xem [hướng dẫn cài PostgreSQL trực tiếp](https://sql-challenge.hcmute-dsc.io.vn/setup/README). Sau đó mở [lộ trình 30 ngày](https://sql-challenge.hcmute-dsc.io.vn/lessons/00-30-day-sql-learning-roadmap) và học từ Ngày 1.

## Học cùng CLB

- Thắc mắc về bài học: mở issue hoặc discussion trên [repo khoá học](https://github.com/hcmute-dsc/sql-challenge).
- Thấy lỗi trong bài: bấm "Sửa trang này trên GitHub" ở cuối mỗi bài học để gửi pull request.
