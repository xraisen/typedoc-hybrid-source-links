# TypeDoc Hybrid Source Links

**Local VS Code source links for AI context, GitHub source links for public documentation.**

TypeDoc Hybrid Source Links solves a practical documentation problem: AI coding agents need local source links they can follow on the developer machine, while public documentation should use GitHub blob links. This package generates TypeDoc configs for both modes and validates that local mode does not leak GitHub links.

![Precision workflow diagram](docs/assets/precision-workflow-diagram.png)

## Why this exists

TypeDoc source links are useful only when they point to the right place for the current job:

- Local AI/code-review workflows need `vscode://file/...` links.
- Public docs need `https://github.com/<owner>/<repo>/blob/<revision>/...` links.
- Vite/React/TypeScript projects often use tsconfig references that confuse TypeDoc entrypoint detection.
- Generated docs can silently become stale or point to the wrong source mode.

This tool installs a hybrid TypeDoc setup with health checks, local source-link checks, and fixed v1.0.9 entrypoint handling for real Vite/React/TypeScript projects.

## Companion package

For the complete tested workflow, install it with **AI Code Intelligence Toolkit**:

```powershell
npm install -D typedoc typedoc-hybrid-source-links@latest ai-code-intelligence-toolkit@latest
npx typedoc-hybrid-install --target . --overwrite
npx ai-code-intel-install --target . --overwrite --strict
npm run ai:history:init
npm run ai:inject-contract
```

## Before vs after

![Benchmark and before/after benefits](docs/assets/codex-windows-tested-benchmark.png)

| Without this package | With this package |
|---|---|
| Local docs may point to GitHub blob URLs. | Local mode uses `vscode://file/<absolute-local-path>/{path}:{line}`. |
| Public docs may point to local machine paths. | GitHub mode uses public GitHub blob URLs. |
| TypeDoc fails on Vite/TS projects with referenced tsconfigs. | v1.0.9 preserves glob entry points and uses `entryPointStrategy: "expand"`. |
| Entry points are rewritten into broken bare folders. | Explicit globs are preserved: `src/**/*.ts`, `src/**/*.tsx`, `api/**/*.ts`, `api/**/*.tsx`, `scripts/**/*.mjs`. |
| AI agents work from stale or missing TypeDoc JSON. | `typedoc:json:local` becomes part of the anti-drift loop. |
| Source-link mistakes are discovered late. | `typedoc:health` and `typedoc:check-local` catch them early. |

## Validated benchmark snapshot

Latest real-project validation after the v1.0.9 entrypoint fix:

| Metric | Result |
|---|---:|
| TypeDoc local source URLs | `1,527` |
| GitHub blob links in local mode | `0` |
| Entrypoint strategy | `expand` |
| Fallback used | `false` |
| Preserved entrypoint globs | `src/**/*.ts`, `src/**/*.tsx`, `api/**/*.ts`, `api/**/*.tsx`, `scripts/**/*.mjs` |
| Graph nodes when paired with AI toolkit | `2,541` |
| Graph leak count when paired with AI toolkit | `0` |

Documentation warnings about internal referenced types are not automatically blockers. A blocker is an entrypoint failure, missing `typedoc-api.json`, local mode using GitHub blob links, or public docs using local `vscode://file` links.

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

It also appends managed documentation sections to `AGENTS.md` and `README.md`.

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

## Source-link behavior

### Local mode

```text
vscode://file/<absolute-local-repo-path>/{path}:{line}
```

Use for:

- Codex CLI
- local AI agent navigation
- Windows developer workflows
- TypeDoc JSON used as code context

### GitHub mode

```text
https://github.com/<owner>/<repo>/blob/<revision>/{path}#L{line}
```

Use for:

- public documentation
- GitHub Pages
- shared docs outside your local machine
- client-facing API references

## v1.0.9 entrypoint fix

The v1.0.9 config generator preserves explicit glob entry points and keeps `entryPointStrategy: "expand"`.

Expected generated shape:

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

This prevents the old failure mode where config generation rewrote entry points into bare folders like:

```json
{
  "entryPoints": ["src", "scripts", "mcp"]
}
```

which caused TypeDoc to fail with:

```text
Unable to find any entry points.
```

## Recommended workflow with AI Code Intelligence Toolkit

Before AI coding work:

```powershell
npm run ai:history:status
npm run typedoc:json:local && npm run ai:graph:build
npm run ai:spec -- "<task>"
npm run ai:preflight -- "<task>"
npm run ai:graph:query -- "<specific symbol/file/error/feature>"
```

For TypeDoc-specific work:

```powershell
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
npm run typedoc:html:github
```

## Example: verify local mode

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

## Example: generate public docs

```powershell
npm run typedoc:html:github
```

Use GitHub mode for public docs because `vscode://file` links are local-machine specific and should not be published as public source links.

## PowerShell context rule for agents

When paired with AI Code Intelligence Toolkit, agents should use bounded reads:

```powershell
Select-String -Path "AI_GROUND_TRUTH.md","AI_SYMBOL_INDEX.json" -Pattern "typedoc" -SimpleMatch -Context 4,8
Select-String -Path "scripts/typedoc-source-config.mjs" -Pattern "entryPointStrategy" -SimpleMatch -Context 40,60
```

Avoid broad `Get-Content` dumps and broad `rg` as first-pass navigation.

## Expected warnings vs blockers

Warnings that may be acceptable:

- A glob like `api/**/*.tsx` does not match files because the project has no TSX API files.
- TypeDoc reports internal referenced types not included in documentation.

Blockers:

- `Unable to find any entry points`.
- `typedoc-api.json` is missing after `typedoc:json:local`.
- Local mode has `githubBlobSourceUrlCount > 0`.
- GitHub/public docs use local `vscode://file` links.
- Generated config loses `entryPointStrategy: "expand"`.

## Final health

```powershell
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
```

When used with AI Code Intelligence Toolkit:

```powershell
npm run ai:final-health
```

## License

MIT
