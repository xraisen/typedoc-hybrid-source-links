#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "typedoc-hybrid-smoke-"));
fs.writeFileSync(path.join(tmp, "package.json"), JSON.stringify({ name: "fixture", private: true, type: "module", scripts: {} }, null, 2));
fs.mkdirSync(path.join(tmp, "src"));
fs.writeFileSync(path.join(tmp, "src", "index.ts"), "export const ok = true;\n");
fs.writeFileSync(path.join(tmp, "tsconfig.json"), JSON.stringify({ compilerOptions: { target: "ES2022", module: "ESNext", moduleResolution: "Bundler", strict: false }, include: ["src/**/*"] }, null, 2));
function run(cmd, args, cwd = tmp) {
  const r = spawnSync(cmd, args, { cwd, encoding: "utf8" });
  if (r.status !== 0) { console.error(r.stdout); console.error(r.stderr); throw new Error(`${cmd} ${args.join(" ")} failed`); }
  return r;
}
run(process.execPath, [path.join(root, "bin", "install.mjs"), "--target", tmp, "--overwrite"], root);
run("npm", ["run", "typedoc:health"], tmp);
console.log(JSON.stringify({ ok: true, tmp }, null, 2));
