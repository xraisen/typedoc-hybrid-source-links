# TypeDoc Hybrid Source Links v1.0.6

## Fixes

- Raised package version to `1.0.6`.
- Preserved visible companion links in root README, installed README section, and AGENTS snippet.
- Preserved `npx --no-install typedoc` for TypeDoc CLI calls instead of internal TypeDoc binary paths.
- Added final health scripts for repeatable validation.
- Added false-positive-safe TypeDoc source-link inspection by collecting `source.url` values only.
- Documented empty-folder testing correctly: installer smoke can pass, but graph/doc health requires a real project.

## Final gate

```bash
npm run smoke
npm pack --dry-run
```

## Revised anti-drift workflow addendum

- Added companion AI Code Intelligence Toolkit anti-drift loop to README and installed snippets.
- Documented the `typedoc:json:local && ai:graph:build` refresh requirement for complete AI workflows.
- Documented targeted PowerShell `Select-String` context reads for bounded source navigation.
