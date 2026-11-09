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

1. Use the current workspace as the repository. Confirm `package.json` exists at its root; do not search for it.
2. In one PowerShell command, read listening ports in the 3000–3100 range and choose the first unused one:

   ```powershell
   $used = Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -ge 3000 -and $_.LocalPort -le 3100 } | Select-Object -ExpandProperty LocalPort
   $port = 3000..3100 | Where-Object { $_ -notin $used } | Select-Object -First 1
   if ($null -eq $port) { throw 'No free preview port in range 3000–3100.' }
   ```

   Do not probe each port with HTTP requests, reuse another server, or stop another process.
3. Start the development server with the Windows npm command shim. Use `npm.cmd` (not `npm`) to avoid PowerShell execution-policy failures. Disable Docusaurus's persistent cache for this preview because Rspack's persistent cache has crashed repeatedly in this workspace. Start it as an attached asynchronous process; do not detach it:

   ```powershell
   $env:DOCUSAURUS_NO_PERSISTENT_CACHE = 'true'
   npm.cmd start -- --host localhost --port <chosen-port> --no-open
   ```

4. Wait for the ready message and make one HTTP request to verify the server. If startup or the request fails, report the error instead of claiming the preview is available.
5. This site uses `baseUrl: '/ai-augmented-tech-writer/'`. Open the URL in the user's default external browser with PowerShell `Start-Process $url`, not an integrated-browser tool. Give the user a clickable Markdown link to the same URL:

   ```text
   http://localhost:<chosen-port>/ai-augmented-tech-writer/
   ```

6. Briefly explain that source-file changes update the preview automatically and that the server can be stopped with Ctrl+C.

## Notes

- Do not run a production build for the preview workflow; the dev server compiles the site and watches for edits.
- Keep the server attached to the current session; do not use a detached process.
- If the user provides a page or area as an argument, include a direct link to that page when its route can be determined from the Docusaurus docs structure.
- Launching the URL externally when `/peek` runs does not control how VS Code handles a later click on the chat link. Do not claim the skill can override that setting.
