#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const arg = (n, f) => { const i = args.indexOf(n); return i >= 0 ? (args[i + 1] || f) : f; };
const target = path.resolve(arg("--target", "."));
const overwrite = args.includes("--overwrite");
const marker = "typedoc-hybrid-source-links";
function copy(rel) { const src = path.join(pkgRoot, "templates", rel); const dst = path.join(target, rel); fs.mkdirSync(path.dirname(dst), { recursive: true }); const existed = fs.existsSync(dst); if (!overwrite && existed) return { file: rel, action: "preserved" }; fs.copyFileSync(src, dst); return { file: rel, action: existed ? "overwritten" : "created" }; }
function readJson(f, d = {}) { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return d; } }
function writeJson(f, o) { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(o, null, 2) + "\n"); }
function readText(f, d = "") { try { return fs.readFileSync(f, "utf8"); } catch { return d; } }
function writeText(f, t) { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, t); }
function esc(v) { return v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function lineStartAt(t, i) { const n = t.lastIndexOf("\n", Math.max(0, i - 1)); return n < 0 ? 0 : n + 1; }
function rmMarker(t, m) { const s = `<!-- ${m}:start -->`; const e = `<!-- ${m}:end -->`; return t.replace(new RegExp(`${esc(s)}[\\s\\S]*?${esc(e)}\\s*`, "g"), "").trimEnd(); }
function nextHeading(t, from) { const r = /^#{1,2}\s+(?!TypeDoc Hybrid Source Links\b|TypeDoc Hybrid Source Links Rules\b|AI Code Intelligence Toolkit\b|AI Code Intelligence Toolkit Rules\b).+$/gm; r.lastIndex = from; const m = r.exec(t); return m ? m.index : t.length; }
function rmLegacy(t, h) { const r = new RegExp(`^#{0,6}\\s*${esc(h)}\\s*$`, "im"); const m = r.exec(t); if (!m) return t; const start = lineStartAt(t, m.index); const end = nextHeading(t, m.index + m[0].length); return `${t.slice(0, start).trimEnd()}\n\n${t.slice(end).trimStart()}`.trimEnd(); }
function strip(t) { let o = t; o = rmMarker(o, marker); o = rmLegacy(o, "TypeDoc Hybrid Source Links Rules"); o = rmLegacy(o, "TypeDoc Hybrid Source Links"); return o.trimEnd(); }
function block(c) { return `<!-- ${marker}:start -->\n${c.trim()}\n<!-- ${marker}:end -->\n`; }
function insertTop(t, b) { const tr = t.trimEnd(); if (!tr) return b; const lines = tr.split(/\r?\n/); const first = lines[0]?.trim() || ""; if (/^#\s+/.test(first) || /^Agent Instructions\s*$/i.test(first)) { const rest = lines.slice(1).join("\n").trimStart(); return `${lines[0]}\n\n${b}${rest ? "\n" + rest : ""}`.trimEnd() + "\n"; } return `${b}\n${tr}\n`; }
function inject(file, content, title) { const fp = path.join(target, file); const before = readText(fp, title ? `${title}\n` : ""); const after = insertTop(strip(before), block(content)); writeText(fp, after); return { file, changed: before !== after }; }
const copied = ["scripts/typedoc-strict-runner.mjs", "scripts/typedoc-source-config.mjs", "scripts/typedoc-source-link-doctor.mjs", "scripts/typedoc-tool-health.mjs", "scripts/ai/typedoc-local-source-check.mjs", "typedoc.json", "typedoc-frontend.json", "typedoc-ci.json", "typedoc-strict.json", "tsconfig.doc.json", "types/typedoc-local-shims.d.ts"].map(copy);
const pkgPath = path.join(target, "package.json"); const pkg = readJson(pkgPath, { scripts: {} }); pkg.scripts = { ...(pkg.scripts || {}), ...readJson(path.join(pkgRoot, "templates/package.scripts.json"), {}) }; writeJson(pkgPath, pkg);
const docs = [inject("AGENTS.md", readText(path.join(pkgRoot, "templates/AGENTS_SNIPPET.md")), "# Agent Instructions"), inject("README.md", readText(path.join(pkgRoot, "templates/README_SECTION.md")), "# Project README")];
console.log(JSON.stringify({ ok: true, tool: "typedoc-hybrid-source-links", target, copied, scripts: { changed: Object.keys(readJson(path.join(pkgRoot, "templates/package.scripts.json"), {})) }, docs, next: ["npm install", "npm run typedoc:health", "npm run typedoc:json:local", "npm run typedoc:check-local"] }, null, 2));
