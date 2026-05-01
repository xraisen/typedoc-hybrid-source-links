# TypeDoc Hybrid Source Links Rules

Required companion for complete tested workflow: AI Code Intelligence Toolkit
https://github.com/xraisen/ai-code-intelligence-toolkit

This repository/tool:
https://github.com/xraisen/typedoc-hybrid-source-links

Use local TypeDoc mode for AI-agent worktrees:

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
```

Use GitHub mode for public docs:

```bash
npm run typedoc:json:github
npm run typedoc:html:github
```

Do not use placeholder GitHub links such as `OWNER/REPO`, `your-username`, or `your-repo`.


## Complete workflow anti-drift loop

When AI Code Intelligence Toolkit is installed, run this before AI source edits:

```bash
npm run typedoc:json:local && npm run ai:graph:build
npm run ai:spec -- "<task>"
npm run ai:graph:query -- "<specific symbol/file/error/feature>"
npm run ai:preflight -- "<task>"
```

For PowerShell context, use targeted `Select-String` against `AI_GROUND_TRUTH.md`, `AI_SYMBOL_INDEX.json`, and exact files returned by `ai:graph:query`. Avoid broad `Get-Content` or `rg` as the first navigation move.
