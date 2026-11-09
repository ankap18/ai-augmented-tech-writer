---
title: How AI chunks and reads documentation
sidebar_label: Overview
description: How AI search systems split docs into chunks, the three ways AI reads a page, and what makes a fact self-contained.
sidebar_custom_props:
  card_icon: img/icons/ai-head.svg
  card_icon_invert_dark: true
---

:::info[In the works]

These notes are still in progress. I'm checking the facts and sources, so details may change.

:::

These are my notes on how AI search systems split documentation into pieces, how else AI reads a page, and what makes a piece useful on its own. For what to do about it, see [Writing documentation that AI can chunk, retrieve, and read](chunking-practical-guide.md).

## What is content chunking?

Chunking means splitting a document into smaller pieces, called chunks, so that a search system can find and return only the relevant part. Retrieval-augmented generation (RAG) systems do this before an AI answers a question. They index the chunks, retrieve the few that match the question, and give those to the model. Each chunk is usually retrieved on its own, without the rest of the page.

The way a page gets split decides what the AI sees. A chunk that starts mid-explanation, or that says "as described earlier," can be misread or never retrieved.

Chunkers differ. Some cut every N tokens, and others split on headings. Google's Agent Search, as [Tom Johnson describes it](https://idratherbewriting.com/blog/chunking-content-for-mcp-ingestion-agent-readability), limits each chunk to a few hundred words of prose by default and doesn't include parent headings. Other systems use other limits, so there's no single size to write for. [Pinecone's overview](https://www.pinecone.io/learn/chunking-strategies/) covers the main strategies: fixed-size, recursive, document-structure-based, semantic, and contextual.

## How AI reads a page

Chunking is only one of the ways AI reads docs. A page can reach AI in three ways:

- **Training** — AI companies crawl docs as bulk training data. The content shows up in model answers only after the next model is trained and released, which takes months, and a correction takes just as long. Crawlers have to be able to reach the page, so robots.txt blocks, JavaScript-only rendering, or gated content can keep it out.
- **Live search and fetch** — chat assistants such as ChatGPT, Claude, and Perplexity, and coding agents such as Claude Code, Cursor, and GitHub Copilot, fetch pages while answering a question or working on a task. A page can show up in an answer the day it's published, and a fix shows up just as fast. Page size matters most here. A very long page may not be read in full, and the tool may give no sign that it was cut. Markdown reads better than HTML, but only if the tool can find it. Redirects to another host, and language tabs where only the first tab gets read, can cause problems too.
- **Indexed retrieval** — a RAG system answers from chunks it indexed earlier, so each chunk has to make sense on its own. These notes are mostly about this case.

Clear structure and accurate content help in all three.

## What is a self-contained fact?

A self-contained fact is a statement that stays accurate and understandable when it is read alone, with no surrounding page. This is my working definition. It follows the guidance in [Kapa.ai's best practices](https://docs.kapa.ai/improving/writing-best-practices), which asks for content that is explicit, self-contained, and contextually complete, because RAG systems retrieve chunks independently.

A fact is self-contained when it:

- names its subject instead of saying "it," "this," or "the previous step"
- states the product, version, or condition it applies to
- defines acronyms where they appear
- sits under a heading that makes sense out of context

:::note[Example]

**Not self-contained:** "Put it in the static folder. It's copied to the root when you build."

**Self-contained:** "In Docusaurus 3, put the `llms.txt` file in the `static/` folder. Docusaurus copies everything in `static/` to the site root when it builds the site."

The second version names the file, the folder, and the product, and states the version it applies to. A reader who finds only this chunk still knows what to do.

:::
