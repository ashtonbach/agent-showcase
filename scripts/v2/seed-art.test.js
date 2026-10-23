#!/usr/bin/env node
// gate.js change-run artwork: new public/lab/<custom>/ files pass only when byte-identical (sha256) to public/lab/<seed>/ at the
// seed commit, which must be on the base history. Everything else stays rejected. Throwaway repo in the OS temp dir.
const { execFileSync } = require("child_process");
const fs = require("fs"), os = require("os"), path = require("path"), assert = require("assert");
const gate = path.join(__dirname, "gate.js"), sm = require("./seed-marker");
const C = "custom-1792700004";
let dir, seedSha, passed = 0, failed = 0;
const git = (...a) => execFileSync("git", a, { cwd: dir, encoding: "utf8" }).trim();
const w = (f, s) => { fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true }); fs.writeFileSync(path.join(dir, f), s); };
const page = (s) => `import Lab from "./lab/${s}";\nexport default function Page() {\n  return (\n    <div>\n      <Lab /> {/* lab:slot */}\n    </div>\n  );\n}\n`;
const ICON = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${c}"/></svg>\n`;
const run = (env = {}) => { try { return { code: 0, out: execFileSync("node", [gate, C, "base", "HEAD"], { cwd: dir, encoding: "utf8", stdio: "pipe", env: { ...process.env, SEED_FROM: "", GITHUB_EVENT_PATH: "", KEEP_LAB: "", ...env } }) }; }
  catch (e) { return { code: e.status || 1, out: (e.stdout || "") + (e.stderr || "") }; } };
