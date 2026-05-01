<<<<<<< HEAD
# Validation Report v1.0.6 revised

## Result

PASS for package-level validation performed in this environment.

## TypeDoc Hybrid Source Links checks

- Manual `node --check` passed for all package `.mjs` files.
- README and installed snippets include the complete companion anti-drift loop with AI Code Intelligence Toolkit.
- PowerShell `Select-String` bounded context rule is documented for complete AI workflows.
- `.tgz` package artifact was recreated with standard `package/` tarball prefix.

## Scope note

This is package-health validation. A target project still needs its own final TypeDoc gate after install:

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
```
=======
# TypeDoc Hybrid Source Links Validation Report

Validated release target: v1.0.5

## Required companion links

- AI Code Intelligence Toolkit: https://github.com/xraisen/ai-code-intelligence-toolkit
- TypeDoc Hybrid Source Links: https://github.com/xraisen/typedoc-hybrid-source-links

## Required final health gate

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
npm run ai:graph:build
npm run ai:graph:doctor
npm run ai:graph:check-leaks
```

## Result required for release

All commands must return `ok: true`, `typedoc:check-local` must have no errors, and `ai:graph:check-leaks` must report `leakCount: 0`.
>>>>>>> 72196d993232b46d868785549bda56f5473ab2e8
