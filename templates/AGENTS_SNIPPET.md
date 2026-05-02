# TypeDoc Hybrid Source Links Agent Contract

This repository uses **TypeDoc Hybrid Source Links** for local AI-readable TypeDoc JSON and public GitHub-linked documentation.

---

## Required install

```bash
npm install --save-dev typedoc-hybrid-source-links typedoc
npx typedoc-hybrid-install --target . --overwrite
```

Recommended full AI workflow install:

```bash
npm install --save-dev typedoc-hybrid-source-links ai-code-intelligence-toolkit typedoc
npx typedoc-hybrid-install --target . --overwrite
npx ai-code-intel-install --target . --overwrite --strict
```

---

## Link modes

### Local mode

Use local mode for AI coding agents and local developer navigation:

```bash
npm run typedoc:json:local
npm run typedoc:check-local
```

Expected source links:

```txt
vscode://file/<absolute-local-repo-path>/{path}:{line}
```

### GitHub mode

Use GitHub mode for public HTML docs:

```bash
npm run typedoc:html:github
```

Expected source links:

```txt
https://github.com/<owner>/<repo>/blob/<revision>/{path}#L{line}
```

---

## TypeDoc entrypoint contract

TypeDoc config must preserve glob entry points and use expand mode:

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

Do not rewrite glob entry points into bare folders such as:

```json
{
  "entryPoints": ["src", "scripts", "mcp"]
}
```

That can cause TypeDoc to fail in Vite/React/TypeScript projects with:

```txt
The entry point ./src is not referenced by the 'files' or 'include' option in your tsconfig
Unable to find any entry points
```

---

## Required validation

After install or config changes:

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
```

A healthy local result means:

```txt
typedoc-api.json exists
sourceUrlCount > 0
githubBlobSourceUrlCount = 0
```

---

## Expected non-fatal warnings

These may be acceptable:

```txt
The glob api/**/*.tsx did not match any files
SomeType is referenced by SomeFunction but not included in the documentation
```

They are not blockers if TypeDoc JSON is generated and `typedoc:check-local` passes.

---

## Generated files

Do not hand-edit generated output unless the task is specifically about generated docs:

```txt
typedoc-api.json
typedoc.local.generated.json
typedoc.github.generated.json
docs/api-local/
docs/api/
```

Regenerate through scripts.

---

## Useful commands

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:json:github
npm run typedoc:html:github
npm run typedoc:check-local
npm run typedoc:strict
npm run typedoc:health:final
```
