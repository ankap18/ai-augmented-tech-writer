---
title: Writing documentation that AI can chunk, retrieve, and read
sidebar_label: Practical guide
description: Practices and examples for writing docs that survive chunking, including what to do when you can't control the chunker.
sidebar_custom_props:
  card_icon: img/icons/ai-head.svg
  card_icon_invert_dark: true
---

:::info[In the works]

These notes are still in progress. I'm checking the facts and sources, so details may change.

:::

These are my notes on what to do so AI can chunk, retrieve, and read docs. For what chunking is and how AI reads a page, see [How AI chunks and reads documentation](chunking-for-ai.md). For how to check your pages, see [Checking my docs with afdocs](checking-docs-with-afdocs.md).

## What can I do today to improve my content for AI?

Each list runs from quickest to most involved.

These are widely recommended practice:

- **Write specific headings** — "Known limitations of offline caching" works. "Known limitations" doesn't. ([Tom Johnson](https://idratherbewriting.com/blog/chunking-content-for-mcp-ingestion-agent-readability))
- **Keep each H2/H3 section short** — find out your chunker's limit, then size sections below it.
- **Use real heading tags** — not bold or styled paragraphs. Avoid going deeper than H3 or H4.
- **Replace vague references** — use the actual noun instead of "this," "it," or "the previous step."
- **Keep code and images readable** — keep code with its intro sentence, include imports, and describe images and diagrams in text. ([Kapa.ai](https://www.kapa.ai/blog/optimizing-technical-documentation-for-llms))

:::note[Example]

**Before:** "Set it to 30 seconds. This is the default for the previous option."

**After:** "Set `retryTimeout` to 30 seconds. 30 seconds is the default value of `retryTimeout` in the webhook settings."

The second version is longer, but it can be retrieved and understood on its own.

:::

These are backed by the agent-readability spec and by Dachary Carey's and Tom Johnson's field notes:

- **Don't hide content behind clicks or scripts** — fetch tools usually don't run JavaScript, so content that loads on click can be invisible. Meaning carried only by styling (gray text, check icons) is lost in HTML-to-markdown conversion. ([Tom Johnson](https://idratherbewriting.com/blog/make-documentation-agent-friendly))
- **Watch page size** — very long pages can be cut off without any sign that content is missing. In a test by Dachary Carey, an agent fetched a quick start that repeated the same tutorial in a tab for each language. The page was so long that the agent saw only the start of it, so a Python developer got another language's version. Tabs that each hold a full tutorial become one long page when an agent reads it. ([Dachary Carey](https://dacharycarey.com/2026/03/12/vibes-out-data-in/), [Tom Johnson](https://idratherbewriting.com/blog/make-documentation-agent-friendly))
- **Offer clean markdown and an `llms.txt` file** — the `llms.txt` file lists your pages. Keep it short, because the spec sets a size limit for it. ([Agent-Friendly Documentation Spec](https://agentdocsspec.com/spec/web/), and my notes in [What is llms.txt?](llms-txt.md))
- **Add metadata in frontmatter** — include the title, description, product, and version.

If you write skills or AI instructions, keep them procedural: order of steps, gotchas, and links back to the docs. Don't restate the docs. Dachary Carey tested this on one skill. A short reference with only the right versions and method signatures fixed the skill's mistakes, and a long, comprehensive reference made them worse. The short reference helped only with what it covered, though: on tasks outside it, results were worse than with no reference at all. Her conclusion is that more documentation isn't always better, and that you should test with realistic tasks instead of trusting general rules ([source](https://dacharycarey.com/2026/03/12/vibes-out-data-in/)).

## What if I can't control the chunker?

Usually you can't. Documentation is chunked by search tools, MCP servers, and AI assistants that each use their own rules. Some cut by token count, some split at headings, and some add parent headings to each chunk while others don't. A chunk can end in the wrong place, and when it does, the system may retrieve a weaker match or give the model only half the context.

That doesn't make writing for AI pointless, because you control how well your content survives a bad split. It's the same idea as responsive design: you don't know the screen, so you build a layout that holds up on any of them.

### Why the risk is smaller than it sounds

Many documentation chunkers split on structure first and fall back to a size limit only when a section is too long. LangChain's [markdown header splitter](https://docs.langchain.com/oss/python/integrations/splitters/markdown_header_metadata_splitter) works this way. So does the chunker CT Smith describes, which splits at `##` and `###` headings and never cuts a paragraph, list, or code block in half (as summarized by [Tom Johnson](https://idratherbewriting.com/blog/make-documentation-agent-friendly)). If every section fits inside the chunk limit, the chunker has little reason to cut mid-paragraph. That's why sizing sections below the limit matters.

### Write so a bad cut loses detail, not meaning

These habits are my own conclusions from the sources in these notes, not tested rules:

- **Name the subject in every paragraph** — not only the first one. A chunk that starts with "It defaults to 30 seconds" can't be understood alone.
- **Put the answer first** — then the elaboration. If a cut falls late in the paragraph, the chunk loses nuance but keeps the point.
- **Keep paragraphs short and independent** — a cut between two of them then loses nothing.
- **Keep dependent pieces together** — a step with its result, and a code block with the sentence that introduces it.

:::note[Example]

**Breaks when cut:** "You can try the product before you buy. The free trial lasts 14 days."

**Survives a cut:** "The free trial lasts 14 days. You can use it to try the product before you buy."

If the cut falls after the first sentence, the first version loses the 14 days. The second version puts the answer first, so the first chunk still has it.

:::

### When you do control the chunker

If you run your own pipeline, such as a docs chat on your site or a Vertex AI Search app, you choose the splitting rules. You can then tune the chunker and the content together. Run the same [test questions](checking-docs-with-afdocs.md) after each change, and compare which chunks come back.

If you use Google's Agent Search, check which parser it uses. Only the layout parser detects headings. The default parser treats everything as plain text, so your heading work pays off only with the layout parser. ([Tom Johnson](https://idratherbewriting.com/blog/chunking-content-for-mcp-ingestion-agent-readability))
