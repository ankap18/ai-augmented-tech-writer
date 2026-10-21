


1. Went to https://git-scm.com/ and installed Git.
2. In VSC, using the Git Bash terminal, created a new branch.
3. In the GitHub copilot chat, asked to updated references from the old png files to new SVG files.

4. I had to run npm install. But got the error:
'npm' is not recognized as an internal or external command,
operable program or batch file.
That error means Node.js (which includes npm) either isn't installed on your Windows machine.

5. I went to the node.js site. https://nodejs.org/en/download

The page is currently set to install via Docker, which isn't what you want here. You can ignore that code box entirely.

Click the green Windows Installer (.msi) button at the bottom of the page. That's the standard installer, and it puts node and npm on your PATH automatically.

6. Run the downloaded .msi and click through with the default options.
Close and reopen your terminal (and VS Code, if you use it).
Run node -v and npm -v to confirm both print a version number.
Go back to your project folder and run npm install again.

7. npm run start

This starts a local dev server, usually at http://localhost:3000, and opens it in your browser. It reloads automatically when you edit files. This is what you want for most previewing.

8. Using GitHub copilot, I asked to update references to new SVG files. I got the ideas for the new icon using Napkin AI.

9. Using Claude, reviewed and planned CSS update.