// history like the showcase on 10/23: feature-grid shipped with icons, then the FAQ replaced it on main
function repo() {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "seed-art-")); git("init", "-q", "-b", "main"); git("config", "user.name", "t"); git("config", "user.email", "t@x");
  w("app/lab/menu.json", JSON.stringify({ features: [{ slug: "feature-grid" }, { slug: "faq-accordion" }] }));
  w("app/lab/feature-grid/index.tsx", 'export default function F() { return <section data-lab="feature-grid"><img src="/lab/feature-grid/icon-bolt.svg" /></section>; }\n');
  w("public/lab/feature-grid/icon-bolt.svg", ICON("#f5a623")); w("public/lab/feature-grid/icon-lock.svg", ICON("#4a90e2"));
  w("app/lab/current.json", '{"slug":"feature-grid"}'); w("app/page.tsx", page("feature-grid")); git("add", "-A"); git("commit", "-qm", "feature grid");
  seedSha = git("rev-parse", "HEAD");
  fs.rmSync(path.join(dir, "app/lab/feature-grid"), { recursive: true }); fs.rmSync(path.join(dir, "public/lab/feature-grid"), { recursive: true });
  w("app/lab/faq-accordion/index.tsx", 'export default function Q() { return <section data-lab="faq-accordion">FAQ</section>; }\n');
  w("app/lab/current.json", '{"slug":"faq-accordion"}'); w("app/page.tsx", page("faq-accordion")); git("add", "-A"); git("commit", "-qm", "faq"); git("branch", "-f", "base");
}
// the change run: edit of the feature grid in the custom folder, seeded icons copied to public/lab/<custom>/
function changeRun(icons = { "icon-bolt.svg": ICON("#f5a623"), "icon-lock.svg": ICON("#4a90e2") }) {
  fs.rmSync(path.join(dir, "app/lab/faq-accordion"), { recursive: true });
  w(`app/lab/${C}/index.tsx`, `export default function F() { return <section data-lab="${C}" className="hover:scale-105"><img src="/lab/${C}/icon-bolt.svg" /></section>; }\n`);
  for (const [n, s] of Object.entries(icons)) w(`public/lab/${C}/${n}`, s);
  w("app/lab/current.json", `{"slug":"${C}"}`); w("app/page.tsx", page(C)); git("add", "-A"); git("commit", "-qm", "change run");
}
const ev = (body) => { const p = path.join(dir, "..", path.basename(dir) + "-ev.json"); fs.writeFileSync(p, JSON.stringify({ pull_request: { body } })); return p; };
const T = {
  "PASS: 4:19-style feature-grid change run, seeded icons byte-identical (SEED_FROM)"() { repo(); changeRun(); const r = run({ SEED_FROM: `feature-grid@${seedSha}` }); assert.strictEqual(r.code, 0, r.out); assert.match(r.out, /Allowlist PASS/); },
  "PASS: same run via the PR body marker only (Merge Gates)"() { repo(); changeRun(); const r = run({ GITHUB_EVENT_PATH: ev(`Change run\n<!-- seed-from: feature-grid@${seedSha} -->`) }); assert.strictEqual(r.code, 0, r.out); },
  "FAIL: a modified seeded image"() { repo(); changeRun({ "icon-bolt.svg": ICON("#ff0000"), "icon-lock.svg": ICON("#4a90e2") }); const r = run({ SEED_FROM: `feature-grid@${seedSha}` });
    assert.strictEqual(r.code, 1); assert.match(r.out, /artwork public\/lab\/custom-1792700004\/icon-bolt\.svg differs from public\/lab\/feature-grid\/icon-bolt\.svg/); },
  "FAIL: a new image the seed never had"() { repo(); changeRun({ "icon-bolt.svg": ICON("#f5a623"), "icon-new.svg": ICON("#000") }); const r = run({ SEED_FROM: `feature-grid@${seedSha}` });
    assert.strictEqual(r.code, 1); assert.match(r.out, /icon-new\.svg has no public\/lab\/feature-grid\/icon-new\.svg at the seed commit/); },
  "FAIL: no seed -> custom artwork still rejected"() { repo(); changeRun(); const r = run(); assert.strictEqual(r.code, 1); assert.match(r.out, /file outside allowlist: public\/lab\/custom-1792700004\/icon-bolt\.svg/); },
  "FAIL: seed commit not on the base history"() { repo(); const head0 = git("rev-parse", "HEAD"); git("checkout", "-q", "--orphan", "x"); git("commit", "-qm", "orphan copy"); const orphan = git("rev-parse", "HEAD");
    git("checkout", "-q", "-f", "main"); git("reset", "-q", "--hard", head0); changeRun(); const r = run({ SEED_FROM: `feature-grid@${orphan}` }); assert.strictEqual(r.code, 1); assert.match(r.out, /is not on the base history/); },
  "FAIL: wrong seed section (identical name, different bytes elsewhere)"() { repo(); changeRun(); const r = run({ SEED_FROM: `faq-accordion@${seedSha}` }); assert.strictEqual(r.code, 1); assert.match(r.out, /has no public\/lab\/faq-accordion\//); },
  "FAIL: SEED_FROM and PR body marker disagree"() { repo(); changeRun(); const r = run({ SEED_FROM: `feature-grid@${seedSha}`, GITHUB_EVENT_PATH: ev(`<!-- seed-from: faq-accordion@${seedSha} -->`) }); assert.strictEqual(r.code, 1); assert.match(r.out, /does not match/); },
  "FAIL: malformed SEED_FROM / two markers"() { repo(); changeRun(); assert.strictEqual(run({ SEED_FROM: "feature-grid@abc" }).code, 1);
    assert.strictEqual(run({ GITHUB_EVENT_PATH: ev(`<!-- seed-from: feature-grid@${seedSha} -->\n<!-- seed-from: feature-grid@${seedSha} -->`) }).code, 1); },
  "FAIL: a seed does not let a custom run touch other paths"() { repo(); changeRun(); w("public/lab/faq-accordion/x.svg", ICON("#f5a623")); w("public/other.svg", ICON("#f5a623")); git("add", "-A"); git("commit", "-qm", "extra");
    const r = run({ SEED_FROM: `feature-grid@${seedSha}` }); assert.strictEqual(r.code, 1); assert.match(r.out, /outside allowlist: public\/lab\/faq-accordion\/x\.svg/); },
  "unit: seed-marker parse"() { assert.strictEqual(sm.parse("no marker"), ""); assert.deepStrictEqual(sm.parse(`<!-- seed-from: feature-grid@${"a".repeat(40)} -->`), { slug: "feature-grid", sha: "a".repeat(40) });
    assert.strictEqual(sm.parse("<!-- seed-from: Feature@main -->"), null); assert.strictEqual(sm.fromEnv(""), ""); assert.strictEqual(sm.fromEnv("x@HEAD"), null); },
};
for (const [n, f] of Object.entries(T)) { try { f(); console.log(`✓ ${n}`); passed++; } catch (e) { console.log(`✗ ${n}\n  ${e.message.split("\n").slice(0, 6).join("\n  ")}`); failed++; } finally { if (dir) fs.rmSync(dir, { recursive: true, force: true }); } }
console.log(`\n${passed} passed, ${failed} failed`); process.exit(failed ? 1 : 0);
