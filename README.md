# TypeDoc Hybrid Source Links

**TypeDoc Hybrid Source Links** installs a repo-local TypeDoc workflow that can generate source links for two different audiences:

1. **Local AI/coder navigation** using `vscode://file/...` links.
2. **Public documentation** using GitHub `blob` links.

It is designed to work as the documentation/source-link companion for **AI Code Intelligence Toolkit**.

---

## Package

```bash
npm install --save-dev typedoc-hybrid-source-links typedoc
```

Install into a repo:

```bash
npx typedoc-hybrid-install --target . --overwrite
```

Recommended complete install:

```bash
npm install --save-dev typedoc-hybrid-source-links ai-code-intelligence-toolkit typedoc
npx typedoc-hybrid-install --target . --overwrite
npx ai-code-intel-install --target . --overwrite --strict
```

Check latest version:

```bash
npm view typedoc-hybrid-source-links version
npm ls typedoc-hybrid-source-links
```

Expected latest release:

```txt
1.0.9
```

---

## Companion package

Recommended companion:

- **AI Code Intelligence Toolkit**
- NPM package: `ai-code-intelligence-toolkit`
- GitHub repository: `https://github.com/xraisen/ai-code-intelligence-toolkit`

Install both:

```bash
npm install --save-dev typedoc-hybrid-source-links ai-code-intelligence-toolkit typedoc
```

---

## What it installs

```txt
typedoc.json
typedoc-frontend.json
typedoc-ci.json
typedoc-strict.json
tsconfig.doc.json
types/typedoc-local-shims.d.ts
scripts/typedoc-source-config.mjs
scripts/typedoc-source-link-doctor.mjs
scripts/typedoc-tool-health.mjs
scripts/typedoc-strict-runner.mjs
scripts/ai/typedoc-local-source-check.mjs
```

It also injects a TypeDoc usage section into:

```txt
AGENTS.md
README.md
```

---

## Main commands

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
npm run typedoc:html:github
npm run typedoc:strict
```

---

## Local vs GitHub mode

### Local mode

Local mode is for AI coding agents and developers working on the machine.

It generates links like:

```txt
vscode://file/<absolute-local-repo-path>/{path}:{line}
```

Use:

```bash
npm run typedoc:json:local
npm run typedoc:check-local
```

### GitHub mode

GitHub mode is for public docs.

It generates links like:

```txt
https://github.com/<owner>/<repo>/blob/<revision>/{path}#L{line}
```

Use:

```bash
npm run typedoc:html:github
```

---

## Why hybrid links matter

| Need | Best link mode |
|---|---|
| AI agent needs exact local file context | Local `vscode://file` |
| Developer is navigating in VS Code | Local `vscode://file` |
| README/docs are published publicly | GitHub `blob` |
| CI publishes documentation | GitHub `blob` |
| Local docs should not leak GitHub blob URLs | Local mode + check-local |

---

## v1.0.9 TypeDoc entrypoint fix

v1.0.9 preserves explicit glob entry points and uses `entryPointStrategy: "expand"`.

Generated config keeps this shape:

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

This fixes Vite/React/TypeScript projects where TypeDoc fails with:

```txt
The entry point ./src is not referenced by the 'files' or 'include' option in your tsconfig
Unable to find any entry points
```

---

## Recommended `tsconfig.doc.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "skipLibCheck": true,
    "noEmit": true,
    "allowJs": true,
    "checkJs": false,
    "jsx": "react-jsx",
    "types": ["node"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "api/**/*.ts",
    "api/**/*.tsx",
    "scripts/**/*.ts",
    "scripts/**/*.mts",
    "scripts/**/*.mjs",
    "types/**/*.d.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "docs/api-local",
    "docs/api",
    ".ai",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx"
  ]
}
```

---

## Validation workflow

After install:

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
```

Expected successful local generation:

```txt
typedoc-api.json created
typedoc.local.generated.json created
sourceUrlCount > 0
githubBlobSourceUrlCount = 0
```

---

## Use-case examples

### 1. Generate AI-readable local docs

```bash
npm run typedoc:json:local
npm run typedoc:check-local
```

Use this before AI code navigation so source links point to local VS Code files instead of public GitHub URLs.

### 2. Generate public GitHub docs

```bash
npm run typedoc:html:github
```

Use this for published docs where readers should click through to GitHub source lines.

### 3. Verify local docs are not leaking GitHub links

```bash
npm run typedoc:check-local
```

Expected:

```json
{
  "ok": true,
  "githubBlobSourceUrlCount": 0
}
```

### 4. Run strict TypeDoc health

```bash
npm run typedoc:strict
```

Use strict checks before publishing docs or before relying on generated docs for AI navigation.

---

## Benchmark and validation snapshot

Real project validation on a Vite + React + TypeScript dashboard showed:

| Check | Result |
|---|---:|
| Package version | `1.0.9` |
| TypeDoc version | `0.28.x` |
| Entrypoint strategy | `expand` |
| Preserved glob entry points | yes |
| TypeDoc source URLs | 1527 |
| GitHub blob source URLs in local mode | 0 |
| Generated local docs JSON | yes |
| Graph doctor sees TypeDoc present | yes |

The benchmark is a validation snapshot, not a universal performance promise.

---

## Expected warnings

TypeDoc can emit non-fatal documentation warnings, such as:

```txt
The glob api/**/*.tsx did not match any files
SomeType is referenced by SomeFunction but not included in the documentation
```

These are not package failures if:

```txt
typedoc-api.json is generated
typedoc:check-local returns ok true
githubBlobSourceUrlCount is 0 in local mode
```

---

## Troubleshooting

### Error: Unable to find any entry points

Run:

```bash
npm run typedoc:config:local
```

Then inspect generated config:

```bash
cat typedoc.local.generated.json
```

It should include:

```json
{
  "entryPointStrategy": "expand",
  "entryPoints": ["src/**/*.ts", "src/**/*.tsx"]
}
```

If it falls back to bare folders like `src`, reinstall latest:

```bash
npm install --save-dev typedoc-hybrid-source-links@latest typedoc@latest
npx typedoc-hybrid-install --target . --overwrite
```

### Error: local docs contain GitHub blob URLs

Run:

```bash
npm run typedoc:json:local
npm run typedoc:check-local
```

Local mode should produce `vscode://file/...` source URLs only.

---

## Installed scripts

| Script | Purpose |
|---|---|
| `typedoc:health` | Checks TypeDoc toolchain files and generated config state |
| `typedoc:json:local` | Generates local AI-readable TypeDoc JSON |
| `typedoc:json:github` | Generates GitHub-source TypeDoc JSON |
| `typedoc:html:github` | Generates public GitHub-linked TypeDoc HTML |
| `typedoc:check-local` | Confirms local JSON does not contain GitHub blob source links |
| `typedoc:strict` | Runs stricter docs validation |
| `typedoc:links:local` | Alias for local link generation |
| `typedoc:links:github` | Alias for GitHub link generation |
| `typedoc:health:final` | Final TypeDoc health command |

---

## License

MIT
