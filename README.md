# TypeDoc Hybrid Source Links

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeDoc](https://img.shields.io/badge/TypeDoc-sourceLinkTemplate-blue.svg)](https://typedoc.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green.svg)](https://nodejs.org/)
[![AI Docs](https://img.shields.io/badge/AI%20Docs-local%20%2B%20GitHub%20links-teal)](#why-this-exists)

**TypeDoc Hybrid Source Links** is a reusable TypeDoc helper toolkit for **local VS Code source links**, **GitHub blob source links**, **AI-agent TypeDoc JSON**, and **documentation health checks**.

It solves a common documentation problem:

> Local developers need docs links that open in VS Code. Public docs need links that open in GitHub.

---

## SEO keywords / problems this solves

This project is built for developers searching for:

- TypeDoc sourceLinkTemplate
- TypeDoc GitHub source links
- TypeDoc VS Code file links
- TypeDoc local source links
- TypeDoc JSON for AI agents
- AI coding agent documentation context
- TypeScript API documentation
- TypeDoc config generator
- TypeDoc health check
- GitHub Pages TypeDoc source links
- local docs open in VS Code
- public docs open in GitHub
- Codex TypeDoc context
- Claude Code TypeDoc context
- Cursor TypeDoc docs

---

## Companion prerequisite: AI Code Intelligence Toolkit

For the **complete validated AI-agent workflow**, install this toolkit together with:

```txt
ai-code-intelligence-toolkit
```

This repository focuses on:

```txt
TypeDoc local VS Code source links
GitHub blob source links
typedoc:health
typedoc:doctor
typedoc:check-local
AI-context-safe TypeDoc JSON
```

The companion repository focuses on:

```txt
GraphRAG/code graph
smart ai:preflight routing
ai:spec
graph doctor
generated-file leak checks
MCP-ready code intelligence
```

| Setup | Supported? | Notes |
|---|---:|---|
| `typedoc-hybrid-source-links` only | Yes | Local/GitHub TypeDoc source links work independently. |
| `ai-code-intelligence-toolkit` only | Yes | AI graph/preflight tooling works; TypeDoc commands need compatible TypeDoc tooling. |
| Both together | **Recommended** | This is the full benchmarked workflow shown below. |

Install both:

```bash
npm install --save-dev typedoc-hybrid-source-links ai-code-intelligence-toolkit typedoc
npx typedoc-hybrid-install --target . --overwrite
npx ai-code-intel-install --target . --overwrite
```

---

## Benchmark images

The images below are intentionally embedded with **relative paths**, not `https://github.com/.../blob/main/...` URLs.

Why? Because hardcoded GitHub blob URLs break when:

- the file is not committed yet,
- the default branch is not `main`,
- the repo is forked,
- the asset filename differs,
- GitHub cache has not refreshed.

Put the PNGs here:

```txt
docs/assets/repo-performance-benchmark-before-vs-after.png
docs/assets/repo-comparison-and-ecosystem-analysis.png
```

Then this README will render correctly on GitHub.

### Before vs After: Repo A + Repo B workflow benchmark

![Before vs After: Repo A + Repo B Benchmark](docs/assets/repo-performance-benchmark-before-vs-after.png)

### Public comparison with popular coding-agent ecosystems

![Repo A + Repo B vs Popular Coding-Agent Ecosystems](docs/assets/repo-comparison-and-ecosystem-analysis.png)

> These images summarize local validation logs and public TypeDoc/model/tool sources. They are workflow benchmarks, not universal model-IQ benchmarks.

---

## Why this exists

TypeDoc can generate documentation and source links, but most teams need different source-link behavior in different environments:

| Environment | Desired behavior |
|---|---|
| Local development | Click docs source links and open files in VS Code. |
| AI-agent worktree | Let Codex, Claude Code, Cursor, Cline, or RooCode inspect local files precisely. |
| GitHub Pages / CI docs | Click docs source links and open files in GitHub. |
| Public documentation | Avoid local machine paths and use stable browser links. |

This toolkit generates separate configs for each mode instead of forcing one link strategy everywhere.

---

## What it installs

```txt
scripts/typedoc-source-config.mjs
scripts/typedoc-source-link-doctor.mjs
scripts/typedoc-tool-health.mjs
scripts/ai/typedoc-local-source-check.mjs
typedoc.json
typedoc-frontend.json
typedoc-ci.json
typedoc-strict.json
tsconfig.doc.json
```

---

## Install

### From npm after publishing

```bash
npm install --save-dev typedoc-hybrid-source-links typedoc
npx typedoc-hybrid-install --target . --overwrite
```

### From source

```bash
git clone https://github.com/xraisen/typedoc-hybrid-source-links.git
cd typedoc-hybrid-source-links
node bin/install.mjs --target /path/to/your/repo --overwrite
```

---

## Main commands

```bash
npm run typedoc:health
npm run typedoc:doctor
npm run typedoc:json:local
npm run typedoc:check-local
npm run typedoc:json:github
npm run typedoc:html:github
npm run typedoc:strict
```

---

## Local mode

Generate TypeDoc JSON with local VS Code links:

```bash
npm run typedoc:json:local
npm run typedoc:check-local
```

Expected link style:

```txt
vscode://file/<absolute-local-repo-path>/{path}:{line}
```

Use this for:

```txt
local development
Codex worktrees
Claude Code local work
Cursor local work
Cline/RooCode context
AI docs inspection
```

---

## GitHub mode

Generate TypeDoc JSON or HTML with GitHub blob links:

```bash
npm run typedoc:json:github
npm run typedoc:html:github
```

Expected link style:

```txt
https://github.com/<owner>/<repo>/blob/<revision>/{path}#L{line}
```

If auto-detection fails:

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

## Health check

```bash
npm run typedoc:health
npm run typedoc:doctor
```

Expected output shape:

```json
{
  "ok": true,
  "toolchain": "typedoc-hybrid-source-links",
  "generated": [
    "typedoc.local.generated.json",
    "typedoc.github.generated.json",
    "typedoc-frontend.local.generated.json",
    "typedoc-frontend.github.generated.json"
  ],
  "errors": [],
  "warnings": []
}
```

---

## Validation benchmark

The following numbers come from real local validation logs captured during development on a large TypeScript/React/Supabase repository.

### Before

| Signal | Observed issue |
|---|---|
| TypeDoc docs generation | Failed when scanning too broadly with strict TypeScript checking. |
| Error output | 83 TypeScript errors and 114 warnings. |
| Source-link strategy | One placeholder GitHub link could not satisfy both local and public docs. |
| TypeDoc health | No standalone `typedoc:health` confirmation. |
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
- Do not hardcode GitHub `blob/main` image links in README files when relative paths will work.
- Do not commit generated local configs unless the repo policy explicitly allows it.
- Use `typedoc:strict` only when intentionally validating docs against TypeScript errors.
- Local AI-context docs should use local source links.
- Public docs should use GitHub source links.
```

---

## Suggested GitHub About metadata

Use this description:

```txt
Hybrid TypeDoc source-link generator for local VS Code links, GitHub blob links, AI-agent docs context, and TypeDoc health checks.
```

Suggested GitHub topics:

```txt
typedoc
typedoc-plugin
sourceLinkTemplate
typescript
documentation
api-docs
github-pages
vscode
ai-coding-agent
codex
claude-code
cursor
cline
developer-tools
```

---

## Why this is evidence-backed

TypeDoc officially supports:

- documenting TypeScript entry points,
- `entryPointStrategy: "expand"` for recursively expanding directories into entry points,
- HTML and JSON output,
- `sourceLinkTemplate`,
- `{path}`, `{line}`, and `{gitRevision}` placeholders,
- `gitRevision` and `gitRemote` source-link behavior.

This toolkit wraps those official TypeDoc features into a repeatable local/GitHub workflow.

---

## Sources

- [TypeDoc Input Options](https://typedoc.org/documents/Options.Input.html)
- [TypeDoc Output Options](https://typedoc.org/documents/Options.Output.html)
- [TypeDoc Overview](https://typedoc.org/documents/Overview.html)
- [OpenAI — Introducing Codex](https://openai.com/index/introducing-codex/)
- [Anthropic — Claude SWE-bench Performance](https://www.anthropic.com/engineering/swe-bench-sonnet/)
- [Cursor Pricing](https://cursor.com/pricing)
- [Kimi API Platform — Kimi K2.5 in programming tools](https://platform.moonshot.ai/docs/guide/agent-support.en-US)

---

## License

MIT. See [LICENSE](LICENSE).
