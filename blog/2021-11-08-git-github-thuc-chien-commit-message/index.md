---
slug: git-github-thuc-chien-commit-message
title: "Git/GitHub Thực Chiến – Phần 1: Bạn đã viết commit message đủ tốt chưa?"
authors: [vtmquan]
tags: [git, github, chia-se-tu-group]
description: "Bạn đã viết commit message đủ tốt chưa? Bắt đầu với series này, mình sẽ giới thiệu cho các bạn một vấn đề cực kì quen thuộc khi làm việc với Git, đó là commit. Nói sơ sơ, thì…"
---
# **Bạn đã viết commit message đủ tốt chưa?**

<!--truncate-->

Bắt đầu với series này, mình sẽ giới thiệu cho các bạn một vấn đề cực kì quen thuộc khi làm việc với Git, đó là commit.

Nói sơ sơ, thì commit là hành động mà các bạn chốt và lưu những thay đổi trong project của mình vào Git. Một commit luôn luôn đi kèm với một message để team của bạn biết bạn commit những gì.

Thông thường khi viết commit message, mình tin là đa phần các bạn chỉ viết tóm tắt sơ sơ những cái các bạn đã làm (short description). Các bạn viết vậy cũng oke ý, nhưng chưa thực sự tốt, vì commit của các bạn **chưa được phân loại rõ ràng**. Vậy phân loại commit như thế nào, mời các bạn dành một ít thời gian ngó qua bài viết trong link này nhó.

https://www.conventionalcommits.org/en/v1.0.0/

Bài viết đó là tổng hợp một vài **QUY ƯỚC** (convention) khi các bạn viết commit message. Theo đó, một commit message lý tưởng sẽ có ít nhất 2 thành phần, đó là:
> &lt;loại commit&gt;: &lt;mô tả ngắn&gt;

Vậy loại commit có những loại nào?

Đọc một lượt bài viết thì các bạn sẽ thấy có khá là nhiều loại commit khác nhau, nhưng những loại phổ biến khi các bạn làm 1 project đơn giản sẽ là:
1. ***feat** *(viết tắt của feature): những commit loại này sẽ bổ sung những tính năng mới cho project hiện tại.
1. ***fix***: những commit loại này sẽ sửa (fix) những lỗi đang tồn tại trong project của các bạn.
1. ***refactor***: những commit loại này được dùng để cấu trúc lại code cho code clean hơn chẳng hạn.
1. ***chore ***(dịch ra tiếng Việt là "việc vặt"): những commit loại này nhằm thay đổi một vài chỗ nho nhỏ trong project.

Ngoài 2 thành phần trên, các bạn có thể bổ sung thêm thành phần thứ 3 vào commit message, đó là task ID:
> &lt;loại commit&gt;: &lt;task ID&gt;: &lt;mô tả ngắn&gt;

Task ID sẽ có khi các bạn phân chia công việc cho các thành viên trong team thành các task cụ thể. Ngoài Trello là một trang phổ biến để hỗ trợ các bạn làm việc này, các bạn có thể tham khảo sử dụng Jira.

https://www.atlassian.com/software/jira

Theo mình thấy thì Jira có một ưu điểm tuyệt vời là mỗi khi các bạn tạo một task mới (Jira sẽ gọi hành động đó là **Create issue**), Jira sẽ **TỰ ĐỘNG SINH ID** cho task bạn vừa tạo. Bạn cũng có thể chia các task ra thành nhiều loại như Story, Bug, Task... Trong chuỗi bài viết này mình sẽ không đi sâu vào Jira, các bạn hãy tự tìm hiểu thêm nhó.

Giờ qua ví dụ cho các bạn dễ hiểu nè. Giả sử có 3 bạn Thảo, Cầm, Viên hợp tác với nhau làm một trang web quản lý sở thú (Zoo Management, viết tắt thành ZM). Các bạn dùng Jira phân chia task. Sau khi chia xong thì Thảo lãnh task làm trang đăng nhập cho người dùng, task có ID là ZM-1. Mất khoảng vài ngày thì Thảo đã code xong xuôi và commit code. Lúc này Thảo sẽ viết commit message là:
> feat: ZM-1: add a signin page

Đấy, các bạn thấy đơn giản khum. Lúc đầu chưa quen thì các bạn có thể dành kha khá thời gian để tập viết commit message cho chuẩn, nhưng khi quen rồi thì sẽ nhanh vù vù à.

Note lại cho các bạn chú ý một điều, là những quy ước trên **chỉ mang tính chất tham khảo**. Khi làm việc với team, các bạn nên thảo luận trước và thống nhất những quy ước sẽ áp dụng cho team mình rồi cùng triển hen.

Phần 1 tới đây là kết thúc. Các bạn cảm thấy thế nào? Cứ mạnh dạn nêu suy nghĩ ở phần bình luận nhen!!!

#git_github

_Bài viết được chia sẻ lần đầu trong group nội bộ của CLB ngày 08/11/2021._
