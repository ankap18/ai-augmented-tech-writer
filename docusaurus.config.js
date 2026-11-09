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
import sidebars from './sidebars.js';

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

/**
 * Lists every doc ID in a sidebar, in sidebar order, including the docs that
 * category headings link to. Used to give llms.txt the same order as the
 * sidebar, because docusaurus-plugin-llms reads files from disk, not the
 * sidebar.
 * @param {any[]} items
 * @returns {string[]}
 */
function sidebarDocIds(items) {
  return items.flatMap((item) => {
    if (typeof item === 'string') return [item];
    if (item.type === 'doc') return [item.id];
    if (item.type === 'category') {
      const landingPage = item.link?.type === 'doc' ? [item.link.id] : [];
      return [...landingPage, ...sidebarDocIds(item.items ?? [])];
    }
    return [];
  });
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
  tagline:
    'Technical writing portfolio — API docs, AI-assisted workflows, and docs-as-code',
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

  clientModules: [
    './src/clientModules/oramaFixes.js',
    './src/clientModules/analytics.js',
  ],

  // Google Analytics 4. Not loaded through the gtag plugin: the plugin starts
  // tracking on page load, and GA must wait for the consent banner instead.
  // See src/utils/analytics.js.
  customFields: {
    gaMeasurementId: 'G-KGSYRF2DBX',
  },

  // GoatCounter counts every visit. It sets no cookies, so it runs without
  // asking for consent. It skips localhost, so dev and `npm run serve`
  // sessions aren't counted. Page changes inside the site are counted in
  // src/clientModules/analytics.js.
  scripts: [
    {
      src: 'https://gc.zgo.at/count.js',
      async: true,
      'data-goatcounter': 'https://ai-augmented-tech-writer.goatcounter.com/count',
    },
  ],

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
    // Generates llms.txt and llms-full.txt at build time, plus a .md copy of
    // each doc that llms.txt links to. Replaces the hand-written
    // static/llms.txt, so new pages are listed automatically.
    [
      'docusaurus-plugin-llms',
      {
        title: 'AI-Augmented Tech Writer',
        description:
          'Personal site of Anna Korolivska, a senior technical writer exploring how AI changes documentation work. It includes technical writing samples (vector search concepts and a REST API reference), notes on AI tools, agents, and making docs ready for AI, and notes on the craft of technical writing.',
        rootContent:
          'The site is built with Docusaurus. Pages under Portfolio are writing samples that follow the Google developer documentation style guide. Other pages are first-person notes.',
        // Generated API endpoint pages come from the OpenAPI spec, not my
        // writing, so they stay out (Vale skips them too).
        ignoreFiles: ['**/api-docs/generated/**', '**/_docusaurus-examples/**'],
        // Same order as the sidebar: one pattern per doc, taken from
        // sidebars.js. Pages that aren't in the sidebar, such as blog posts,
        // come last.
        includeOrder: sidebarDocIds(sidebars.tutorialSidebar).map(
          (id) => `${id}.md*`,
        ),
        generateMarkdownFiles: true,
        // Blog posts are listed too. The Docusaurus sample posts in
        // blog/_docusaurus-examples aren't published, so they stay out.
        includeBlog: true,
      },
    ],
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Since 3.10, future.v4 turns off MDX v1 compatibility. Keep it on so
  // posts can still use <!-- truncate --> and other HTML comments.
  markdown: {
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
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
          // Shows "Last updated on <date>" at the bottom of each doc, taken
          // from the doc's last Git commit.
          showLastUpdateTime: true,
          // No editUrl, so pages don't show an "Edit this page" link.
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
      // Added as <meta> tags to every page.
      metadata: [
        {name: 'author', content: 'Anna Korolivska'},
        {
          name: 'keywords',
          content:
            'technical writer, API documentation, docs-as-code, AI-assisted documentation, vector search, Docusaurus',
        },
      ],
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
                label: 'Privacy',
                to: '/privacy',
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
