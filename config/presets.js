const path = require('path');
const { editUrl } = require('./site');

const root = (p) => path.resolve(__dirname, '..', p);

module.exports = [
  [
    'classic',
    /** @type {import('@docusaurus/preset-classic').Options} */
    ({
      docs: {
        sidebarPath: root('sidebars.js'),
        editUrl,
        editLocalizedFiles: true,
      },
      blog: {
        showReadingTime: true,
        editUrl,
        postsPerPage: 5,
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'Tất cả bài viết',
        blogTitle: 'Blog',
        blogDescription: 'Blog của HCMUTE Developer Student Club',
        editLocalizedFiles: true,
      },
      theme: {
        customCss: root('src/css/custom.css'),
      },
      sitemap: {
        changefreq: 'daily',
        priority: 0.5,
        filename: 'sitemap.xml',
      },
    }),
  ],
];
