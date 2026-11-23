---
title: How RAG systems chunk and read documentation
sidebar_label: Overview
description: How RAG systems split docs into chunks and answer from them, why that matters for writers, what makes a fact self-contained, and the other ways AI reads a page.
sidebar_custom_props:
  card_icon: img/icons/ai-head.svg
  card_icon_invert_dark: true
---

:::tip[Key points]

- Most docs chatbots and "Ask AI" features use retrieval-augmented generation (RAG): they answer from a few chunks of your docs, not from whole pages.
- A RAG system splits each page into chunks and retrieves each chunk on its own, without the rest of the page.
- Chunkers differ in where they cut, so there's no single chunk size to write for.
- A chunk is useful only when its facts are self-contained: they name their subject, state the product and version, and define acronyms.
- RAG is one of three ways AI reads docs. The other two are live fetch and training data.

:::

These are my notes on how RAG systems split documentation into chunks, why that matters for writers, and what makes a chunk useful on its own. For what to do about it, see [Writing documentation that AI can chunk, retrieve, and read](chunking-practical-guide.md).

## How RAG answers from your docs

A RAG system works in two steps:

1. Before anyone asks a question, the system splits your pages into chunks, converts each chunk into an embedding, and stores the embeddings in an index.
2. When someone asks a question, the system finds the few chunks that are closest in meaning to the question and gives only those chunks to the model. The model writes its answer from them.

The model never sees the rest of the page. For how the search step finds the closest chunks, see [How vector search works](../portfolio/vector-search/how-it-works.md).

## Why RAG matters for docs

RAG decides what an assistant knows about your product, and the writer has more influence on it than it might seem:

- **Readers may never open the page** — tools such as Kapa.ai and Inkeep, and many in-house support bots, answer from chunks of your docs. The reader sees the answer, not the page, so a gap in the chunk becomes a gap in the answer.
- **The chunk is all the model sees** — a chunk that says "it" instead of naming the feature, or leaves out the version, makes the model guess. A wrong answer can sound just as sure as a right one.
- **Retrieval decides what gets used** — a chunk that doesn't match the question in wording or meaning isn't retrieved, even if the page has the answer.
- **The writer controls the text** — you usually can't change the chunker or the model, but you can write so each chunk makes sense on its own.

## What is chunking?

Chunking means splitting a document into smaller pieces, called chunks, so that a search system can find and return only the relevant part. Each chunk is usually retrieved on its own, without the rest of the page.

The way a page gets split decides what the AI sees. A chunk that starts mid-explanation, or that says "as described earlier," can be misread or never retrieved.

Chunkers differ in where they cut. Some cut every N tokens, and others split on headings. Google's Agent Search, as [Tom Johnson describes it](https://idratherbewriting.com/blog/chunking-content-for-mcp-ingestion-agent-readability), limits each chunk to a few hundred words of prose by default and doesn't include parent headings. Other systems use other limits, so there's no single size to write for. [Pinecone's overview](https://www.pinecone.io/learn/chunking-strategies/) covers the main strategies: fixed-size, recursive, document-structure-based, semantic, and contextual.

## What is a self-contained fact?

A self-contained fact is a statement that stays accurate and understandable when it is read alone, with no surrounding page. This is my working definition. It follows the guidance in [Kapa.ai's best practices](https://docs.kapa.ai/improving/writing-best-practices), which asks for content that is explicit, self-contained, and contextually complete, because RAG systems retrieve chunks independently.

A fact is self-contained when it:

- names its subject instead of saying "it," "this," or "the previous step"
- states the product, version, or condition it applies to
- defines acronyms where they appear
- sits under a heading that makes sense out of context

:::example

**Not self-contained:** "Put it in the static folder. It's copied to the root when you build."

**Self-contained:** "In Docusaurus 3, put the `llms.txt` file in the `static/` folder. Docusaurus copies everything in `static/` to the site root when it builds the site."

The second version names the file, the folder, and the product, and states the version it applies to. A reader who finds only this chunk still knows what to do.

:::

## Other ways AI reads a page

RAG is one of three ways a docs page reaches AI. The other two need different things from the page:

- **Live search and fetch** — chat assistants such as ChatGPT, Claude, and Perplexity, and coding agents such as Claude Code, Cursor, and GitHub Copilot, fetch pages while answering a question or working on a task. A page can show up in an answer the day it's published, and a fix shows up just as fast. Page size matters most here. Problems include very long pages that get cut off without warning, Markdown that the tool can't find, redirects to another host, and language tabs where only the first tab is read.
- **Training** — AI companies crawl docs as bulk training data. The content shows up in model answers only after the next model is trained and released, which takes months, and a correction takes just as long. Crawlers have to be able to reach the page, so robots.txt blocks, JavaScript-only rendering, or gated content can keep it out.

Clear structure and accurate content help in all three.
