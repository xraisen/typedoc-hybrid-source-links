# TypeDoc Hybrid Source Links

Hybrid TypeDoc source-link generation for local development and public documentation.

**Local docs open in VS Code. Public docs open in GitHub.**

## Features

- Local and GitHub TypeDoc config generation.
- TypeDoc health check that validates configs and helper scripts without requiring a full docs build.
- Local output validator that blocks placeholder or GitHub blob links in local AI context.
- Strict TypeDoc mode kept separate from tolerant AI-context docs generation.
- Installer that merges scripts and appends docs to `README.md` / `AGENTS.md`.

## Install into another repo

```bash
node bin/install.mjs --target /path/to/your/repo --overwrite
```

After publishing:

```bash
npm install --save-dev typedoc-hybrid-source-links
npx typedoc-hybrid-install --target . --overwrite
```

## Commands installed

```bash
npm run typedoc:health
npm run typedoc:doctor
npm run typedoc:json:local
npm run typedoc:json:github
npm run typedoc:html:local
npm run typedoc:html:github
npm run typedoc:check-local
npm run typedoc:strict
```

## Smoke test

```bash
npm run smoke
```

## License

MIT
# typedoc-hybrid-source-links
