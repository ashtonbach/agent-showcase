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
const dir = `app/lab/${slug}/`, artDir = `public/lab/${slug}/`; // artDir: Naomi Sato's artwork (SVG only, checked below)
// Runs branch from origin/base (main with the lab slot empty), so a PR to main also deletes the previous feature.
// Pure deletions of another menu feature's folder or artwork are allowed and don't count toward the size cap.
const deleted = new Set(git("diff", "--name-only", "--diff-filter=D", range).split("\n").filter(Boolean));
const oldFeature = (f) => deleted.has(f) && /^(app|public)\/lab\/[a-z0-9-]+\//.test(f) && !f.startsWith(dir) && !f.startsWith(artDir) && menu.includes(f.split("/")[2]);
out.removed = files.filter(oldFeature);
for (const f of files) {
  if (f === "app/page.tsx" || f.startsWith(dir) || oldFeature(f)) continue;
  if (f.startsWith(artDir) && /^[a-z0-9-]+\.svg$/.test(f.slice(artDir.length))) continue;
  fail("allowlist", `file outside allowlist: ${f}`);
}
if (!files.some((f) => f.startsWith(dir))) fail("allowlist", `no files in ${dir}`);
if (files.some((f) => /(^|\/)(package(-lock)?\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb?|npm-shrinkwrap\.json)$/.test(f)))
  fail("allowlist", "package.json or lockfile changed (no new dependencies)");
// page.tsx: after the change it must import exactly "./lab/<slug>" once and render <Lab /> once; apart from the
// Lab import/render lines nothing else may change. An import or <Lab /> already on main (from an earlier feature) counts:
// the feature may swap the import slug instead of adding a second import.
if (files.includes("app/page.tsx")) {
  const show = (ref) => { try { return git("show", `${ref}:app/page.tsx`); } catch (e) { return ""; } };
  const strip = (t) => t.split("\n").filter((l) => !/^import Lab from "\.\/lab\/[a-z0-9-]+";$/.test(l) && !/^\s*<Lab \/>\s*$/.test(l))
    .map((l) => l.replace(/^(\s*)<Lab \/>\s*(\{\/\* lab:slot \*\/\})$/, "$1$2")).join("\n");
  const b = show(base), h = show(head);
  const imps = h.split("\n").filter((l) => /^import Lab from /.test(l)), renders = (h.match(/<Lab \/>/g) || []).length;
  if (strip(b) !== strip(h)) fail("allowlist", `app/page.tsx may only change the Lab import line and the <Lab /> render; other lines changed`);
  if (!(imps.length === 1 && imps[0] === `import Lab from "./lab/${slug}";`)) fail("allowlist", `app/page.tsx must have exactly one 'import Lab from "./lab/${slug}";' (found: ${imps.join(" | ") || "none"})`);
  if (renders !== 1) fail("allowlist", `app/page.tsx must render <Lab /> exactly once (found ${renders})`);
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
// artwork: plain SVG only, small, nothing active or external
for (const f of files.filter((f) => f.startsWith(artDir))) {
  let svg = ""; try { svg = git("show", `${head}:${f}`); } catch (e) { continue; } // deleted
  if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(svg)) fail("allowlist", `artwork has control characters (browsers refuse to render it): ${f}`);
  if (svg.length > 20000) fail("allowlist", `artwork too large: ${f} (${svg.length} bytes, max 20000)`);
  if (!/^\s*(<\?xml[^>]*>\s*)?<svg[\s>]/.test(svg)) fail("allowlist", `artwork is not an SVG: ${f}`);
  if (/<script|<foreignObject|\son[a-z]+\s*=|javascript:|(?:href|src)\s*=\s*["']\s*(?:https?:)?\/\/|@import|url\(\s*["']?\s*(?:https?:)?\/\//i.test(svg)) fail("banned", `artwork has scripts, handlers or external references: ${f}`);
}
// size cap (code only; artwork is capped by bytes above)
for (const l of git("diff", "--numstat", range).split("\n").filter(Boolean)) {
  const [a, r, f] = l.split("\t");
  if (f && (f.startsWith(artDir) || oldFeature(f))) continue;
  out.lines += (+a || 0) + (+r || 0);
}
if (out.lines > MAX) fail("size", `diff is ${out.lines} lines (max ${MAX})`);
const pass = out.allowlist === "PASS" && out.size === "PASS" && out.banned === "PASS";
console.log(`Allowlist ${out.allowlist} · Size ${out.lines}/${MAX} ${out.size} · Banned calls ${out.banned}`);
for (const p of out.problems) console.log("  - " + p);
console.log("GATE " + JSON.stringify({ ...out, result: pass ? "PASS" : "FAIL" }));
process.exit(pass ? 0 : 1);
