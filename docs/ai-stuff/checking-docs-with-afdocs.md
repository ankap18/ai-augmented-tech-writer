---
title: Checking my docs with afdocs
sidebar_label: Checking my docs
description: How to check how AI would chunk and read your docs, starting with the afdocs agent-docs audit, and the limits of this advice.
sidebar_custom_props:
  card_icon: img/icons/ai-head.svg
  card_icon_invert_dark: true
---

:::info[In the works]

These notes are still in progress. I'm checking the facts and sources, so details may change.

:::

These are my notes on checking how AI would chunk and read my docs. For what to do while you write, see [Writing documentation that AI can chunk, retrieve, and read](chunking-practical-guide.md).

## How can I check how AI would chunk my docs?

There's no single answer, because every system chunks differently. These checks could cover the main failure points:

- **Run the agent-docs audit** — this is the check I tried on my own site. `npx afdocs check <your-site-url>` checks a published site against the [Agent-Friendly Documentation Spec](https://agentdocsspec.com/). It covers `llms.txt`, markdown availability, page size, and structure. Use the [afdocs repository](https://github.com/agent-ecosystem/afdocs) for options. It checks delivery, not content quality, and the spec is still a draft.
- **See what a fetch tool sees** — open a page with JavaScript turned off, or request its `.md` version.
- **Split a page into chunks** — run it through a heading-based splitter, such as LangChain's [markdown header splitter](https://docs.langchain.com/oss/python/integrations/splitters/markdown_header_metadata_splitter), and check that each chunk makes sense alone.
- **Test with questions** — paste one section into an AI chat and ask a question it should answer.
- **List the chunks, if you use Google's Agent Search** — Agent Search has an API method that lists all the chunks it created for a document, so you can read them directly. ([Tom Johnson](https://idratherbewriting.com/blog/chunking-content-for-mcp-ingestion-agent-readability))
- **Borrow the idea of an agent-view tool** — Tom Johnson built an "agent goggles" skill at work that shows a page the way his company's pipeline chunks it. It isn't public, but the idea is worth copying: a script that shows your pages the way your own chunker sees them. ([Tom Johnson](https://idratherbewriting.com/blog/chunking-content-for-mcp-ingestion-agent-readability))

## Limits of this advice

None of this guarantees a correct answer. Most of my sources are practitioner field notes, and Dachary Carey's skill tests are small and exploratory. I haven't found a published test showing that a particular writing habit improves answers across chunkers. The case rests on low cost: short, self-contained sections also read better for humans.

## Next steps

Next, I'll run the agent-docs audit on this whole site with afdocs.
