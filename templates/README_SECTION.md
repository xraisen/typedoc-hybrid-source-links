## TypeDoc Hybrid Source Links

Hybrid TypeDoc source links for local VS Code navigation, AI-readable TypeDoc JSON, and public GitHub docs.

### Required companion link

For the complete tested workflow, install this with **AI Code Intelligence Toolkit**:

```txt
TypeDoc Hybrid Source Links: https://github.com/xraisen/typedoc-hybrid-source-links
AI Code Intelligence Toolkit: https://github.com/xraisen/ai-code-intelligence-toolkit
```

```bash
npm install --save-dev typedoc-hybrid-source-links ai-code-intelligence-toolkit typedoc
npx typedoc-hybrid-install --target . --overwrite
npx ai-code-intel-install --target . --overwrite
```

### TypeDoc health gate

```bash
npm run typedoc:health
npm run typedoc:json:local
npm run typedoc:check-local
npm run typedoc:html:github
```

### Link behavior

```txt
Local mode:  vscode://file/<absolute-local-repo-path>/{path}:{line}
GitHub mode: https://github.com/<owner>/<repo>/blob/<revision>/{path}#L{line}
```


### Complete AI anti-drift loop

When AI Code Intelligence Toolkit is installed too:

```bash
npm run typedoc:json:local && npm run ai:graph:build
npm run ai:spec -- "<task>"
npm run ai:graph:query -- "<specific symbol/file/error/feature>"
npm run ai:preflight -- "<task>"
```

Use targeted PowerShell `Select-String` for bounded context instead of broad first-pass `Get-Content` or `rg` searches.
