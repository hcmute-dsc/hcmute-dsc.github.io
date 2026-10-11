---
slug: git-commands
title: "Những lệnh Git hay dùng"
authors: [tiennhm]
tags: [git, chia-se-tu-group]
description: "Nay anh lướt LinkedIn thấy 1 bài cũng hay hay, nên share cho m.n nè. 𝟭. 𝗴𝗶𝘁 𝗱𝗶𝗳𝗳: Show file differences not yet staged. Hiển thị sự khác biệt của các tệp chưa được staged (chưa…"
---
> *Nay anh lướt LinkedIn thấy 1 bài cũng hay hay, nên share cho m.n nè.*

<!--truncate-->

𝟭. 𝗴𝗶𝘁 𝗱𝗶𝗳𝗳: Show file differences not yet staged.
> Hiển thị sự khác biệt của các tệp chưa được staged (chưa dùng `git add`)

𝟮. 𝗴𝗶𝘁 𝗰𝗼𝗺𝗺𝗶𝘁 -𝗮 -𝗺 "𝗰𝗼𝗺𝗺𝗶𝘁 𝗺𝗲𝘀𝘀𝗮𝗴𝗲": Commit all tracked changes with a message.
> Commit tất cả thay đổi của các tệp được tracked.

𝟯. 𝗴𝗶𝘁 𝘀𝘁𝗮𝘁𝘂𝘀: Show the state of your working directory.
> Hiển thị trạng thái thư mục làm việc (các thay đổi chưa staged, chưa tracked, hoặc đã sẵn sàng để commit).

𝟰. 𝗴𝗶𝘁 𝗮𝗱𝗱 𝗳𝗶𝗹𝗲_𝗽𝗮𝘁𝗵:Add file(s) to the staging area.
> Thêm file vào staging area. VD: `git add file.txt` sẽ thêm file.txt vào staging area.

𝟱. 𝗴𝗶𝘁 𝗰𝗵𝗲𝗰𝗸𝗼𝘂𝘁 -𝗯 𝗯𝗿𝗮𝗻𝗰𝗵_𝗻𝗮𝗺𝗲: Create and switch to a new branch.
> Tạo và chuyển sang nhánh mới. VD: `git checkout -b features/login` sẽ tạo nhánh `features/login` và chuyển sang nhánh này.

𝟲. 𝗴𝗶𝘁 𝗰𝗵𝗲𝗰𝗸𝗼𝘂𝘁 𝗯𝗿𝗮𝗻𝗰𝗵_𝗻𝗮𝗺𝗲: Switch to an existing branch.
> Chuyển sang nhánh đã tồn tại.

𝟳. 𝗴𝗶𝘁 𝗰𝗼𝗺𝗺𝗶𝘁 --𝗮𝗺𝗲𝗻𝗱:Modify the last commit.
> Sửa đổi nội dung commit cuối cùng.

𝟴. 𝗴𝗶𝘁 𝗽𝘂𝘀𝗵 𝗼𝗿𝗶𝗴𝗶𝗻 𝗯𝗿𝗮𝗻𝗰𝗵_𝗻𝗮𝗺𝗲: Push a branch to a remote.
> Push nhánh hiện tại lên remote repository (GitHub, GitLab, ...). VD: `git push origin features/login`

𝟵. 𝗴𝗶𝘁 𝗽𝘂𝗹𝗹: Fetch and merge remote changes.
> Lấy và merge thay đổi từ remote repository. VD: `git pull origin main`.

𝟭𝟬. 𝗴𝗶𝘁 𝗿𝗲𝗯𝗮𝘀𝗲 -𝗶: Rebase interactively, rewrite commit history.
> Rebase ở chế độ tương tác (interactive), sửa lịch sử commit. VD: `git rebase -i HEAD~3` dùng để sửa 3 commit gần nhất.

𝟭𝟭. 𝗴𝗶𝘁 𝗰𝗹𝗼𝗻𝗲: Create a local copy of a remote repo.
> Tạo bản sao local từ remote repository (tải repo về máy). VD: `git clone https://github.com/TienNHM/TienNHM.git`.

