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
// Typed requests (Local runs) use their own folder, app/lab/custom-<timestamp>/, and are not on the menu.
// A custom run may change only that folder, current.json and the page.tsx Lab lines: no artwork, no messages (fail closed).
const custom = /^custom-[0-9]{10,13}$/.test(slug || "");
if (!menu.includes(slug) && !custom) fail("allowlist", `unknown feature "${slug}" (not in app/lab/menu.json)`);
// Build on top: KEEP_LAB=<slug> (set by the kit when a typed request says to keep / add to the current page). That section's
// files must not change or disappear. Like every run, the new lab takes the slot (current.json + the page.tsx Lab import point at it);
// it imports the kept lab ("../<keep>") and renders it plus the additions, so the kept files stay byte-unchanged (10/20 2:18 AM CT).
// The kit turns the mode on in two places that must agree: KEEP_LAB in its own env, and a fixed marker line it writes in the
// PR body ("<!-- keep-lab: <slug> -->"), which this script reads from the pull_request event in Merge Gates (keep-marker.js).
const envKeep = process.env.KEEP_LAB || "", bodyKeep = require("./keep-marker").fromEvent();
if (bodyKeep === null) fail("allowlist", "bad keep-lab marker in the PR body (one line: <!-- keep-lab: <slug> -->)");
if (envKeep && bodyKeep && envKeep !== bodyKeep) fail("allowlist", `KEEP_LAB "${envKeep}" does not match the PR body marker "${bodyKeep}"`);
const keep = envKeep || bodyKeep || "";
if (keep && (!/^[a-z0-9-]+$/.test(keep) || keep === slug)) fail("allowlist", `bad KEEP_LAB "${keep}"`);
const keepFile = (f) => !!keep && (f.startsWith(`app/lab/${keep}/`) || f.startsWith(`public/lab/${keep}/`));
const range = `${base}...${head}`;
const files = git("diff", "--name-only", range).split("\n").filter(Boolean);
out.files = files;
// Messages: messages/en-US.json is the base locale (never changed by a run). The spanish-translation run adds exactly
// messages/es-ES.json: flat JSON, string values only, exactly the same keys as en-US.json.
const LOCALE_FILE = "messages/es-ES.json", BASE_LOCALE_FILE = "messages/en-US.json";
const dir = `app/lab/${slug}/`, artDir = `public/lab/${slug}/`; // artDir: Hazel's artwork (SVG only, checked below)
// Runs branch from origin/base (main with the lab slot empty), so a PR to main also deletes the previous feature.
// Pure deletions of another menu feature's folder or artwork are allowed and don't count toward the size cap.
const deleted = new Set(git("diff", "--name-only", "--diff-filter=D", range).split("\n").filter(Boolean));
// A previous typed request's folder (app/lab/custom-<10-13 digits>/) is not on the menu; deleting it is allowed too.
const oldCustom = (f) => /^app\/lab\/custom-[0-9]{10,13}\//.test(f);
const oldFeature = (f) => !keepFile(f) && deleted.has(f) && /^(app|public)\/lab\/[a-z0-9-]+\//.test(f) && !f.startsWith(dir) && !f.startsWith(artDir) && (menu.includes(f.split("/")[2]) || oldCustom(f));
out.removed = files.filter(oldFeature);
for (const f of files) {
  if (keepFile(f)) { fail("allowlist", `the request said to keep the current section: ${f} was ${deleted.has(f) ? "deleted" : "changed"}`); continue; }
  if (f === "app/page.tsx" || f.startsWith(dir) || oldFeature(f)) continue;
  if (f === "app/lab/current.json") continue; // checked below
  if (f === LOCALE_FILE && slug === "spanish-translation") continue; // Alder's es-ES messages, checked below
  if (!custom && f.startsWith(artDir) && /^[a-z0-9-]+\.svg$/.test(f.slice(artDir.length))) continue;
  fail("allowlist", `file outside allowlist: ${f}`);
}
// The visible demo-name H1 reads app/lab/current.json: after the change it must be exactly {"slug":"<slug>"}.
{ let cur = null; try { cur = JSON.parse(git("show", `${head}:app/lab/current.json`)); } catch (e) {}
  const want = slug;
  if (!cur || Object.keys(cur).join() !== "slug" || cur.slug !== want) fail("allowlist", `app/lab/current.json must be exactly {"slug":"${slug}"} (it sets the page H1)`.replace(`"${slug}"`, `"${want}"`)); }
