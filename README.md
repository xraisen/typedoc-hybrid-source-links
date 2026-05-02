# TypeDoc Hybrid Source Links v1.0.8

Hybrid TypeDoc source links for local VS Code navigation, AI-readable TypeDoc JSON, and public GitHub docs.

## Install

```bash
npm install --save-dev typedoc-hybrid-source-links typedoc
npx typedoc-hybrid-install --target . --overwrite
```

## Companion workflow

For the full tested anti-drift workflow, install with AI Code Intelligence Toolkit:

```bash
npm install --save-dev typedoc-hybrid-source-links ai-code-intelligence-toolkit typedoc
npx typedoc-hybrid-install --target . --overwrite
npx ai-code-intel-install --target . --overwrite --strict
```

## Commands

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
npm run typedoc:html:github
npm run typedoc:strict
```

`typedoc:strict` is cross-platform in this release because it runs through `scripts/typedoc-strict-runner.mjs` instead of shell-specific inline environment assignment.
## Cumulative v1.0.8 note

This package is the complete v1.0.8 jump release. It carries the package manifest repair, anti-drift agent contract, AGENTS/README injector, edit-permission fix, searchable aliases, durable AI changelog memory, and smart validation memory in one release.

