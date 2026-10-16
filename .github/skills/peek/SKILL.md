---
name: peek
description: "Start this Docusaurus site's live-reloading development server for local preview. Use /peek after content, styling, configuration, or navigation changes when the user wants to inspect changes as they edit."
argument-hint: "Optional: a page or area to preview"
user-invocable: true
disable-model-invocation: true
---

# Live preview the site

Start Docusaurus's development server so the user can preview the site and see source changes update automatically.

## Procedure

1. Confirm the working directory is this repository root (the directory containing `package.json`).
2. Check whether port 3000 is already in use:
   - If a Docusaurus development server for this repository is already running, reuse it.
   - If a production `docusaurus serve` process for this repository is using the port, leave it running and use another available port, such as 3001, for the development server.
   - If another unrelated process owns port 3000, do not stop it; choose another available port.
3. Start the development server with the Windows npm command shim:

   ```powershell
   npm.cmd start -- --host localhost --port 3000 --no-open
   ```

   Start it as an attached asynchronous process so it stays available during the session; do not detach it. Substitute the chosen available port when needed.
4. Wait for the development server to report that it is ready, then verify it responds successfully before reporting the preview URL. If it fails to start or the HTTP check fails, report the error instead of claiming the preview is available.
5. This site uses `baseUrl: '/ai-augmented-tech-writer/'`. Give the user the preview URL in this form:

   ```text
   http://localhost:3000/ai-augmented-tech-writer/
   ```

   Substitute the actual port if it differs. If browser tools are available, open the preview URL; otherwise provide it so the user can open it.
6. Explain that source-file changes should update the running preview automatically. If file watching does not detect changes, restart the dev server or retry with Docusaurus's `--poll` option.
7. Tell the user the server remains running and can be stopped with Ctrl+C in its terminal.

## Notes

- Do not run a production build for the preview workflow; the dev server compiles the site and watches for edits.
- Keep the server attached to the current session; do not use a detached process.
- If the user provides a page or area as an argument, include a direct link to that page when its route can be determined from the Docusaurus docs structure.
