#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
function arg(name, fallback){ const i=args.indexOf(name); return i>=0 ? (args[i+1] || fallback) : fallback; }
const target = path.resolve(arg("--target", "."));
const overwrite = args.includes("--overwrite");
function copy(rel){ const src=path.join(pkgRoot,"templates",rel); const dst=path.join(target,rel); fs.mkdirSync(path.dirname(dst),{recursive:true}); const existed=fs.existsSync(dst); if (!overwrite && existed) return {file:rel,action:"preserved"}; fs.copyFileSync(src,dst); return {file:rel,action:existed?"overwritten":"created"}; }
function readJson(file,fallback={}){ try{return JSON.parse(fs.readFileSync(file,"utf8"));}catch{return fallback;} }
function writeJson(file,obj){ fs.mkdirSync(path.dirname(file),{recursive:true}); fs.writeFileSync(file,JSON.stringify(obj,null,2)+"\n"); }
function upsertBlock(file, marker, content){ const fp=path.join(target,file); let s=fs.existsSync(fp)?fs.readFileSync(fp,"utf8"):""; const start=`<!-- ${marker}:start -->`; const end=`<!-- ${marker}:end -->`; const block=`${start}\n${content.trim()}\n${end}\n`; const re=new RegExp(`${start}[\\s\\S]*?${end}\\n?`); if (re.test(s)) s=s.replace(re,block); else s+=(s.endsWith("\n")?"":"\n")+"\n"+block; fs.writeFileSync(fp,s); }
const copied=["scripts/typedoc-source-config.mjs","scripts/typedoc-source-link-doctor.mjs","scripts/typedoc-tool-health.mjs","scripts/ai/typedoc-local-source-check.mjs","typedoc.json","typedoc-frontend.json","typedoc-ci.json","typedoc-strict.json","tsconfig.doc.json","types/typedoc-local-shims.d.ts"].map(copy);
const pkgPath=path.join(target,"package.json"); const pkg=readJson(pkgPath,{scripts:{}}); pkg.scripts={...(pkg.scripts||{}),...readJson(path.join(pkgRoot,"templates/package.scripts.json"),{})}; writeJson(pkgPath,pkg);
upsertBlock("README.md","typedoc-hybrid-source-links",fs.readFileSync(path.join(pkgRoot,"templates/README_SECTION.md"),"utf8"));
upsertBlock("AGENTS.md","typedoc-hybrid-source-links",fs.readFileSync(path.join(pkgRoot,"templates/AGENTS_SNIPPET.md"),"utf8"));
console.log(JSON.stringify({ok:true, tool:"typedoc-hybrid-source-links", target, copied, scripts:{changed:Object.keys(readJson(path.join(pkgRoot,"templates/package.scripts.json"),{}))}, docs:["README.md","AGENTS.md"], next:["npm install","npm run typedoc:health","npm run typedoc:json:local","npm run typedoc:check-local"]}, null, 2));
