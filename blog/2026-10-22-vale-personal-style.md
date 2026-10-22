---
title: Making the Google style guide my own with Vale
description: How I tuned Vale's Google style rules for a personal site, added my own list rule, and kept my writing samples strict.
authors: [annako]
tags: [vale, ai]
---

My site uses Vale to check every pull request against the Google developer style guide. The first time I ran it on the whole site with every alert level on, it reported 691 problems. Was my writing that bad, or was the guide the wrong fit?

<!-- truncate -->

## The why

Most of the alerts weren't about my writing at all. More than 340 were spelling alerts for the Latin placeholder text in a Docusaurus sample post. Another 87 flagged first person: every "I," "me," and "my."

The Google style guide targets product documentation, where "I" rarely belongs. On a personal site, it's the whole point. I didn't want to give up the guide, though. I wanted to keep it and make deliberate exceptions.

## What I changed

I worked through the alerts with Claude Code, which grouped them by rule so I could decide on each group instead of each line.

- **Skipped files I didn't write** — Docusaurus samples and generated API pages no longer get checked.
- **Taught Vale real names** — Added products like Pinecone, Qdrant, and PostgreSQL to the vocabulary instead of turning off spell checking.
- **Allowed first person** — "I," "we," and "our" are fine on my own pages.
- **Allowed spaced em dashes** — Google and Microsoft both want no spaces, but AP style uses them, and my list format needs them (more on that below).
- **Kept my writing samples strict** — The vector search and API docs still follow Google style exactly, because they show I can write to a professional standard.

The exceptions and the strict samples live side by side in `.vale.ini`. Later sections override earlier ones, so the samples get the rules back:

```ini
# My own pages
Google.FirstPerson = NO
Google.EmDash = NO

# Writing samples: strict Google style
[docs/portfolio/{vector-search,api-docs}/**]
Google.FirstPerson = YES
Google.EmDash = YES
```

## My one personal rule

I like lists in the format `**Term** — description`, like the one in this post. The bold term and the spaced dash make them easy to scan.

None of the current style guides I checked recommend it, and Google explicitly says to use a colon instead. So I made it my own rule: a small custom Vale check that flags colons, hyphens, and dashes without spaces after a bold list term. It's off for my writing samples, where Google's colon rule still applies.

## The takeaway

A style guide is a starting point, not a cage. The site went from 691 alerts to 24 warnings, and each of those is a real style point worth a look. AI made the alerts manageable, but each exception was a decision I had to make and be able to explain. Now the linter checks my style, not just Google's :)
