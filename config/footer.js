const { title, githubUrl, facebookUrl, discordUrl, email, subsites } = require('./site');

/** @type {import('@docusaurus/preset-classic').ThemeConfig['footer']} */
module.exports = {
  style: 'light',
  links: [
    {
      title: 'Resources',
      items: [
        { label: 'Hoạt động', to: '/news' },
        { label: 'Blog', to: '/blog' },
        { label: 'Showcase', to: '/showcase' },
        { label: 'Thư viện ảnh', to: '/gallery' },
      ],
    },
    {
      title: 'Dự án',
      items: subsites,
    },
    {
      title: 'Community',
      items: [
        { label: 'Facebook', href: facebookUrl },
        { label: 'Discord', href: discordUrl },
      ],
    },
    {
      title: 'More',
      items: [
        { label: 'GitHub', href: githubUrl },
        { label: 'Email', href: `mailto:${email}` },
      ],
    },
  ],
  copyright: `Copyright © ${new Date().getFullYear()} ${title}.`,
};
