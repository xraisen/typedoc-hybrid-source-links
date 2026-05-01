# TypeDoc Hybrid Source Links

> **Required companion for the complete tested workflow:** [AI Code Intelligence Toolkit](https://github.com/xraisen/ai-code-intelligence-toolkit)  
> **This repository:** [TypeDoc Hybrid Source Links](https://github.com/xraisen/typedoc-hybrid-source-links)

<<<<<<< HEAD
For the complete tested workflow, install both tools:

```bash
npm install --save-dev typedoc-hybrid-source-links ai-code-intelligence-toolkit typedoc
=======
**Required companion links:**

```txt
TypeDoc Hybrid Source Links: https://github.com/xraisen/typedoc-hybrid-source-links
AI Code Intelligence Toolkit: https://github.com/xraisen/ai-code-intelligence-toolkit
```

Install the complete tested workflow:

```bash
npm install --save-dev ai-code-intelligence-toolkit typedoc-hybrid-source-links typedoc
>>>>>>> 72196d993232b46d868785549bda56f5473ab2e8
npx typedoc-hybrid-install --target . --overwrite
npx ai-code-intel-install --target . --overwrite
```

<<<<<<< HEAD
Run the TypeDoc gate after install:
=======
Run the final health gate:
>>>>>>> 72196d993232b46d868785549bda56f5473ab2e8

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
<<<<<<< HEAD
npm run typedoc:html:github
=======
npm run ai:graph:build
npm run ai:graph:doctor
npm run ai:graph:check-leaks
>>>>>>> 72196d993232b46d868785549bda56f5473ab2e8
```

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeDoc](https://img.shields.io/badge/TypeDoc-sourceLinkTemplate-blue.svg)](https://typedoc.org/)
[![Tested Workflow](https://img.shields.io/badge/tested-Codex%20CLI%20%2B%20Windows%20app-111827)](#tested-environment)

**TypeDoc Hybrid Source Links** makes TypeDoc documentation useful for both local AI coding workflows and public documentation. It generates local VS Code source links for developer machines and GitHub blob links for browser-based docs.

It is the companion documentation layer for **AI Code Intelligence Toolkit**.

It is **not** a token-saving product. Any token or cost reduction is only a side effect of better source precision and fewer irrelevant files being pulled into an assistant workflow.

---

<<<<<<< HEAD
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

=======
>>>>>>> 72196d993232b46d868785549bda56f5473ab2e8
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

<<<<<<< HEAD
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
=======
## Benchmark: unstructured AI coding vs guarded Codex-compatible workflow

This benchmark compares two workflows:

| Workflow | Meaning |
|---|---|
| **Without these tools** | A developer or vibe coder asks an AI assistant to inspect, search, or fix a repository without a graph, task preflight, generated-file leak check, or TypeDoc source-link health check. The practical risk surface is the repo surface the assistant may inspect or patch. |
| **With AI Code Intelligence Toolkit + TypeDoc Hybrid Source Links** | A developer runs a Codex-compatible workflow with `AGENTS.md`, `ai:spec`, `ai:preflight`, a local graph, graph doctor, leak checker, and TypeDoc health checks before patching. |

This is a **workflow benchmark**, not a model benchmark. It does not claim to make Codex, Claude, Cursor, Cline, RooCode, Kimi, or any assistant smarter. It measures scope control, graph health, leak detection, and documentation-link health around an assistant.

### Tested environment

The workflow has been tested only with:

```txt
Codex CLI
Codex Windows app workflow
Windows repository worktree
Node.js >= 20
```

Other AI assistants may use the same npm scripts because they are plain Node.js commands, but this README does **not** claim they are tested.

### Real local validation result

| Metric | Without these tools | With these tools | Result |
|---|---:|---:|---:|
| Patch boundary | No deterministic patch boundary | 6 GraphRAG files / 11 TypeDoc files | Fixed |
| Repo surface exposed to the task | Up to 723 indexed files | 6–11 allowed patch files | 98.48%–99.17% narrower patch surface |
| Graph build | Unreliable / timeout-prone baseline | 1.378s, `timedOut: false` | Fast and repeatable |
| Graph doctor | Previously unhealthy | `ok: true` | Pass |
| Generated-file leaks | 1 leak | 0 leaks | 100% leak reduction |
| TypeDoc health | Unconfirmed | `ok: true` | Pass |
| TypeDoc doctor | Unconfirmed | `ok: true` | Pass |
| Workflow smoke gates | No structured health gate | 8/8 passed | 100% workflow pass for tested gates |
| Files processed by graph | — | 723 | Measured |
| Source files indexed | — | 466 | Measured |
| Graph nodes | — | 5,320 | Measured |
| Graph edges | — | 15,745 | Measured |

### File-surface exposure model

The validation run did not record raw token telemetry. Instead, this project reports **file-surface exposure**, which is the safest way to explain why token and cost waste may drop as a side effect.

```txt
GraphRAG task:
  Without the tools: 723-file repo surface
  With the tools: 6 allowed patch files
  Surface reduction: 1 - (6 / 723) = 99.17%
  Unstructured workflow exposes 120.50x more file surface

TypeDoc task:
  Without the tools: 723-file repo surface
  With the tools: 11 allowed patch files
  Surface reduction: 1 - (11 / 723) = 98.48%
  Unstructured workflow exposes 65.73x more file surface

Average of the two tested scopes:
  Average allowed patch files: 8.5
  Average surface reduction: 1 - (8.5 / 723) = 98.82%
  Unstructured workflow exposes 85.06x more file surface
```

### Token and cost honesty

This is **not** sold as a token-saving or money-saving tool.

The primary purpose is precision:

```txt
better file targeting
smaller patch boundaries
less wrong-file drift
health checks before patching
local graph-based repo understanding
TypeDoc links that point to the right source location
```

Lower token or cost exposure can happen as a side effect when an assistant reads fewer irrelevant files. But exact token or billing savings require real telemetry from the assistant session: input tokens, cached input tokens, output tokens, files read, and files patched.

### Drift and workflow accuracy

Measured workflow accuracy in the validation run:

| Gate | Result |
|---|---:|
| `typedoc:health` | Pass |
| `typedoc:doctor` | Pass |
| GraphRAG smart preflight route | Pass |
| TypeDoc smart preflight route | Pass |
| `ai:graph:build` | Pass |
| `ai:graph:doctor` | Pass |
| `ai:graph:check-leaks` | Pass |
| `ai:spec` smoke test | Pass |

```txt
8 / 8 workflow gates passed = 100% workflow pass rate for the tested gates.
Generated-file graph leaks: 1 → 0 = 100% leak reduction.
Patch drift surface: 98.48%–99.17% narrower than the 723-file indexed surface.
```

For true code-correctness accuracy, use a separate labeled benchmark with real tasks, expected files, expected tests, human review, and pass/fail outcomes.


---

## Recommended AGENTS.md instruction

Add this to your repo’s `AGENTS.md`:

```md
## TypeDoc Hybrid Source Links

Use local TypeDoc mode for AI-agent worktrees:

npm run typedoc:json:local
npm run typedoc:check-local

Use GitHub mode for public docs:

npm run typedoc:json:github
npm run typedoc:html:github

Before editing TypeDoc tooling, run:

npm run typedoc:health
npm run typedoc:doctor

Do not use placeholder GitHub links such as your-username/your-repo.
Do not hardcode GitHub blob/main image links when relative paths work.
>>>>>>> 72196d993232b46d868785549bda56f5473ab2e8
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

<<<<<<< HEAD
This package is an independent developer workflow package. It is not affiliated with, endorsed by, or certified by TypeDoc, OpenAI, GitHub, Microsoft, or any other vendor referenced in examples.
=======
See [TRADEMARKS.md](TRADEMARKS.md). This project is independently maintained and is not owned by or affiliated with OpenAI, Codex, TypeDoc, Microsoft, GitHub, Anthropic, Cursor, Trae, Kimi, Cline, RooCode, or any related vendor.

No vendor logos are shipped.

---

## License

MIT.
>>>>>>> 72196d993232b46d868785549bda56f5473ab2e8
