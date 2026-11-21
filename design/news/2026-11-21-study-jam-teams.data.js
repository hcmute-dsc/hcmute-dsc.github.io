/*
 * DỮ LIỆU CHO ẢNH BÀI ĐĂNG "GIT & GITHUB STUDY JAM" (2026-11-21)
 * ---------------------------------------------------------------
 * Chỉ cần sửa file này. File HTML (2026-11-21-study-jam-teams.html) tự dựng lại các slide.
 *
 * - Chữ in đậm: bọc bằng **hai dấu sao**, ví dụ "**22 bạn**".
 * - {teams} và {students} được tự thay bằng số nhóm / số bạn tính từ danh sách bên dưới.
 * - Thêm / bớt nhóm, thành viên, mentor: sửa trong mảng tương ứng. Số slide và số trang tự đổi.
 *   (Mỗi slide nhóm chứa tối đa `teams.perSlide` nhóm.)
 * - Sau khi sửa: mở HTML trong Chrome, chụp từng slide (xem hướng dẫn trong file HTML).
 */
window.STUDY_JAM = {
  event: {
    tag: 'STUDY JAM',                       // chữ nhỏ góc phải, kèm số trang (vd "STUDY JAM · 2/5")
    org: 'HCMUTE Developer Student Club',
    fb: 'fb.com/hcmute.dsc',
    footer: '**HCMUTE DSC** · Git & GitHub Study Jam 2026',
    logo: '../../static/img/logo/hcmute-dsc-logo-dark.png',
  },

  // Ảnh 1 · Bìa
  cover: {
    tag: 'THÔNG BÁO',
    title: ['GIT & GITHUB', 'STUDY JAM 2026'],   // dòng 2 màu cam
    lead: 'Danh sách **chính thức** các nhóm tham gia chương trình.',
    teamsLabel: 'nhóm tham gia',
    studentsLabel: 'bạn sinh viên',
    thanks: '🚀 Cảm ơn **{students} bạn** đã đăng ký! Chúc các nhóm học thật vui và hoàn thành tốt chương trình.',
    hashtags: '#STUDY_JAM #GIT_GITHUB',
  },

  // Ảnh 2 · Mentor
  mentors: {
    title: ['Đội ngũ', 'mentor'],
    lead: 'Đồng hành cùng các nhóm trong suốt chương trình.',
    role: 'MENTOR',
    icon: '🎓',
    list: ['Võ Trần Minh Quân', 'Võ Hoàng Tú', 'Huỳnh Thị Thùy Trang'],
  },

  // Ảnh 3 · Thông tin chương trình
  info: {
    title: ['Thông tin', 'chương trình'],   // từ thứ 2 màu cam
    time: { label: '📅 THỜI GIAN', value: '22/11 – 13/12', note: 'Bế mạc dự kiến **20/12/2026**' },
    kickoff: { label: '🚀 KICK-OFF', value: '22/11/2026', note: 'Công bố nhiệm vụ tuần đầu. Giờ cụ thể thông báo trên **Discord**' },
    format: { label: '👥 HÌNH THỨC', value: 'Nhóm 3 – 5 bạn', note: 'Hoàn thành **nhiệm vụ theo tuần** để tính điểm, họp online hằng tuần để theo dõi tiến độ.' },
    rewards: {
      label: '🎁 QUYỀN LỢI',
      value: 'Giấy chứng nhận + tiền thưởng',
      prizes: [
        { rank: '🥇 Nhất', amount: '500K' },
        { rank: '🥈 Nhì', amount: '300K' },
        { rank: '🥉 Ba', amount: '200K' },
        { rank: 'Khuyến khích', amount: '100K', unit: '/nhóm' },
      ],
    },
  },

  // Ảnh 4, 5, 6 · Danh sách các nhóm
  teams: {
    title: ['Danh sách', 'các nhóm'],
    leaderLabel: '👑 Nhóm trưởng',
    perSlide: 2,
    list: [
      { name: 'Nhóm 1', leader: 'Trần Phương Trang', members: ['Võ Chí Thành', 'Nguyễn Trương Phương Vy', 'Lê Ngọc Tú', 'Nguyễn Ngọc Ánh Sương'] },
      { name: 'Côn Đò Trên Con Đồ', leader: 'Võ Đông Phúc', members: ['Nguyễn Trọng Khiêm', 'Lương Hoàng Nhất Lâm'] },
      { name: 'Đi code dạo', leader: 'Nguyễn Ngọc Thịnh', members: ['Đỗ Đăng Anh Đức', 'Nguyễn Đăng Khôi', 'Nguyễn Thái Nam'] },
      { name: 'CODE TOÀN BUG', leader: 'Ngô Thanh Vĩnh Hưng', members: ['Nguyễn Tô Mỹ Trà', 'Nguyễn Bá Huân', 'Lê Anh Khoa', 'Huỳnh Trung Trí Kiên'] },
      { name: 'We-novar-notha', leader: 'Nguyễn Minh Duy', members: ['Nguyễn Hàng Bảo Ngân', 'Mai Thanh Trà', 'Huỳnh Thị Hoài Phương', 'Phan Gia Hân'] },
    ],
  },

  // Lời nhắn cuối (hiện ở cuối slide nhóm cuối cùng)
  closing: {
    note: '📣 Theo dõi **fanpage** và **Discord** của CLB để cập nhật thông tin tiếp theo nhé!',
    hashtags: '#HCMUTE_DSC #STUDY_JAM',
  },
};