if (slug === "spanish-translation") {
  const load = (f) => { try { return JSON.parse(git("show", `${head}:${f}`)); } catch (e) { return null; } };
  const en = load(BASE_LOCALE_FILE), es = load(LOCALE_FILE);
  const flat = (o) => o && typeof o === "object" && !Array.isArray(o) && Object.values(o).every((v) => typeof v === "string");
  if (!flat(en)) fail("allowlist", `${BASE_LOCALE_FILE} missing or not flat string JSON`);
  if (!es) fail("allowlist", `${LOCALE_FILE} missing or not valid JSON`);
  else if (!flat(es)) fail("allowlist", `${LOCALE_FILE} must be flat JSON with string values only`);
  else if (flat(en)) {
    const a = Object.keys(en).sort(), b = Object.keys(es).sort();
    const miss = a.filter((k) => !(k in es)), extra = b.filter((k) => !(k in en)), empty = b.filter((k) => !es[k].trim());
    if (miss.length) fail("allowlist", `${LOCALE_FILE} is missing keys from en-US.json: ${miss.join(", ")}`);
    if (extra.length) fail("allowlist", `${LOCALE_FILE} has keys not in en-US.json: ${extra.join(", ")}`);
    if (empty.length) fail("allowlist", `${LOCALE_FILE} has empty values: ${empty.join(", ")}`);
    const same = a.filter((k) => k in es && en[k].length >= 12 && es[k].trim() === en[k].trim());
    if (same.length) fail("allowlist", `${LOCALE_FILE} leaves text in English (identical to en-US.json): ${same.join(", ")}`);
  }
} else if (files.some((f) => f.startsWith("messages/"))) fail("allowlist", "messages/ may only change in the spanish-translation run (messages/es-ES.json)");
if (files.includes(BASE_LOCALE_FILE)) fail("allowlist", `${BASE_LOCALE_FILE} is base text; a run may not change it`);
if (!files.some((f) => f.startsWith(dir))) fail("allowlist", `no files in ${dir}`);
if (files.some((f) => /(^|\/)(package(-lock)?\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb?|npm-shrinkwrap\.json)$/.test(f)))
  fail("allowlist", "package.json or lockfile changed (no new dependencies)");
