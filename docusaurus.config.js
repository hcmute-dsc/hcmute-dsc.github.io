// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const organizationName = "GDSC-HCMUTE";
const projectName = "GDSC-HCMUTE.github.io";
const footerLinks = [
    {
        title: 'Resources',
        items: [
            {
                label: 'Blog',
                to: '/blog',
            },
            {
                label: 'Showcase',
                to: '/showcase',
            },
        ],
    },
    {
        title: 'Community',
        items: [
            {
                label: 'Facebook',
                href: 'https://www.facebook.com/gdsc.hcmute',
            },
            {
                label: 'Google Developer Student Clubs',
                href: 'https://gdsc.community.dev/ho-chi-minh-city-university-of-technology-and-education-hcmute/',
            },
            {
                label: 'Discord',
                href: 'https://discord.gg/7nx55YxuES',
            },
        ],
    },
    {
        title: 'More',
        items: [
            {
                label: 'GitHub',
                href: 'https://github.com/GDSC-HCMUTE',
            },
            {
                label: 'Email',
                href: 'mailto:dsc.hcmute@gmail.com',
            },
        ],
    },
]

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Google Developer Student Clubs',
    tagline: 'HCMC University of Technology and Education',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: "https://hcmute-dsc.io.vn",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: `${organizationName}`, // Usually your GitHub org/user name.
    projectName: `${projectName}`, // Usually your repo name.
    trailingSlash: false,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    headTags: [
        {
            tagName: 'meta',
            attributes: {
                name: 'google-site-verification',
                content: 'KahpusCmJyTWNzsOBu_IjSN9SlluR7BH6lq4SnfsFsQ'
            }
        }
    ],

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'vi',
        locales: ['vi', 'en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: `https://github.com/${organizationName}/${projectName}/tree/master`,
                    editLocalizedFiles: true,
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: `https://github.com/${organizationName}/${projectName}/tree/master`,
                    postsPerPage: 5,
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'Tất cả bài viết',
                    blogTitle: 'Blog',
                    blogDescription: 'Blog của GDSC-HCMUTE',
                    blogListComponent: '@theme/BlogListPage',
                    blogPostComponent: '@theme/BlogPostPage',
                    blogTagsListComponent: '@theme/BlogTagsListPage',
                    blogTagsPostsComponent: '@theme/BlogTagsPostsPage',
                    editLocalizedFiles: true,
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {
                    changefreq: 'daily',
                    priority: 0.5,
                    filename: 'sitemap.xml',
                },
            }),
        ],
    ],

    plugins: [
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
    ],

    themes: ['@docusaurus/theme-live-codeblock'],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/gdsc-hcmute-social-card.jpg',
            navbar: {
                // title: 'GDSC-HCMUTE',
                logo: {
                    alt: 'GDSC-HCMUTE',
                    src: 'img/logo/gdsc-hcmute.png',
                    height: 40,
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Tutorial',
                    },
                    { to: '/blog', label: 'Blog', position: 'left' },
                    { to: '/showcase', label: 'Showcase', position: 'left' },
                    // { to: '/cv', label: '🪪CV', position: 'left' },
                    { to: '/community', label: 'Community', position: 'left' },
                    { to: '/contact', label: 'Contact', position: 'left' },
                    {
                        href: 'https://github.com/GDSC-HCMUTE',
                        // label: 'GitHub',
                        position: 'right',
                        className: "header-github-link",
                    },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                      },
                ],
            },
            footer: {
                style: 'light',
                links: footerLinks,
                copyright: `Copyright © ${new Date().getFullYear()} GDSC-HCMUTE.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
            metadata: [
                { name: 'keywords', content: 'GDSC-HCMUTE, Google Developer Student Clubs, blog, coding, tools' },
            ]
        }),
};

module.exports = config;
