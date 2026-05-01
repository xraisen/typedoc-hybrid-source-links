# TypeDoc Hybrid Source Links

> **Required companion for the complete tested workflow:** [AI Code Intelligence Toolkit](https://github.com/xraisen/ai-code-intelligence-toolkit)  
> **This repository:** [TypeDoc Hybrid Source Links](https://github.com/xraisen/typedoc-hybrid-source-links)

For the complete tested workflow, install both tools:

```bash
npm install --save-dev typedoc-hybrid-source-links ai-code-intelligence-toolkit typedoc
npx typedoc-hybrid-install --target . --overwrite
npx ai-code-intel-install --target . --overwrite
```

Run the TypeDoc gate after install:

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
npm run typedoc:html:github
```

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeDoc](https://img.shields.io/badge/TypeDoc-sourceLinkTemplate-blue.svg)](https://typedoc.org/)
[![Tested Workflow](https://img.shields.io/badge/tested-Codex%20CLI%20%2B%20Windows%20app-111827)](#tested-environment)

**TypeDoc Hybrid Source Links** makes TypeDoc documentation useful for both local AI coding workflows and public documentation. It generates local VS Code source links for developer machines and GitHub blob links for browser-based docs.

It is the companion documentation layer for **AI Code Intelligence Toolkit**.

It is **not** a token-saving product. Any token or cost reduction is only a side effect of better source precision and fewer irrelevant files being pulled into an assistant workflow.

---

## Required companion links

```txt
TypeDoc Hybrid Source Links:
https://github.com/xraisen/typedoc-hybrid-source-links

AI Code Intelligence Toolkit:
https://github.com/xraisen/ai-code-intelligence-toolkit
```

**TypeDoc Hybrid Source Links can run by itself** for TypeDoc local/GitHub source-link generation.

**AI Code Intelligence Toolkit can run by itself** for GraphRAG, `ai:spec`, `ai:preflight`, graph doctor, and leak checks.

**They are designed to work best together.** The benchmark, health checks, and guarded Codex-compatible workflow described below are based on using **TypeDoc Hybrid Source Links + AI Code Intelligence Toolkit together**.

---

## What this toolkit does

```txt
typedoc:health       Verifies the TypeDoc hybrid toolchain
typedoc:doctor       Alias for TypeDoc health checks
typedoc:json:local   Generates AI-context TypeDoc JSON with VS Code source links
typedoc:check-local  Confirms local source links are safe and not GitHub placeholders
typedoc:json:github  Generates TypeDoc JSON with GitHub source links
typedoc:html:github  Generates public HTML docs with GitHub source links
typedoc:strict       Runs strict TypeDoc validation when you want TypeScript errors to fail docs
```

---

## Tested environment

This release is tested for package health using:

```txt
Node.js >= 20
npm pack --dry-run
node --check for every .mjs file
npm run smoke
installer smoke test
false-positive TypeDoc source-link fixture
```

The intended AI workflow is documented for:

```txt
Codex CLI
Codex Windows app workflow
Windows repository worktree
Node.js >= 20
```

---

## Install

```bash
npm install --save-dev typedoc-hybrid-source-links typedoc
npx typedoc-hybrid-install --target . --overwrite
```

For the complete workflow:

```bash
npm install --save-dev typedoc-hybrid-source-links ai-code-intelligence-toolkit typedoc
npx typedoc-hybrid-install --target . --overwrite
npx ai-code-intel-install --target . --overwrite
```

---

## Link behavior

```txt
Local mode:
  vscode://file/<absolute-local-repo-path>/{path}:{line}

GitHub mode:
  https://github.com/<owner>/<repo>/blob/<revision>/{path}#L{line}
```

Local mode is for AI worktrees and local editor navigation.

GitHub mode is for public docs and browser navigation.

---

## Empty-folder behavior

Running TypeDoc JSON generation in a folder with no project source is not a real docs test. The installer can be smoke-tested in an empty npm package, but `typedoc:json:local` needs TypeDoc installed and meaningful entry points to generate useful JSON.

Correct smoke test:

```bash
mkdir test-typedoc-hybrid
cd test-typedoc-hybrid
npm init -y
npm install --save-dev typedoc-hybrid-source-links typedoc
npx typedoc-hybrid-install --target . --overwrite
npm run typedoc:health
```

Correct real-project test:

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
npm run typedoc:json:github
npm run typedoc:html:github
```

---

## Package scripts added to the target repo

```json
{
  "typedoc:config:auto": "node scripts/typedoc-source-config.mjs auto typedoc.json",
  "typedoc:config:local": "node scripts/typedoc-source-config.mjs local typedoc.json",
  "typedoc:config:github": "node scripts/typedoc-source-config.mjs github typedoc.json",
  "typedoc:frontend:config:local": "node scripts/typedoc-source-config.mjs local typedoc-frontend.json",
  "typedoc:frontend:config:github": "node scripts/typedoc-source-config.mjs github typedoc-frontend.json",
  "typedoc:json": "npm run typedoc:json:auto",
  "typedoc:json:auto": "npm run typedoc:config:auto && npx --no-install typedoc --json typedoc-api.json --options typedoc.auto.generated.json",
  "typedoc:json:local": "npm run typedoc:config:local && npx --no-install typedoc --json typedoc-api.json --options typedoc.local.generated.json",
  "typedoc:json:github": "npm run typedoc:config:github && npx --no-install typedoc --json typedoc-api.github.json --options typedoc.github.generated.json",
  "typedoc:html:auto": "npm run typedoc:config:auto && npx --no-install typedoc --options typedoc.auto.generated.json",
  "typedoc:html:local": "npm run typedoc:config:local && npx --no-install typedoc --options typedoc.local.generated.json",
  "typedoc:html:github": "npm run typedoc:config:github && npx --no-install typedoc --options typedoc.github.generated.json",
  "typedoc:frontend:html:github": "npm run typedoc:frontend:config:github && npx --no-install typedoc --options typedoc-frontend.github.generated.json",
  "typedoc:health": "node scripts/typedoc-tool-health.mjs",
  "typedoc:doctor": "node scripts/typedoc-tool-health.mjs",
  "typedoc:check-local": "node scripts/ai/typedoc-local-source-check.mjs",
  "typedoc:strict": "TYPEDOC_STRICT=true npx --no-install typedoc --options typedoc-strict.json",
  "docs:typedoc": "npm run typedoc:html:auto",
  "typedoc:final-health": "npm run typedoc:health && npm run typedoc:json:local && npm run typedoc:check-local"
}
```

---

## Complete workflow anti-drift loop with AI Code Intelligence Toolkit

When this package is used with **AI Code Intelligence Toolkit**, run local TypeDoc JSON and graph rebuild before every AI edit cycle:

```bash
npm run typedoc:json:local && npm run ai:graph:build
npm run ai:spec -- "<task>"
npm run ai:graph:query -- "<specific symbol/file/error/feature>"
npm run ai:preflight -- "<task>"
```

For Windows PowerShell context reads, use targeted `Select-String` against `AI_GROUND_TRUTH.md`, `AI_SYMBOL_INDEX.json`, and the exact files returned by `ai:graph:query`. Avoid broad `Get-Content` dumps or broad `rg` searches as the first navigation move.

---

## v1.0.6 fixes included

```txt
1. Companion links are visible in root README, installed README section, and AGENTS snippet.
2. TypeDoc scripts use npx --no-install typedoc instead of an internal TypeDoc binary path.
3. Local source checks inspect TypeDoc source.url values only.
4. GitHub blob text outside source.url no longer causes a false-positive local check failure.
5. Empty-folder behavior is documented clearly as a smoke test only.
6. typedoc:final-health is included.
```

---

## Publish

```bash
npm whoami
npm run smoke
npm pack --dry-run
npm publish --access public
npm view typedoc-hybrid-source-links version
```

Expected version after publish:

```txt
1.0.6
```

---

## Trademark and affiliation notice

This package is an independent developer workflow package. It is not affiliated with, endorsed by, or certified by TypeDoc, OpenAI, GitHub, Microsoft, or any other vendor referenced in examples.
