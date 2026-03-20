// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import {createRequire} from 'node:module';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const require = createRequire(import.meta.url);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AI-Augmented Tech Writer',
  tagline: 'AI is the future!',
  favicon: 'img/magic-book.png',

  themes: ['docusaurus-theme-openapi-docs'],

  plugins: [
    function webpackNodeCorePolyfills() {
      return {
        name: 'webpack-node-core-polyfills',
        configureWebpack() {
          return {
            resolve: {
              fallback: {
                path: require.resolve('path-browserify'),
              },
            },
          };
        },
      };
    },
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api', // Unique ID for this instance
        docsPluginId: 'classic', // Must match your @docusaurus/preset-classic ID
        config: {
          synonymsApi: {
            specPath: 'docs/portfolio/api-docs/synonyms-api.yaml',
            outputDir: 'docs/portfolio/api-docs/generated/synonyms-api',
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
            },
          },
        },
      },
    ],
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ankap18.githhub.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ai-augmented-tech-writer/',
  deploymentBranch: 'gh-pages', // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ankap18', // Usually your GitHub org/user name.
  projectName: 'ai-augmented-tech-writer', // Usually your repo name.


  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      
      ({
        docs: {
          exclude: ['**/synonyms-api/synonyms.md'],
          sidebarPath: './sidebars.js',
          docItemComponent: '@theme/ApiItem',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
      
        // Enable the blog plugin so the built-in blog pages are available.
        // If you want to disable it, remove this section and ensure no broken links
        // reference /blog anywhere in your site (navbar/footer/docs). 
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      
      navbar: {
        title: 'AI-augmented Tech Writer',
        logo: {
          alt: 'My Site Logo',
          src: 'img/magic-book.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          
          {
            href: 'https://github.com/ankap18/ai-augmented-tech-writer',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs intro',
                to: '/docs/intro',
              },
              {
                label: 'Docs portfolio',
                to: '/docs/portfolio/about-portfolio',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ankap18',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} AI-augmented Tech Writer, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
