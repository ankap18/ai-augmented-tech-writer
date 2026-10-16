---
title: Run Vale in VS Code
sidebar_label: Run Vale in VS Code
description: My notes on installing Vale Linter to check content against the Google Developer Style Guide
keywords:
  - Vale Linter
  - VS Code
  - Google Developer Style Guide
---

This guide shows how to run Vale in VS Code using the Google Developer Style Guide. Running Vale in the editor takes two parts: the Vale command-line tool and the VS Code extension that talks to it.

I used an AI assistant to walk me through this. Its instructions weren't perfect; I had to clarify some options, and it gave me the wrong extension name. But I got it working and documented what actually worked.

1. Install Vale.

    > I'm on Windows, and I installed Vale with `winget install errata-ai.Vale` and checked that it worked with `vale --version`.

2. Create a configuration file.

    Vale reads its settings from a file named `.vale.ini` in the root folder of the repository. This file tells Vale where to keep style files, which style packages to download, and which styles to apply to files.

    > I already had this file because it was added for the PR workflow using GitHub Actions. Mine includes this content:

        ```ini
        # Where Vale keeps its styles. Downloaded packages land here too.
        StylesPath = .github/styles

        # Only show warnings and errors. "suggestion" level is very noisy
        # on a first run. Lower this to "suggestion" once you're comfortable.
        MinAlertLevel = warning

        # Download these style packages when "vale sync" runs.
        # Google = the Google Developer Style Guide
        Packages = Google

        # Apply these settings to Markdown and MDX files.
        [*.{md,mdx}]
        # "Vale" = Vale's built-in rules, including spelling.
        # "Google" = the Google style rules.
        BasedOnStyles = Vale, Google
        ```

    > I've always used the Microsoft Writing Style Guide, but this time I decided to try the Google Developer Style Guide. Switching only meant changing the names in `Packages` and `BasedOnStyles`.

3. Download the style package.

    In a terminal, go to the folder that contains `.vale.ini` and run:

    ```
    vale sync
    ```

    This command downloads the Google style into `.github/styles` (the folder is specified in the configuration file).