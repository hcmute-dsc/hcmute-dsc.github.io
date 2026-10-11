module.exports = [
  [
    'ideal-image',
    /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
    ({
      quality: 70,
      max: 1030,
      min: 640,
      steps: 2,
      // Use false to debug, but it incurs huge perf costs
      disableInDev: true,
    }),
  ],
  '@docusaurus/theme-mermaid',
  [
    // Archive of the club's Facebook posts: events, activities, announcements (see scripts/facebook-archive)
    '@docusaurus/plugin-content-blog',
    {
      id: 'news',
      path: 'news',
      routeBasePath: 'news',
      blogTitle: 'Hoạt động',
      blogDescription: 'Sự kiện, hoạt động và thông báo của HCMUTE Developer Student Club',
      blogSidebarTitle: 'Hoạt động gần đây',
      blogSidebarCount: 15,
      postsPerPage: 12,
      showReadingTime: false,
      editLocalizedFiles: true,
      feedOptions: { type: 'all', title: 'HCMUTE DSC – Hoạt động' },
    },
  ],
];
