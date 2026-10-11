// @ts-check
// The pieces of the config live in ./config: site constants, presets, plugins, navbar and footer.

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const site = require('./config/site');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: site.title,
  tagline: site.tagline,
  favicon: 'img/favicon.ico',
  url: site.url,
  baseUrl: '/',

  // GitHub Pages deployment
  organizationName: site.organizationName,
  projectName: site.projectName,
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png' },
    },
    {
      tagName: 'meta',
      attributes: { name: 'google-site-verification', content: 'KahpusCmJyTWNzsOBu_IjSN9SlluR7BH6lq4SnfsFsQ' },
    },
  ],

  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
  },

  presets: require('./config/presets'),
  plugins: require('./config/plugins'),
  themes: ['@docusaurus/theme-live-codeblock'],
  clientModules: [require.resolve('./src/clientModules/lightbox.js')],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/hcmute-dsc-social-card.jpg',
      navbar: require('./config/navbar'),
      footer: require('./config/footer'),
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [
        { name: 'keywords', content: 'HCMUTE DSC, HCMUTE Developer Student Club, CLB Sinh viên Lập trình HCMUTE, blog, coding, tools' },
      ],
    }),
};

module.exports = config;
