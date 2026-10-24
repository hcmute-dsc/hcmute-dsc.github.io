const { githubUrl, subsites } = require('./site');

/** @type {import('@docusaurus/preset-classic').ThemeConfig['navbar']} */
module.exports = {
  logo: {
    alt: 'HCMUTE DSC',
    src: 'img/logo/hcmute-dsc-mark.png',
    srcDark: 'img/logo/hcmute-dsc-mark-dark.png',
    height: 32,
  },
  items: [
    {
      type: 'docSidebar',
      sidebarId: 'tutorialSidebar',
      position: 'left',
      label: 'Tutorial',
    },
    {
      type: 'dropdown',
      label: 'Hoạt động',
      to: '/news',
      position: 'left',
      items: [
        { to: '/news', label: 'Tất cả bài viết' },
        { to: '/news/categories', label: 'Danh mục' },
        { to: '/news/tags', label: 'Tags' },
        { to: '/news/archive', label: 'Lưu trữ theo năm' },
      ],
    },
    { to: '/blog', label: 'Blog', position: 'left' },
    { to: '/showcase', label: 'Showcase', position: 'left' },
    { to: '/gallery', label: 'Thư viện ảnh', position: 'left' },
    {
      type: 'dropdown',
      label: 'Dự án',
      position: 'left',
      items: [...subsites, { to: '/showcase', label: 'Tất cả sản phẩm' }],
    },
    {
      href: githubUrl,
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'GitHub',
    },
  ],
};
