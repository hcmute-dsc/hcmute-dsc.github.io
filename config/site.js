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
  discordUrl: 'https://discord.gg/7nx55YxuES',
  email: 'clb.dsc@student.hcmute.edu.vn',
  // 5th anniversary site (repo hcmute-dsc/memoryland)
  memorylandUrl: `https://memoryland.${domain}`,
  // Sister sites on subdomains of the main domain, shown in the navbar and the footer
  subsites: [
    { label: 'Memoryland', href: `https://memoryland.${domain}` },
    { label: 'SQL Challenge', href: `https://sql-challenge.${domain}` },
    { label: 'Mentoring', href: `https://mentoring.${domain}` },
    { label: 'IT Quiz', href: `https://it-quiz.${domain}` },
    { label: 'Club Day', href: `https://club-day.${domain}` },
  ],
};
