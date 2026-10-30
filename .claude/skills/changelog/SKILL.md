---
name: changelog
description: "Add an entry for the current changes to this Docusaurus site's changelog (src/pages/changelog.md). Use before pushing a branch or creating a pull request, or when the user asks to update the changelog or write release notes for the site."
argument-hint: "Optional: base branch to compare against (default: main)"
user-invocable: true
---

# Update the changelog

Summarize what changed on the current branch as a new dated entry in `src/pages/changelog.md`, so the changelog is up to date before the pull request opens.

## Changelog format

Read `src/pages/changelog.md` first. The existing entries are the source of truth; this section summarizes them.

- **One section per date** — `## October 30, 2026`, newest first, directly under the intro sentence. Use today's date.
- **Two to five bullets** — each one a past-tense sentence that ends with a period: "Added…", "Refined…", "Fixed…".
- **Written for site visitors** — describe what changed on the site, not which files changed. Group related edits into one bullet ("Refined portfolio, vector search, and AI workflow content").
- **No bold terms** — plain sentences only. Bold is fine for a section name, such as **TW Stuff**.

## What to include

- New or significantly rewritten pages, sections, and published blog posts.
- Visible changes to design, navigation, or site behavior.
- Tooling worth noting, such as new Vale rules, workflows, or skills.
- Small fixes grouped into one bullet, such as typo or punctuation cleanup across the site.

Leave out:

- Blog posts with `draft: true` in their front matter. They don't publish, so they don't belong in the changelog yet.
- Changes that only support a draft, such as a vocabulary word added for an unpublished post.
- Changes to the changelog itself.

## Procedure

1. **Collect the changes.** Compare the branch with the base branch (`main` unless the user gives another), and include uncommitted work:

   ```bash
   git log --oneline main..HEAD
   git diff --stat main...HEAD
   git status --short
   git diff
   ```

   Read new files that `git status` lists as untracked, at least their front matter.
2. **Check for an existing entry.** If the changelog already has a section for today, add to it instead of creating a second one. If the branch's changes are already covered, say so and stop.
3. **Draft the entry** following the format above, and show it to the user in chat. Point out anything you left out on purpose, such as draft posts.
4. **Write the entry** to `src/pages/changelog.md` after the user approves it or edits it.
5. **Run Vale** on the changelog and fix any alerts:

   ```bash
   vale src/pages/changelog.md
   ```

6. **Report** the entry that was added. Don't commit, push, or create the pull request unless the user asks.
