// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import {createRequire} from 'node:module';
import {dirname, resolve} from 'node:path';
import OramaPluginDocusaurus from '@orama/plugin-docusaurus-v3';
import remarkSmartypants from 'remark-smartypants';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const require = createRequire(import.meta.url);
const oramaPluginDist = dirname(require.resolve('@orama/plugin-docusaurus-v3'));
const oramaPluginRoot = resolve(oramaPluginDist, '..');

// Write straight quotes in the source; the site renders them curly.
// Code blocks and inline code are left alone. Only quotes are converted,
// so "--flag" and "..." in prose stay as typed.
/** @type {[typeof remarkSmartypants, import('remark-smartypants').Options]} */
const smartQuotes = [
  remarkSmartypants,
  {dashes: false, ellipses: false, backticks: false},
];

/**
 * @param {Parameters<typeof OramaPluginDocusaurus>[0]} context
 * @param {Parameters<typeof OramaPluginDocusaurus>[1]} options
 */
function oramaSearch(context, options) {
  const plugin = OramaPluginDocusaurus(context, options);

  // Point Docusaurus at the plugin's own theme and stylesheet paths.
  return {
    ...plugin,
    getThemePath: () => resolve(oramaPluginDist, 'theme'),
    getTypeScriptThemePath: () => resolve(oramaPluginRoot, 'src/theme'),
    getClientModules: () => [resolve(oramaPluginDist, 'theme/SearchBar/index.css')],
  };
}

const siteUrl = 'https://ankap18.github.io/ai-augmented-tech-writer/';

// Structured data that tells search engines and AI answer engines who the
// site belongs to. `sameAs` links this site to the same person's profiles,
// so keep it in sync with blog/authors.yml.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}#person`,
  name: 'Anna Korolivska',
  jobTitle: 'Senior Technical Writer',
  description:
    'Senior technical writer with 15+ years of experience in API ' +
    'documentation, AI-assisted workflows, and docs-as-code.',
  url: siteUrl,
  image: `${siteUrl}img/anna-korolivska.jpg`,
  knowsAbout: [
    'Technical writing',
    'API documentation',
    'Docs-as-code',
    'Information architecture',
    'AI-assisted documentation',
    'Vector search',
  ],
  sameAs: [
    'https://www.linkedin.com/in/anna-korolivska-marchenko/',
    'https://github.com/ankap18',
  ],
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AI-Augmented Tech Writer',
  tagline: 'AI is the future!',
  favicon: 'img/ai-head.svg',

  // Added to the <head> of every page.
  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify(personJsonLd),
    },
  ],

  themes: ['docusaurus-theme-openapi-docs'],

  clientModules: ['./src/clientModules/oramaFixes.js'],

  plugins: [
    oramaSearch,
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
  url: 'https://ankap18.github.io',
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
          remarkPlugins: [smartQuotes],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
      
        // Enable the blog plugin so the built-in blog pages are available.
        // If you want to disable it, remove this section and ensure no broken links
        // reference /blog anywhere in your site (navbar/footer/docs). 
        // Every .md/.mdx file in blog/ is published, except files and folders
        // starting with "_" (such as _docusaurus-examples). For a work-in-progress
        // post, add `draft: true` to its front matter: it shows in dev only.
        blog: {
          showReadingTime: true,
          remarkPlugins: [smartQuotes],
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
        
        pages: {
          remarkPlugins: [smartQuotes],
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
      docs: {
        sidebar: {
          // Adds a "Collapse sidebar" button so readers can widen the content.
          hideable: true,
        },
      },

      navbar: {
        title: 'AI-AUGMENTED TECH WRITER',
        logo: {
          href: '/',
          alt: 'AI-Augmented Tech Writer logo',
          src: 'img/ai-head.svg',
          srcDark: 'img/ai-head-black.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left',
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
            title: 'Explore',
            items: [
              {
                label: 'About me',
                to: '/docs/intro/intro-about-me',
              },
              {
                label: 'Portfolio',
                to: '/docs/portfolio/about-portfolio',
              },
              {
                label: 'About site',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Changelog',
                to: '/changelog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ankap18',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Anna Korolivska. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
