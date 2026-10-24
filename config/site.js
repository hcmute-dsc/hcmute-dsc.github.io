// Site-wide constants shared by the config modules.

const organizationName = 'hcmute-dsc';
const projectName = 'hcmute-dsc.github.io';
const domain = 'hcmute-dsc.io.vn';

module.exports = {
  organizationName,
  projectName,
  url: `https://${domain}`,
  title: 'HCMUTE Developer Student Club',
  tagline: 'Câu lạc bộ Sinh viên Lập trình HCMUTE',
  githubUrl: `https://github.com/${organizationName}`,
  editUrl: `https://github.com/${organizationName}/${projectName}/tree/master`,
  facebookUrl: 'https://www.facebook.com/hcmute.dsc',
  discordUrl: 'https://discord.gg/2kjBGGtrE',
  email: 'clb.dsc@student.hcmute.edu.vn',
  // 5th anniversary site (repo hcmute-dsc/memoryland)
  memorylandUrl: `https://memoryland.${domain}`,
  // Sister sites on subdomains of the main domain, shown in the navbar and the footer
  subsites: [
    { label: 'Memoryland', icon: '🕰️', description: 'Kho ký ức số kỷ niệm 5 năm: hành trình qua từng năm và các thế hệ Ban Chủ nhiệm.', href: `https://memoryland.${domain}` },
    { label: 'SQL Challenge', icon: '🗄️', description: 'Thử thách 30 ngày học SQL với PostgreSQL: bài học, sơ đồ và bài tập.', href: `https://sql-challenge.${domain}` },
    { label: 'Mentoring', icon: '🤝', description: 'Chương trình mentoring kết nối thành viên với anh chị đi trước.', href: `https://mentoring.${domain}` },
    { label: 'IT Quiz', icon: '🧠', description: 'Ôn tập kiến thức IT: trắc nghiệm, thi thử, chạy offline.', href: `https://it-quiz.${domain}` },
    { label: 'Club Day', icon: '🎮', description: 'Mini game realtime cho sự kiện CLB, tham gia bằng mã QR.', href: `https://club-day.${domain}` },
  ],
};
