---
name: peek
description: "Start the site's live preview and provide its link."
user-invocable: true
disable-model-invocation: true
---

# Preview the site

Serve the preview and give the link. Do nothing else: no build, no install, no checks.

1. If a preview server is already running, reuse it.
2. Otherwise, start the `docusaurus-start` configuration from `.claude/launch.json`. If your tool can't read that file, run `npm run start -- --port 3002 --no-open` in the background.
3. If port 3002 is busy with something else, use the next free port.
4. Reply with only the link: `http://localhost:<port>/ai-augmented-tech-writer/`.
