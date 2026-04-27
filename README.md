# TypeDoc Hybrid Source Links

Generate TypeDoc source links that match the audience:

- local documentation opens files in VS Code
- published documentation opens files in GitHub

This package installs the templates and scripts needed to keep both views in sync while still preserving an AI-friendly local docs workflow.

## What It Does

- Generates local and GitHub TypeDoc configurations.
- Adds a health check for the installed tooling and helper scripts.
- Provides a local source validator that blocks placeholder and GitHub blob links in AI-context docs.
- Keeps strict TypeDoc output separate from the more tolerant local documentation flow.
- Appends project-specific docs snippets into `README.md` and `AGENTS.md` when installed into another repo.

## Use Case

You maintain a TypeScript library that needs two different doc experiences:

1. Contributors read docs locally and jump straight to code in VS Code.
2. External users read the published docs on GitHub and follow GitHub source links.
3. The repo keeps one install step that wires up both configurations and validates them before release.

Typical flow:

```bash
npm install --save-dev typedoc-hybrid-source-links
npx typedoc-hybrid-install --target . --overwrite
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
npm run typedoc:html:github
```

## Install Into Another Repo

Install the package into a target repository:

```bash
node bin/install.mjs --target /path/to/your/repo --overwrite
```

After publishing the package:

```bash
npm install --save-dev typedoc-hybrid-source-links
npx typedoc-hybrid-install --target . --overwrite
```

## Installed Commands

The installer wires in these scripts:

```bash
npm run typedoc:health
npm run typedoc:doctor
npm run typedoc:json:local
npm run typedoc:json:github
npm run typedoc:html:local
npm run typedoc:html:github
npm run typedoc:check-local
npm run typedoc:strict
```

## Smoke Test

Run the bundled repository smoke test to verify the installer and health check path:

```bash
npm run smoke
```

## License

MIT
