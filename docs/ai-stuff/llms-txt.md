---
title: What is llms.txt?
description: What an llms.txt file is, why docs teams add one, how I wrote one by hand for this site, and why I switched to a plugin.
sidebar_custom_props:
  card_icon: img/icons/ai-head.svg
  card_icon_invert_dark: true
---

An `llms.txt` file is a plain Markdown file at the root of a site, like `https://ankap18.github.io/ai-augmented-tech-writer/llms.txt`. Its job is to tell AI tools what the site is about and where the important pages are.

## What's in it

The format is a proposal from AI researcher Jeremy Howard, published in 2024 at [llmstxt.org](https://llmstxt.org/). A file has:

- **A title** — an H1 with the site or project name.
- **A summary** — a short quote block saying what the site covers.
- **Sections of links** — H2 headings, each followed by a list of links to the key pages, with one line about each.

Many sites also publish `llms-full.txt`, which puts the full text of every page in one file.

## Why docs teams add it

- **Web pages are hard for AI to read cleanly** — a docs page is mostly menus, scripts, and layout, with the actual text buried inside. A Markdown file gives the AI only the content.
- **AI tools can only read so much at once** — an assistant can't load a whole docs site. A short, curated map points it to the pages that matter.
- **Coding assistants use it** — developers paste a library's `llms.txt` link into Cursor, Claude Code, or Copilot, so the assistant answers from the current docs instead of outdated memory. That's why API companies such as Stripe, Cloudflare, and Anthropic publish one.
- **It's curation, which is writing work** — choosing what goes in the file and describing each page in one line is information architecture. That's why tech writers have taken it on.

## Caveats

`llms.txt` is useful, but it isn't a magic switch:

- **It's not an official standard** — it's a community proposal, and Google has said its search doesn't use it. Nobody has shown that AI web crawlers read it on their own either.
- **Its real value is when someone points a tool at it** — a person or an agent gives the AI the link on purpose. It's not about search ranking.

## What I did

I know there's a Docusaurus plugin, `docusaurus-plugin-llms`, that generates `llms.txt` and `llms-full.txt` every time the site builds. But I wanted to experiment and understand the format first, so I asked Claude to generate [this site's llms.txt](pathname:///llms.txt):

- **Put it in `static/`** — Docusaurus copies everything in that folder to the site root, so `static/llms.txt` becomes `/llms.txt` with no configuration.
- **Followed the site's structure** — one H2 section for each of the four sidebar categories.
- **Wrote one line per page** — I started from each page's front matter `description` and rewrote it to say what a reader, or an AI, gets from the page.
- **Left things out** — the generated API endpoint pages and draft blog posts. The endpoint pages come straight from the OpenAPI spec, not from my writing, so my Vale setup skips them too.
- **Moved the blog to `Optional`** — the format treats a section with that name as content an AI can skip when it's short on space.

Writing it by hand has a cost: when I add a page, I have to remember to add it to `llms.txt` too. If that becomes a chore, the plugin is the next step. For now, the file is small enough that the curation is the interesting part.

## What I do now

The manual updates did become a chore, so I changed my approach. The site now uses `docusaurus-plugin-llms`, which generates `llms.txt` and `llms-full.txt` every time the site builds:

- **Removed my hand-written file** — the plugin writes its own `llms.txt` to the site root, so `static/llms.txt` would clash with it.
- **Kept my summary** — I moved the site summary and the note about writing samples into the plugin's `description` and `rootContent` options, so the top of the file still reads the way I wrote it.
- **Kept the API pages and sample posts out** — the `ignoreFiles` option skips the generated endpoint pages, as before, and the Docusaurus sample posts. The plugin reads the source folders directly, so it doesn't know that Docusaurus skips folders starting with `_`.
- **Kept the sidebar order** — the plugin reads files from disk, not the sidebar, so at first the pages in each folder came out alphabetical. Now a few lines in `docusaurus.config.js` read `sidebars.js` and pass every page, in sidebar order, to the plugin's `includeOrder` option. Pages that aren't in the sidebar, such as blog posts, come last.
- **Added the blog** — the `includeBlog` option lists every blog post. My hand-written file had only one link to the blog, under `Optional`.
- **Added Markdown copies** — with `generateMarkdownFiles`, the plugin writes a `.md` copy of each page, and `llms.txt` links to those copies. AI tools get clean Markdown instead of HTML.

I gave up some curation. The plugin uses each page's front matter `description` instead of my rewritten one-liners, and it lists all pages in one section instead of one per sidebar category. The trade-off is worth it: new pages show up automatically, and the descriptions I write for each page now go straight into `llms.txt`.
