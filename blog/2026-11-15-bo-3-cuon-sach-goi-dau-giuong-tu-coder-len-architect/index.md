---
slug: bo-3-cuon-sach-goi-dau-giuong-tu-coder-len-architect
title: "Bộ 3 cuốn sách \"gối đầu giường\" giúp nâng tầm tư duy từ coder thành architect"
authors: [leecuong]
tags: [sach, database, system-design, architecture, chia-se-tu-group]
description: "Code chạy mượt trên local nhưng đứng máy khi lên production? Bị hỏi System Design mà không biết bắt đầu từ đâu? Giới thiệu bộ 3 cuốn sách thực chiến của tác giả Nguyễn Thế Huy về Database Indexing, System Design và kiến trúc ứng dụng web."
---
Nếu các bạn đang gặp phải những tình huống dở khóc dở cười như:

<!--truncate-->

- Code chạy trên local mượt mà với vài chục bản ghi, nhưng đưa lên production với vài triệu row thì... đứng máy? 🐢
- Đi phỏng vấn bị hỏi về System Design, CAP Theorem, scale hệ thống là "băng hà" không biết bắt đầu từ đâu? ❄️
- Viết code được vài tháng nhìn lại thấy như một "nồi lẩu thập cẩm", muốn sửa một tính năng nhỏ mà sợ sập cả hệ thống? 🍲

Hôm nay anh muốn chia sẻ cho mọi người **bộ 3 cuốn sách cực kỳ thực chiến** của tác giả **Nguyễn Thế Huy** (Technical Leader với hơn 10 năm kinh nghiệm). Đây là bộ tài liệu đúc kết kinh nghiệm từ các hệ thống lớn, viết rất cô đọng, dễ hiểu và rất thấm cho sinh viên CNTT cũng như các bạn Junior.

## 1. Database Indexing và những điều developer cần biết

**Vấn đề giải quyết:** Bạn hay nghe câu "thêm index đi cho nhanh", nhưng thêm thế nào cho đúng? Tại sao tạo index rồi mà database vẫn phớt lờ?

**Nội dung đắt giá:**

- Giải thích bản chất B+ Tree dưới góc nhìn đơn giản nhất (danh sách sắp xếp + bảng tóm tắt), không hàn lâm lý thuyết.
- **4 nguyên tắc vàng khi đánh index:** tra cứu nhanh, quét một hướng, nguyên tắc phễu từ trái sang phải, và cách xử lý điều kiện phạm vi (range breaks funnel).
- Giải mã các cạm bẫy kinh điển: phép so sánh `!=`, giá trị `NULL`, wildcard `LIKE '%xyz'`, `ORDER BY`, `GROUP BY`, `JOIN` và cơ chế Clustered Index vs Heap Table.
- Giúp tối ưu những câu query chạy mất vài giây đến vài chục giây xuống dưới 1ms.

## 2. Hướng dẫn cách tiếp cận phỏng vấn System Design

**Vấn đề giải quyết:** Làm sao để trả lời phỏng vấn System Design một cách logic, có cấu trúc, không bị phán bừa hay ngợp trước câu hỏi mở?

**Nội dung đắt giá:**

- Hiểu rõ các trade-off kinh điển trong hệ thống phân tán: đánh đổi giữa **Consistency** (tính nhất quán) và **Availability** (tính khả dụng) qua **Định lý CAP**.
- Cơ chế đồng thuận **Quorum** (W + R > N) và cách điều chỉnh Tunable Consistency (như trong Cassandra/NoSQL).
- Khung tư duy từng bước khi bước vào phòng phỏng vấn: xử lý yêu cầu, phân tích trade-off, rồi đề xuất kiến trúc cụ thể (Master-Slave, Async Replication, Eventual Consistency...).

## 3. Kiến trúc ứng dụng web: các nguyên tắc cốt lõi để code dễ bảo trì và mở rộng

**Vấn đề giải quyết:** Làm thế nào để viết ra một codebase "sạch", linh hoạt, không bị phụ thuộc chặt vào framework hay database?

**Nội dung đắt giá:**

- Tách biệt triệt để giữa **Core Code** (logic nghiệp vụ thuần túy) và **Infrastructure Code** (DB, HTTP, framework, API bên ngoài).
- Áp dụng chuẩn chỉ **Domain Model**, phân biệt **Entity vs Value Object**, và làm chủ **Repository Pattern**.
- Nhập môn **Ports and Adapters** (Hexagonal Architecture, kiến trúc hình lục giác) và Layered Architecture.
- Tách biệt Read/Write Model (CQRS cơ bản), áp dụng Application Services và Command Pattern để Controller luôn gọn nhẹ.

## 💡 Tại sao sinh viên CNTT nên đọc bộ sách này?

1. **Thực chiến 100%:** không dông dài lý thuyết suông, đi thẳng vào bài toán thực tế mà các công ty tuyển dụng đang tìm kiếm.
2. **Chuẩn bị cho đi làm:** giúp bạn tự tin vượt qua các vòng phỏng vấn Technical và System Design.
3. **Tư duy dài hạn:** giúp bạn viết code có định hướng kiến trúc.
4. **Skill cho Agent:** bạn có thể import thành các skill cho AI agent.

👉 Mọi người lưu về đọc nhé! Bạn nào đã đọc qua cuốn nào rồi thì comment thảo luận cùng anh bên dưới nha! ✨

---

_Bài viết được chia sẻ lần đầu trong [group nội bộ của CLB](https://www.facebook.com/groups/gdsc.hcmute/posts/1455300832747924/) ngày 15/11/2026._
