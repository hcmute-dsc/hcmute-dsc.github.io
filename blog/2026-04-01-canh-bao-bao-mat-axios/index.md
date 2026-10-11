---
slug: canh-bao-bao-mat-axios
title: "Cảnh báo bảo mật liên quan đến package Axios"
authors: [vtmquan]
tags: [security, javascript, npm, chia-se-tu-group]
description: "Trong trường hợp mọi người chưa biết, thì cuối tháng 3 vừa rồi, một thư viện HTTP client nổi tiếng trong hệ sinh thái JS - Axios - bị hacker tấn công để phát tán mã độc. Phiên bản…"
---
Trong trường hợp mọi người chưa biết, thì cuối tháng 3 vừa rồi, một thư viện HTTP client nổi tiếng trong hệ sinh thái JS - Axios - bị hacker tấn công để phát tán mã độc.

<!--truncate-->

Phiên bản bị ảnh hưởng là ***axios@1.14.1*** và ***axios@0.30.4***

Vì đây là một thư viện có độ phổ biến rất cao, nên có thể các bạn đã và đang dùng trong nhiều project. Và thậm chí, nếu các bạn không trực tiếp cài Axios thì vẫn có khả năng những package khác các bạn đang dùng lại phụ thuộc vào Axios.

Nếu các bạn mới biết được tin này, thì hãy kiểm tra ngay trong máy của mình xem có sử dụng 2 phiên bản bị dính mã độc ở trên hay không nha.

Có một link chi tiết về vụ tấn công này, mọi người có thể tham khảo:

[https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan](https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan)

_Bài viết được chia sẻ lần đầu trong group nội bộ của CLB ngày 01/04/2026._
