# TypeDoc Hybrid Source Links

**Local source links for AI work. GitHub source links for public docs.**

TypeDoc Hybrid Source Links solves a practical documentation problem in modern TypeScript projects:

- local AI and developer workflows need **machine-local source links** such as `vscode://file/...`,
- public documentation needs **shareable GitHub blob links**,
- and TypeDoc often needs help on Vite / React / TypeScript repos where tsconfig references and entrypoint handling can break documentation generation.

This package installs a hybrid TypeDoc workflow with health checks, local-link validation, GitHub-link generation, and the v1.0.9 entrypoint fix that preserves explicit entrypoint globs.

![Precision workflow diagram](docs/assets/precision-workflow-diagram.png)

---

## Why teams install this

In real projects, TypeDoc can fail in subtle ways:

- local docs accidentally point to GitHub URLs,
- public docs accidentally point to `vscode://file` paths,
- generated JSON is stale or missing,
- entry points are rewritten into broken bare folders,
- Vite/React/TS repos with tsconfig references fail to resolve entry points,
- and local documentation becomes unusable as AI context.

This package fixes those problems by separating **local mode** from **GitHub mode** and validating the result.

---

## Before vs after

![Benchmark and before/after benefits](docs/assets/codex-windows-tested-benchmark.png)

| Without this package | With this package |
|---|---|
| Local docs may leak GitHub blob links. | Local mode validates local source links and checks for GitHub blob leakage. |
| Public docs may accidentally point to local machine paths. | GitHub mode emits public GitHub blob links suitable for shared docs. |
| TypeDoc entry points may break on referenced tsconfigs. | v1.0.9 preserves explicit globs and uses `entryPointStrategy: "expand"`. |
| Config generation can silently rewrite correct globs into broken folders. | Explicit config entry points stay intact. |
| Documentation issues are discovered late. | `typedoc:health`, `typedoc:json:local`, and `typedoc:check-local` catch them early. |
| AI agents may work from stale or missing docs. | Fresh local JSON becomes part of the anti-drift workflow. |

---

## Evidence-backed validation snapshot

Latest live validation on `mtll-meta-control-vercel` after the v1.0.9 entrypoint fix produced:

| Metric | Observed result |
|---|---:|
| TypeDoc local source URLs | `1,527` |
| GitHub blob links in local mode | `0` |
| Entrypoint strategy | `expand` |
| Fallback used | `false` |
| Preserved entrypoint globs | `src/**/*.ts`, `src/**/*.tsx`, `api/**/*.ts`, `api/**/*.tsx`, `scripts/**/*.mjs` |
| Graph nodes when paired with AI toolkit | `2,541` |
| Graph leak count when paired with AI toolkit | `0` |

The key evidence is that the generated config preserved the intended explicit globs and no longer fell back to broken directory-only entry points.

---

## Companion package

For the complete tested workflow, install this with **AI Code Intelligence Toolkit**.

```powershell
npm install -D typedoc typedoc-hybrid-source-links@latest ai-code-intelligence-toolkit@latest
npx typedoc-hybrid-install --target . --overwrite
npx ai-code-intel-install --target . --overwrite --strict
npm run ai:history:init
npm run ai:inject-contract
```

### Package roles

- **`typedoc-hybrid-source-links`** handles TypeDoc config generation, local/GitHub source link modes, and TypeDoc health checks.
- **`ai-code-intelligence-toolkit`** adds the anti-drift workflow, code graph, durable changelog memory, and smart validation memory.

---

## What gets installed

```text
scripts/typedoc-source-config.mjs
scripts/typedoc-source-link-doctor.mjs
scripts/typedoc-tool-health.mjs
scripts/typedoc-strict-runner.mjs
scripts/ai/typedoc-local-source-check.mjs
typedoc.json
typedoc-frontend.json
typedoc-ci.json
typedoc-strict.json
tsconfig.doc.json
types/typedoc-local-shims.d.ts
```

It also appends a managed documentation block to `AGENTS.md` and `README.md`.

---

## Source-link modes

### Local mode

Local mode is designed for AI agents and local developer navigation.

Typical source-link shape:

```text
vscode://file/<absolute-local-repo-path>/{path}:{line}
```

Use local mode for:

- AI code navigation,
- code review on your machine,
- local TypeDoc JSON as AI context,
- Windows developer workflows,
- and repository-internal documentation.

### GitHub mode

GitHub mode is designed for public or shared documentation.

Typical source-link shape:

