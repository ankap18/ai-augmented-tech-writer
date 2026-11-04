---
title: "My first n8n workflow: A Diátaxis auditor for my docs"
description: How I used n8n and two free local models to sort my portfolio pages by Diátaxis type, and where both models failed.
authors: [annako]
tags: [ai, diataxis, n8n]
draft: false
---

I wanted to learn n8n, so I looked for a first project that was easy to start with and useful in my real work. I picked a question I care about as a tech writer: can an AI model running on my laptop read a docs page and tell whether it's a tutorial, a how-to guide, reference, or explanation, the four types in [Diátaxis](https://diataxis.fr/)?

<!-- truncate -->

## Why n8n

[n8n](https://n8n.io/) is a workflow automation tool. You connect nodes on a canvas, and data flows from one node to the next. It's fair-code, so I can host it myself for free. I ran it in Docker Desktop, and it was up at `localhost:5678` in a few minutes.

![Docker Desktop Containers list with the n8n container running from the n8nio/n8n:2.46.5 image on port 5678](/img/blog/n8n-diataxis-auditor/docker-desktop-n8n-container.png)

It's also a good practical example of what I wrote about in [Prompt, workflow, or agent?](/docs/ai-stuff/prompt-workflow-agent). n8n is built for workflows: fixed steps that I design in advance and where AI can do smart work at one of the steps.

## The workflow I built

I designed the workflow with Claude Code, then built it myself in n8n, node by node. It reads my site's sitemap and sends every Portfolio page to a model. It's a chain of ten nodes:

- **Manual trigger** — starts a run when I click a button.
- **HTTP Request and XML** — fetch `sitemap.xml` and turn it into JSON.
- **Split Out** — turns one list of 47 URLs into 47 separate items, so every node after it runs once per page.
- **Filter** — keeps the 11 Portfolio pages and drops tag pages, category pages, and generated API reference.
- **HTTP Request and HTML** — fetch each page and keep only its title and article text.
- **Basic LLM Chain** — sends each page to the model with the Diátaxis definitions and gets back JSON: type, confidence, mixed types, evidence, and a suggestion.
- **Edit Fields and Convert to File** — add the URL and title back, and save the results as a CSV.

![n8n canvas with the ten workflow nodes connected in a chain, from the manual trigger to Convert to File, with item counts on each connection and the Ollama Chat Model and Structured Output Parser attached to the Basic LLM Chain](/img/blog/n8n-diataxis-auditor/n8n-workflow-canvas.png)

Only one of the ten nodes uses AI. The other nine prepare the data: they turn text into JSON, one item into many, and HTML into plain text.

For the AI node, I used Ollama, so everything ran on my laptop for free. I tried two models on the same prompt: Qwen 2.5 with 7 billion parameters, and OpenAI's open-weight gpt-oss with 20 billion.

![Ollama Chat Model settings in n8n with the Ollama account credential, the qwen2.5:7b model, and a context length of 8192](/img/blog/n8n-diataxis-auditor/chat-model-settings.png)

## What the models got right and wrong

Both models got the clear cases right, and the differences showed up at the edges:

- My five [vector search pages](/docs/portfolio/vector-search/overview) are explanation pages, and both said so.
- I told both models to answer `none` for a page that's only a list of links, like my [external samples](/docs/portfolio/external-links), and only gpt-oss did.
- gpt-oss also noticed that my [authentication page](/docs/portfolio/api-docs/authentication) is a how-to with a reference table inside it, and suggested moving the error codes to a separate reference section.
- Qwen called my [API quickstart](/docs/portfolio/api-docs/quickstart) a tutorial and gpt-oss called it a how-to, which is an argument tech writers have too.

Neither model ever admitted doubt. Both rated their confidence "high" for all 11 pages, so that field told me nothing.

The most interesting miss was my page about [publishing from MadCap Flare to Zendesk](/docs/portfolio/how-to-publish-target-zendesk). Both models called it a how-to guide, and it is one. But the steps are in a screenshot, and neither model can see images. **They trusted the intro sentence, which says the page is a how-to guide.** Anything that reads text, from search engines to screen readers, has the same blind spot. The image's alt text said, literally, "alt text." I've fixed it locally, so it'll be right on the live site soon.

The bigger model gave better answers, but it took three times longer.

| Model | Time for 11 pages | Time per page | Tokens |
|---|---|---|---|
| Qwen 2.5, 7 billion parameters | 3 min 28 s | ~19 s | ~13,130 |
| gpt-oss, 20 billion parameters | 11 min 9 s | ~61 s | ~13,260 |

Both runs handled about the same amount of text, so the difference comes from the model itself. The bigger model is slower at everything it does.

## What this taught me

A local model can sort the easy pages, but the edge cases still need a bigger model and a human who knows what a how-to is. Building the workflow also showed me where most of the work is. The AI decision is one node, and the rest is data preparation that I had to understand before the workflow could run.