𝟭𝟮. 𝗴𝗶𝘁 𝗺𝗲𝗿𝗴𝗲 **source_branch_name**: Merge branches together.
> Gộp nhánh source_branch_name vào nhánh hiện tại. VD: Đang trên nhánh `main`, chạy lệnh `git merge features/login` sẽ gộp các commit của nhánh `features/login` vào nhánh `main`.

𝟭𝟯. 𝗴𝗶𝘁 𝗹𝗼𝗴 --𝘀𝘁𝗮𝘁: Show commit logs with stats.
> Hiển thị log commit kèm thống kê.

𝟭𝟰. 𝗴𝗶𝘁 𝘀𝘁𝗮𝘀𝗵: Stash changes for later.
> Lưu tạm thay đổi chưa commit. Thường dùng khi đang code trên nhánh A, nhưng chưa xong thì cần chuyển sang nhánh B để fix bugs. Khi đó cần stash các thay đổi trên nhánh A lại.

𝟭𝟱. 𝗴𝗶𝘁 𝘀𝘁𝗮𝘀𝗵 𝗽𝗼𝗽: Apply and remove stashed changes.
> Áp dụng các thay đổi và xóa stash (khi đang có ít nhất 1 stash). Sau khi đã hoàn thành fix bugs trên nhánh B, cần quay lại nhánh A để tiếp tục code, thì ta lấy lại các thay đổi vừa tash ở bước vừa rồi.

𝟭𝟲. 𝗴𝗶𝘁 𝘀𝗵𝗼𝘄 𝗰𝗼𝗺𝗺𝗶𝘁_𝗶𝗱: Show details about a commit.
> Hiển thị thông tin chi tiết của commit dựa vào id của nó.

𝟭𝟳. 𝗴𝗶𝘁 𝗿𝗲𝘀𝗲𝘁 𝗛𝗘𝗔𝗗~𝟭: Undo the last commit, preserving changes locally.
> Hoàn tác commit cuối nhưng giữ lại các thay đổi. Áp dụng khi lỡ vô tình commit, nhưng chưa hoàn thành xong task, cần bổ sung thêm các update.

**18.** 𝗴𝗶𝘁 𝗯𝗿𝗮𝗻𝗰𝗵 -𝗗 𝗯𝗿𝗮𝗻𝗰𝗵_𝗻𝗮𝗺𝗲: Delete a branch forcefully.
> Xóa nhánh cục bộ một cách ép buộc (nhánh trên máy local), bỏ qua không check các ràng buộc.

𝟭**9.** 𝗴𝗶𝘁 𝗿𝗲𝘀𝗲𝘁 **commit_id**: Undo commits by moving branch reference.
> Chuyển tham chiếu HEAD của nhánh hiện tại về `commit_id`.

𝟮**0**. 𝗴𝗶𝘁 𝗿𝗲𝘃𝗲𝗿𝘁** commit_id**: Undo commits by creating a new commit.
> Tạo ra một commit mới với nội dung **ngược lại** những thay đổi đã được thực hiện trong commit `commit_id`

𝟮**1**. 𝗴𝗶𝘁 𝗰𝗵𝗲𝗿𝗿𝘆-𝗽𝗶𝗰𝗸 𝗰𝗼𝗺𝗺𝗶𝘁_𝗶𝗱: Apply changes from a specific commit.
> Lấy tất cả những thay đổi từ commit `commit_id` áp dụng cho nhánh hiện tại.

𝟮**2**. 𝗴𝗶𝘁 𝗯𝗿𝗮𝗻𝗰𝗵: Lists branches.
> Liệt kê tất cả các nhánh.

𝟮**3**. 𝗴𝗶𝘁 𝗿𝗲𝘀𝗲𝘁 --𝗵𝗮𝗿𝗱 **commit_id**: Resets everything to a previous commit, erasing all uncommitted changes.
> Hoàn tác mọi thay đổi trên nhánh hiện tại và quay về commit cũ (`commit_id`). Lịch sử các commit sau `commit_id`** bị mất**. Các thay đổi chưa được commit hoặc chưa được staged **sẽ bị xóa**.

#share

_Bài viết được chia sẻ lần đầu trong group nội bộ của CLB ngày 18/01/2025._
