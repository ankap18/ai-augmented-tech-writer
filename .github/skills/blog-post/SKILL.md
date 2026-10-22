---
name: blog-post
description: "Draft, edit, or publish a blog post for this Docusaurus site in Anna's voice: short, first-person reflections on learning, tooling, and AI-assisted technical writing. Use when the user asks to write, outline, polish, or add a blog post, or turns notes into a post."
argument-hint: "Topic, rough notes, or path to an existing draft"
user-invocable: true
---

# Write a blog post

Turn a topic or rough notes into a blog post that matches the existing posts in `blog/`, and wire it into the site so it actually publishes.

Before drafting, read the current posts in `blog/` (skip `blog/_docusaurus-examples/`) to refresh the voice. They are the source of truth; this skill summarizes them.

## Voice

- **First person, conversational, honest.** Write like a technical writer telling a colleague what she learned. Use contractions ("I'd", "it's", "couldn't").
- **Curious, not preachy.** Pose a real question, explore it, land on a grounded answer. Don't lecture or hype.
- **A recurring theme: AI plus fundamentals.** Where it fits naturally, connect the topic to how AI changes (or doesn't change) the work: AI can generate the output, but understanding it is what lets you trust, question, or fix it.
- **Light humor in small doses.** An aside in parentheses ("and quickly running out of tokens"), or an occasional `:)` at the end of a sentence. At most one or two per post.
- **Concrete over abstract.** Name the actual tool, course, plugin, or command. Show one real example of using what was learned.
- **Plain, scannable prose.** Short paragraphs (1–3 sentences). No filler intros like "In today's fast-paced world".

## Structure

Posts are short: roughly 250–450 words. Follow this shape:

1. **Hook (1–2 sentences) before the truncate marker.** State the situation and the tension or question. This text becomes the blog list preview.
   - "I just finished the course X... it also left me with a question I couldn't shake."
   - "Most of my best documentation work is protected by NDAs, so how do I show what I can do?"
2. **`<!-- truncate -->`** on its own line, with a blank line before and after. Required: the site config warns on untruncated posts.
3. **Two to four H2 sections** with short, sentence-case headings that read like a story arc. Patterns from existing posts:
   - Motivation: "The why", "Why I built this site"
   - Content: "What I learned", "What I've added so far"
   - Application: "Then I actually used it"
   - Close: "The takeaway"
4. **One bulleted list** in the middle section, with a **bold lead-in** per item:
   - Term and description: `- **Visual design** — Customized the CSS to...` This is Anna's personal style rule: always a spaced em dash ( — ) after the bold term, never a colon, hyphen, en dash, or unspaced em dash. Vale enforces it with `Personal.ListSeparator`.
   - Bold sentence: `- **Tab is your friend.** Autocomplete everything you can.` Use when the bold part is a complete statement ending with a period.
   Pick one style per list and keep it consistent.
5. **Closing takeaway (1–3 sentences)** that answers the opening question and, when relevant, ties back to AI.

Don't use H1 in the body (the title comes from front matter), and don't go deeper than H3.

## Front matter

```yaml
---
title: Is the Linux command line still worth learning in the AI era?
description: What a Linux command-line course taught me about learning fundamentals and using AI-generated commands responsibly.
authors: [annako]
tags: [linux]
---
```

- **title**: Sentence case. Either a question the post answers or a plain statement ("My Docusaurus website is here"). No trailing period.
- **description**: One sentence, about 15–25 words, ending with a period. Summarizes what the post covers, often "What X taught me about Y" or "Why I did X, and how Y".
- **authors**: Always `[annako]` (defined in `blog/authors.yml`). Don't add inline author objects; the config warns on them.
- **tags**: One to three keys from `blog/tags.yml`. Don't use inline tags. If a new tag is needed, add it to `blog/tags.yml` with a `label`, `permalink`, and a real one-line `description`.

## Publishing checklist

Check each of these before reporting the post as ready:

1. **File path and name**: `blog/<YYYY-MM-DD>-<kebab-case-slug>.md`, directly in `blog/` (no year folder: Docusaurus already adds the date to the URL). Use today's date unless the user gives one. Keep the slug short (3–5 words).
2. **Publish or hold back.** Every `.md` or `.mdx` file in `blog/` publishes automatically; there's no list to update. To keep a post out of production while it's in progress, add `draft: true` to its front matter (it still shows in `npm start`), and remove it when the user says the post is ready. Files and folders starting with `_`, such as `blog/_docusaurus-examples/`, never publish.
3. **Tags exist** in `blog/tags.yml`.
4. **Vale vocabulary**: The site uses Vale with the Google style. Add new product names or jargon (tool names, course titles) to `.github/styles/config/vocabularies/Docs/accept.txt` rather than misspelling around them.
5. **Preview**: Offer to run `/peek` and open `/ai-augmented-tech-writer/blog/` to check the list preview and the full post. If a dev server is already running and shows "Blog post not found" for the new post, restart it.

## Style rules (Google developer style, as enforced by Vale)

Personal exceptions to Google style, set in `.vale.ini`: first person ("I", "we", "our") is allowed, em dashes take a space on each side, and list terms use `**Term** — description`.

- Sentence-case headings and titles.
- Use "for example" instead of "e.g.", and "that is" instead of "i.e.".
- Format commands, keys used as code, file names, and paths in backticks: `man`, `~`, `/peek`.
- Write keyboard shortcuts as Ctrl+C (no backticks needed, plus sign, no spaces).
- Use the serial comma.
- Avoid "simply", "just" as a minimizer, and "easy"; say what the reader does instead. ("I just finished" as a time marker is fine.)
- Prefer active voice and present or past tense; avoid "will" for things that already happen.

## Procedure

1. **Gather input.** Get the topic and any notes, links, or experiences from the user. If the user gives only a topic, ask for the one concrete personal detail the post needs (what happened, what you built, what surprised you). Don't invent personal experiences, courses, or results.
2. **Read the existing posts** in `blog/` and `blog/tags.yml`.
3. **Propose** a title, description, tags, and a section outline in chat. Keep it brief. Skip this step if the user asked for a full draft directly.
4. **Draft** the post following the voice, structure, and front matter rules above.
5. **Self-review** before presenting:
   - The hook alone makes sense as a preview card.
   - No sentence or idea is repeated across sections.
   - The takeaway answers the question posed in the hook.
   - Word count is within range; cut rather than pad.
6. **Wire it up**: complete the publishing checklist.
7. **Report** the file path, whether it is a draft, any new tags or vocabulary words, and offer `/peek` for a preview.

## Editing an existing draft

When the user points to an existing post, keep their wording and personal details. Tighten, fix structure and front matter, and flag (don't silently rewrite) anything that changes meaning. Check whether it has `draft: true` and whether that's still intended.
