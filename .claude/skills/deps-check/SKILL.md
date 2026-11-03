---
name: deps-check
description: "Check this Docusaurus site's npm dependencies for vulnerabilities and available updates, decide which fixes are safe, and apply and verify them. Use when the user asks about vulnerabilities, security, npm audit, outdated packages, or upgrading Docusaurus, or when a Dependabot alert or pull request needs review."
argument-hint: "Optional: a Dependabot PR number or package name to focus on"
user-invocable: true
---

# Check dependencies

Find out which dependency problems are real, which are fixable now, and which are waiting on upstream maintainers. Then apply the safe fixes and prove the site still builds.

## What matters for this site

The site is static: Docusaurus builds HTML and JavaScript, and GitHub Pages serves it. Keep that in mind when you rate risk.

- **Build-time packages** — most `npm audit` findings, such as `tinypool`, `serialize-javascript`, `webpack-dev-server`, and `@faker-js/faker`, run only during `npm start` or `npm run build`. They never reach visitors. Their RCE or DoS findings need attacker-controlled input, and the site builds from the user's own content.
- **Shipped packages** — `react`, `react-dom`, and code bundled into the browser. A finding here deserves a faster fix.
- **One root, many rows** — a vulnerable package inside `@docusaurus/core` makes every `@docusaurus/*` package show up as vulnerable. Count root causes, not rows.

## Rules

- **Never run `npm audit fix --force`.** It satisfies the audit by downgrading major packages, for example Docusaurus to 3.7.0 or the OpenAPI plugins to 2.1.3.
- **Keep version groups together.** All `@docusaurus/*` packages, including `@docusaurus/faster`, must have the same exact version. The OpenAPI plugin and theme move together, and so do `react` and `react-dom`.
- **Test in a scratch copy first.** Don't change the project's `package.json` or `package-lock.json` until the user approves the plan.
- **Read the release notes for `future.v4` changes.** The site sets `future: { v4: true }` in `docusaurus.config.js`. Minor Docusaurus releases can add new behavior under that flag. For example, 3.10 needed `@docusaurus/faster` and turned off MDX v1 comments, which the `markdown.mdx1Compat` block turns back on.
- **Don't commit, push, or merge** unless the user asks.

## Procedure

1. **Collect the facts.** Run these in the project root. Save the JSON to the scratchpad so you can summarize it per package:

   ```bash
   npm audit --json > <scratchpad>/audit.json
   npm audit
   npm outdated
   ```

   If the user named a Dependabot PR, read its diff and the advisories it links.
2. **Trace the worst findings** to the direct dependency that pulls them in:

   ```bash
   npm ls <package>
   ```

3. **Simulate the fixes** in two scratch copies of `package.json` and `package-lock.json`, and compare the audit counts:
   - **Safe fixes** — `npm audit fix --package-lock-only --ignore-scripts`.
   - **Latest versions** — bump the version groups to their latest releases, then run `npm install --package-lock-only --ignore-scripts` and the safe fixes.

   Check `npm view <package>@<version> peerDependencies` for anything that clashes with the current setup.
4. **Report and recommend.** Give the user a table of root causes with severity, whether the package is build-time or shipped, and whether a fix exists. Recommend what to apply now and what to leave for upstream. Wait for approval.
5. **Apply** the approved changes in the project: edit `package.json`, then `npm install` and `npm audit fix`.
6. **Verify** the site:

   ```bash
   npm run clear
   npm run build
   ```

   If the build fails, read the error before changing anything, and check the Docusaurus release notes for the version you moved to. Then start the `docusaurus-serve` preview and check:
   - An API page, such as `/docs/portfolio/api-docs/generated/synonyms-api/create-synonym`, renders its request body and code samples with no console errors.
   - The `/blog` list shows short previews with **Read more** links, which proves `<!-- truncate -->` still works.
7. **Report** the before and after vulnerability counts, the changed files, and anything still waiting on upstream. Suggest running the `changelog` skill if the user plans to open a PR.
