---
title: About my AI journey
description: How I use AI in my technical writing, the tools I rely on, and what I'm exploring next.
sidebar_custom_props:
  card_icon: img/icons/ai-square-light.svg
  card_icon_invert_dark: true
---

Good documentation doesn't happen by accident. It takes clear thinking, careful structure, and a real understanding of what readers need. I've spent years applying that to API docs, user guides, and release notes.

Since 2025, I've been exploring a new question: where does AI make that work better, and where does it need a writer in charge? This page is my running answer.

## How I use AI

- **Drafting and editing** — first drafts, rewrites, and tightening prose
- **Brainstorming and outlining** — getting from a blank page to a structure faster
- **Research** — summarizing sources and exploring unfamiliar topics
- **Organizing information** — restructuring content so it's easier to navigate
- **Review cycles** — catching issues earlier and iterating faster

AI speeds up each of these steps, but it doesn't replace judgment. I still decide what's accurate, what readers need, and what ships.

## My toolkit

I rely on four kinds of AI tools: general-purpose assistants, agents that work in this site's repo, MCP servers that connect them to other apps, and specialized tools for specific tasks.

### Assistants

I use AI assistants as tutors and thinking partners: to learn new topics and to think through ideas before I write.

- **ChatGPT, Claude, Gemini** — drafting, editing, brainstorming, and research
- **NotebookLM** — research, learning, and podcast generation

### Agents in my repo

I use GitHub Copilot in VS Code and Claude Code in much the same way: as agents that work directly in this site's repo. Cursor is next on my list to explore. For example, they help me:

- **Set up tooling** — configuring the Vale prose linter ([how I made Google style my own](/blog/2026/10/22/vale-personal-style))
- **Automate tasks** — building skills such as `/peek`, which starts a local preview of the site
- **Update the site** — Docusaurus configuration, styling, and navigation
- **Troubleshoot** — build errors, broken routes, and dependency issues
- **Draft and review content** — blog posts and documentation pages

### Connected apps

The Model Context Protocol (MCP) lets an AI assistant connect to other apps and tools. I've started using MCP servers with Claude:

- **Notion** — exporting notes and drafts from AI chats into Notion pages, so the work is organized and easy to come back to
- **Browser** — opening my local preview of this site, so Claude Code can check how a page looks after a change

### Specialized and workplace tools

- **Napkin AI** — the minimalist icons on this site
- **Enterprise AI tools** — integrated into internal workflows at work

## What I'm exploring next

- **More skills** — automating repeatable tasks, building on `/peek` and `/blog-post`
- **More MCP servers** — connecting agents to more of the tools and data I use every day
- **AI documentation platforms** — tools built specifically for docs teams
- **The risks** — where AI goes wrong in technical writing, and how to catch it

I share what I learn along the way on the [blog](/blog).
