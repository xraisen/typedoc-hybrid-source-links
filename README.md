# TypeDoc Hybrid Source Links

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeDoc](https://img.shields.io/badge/TypeDoc-supported-blue.svg)](https://typedoc.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green.svg)](https://nodejs.org/)

**TypeDoc Hybrid Source Links** is a reusable TypeDoc helper toolkit that generates different source-link modes for different environments:

- **Local mode:** TypeDoc source links open files directly in VS Code using `vscode://file/...`.
- **GitHub mode:** TypeDoc source links open files on GitHub using `https://github.com/<owner>/<repo>/blob/<revision>/<path>#L<line>`.
- **Health mode:** validates configs, helper scripts, generated output, and link mode behavior.
- **AI context mode:** allows tolerant local `typedoc-api.json` generation for AI-agent context without blocking on unrelated app TypeScript errors.

> **Tagline:** Local docs open in VS Code. Public docs open in GitHub.

---

## Why this exists

TypeDoc has excellent support for TypeScript documentation and source links, but real repositories often need two different source-link behaviors:

1. **Developers working locally** want documentation links to jump directly into local files.
2. **CI, public docs, GitHub Pages, and teammates** need source links that work in a browser.

This toolkit solves that by generating environment-specific TypeDoc configs instead of forcing one source-link strategy for all contexts.

It is especially useful when TypeDoc output is used by AI coding agents, because clickable local links and stable GitHub links make source navigation more precise.

---

## What this toolkit includes

| Tool | Purpose |
|---|---|
| `scripts/typedoc-source-config.mjs` | Generates local, GitHub, or auto TypeDoc configs from a base config. |
| `scripts/typedoc-source-link-doctor.mjs` | Validates source-link config behavior. |
| `scripts/typedoc-tool-health.mjs` | Health checker for the entire hybrid TypeDoc toolchain. |
| `scripts/ai/typedoc-local-source-check.mjs` | Confirms local TypeDoc JSON/source links are safe for local AI context. |
| `typedoc.json` | Base TypeDoc config for app/library docs. |
| `typedoc-frontend.json` | Optional frontend-specific TypeDoc config. |
| `typedoc-ci.json` | CI-safe TypeDoc config. |
| `typedoc-strict.json` | Strict docs validation config. |
| `tsconfig.doc.json` | Documentation-specific TypeScript config. |

---

## Installation

### Install from npm after publishing

```bash
npm install --save-dev typedoc-hybrid-source-links typedoc
npx typedoc-hybrid-install --target . --overwrite
```

### Install from a local clone

```bash
git clone https://github.com/xraisen/typedoc-hybrid-source-links.git
cd typedoc-hybrid-source-links

node bin/install.mjs --target /path/to/your/repo --overwrite
```

---

## Package scripts added to the target repo

```json
{
  "typedoc:config:local": "node scripts/typedoc-source-config.mjs local typedoc.json",
  "typedoc:config:github": "node scripts/typedoc-source-config.mjs github typedoc.json",
  "typedoc:config:auto": "node scripts/typedoc-source-config.mjs auto typedoc.json",

  "typedoc:frontend:config:local": "node scripts/typedoc-source-config.mjs local typedoc-frontend.json",
  "typedoc:frontend:config:github": "node scripts/typedoc-source-config.mjs github typedoc-frontend.json",

  "typedoc:health": "node scripts/typedoc-tool-health.mjs",
  "typedoc:doctor": "node scripts/typedoc-tool-health.mjs",

  "typedoc:json:local": "npm run typedoc:config:local && node --max-old-space-size=8192 ./node_modules/typedoc/bin/typedoc --json typedoc-api.json --options typedoc.local.generated.json",
  "typedoc:json:github": "npm run typedoc:config:github && node --max-old-space-size=8192 ./node_modules/typedoc/bin/typedoc --json typedoc-api.github.json --options typedoc.github.generated.json",

  "typedoc:html:local": "npm run typedoc:config:local && node --max-old-space-size=8192 ./node_modules/typedoc/bin/typedoc --options typedoc.local.generated.json",
  "typedoc:html:github": "npm run typedoc:config:github && node --max-old-space-size=8192 ./node_modules/typedoc/bin/typedoc --options typedoc.github.generated.json",

  "typedoc:check-local": "node scripts/ai/typedoc-local-source-check.mjs",
  "typedoc:strict": "node --max-old-space-size=8192 ./node_modules/typedoc/bin/typedoc --options typedoc-strict.json"
}
```

---

## Quick start

### 1. Check the toolchain

```bash
npm run typedoc:health
npm run typedoc:doctor
```

Expected:

```json
{
  "ok": true,
  "toolchain": "typedoc-hybrid-source-links",
  "errors": [],
  "warnings": []
}
```

### 2. Generate local TypeDoc JSON

```bash
npm run typedoc:json:local
npm run typedoc:check-local
```

Expected local source-link style:

```txt
vscode://file/<absolute-local-repo-path>/{path}:{line}
```

### 3. Generate GitHub-linked docs

```bash
npm run typedoc:json:github
npm run typedoc:html:github
```

Expected GitHub source-link style:

```txt
https://github.com/<owner>/<repo>/blob/<revision>/{path}#L{line}
```

If GitHub repository detection fails, set explicit environment variables:

```bash
TYPEDOC_GITHUB_REPOSITORY=owner/repo TYPEDOC_GITHUB_REVISION=main npm run typedoc:json:github
```

On Git Bash / Linux / macOS:

```bash
export TYPEDOC_GITHUB_REPOSITORY=owner/repo
export TYPEDOC_GITHUB_REVISION=main
npm run typedoc:json:github
```

---

## Local vs GitHub mode

| Mode | Intended environment | Source link output |
|---|---|---|
| `local` | Developer machine, local AI agent, Codex/Jules worktree | `vscode://file/.../{path}:{line}` |
| `github` | CI, GitHub Pages, remote review, public docs | `https://github.com/owner/repo/blob/revision/{path}#L{line}` |
| `auto` | Local by default, GitHub when CI/GitHub env is detected | Selects local or GitHub mode automatically |

---

## Why this is evidence-backed

TypeDoc officially supports:

- converting TypeScript source comments into HTML documentation or a JSON model,
- documenting app-like projects with `entryPointStrategy: "expand"`,
- source link templates through `sourceLinkTemplate`,
- `{path}`, `{line}`, and `{gitRevision}` placeholders,
- `gitRevision` and `gitRemote` options for source linking.

This toolkit wraps those TypeDoc capabilities into a repeatable local/GitHub workflow.

---

## Validation and benchmark evidence

The following workflow numbers were measured from local validation logs during development of this toolkit and its companion AI code-intelligence toolkit.

### Before

| Signal | Observed issue |
|---|---|
| Base TypeDoc docs generation | Failed when scanning too broadly with strict TypeScript checking. |
| Error output | 83 TypeScript errors and 114 warnings. |
| Source-link strategy | Single placeholder-style GitHub link could not satisfy both local and public docs. |
| TypeDoc status | No standalone `typedoc:health` confirmation. |
| AI docs usage | Local agents had no guaranteed local-file source links. |

### After

| Signal | Observed result |
|---|---:|
| `typedoc:health` | `ok: true` |
| `typedoc:doctor` | `ok: true` |
| Local generated config | `typedoc.local.generated.json` |
| GitHub generated config | `typedoc.github.generated.json` |
| Frontend local generated config | `typedoc-frontend.local.generated.json` |
| Frontend GitHub generated config | `typedoc-frontend.github.generated.json` |
| Toolchain errors | `[]` |
| Toolchain warnings | `[]` |

### Important caveat

`typedoc:health` validates the hybrid TypeDoc toolchain and generated configs. It is intentionally lighter than a full TypeDoc build. To prove documentation generation end-to-end in your repo, also run:

```bash
npm run typedoc:json:local
npm run typedoc:check-local
```

Use strict validation only when you intentionally want docs to fail on real TypeScript issues:

```bash
npm run typedoc:strict
```

---

## AI-agent use case

When an AI coding agent receives a TypeDoc-related task, use:

```bash
npm run typedoc:health
npm run typedoc:config:local
npm run typedoc:config:github
npm run typedoc:check-local
```

For a local repo, links should open directly in VS Code:

```txt
vscode://file/D:/repo/src/example.ts:42
```

For public docs, links should open in GitHub:

```txt
https://github.com/owner/repo/blob/main/src/example.ts#L42
```

This reduces context confusion when the same documentation is consumed locally by an agent and publicly by a browser user.

---

## AGENTS.md snippet

Add this to your repository `AGENTS.md`:

```md
## TypeDoc Hybrid Source Links

This repo uses `typedoc-hybrid-source-links`.

Use local mode when working inside a local repo or AI-agent worktree:

```bash
npm run typedoc:json:local
npm run typedoc:check-local
```

Use GitHub mode for public docs, CI artifacts, GitHub Pages, and remote review:

```bash
npm run typedoc:json:github
npm run typedoc:html:github
```

Use health checks before changing TypeDoc tooling:

```bash
npm run typedoc:health
npm run typedoc:doctor
```

Rules:
- Do not use placeholder GitHub links such as `your-username/your-repo`.
- Do not commit generated local configs unless the repo policy explicitly allows it.
- Use `typedoc:strict` only when intentionally validating docs against TypeScript errors.
- Local AI-context docs should use local source links.
- Public docs should use GitHub source links.
```

---

## README injection section

Add this to your project README if useful:

```md
## TypeDoc Hybrid Source Links

This repo uses `typedoc-hybrid-source-links` to generate source links appropriate for local and public documentation.

Common commands:

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
npm run typedoc:json:github
npm run typedoc:html:github
```

Local docs open source files in VS Code. Public docs open source files in GitHub.
```

---

## Recommended configs

### Base `typedoc.json`

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "tsconfig": "./tsconfig.doc.json",
  "entryPoints": ["src/index.ts"],
  "entryPointStrategy": "expand",
  "skipErrorChecking": true,
  "validation": {
    "notExported": false,
    "invalidLink": false
  },
  "exclude": [
    "**/__tests__/**",
    "**/__mocks__/**",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/node_modules/**"
  ],
  "out": "docs/api",
  "name": "API Documentation",
  "disableSources": false
}
```

### Strict config

Use `typedoc-strict.json` for intentional strict docs validation:

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "tsconfig": "./tsconfig.doc.json",
  "entryPoints": ["src/index.ts"],
  "entryPointStrategy": "expand",
  "skipErrorChecking": false,
  "out": "docs/api-strict",
  "name": "Strict API Documentation"
}
```

---

## Development

Run smoke validation:

```bash
npm run smoke
```

Run syntax checks manually:

```bash
node --check scripts/typedoc-source-config.mjs
node --check scripts/typedoc-source-link-doctor.mjs
node --check scripts/typedoc-tool-health.mjs
node --check scripts/ai/typedoc-local-source-check.mjs
```

---

## Roadmap

Possible future enhancements:

- package presets for library vs app repos,
- built-in GitHub Actions workflow,
- generated badge/report for docs health,
- source-link audit output as Markdown,
- TypeDoc config migration assistant,
- strict/local/CI policy matrix.

---

## Sources and references

Public references used for this README:

- TypeDoc official docs — TypeDoc converts comments in TypeScript source into HTML documentation or a JSON model.
- TypeDoc official docs — `entryPointStrategy: "expand"` can document app-style projects file-by-file.
- TypeDoc official docs — `sourceLinkTemplate` supports `{path}`, `{line}`, and `{gitRevision}` placeholders.
- TypeDoc official docs — `gitRevision` and `gitRemote` affect source linking behavior.
- Local validation logs from toolkit development — `typedoc:health`, `typedoc:doctor`, generated config creation, and local source-link checks.

---

## License

MIT. See [LICENSE](LICENSE).
