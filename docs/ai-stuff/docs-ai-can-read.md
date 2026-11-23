---
title: Chunking for RAG
description: My notes on writing documentation that RAG systems can chunk, retrieve, and answer from, in three parts.
sidebar_custom_props:
  card_icon: img/icons/ai-head.svg
  card_icon_invert_dark: true
---

Docs chatbots, "Ask AI" search boxes, and support assistants usually run on retrieval-augmented generation (RAG). A RAG system doesn't read your page the way a person does. It splits the page into chunks and indexes them. When someone asks a question, it gives the model only the few chunks that match, and the model answers from those chunks alone.

## Why RAG matters for docs

More and more readers get their answer from an assistant instead of from the page. That answer is only as good as the chunks behind it:

- **The chunk is all the model sees** — a chunk that says "it" instead of naming the feature, or leaves out the version, makes the model guess, and a wrong answer can sound just as sure as a right one.
- **The writer controls the text** — you usually can't change the chunker or the model, but you can write so each chunk makes sense on its own.
- **The same habits help everywhere** — clear headings and self-contained facts also help when an agent fetches a page live and when a model learns from it in training.

These notes focus on RAG and cover the other ways AI reads a page more briefly.

## In this section

- [Overview](chunking-for-ai.md) — how RAG answers from your docs, why it matters, what chunking is, what makes a fact self-contained, and the other ways AI reads a page
- [Practical guide](chunking-practical-guide.md) — what to do so your docs survive chunking, with examples, and what to do when you can't control the chunker
- [Checking my docs](checking-docs-with-afdocs.md) — how to check how AI would chunk a page, starting with the afdocs agent-docs audit I'm running on this site, and the limits of this advice