// page.tsx: after the change it must import exactly "./lab/<slug>" once and render <Lab /> once; apart from the
// Lab import/render lines nothing else may change. An import or <Lab /> already on main (from an earlier feature) counts:
// the feature may swap the import slug instead of adding a second import.
if (files.includes("app/page.tsx")) {
  const show = (ref) => { try { return git("show", `${ref}:app/page.tsx`); } catch (e) { return ""; } };
  // 10/20 2:18 AM CT: page.tsx changes only in the Lab slot lines, in every mode. An Extra import or render is an "other line".
  const LB = "Lab", impRe = new RegExp(`^import ${LB} from "\\./lab/[a-z0-9-]+";$`), renRe = new RegExp(`^\\s*<${LB} \\/>\\s*$`);
  const strip = (t) => t.split("\n").filter((l) => !impRe.test(l) && !renRe.test(l))
    .map((l) => l.replace(/^(\s*)<Lab \/>\s*(\{\/\* lab:slot \*\/\})$/, "$1$2")).join("\n");
  // 10/20 (#234): a run may REMOVE a leftover build-on-top Extra (import + render) from page.tsx, never add one: the Extra lines
  // are dropped from the base side only, so any Extra still in (or added to) the head is an "other line" and fails as before.
  const exRe = /^import Extra\w* from "\.\/lab\/[a-z0-9-]+";$|^\s*<Extra\w* \/>\s*$/;
  const b0 = show(base), b = b0.split("\n").filter((l) => !exRe.test(l)).join("\n"), h = show(head);
  const imps = h.split("\n").filter((l) => /^import Lab from /.test(l)), renders = (h.match(/<Lab \/>/g) || []).length;
  if (strip(b) !== strip(h)) fail("allowlist", `app/page.tsx may only change the Lab import line and the <Lab /> render; other lines changed`);
  if (!(imps.length === 1 && imps[0] === `import Lab from "./lab/${slug}";`)) fail("allowlist", `app/page.tsx must have exactly one 'import Lab from "./lab/${slug}";' (found: ${imps.join(" | ") || "none"})`);
  if (renders !== 1) fail("allowlist", `app/page.tsx must render <Lab /> exactly once (found ${renders})`);
} else fail("allowlist", "app/page.tsx must import and render the feature");
// banned calls and imports in added lines of the feature folder
const BANNED = [/\bfetch\s*\(/, /\baxios\b/, /XMLHttpRequest/, /\bWebSocket\b/, /\bEventSource\b/, /sendBeacon/, /process\.env/, /dangerouslySetInnerHTML/, /\beval\s*\(/, /new\s+Function\s*\(/, /\bimport\s*\(/, /\brequire\s*\(/];
// 10/20 (#243 review): checked per lab file on its WHOLE head text (comments stripped, strings kept), not line by line, so an
// import split across lines, two imports on one line, or a call split as `import\n(` cannot slip past. Every module specifier
// from `from "x"`, `import "x"`, `import("x")` and `require("x")` is extracted and checked; import( and require( stay banned.
const stripComments = (t) => { let o = "", q = null; for (let i = 0; i < t.length; i++) { const c = t[i], n = t[i + 1];
  if (q) { o += c; if (c === "\\") { o += n || ""; i++; } else if (c === q) q = null; continue; }
  if (c === "/" && n === "/") { while (i < t.length && t[i] !== "\n") i++; o += "\n"; continue; }
  if (c === "/" && n === "*") { i += 2; while (i < t.length && !(t[i] === "*" && t[i + 1] === "/")) { if (t[i] === "\n") o += "\n"; i++; } i++; o += " "; continue; }
  if (c === '"' || c === "'" || c === "`") q = c; o += c; } return o; };
const SPEC = [/\bfrom\s*(["'`])([^"'`]*)\1/g, /\bimport\s*(["'`])([^"'`]*)\1/g, /\bimport\s*\(\s*(["'`])([^"'`]*)\1/g, /\brequire\s*\(\s*(["'`])([^"'`]*)\1/g];
const labTexts = files.filter((f) => f.startsWith(dir) && /\.(tsx|ts)$/.test(f) && !deleted.has(f)).map((f) => { let t = ""; try { t = git("show", `${head}:${f}`); } catch (e) {} return { raw: t, t: stripComments(t) }; });
const specs = [], rawSpecs = [];
for (const { raw, t } of labTexts) {
  // fail closed: the stripper is not a full JS lexer (regex literals, ${} in templates), so specifiers are also taken from
  // the raw text; each must be allowed and must survive stripping, else it fails (even one that was really in a comment).
  const kept = []; for (const re of SPEC) for (const m of t.matchAll(re)) kept.push(m[2]);
  for (const re of SPEC) for (const m of raw.matchAll(re)) { rawSpecs.push(m[2]); if (!kept.includes(m[2])) fail("banned", `import specifier hidden by comment stripping: ${m[2]}`); }
  for (const re of BANNED) { const g = new RegExp(re.source, "g"); for (const m of t.matchAll(g)) fail("banned", `banned call ${re.source}: ${t.slice(Math.max(0, m.index - 20), m.index + 60).replace(/\s+/g, " ").trim().slice(0, 120)}`); }
  for (const re of SPEC) for (const m of t.matchAll(re)) specs.push(m[2]);
}
for (const sp of new Set([...specs, ...rawSpecs])) {
  const msgOk = slug === "spanish-translation" && /^\.\.\/\.\.\/\.\.\/messages\/(en-US|es-ES)\.json$/.test(sp);
  const keepOk = !!keep && sp === `../${keep}`; // build on top: the new lab renders the kept lab's component
  if (!msgOk && !keepOk && !(sp === "react" || (/^\.\//.test(sp) && !sp.includes("..")))) fail("banned", `import not allowed: ${sp} (only "react", ./ files in the folder, or ../../../messages/<locale>.json for spanish-translation)`);
}
if (keep && !specs.includes(`../${keep}`)) fail("allowlist", `build on top: app/lab/${slug}/ must import and render the kept section (import ... from "../${keep}")`);
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
