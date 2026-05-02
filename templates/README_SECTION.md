## TypeDoc Hybrid Source Links

Hybrid TypeDoc source links for local VS Code navigation, AI-readable TypeDoc JSON, and public GitHub docs.

### Required companion link

For the complete tested workflow, install this with AI Code Intelligence Toolkit:

- TypeDoc Hybrid Source Links: https://github.com/xraisen/typedoc-hybrid-source-links
- AI Code Intelligence Toolkit: https://github.com/xraisen/ai-code-intelligence-toolkit

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

### Companion anti-drift loop

```bash
npm run typedoc:json:local && npm run ai:graph:build
npm run ai:spec -- "<task>"
npm run ai:graph:query -- "<specific symbol/file/error/feature>"
npm run ai:preflight -- "<task>"
```

Use `Select-String` for bounded PowerShell reads instead of broad `Get-Content` dumps or `rg` as the first navigation move.
