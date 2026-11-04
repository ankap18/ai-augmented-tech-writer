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

1. Use the current workspace as the repository; confirm `package.json` exists at its root. Do not search the repository to rediscover its structure.
2. Check ports 3000–3100 in one pass. If this repository's Docusaurus dev server is already responding at the expected base URL, reuse it. Otherwise choose the first unused port in that range. Never stop another process or try occupied ports one by one.
3. Start the development server with the Windows npm command shim. Use `npm.cmd` (not `npm`) to avoid PowerShell execution-policy failures. Disable Docusaurus's persistent cache for this preview because Rspack's persistent cache has crashed repeatedly in this workspace:

   ```powershell
   $env:DOCUSAURUS_NO_PERSISTENT_CACHE = 'true'
   npm.cmd start -- --host localhost --port 3000 --no-open
   ```

   Substitute the chosen port. Start it as an attached asynchronous process; do not detach it.
4. Wait for the ready message and make one HTTP request to verify the server. If startup or the request fails, report the error instead of claiming the preview is available.
5. This site uses `baseUrl: '/ai-augmented-tech-writer/'`. Give the user the preview URL in this form:

   ```text
   http://localhost:3000/ai-augmented-tech-writer/
   ```

   Substitute the actual port if it differs. If browser tools are available, open the preview URL; otherwise provide it so the user can open it.
6. Explain that source-file changes should update the running preview automatically and that the server can be stopped with Ctrl+C.

## Notes

- Do not run a production build for the preview workflow; the dev server compiles the site and watches for edits.
- Keep the server attached to the current session; do not use a detached process.
- If the user provides a page or area as an argument, include a direct link to that page when its route can be determined from the Docusaurus docs structure.
