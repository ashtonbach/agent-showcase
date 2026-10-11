#!/usr/bin/env node
// Showcase v2 merge gate. Usage: node scripts/v2/gate.js <slug> [base-ref=origin/main] [head-ref=HEAD]
// Exit 0 = PASS (merge allowed), 1 = FAIL. Last line is machine-readable: GATE {json}
const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const [slug, base = "origin/main", head = "HEAD"] = process.argv.slice(2);
const MAX = 150;
const root = execFileSync("git", ["rev-parse", "--show-toplevel"]).toString().trim();
const menu = JSON.parse(fs.readFileSync(path.join(root, "app/lab/menu.json"), "utf8")).features.map((f) => f.slug);
const git = (...a) => execFileSync("git", ["-C", root, ...a], { maxBuffer: 1 << 26 }).toString();
const out = { slug, allowlist: "PASS", size: "PASS", banned: "PASS", lines: 0, max: MAX, files: [], problems: [] };
const fail = (k, m) => { out[k] = "FAIL"; out.problems.push(m); };
if (!menu.includes(slug)) fail("allowlist", `unknown feature "${slug}" (not in app/lab/menu.json)`);
const range = `${base}...${head}`;
const files = git("diff", "--name-only", range).split("\n").filter(Boolean);
out.files = files;
const dir = `app/lab/${slug}/`;
for (const f of files) {
  if (f === "app/page.tsx" || f.startsWith(dir)) continue;
  fail("allowlist", `file outside allowlist: ${f}`);
}
if (!files.some((f) => f.startsWith(dir))) fail("allowlist", `no files in ${dir}`);
if (files.some((f) => /(^|\/)(package(-lock)?\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb?|npm-shrinkwrap\.json)$/.test(f)))
  fail("allowlist", "package.json or lockfile changed (no new dependencies)");
// page.tsx: exactly one import line + the slot line, nothing else
if (files.includes("app/page.tsx")) {
  const d = git("diff", "-U0", range, "--", "app/page.tsx").split("\n").filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---) /.test(l));
  const okAdd = new Set([`+import Lab from "./lab/${slug}";`, `+      <Lab /> {/* lab:slot */}`]);
  const okDel = new Set([`-      {/* lab:slot */}`]);
  const adds = d.filter((l) => l[0] === "+"), dels = d.filter((l) => l[0] === "-");
  if (!(adds.length === 2 && dels.length === 1 && adds.every((l) => okAdd.has(l)) && dels.every((l) => okDel.has(l))))
    fail("allowlist", `app/page.tsx may only gain 'import Lab from "./lab/${slug}";' and '<Lab /> {/* lab:slot */}' on the slot line; got: ${d.join(" | ").slice(0, 300)}`);
} else fail("allowlist", "app/page.tsx must import and render the feature");
// banned calls and imports in added lines of the feature folder
const BANNED = [/\bfetch\s*\(/, /\baxios\b/, /XMLHttpRequest/, /\bWebSocket\b/, /\bEventSource\b/, /sendBeacon/, /process\.env/, /dangerouslySetInnerHTML/, /\beval\s*\(/, /new\s+Function\s*\(/, /\bimport\s*\(/, /\brequire\s*\(/];
const added = git("diff", "-U0", range, "--", dir).split("\n").filter((l) => l.startsWith("+") && !l.startsWith("+++"));
for (const l of added) {
  for (const re of BANNED) if (re.test(l)) fail("banned", `banned call ${re.source}: ${l.slice(1).trim().slice(0, 120)}`);
  const m = /^\+\s*(?:import|export)\b[^"']*?from\s*["']([^"']+)["']/.exec(l) || /^\+\s*import\s*["']([^"']+)["']/.exec(l);
  if (m && !(m[1] === "react" || (/^\.\//.test(m[1]) && !m[1].includes("..")))) fail("banned", `import not allowed: ${m[1]} (only "react" or ./ files in the folder)`);
}
for (const f of files.filter((f) => f.startsWith(dir)))
  if (!/\.(tsx|ts|css|module\.css|svg)$/.test(f)) fail("allowlist", `file type not allowed: ${f}`);
// size cap
for (const l of git("diff", "--numstat", range).split("\n").filter(Boolean)) {
  const [a, r] = l.split("\t");
  out.lines += (+a || 0) + (+r || 0);
}
if (out.lines > MAX) fail("size", `diff is ${out.lines} lines (max ${MAX})`);
const pass = out.allowlist === "PASS" && out.size === "PASS" && out.banned === "PASS";
console.log(`Allowlist ${out.allowlist} · Size ${out.lines}/${MAX} ${out.size} · Banned calls ${out.banned}`);
for (const p of out.problems) console.log("  - " + p);
console.log("GATE " + JSON.stringify({ ...out, result: pass ? "PASS" : "FAIL" }));
process.exit(pass ? 0 : 1);
