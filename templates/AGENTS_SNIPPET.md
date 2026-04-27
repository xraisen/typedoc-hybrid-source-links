# TypeDoc Hybrid Source Links Rules

Use this workflow for local AI-context docs and public TypeDoc output:

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
npm run typedoc:html:github
```

Local mode must use `vscode://file/.../{path}:{line}`. GitHub mode must use `https://github.com/owner/repo/blob/revision/{path}#L{line}`.