```text
https://github.com/<owner>/<repo>/blob/<revision>/{path}#L{line}
```

Use GitHub mode for:

- public docs,
- GitHub Pages,
- client-facing documentation,
- and any docs that need to be opened outside your local machine.

---

## Commands

| Purpose | Command |
|---|---|
| Generate local config | `npm run typedoc:config:local` |
| Generate GitHub config | `npm run typedoc:config:github` |
| Generate local JSON | `npm run typedoc:json:local` |
| Generate GitHub JSON | `npm run typedoc:json:github` |
| Generate local HTML | `npm run typedoc:html:local` |
| Generate GitHub HTML | `npm run typedoc:html:github` |
| Health check | `npm run typedoc:health` |
| Local link check | `npm run typedoc:check-local` |
| Strict runner | `npm run typedoc:strict` |
| Final TypeDoc health | `npm run typedoc:final-health` |

---

## v1.0.9 entrypoint fix

The most important v1.0.9 change is the entrypoint preservation fix.

### Correct generated shape

```json
{
  "entryPoints": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "api/**/*.ts",
    "api/**/*.tsx",
    "scripts/**/*.mjs"
  ],
  "entryPointStrategy": "expand",
  "tsconfig": "tsconfig.doc.json"
}
```

### Old broken shape

```json
{
  "entryPoints": ["src", "scripts", "mcp"]
}
```

The old broken shape caused TypeDoc to fail with:

```text
Unable to find any entry points.
```

The v1.0.9 fix ensures explicit globs are preserved instead of being downgraded into folder fallbacks.

---

## Quick start

### 1. Install

```powershell
npm install -D typedoc typedoc-hybrid-source-links@latest
npx typedoc-hybrid-install --target . --overwrite
```

### 2. Generate local AI-friendly JSON

```powershell
npm run typedoc:json:local
npm run typedoc:check-local
```

### 3. Generate public GitHub docs

```powershell
npm run typedoc:html:github
```

---

## Example workflows

### Example 1 — verify local mode

```powershell
Remove-Item -Force typedoc-api.json, typedoc.local.generated.json -ErrorAction SilentlyContinue
npm run typedoc:json:local
npm run typedoc:check-local
```

Pass conditions:

```text
typedoc-api.json exists
sourceUrlCount > 0
githubBlobSourceUrlCount = 0
placeholderSourceUrlCount = 0
```

### Example 2 — generate public docs

```powershell
npm run typedoc:html:github
```

### Example 3 — final TypeDoc health gate

```powershell
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
```

---

## Recommended workflow with AI Code Intelligence Toolkit

Before AI coding work:

```powershell
npm run ai:history:status
npm run typedoc:json:local && npm run ai:graph:build
npm run ai:spec -- "<task>"
npm run ai:preflight -- "<task>"
npm run ai:graph:query -- "<specific symbol/file/error/feature>"
```

This ensures the TypeDoc JSON is fresh before the agent starts navigating code.

---

## PowerShell context rule for agents

When paired with AI Code Intelligence Toolkit, agents should use bounded reads:

```powershell
Select-String -Path "AI_GROUND_TRUTH.md","AI_SYMBOL_INDEX.json" -Pattern "typedoc" -SimpleMatch -Context 4,8
Select-String -Path "scripts/typedoc-source-config.mjs" -Pattern "entryPointStrategy" -SimpleMatch -Context 40,60
```

Avoid broad `Get-Content` dumps and broad `rg` as the first navigation move.

---

## Expected warnings vs blockers

### Usually acceptable warnings

- `api/**/*.tsx` does not match files because the project has no TSX API files.
- TypeDoc warns that some referenced internal types are not included in the docs.

### Real blockers

- `Unable to find any entry points.`
- `typedoc-api.json` is missing after `npm run typedoc:json:local`.
- Local mode reports `githubBlobSourceUrlCount > 0`.
- Public docs use local `vscode://file` links.
- Generated config loses `entryPointStrategy: "expand"`.

---

## Final health

Use this before shipping docs changes:

```powershell
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
```

When paired with AI Code Intelligence Toolkit, you can also use:

```powershell
npm run ai:final-health
```

---

## Benchmarked outcome in plain English

With this package, local documentation becomes useful as AI context and public documentation stays safe for sharing. The practical benefit is not theoretical: the validated run showed fresh local JSON, zero GitHub blob leaks in local mode, and preserved explicit entrypoint globs in a real project.

---

## License

MIT
