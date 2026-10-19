#!/usr/bin/env node
// KEEP_LAB (build on top): a typed request that says to keep the current section must not delete or change it.
// Replays the shape of PR #212 (deleted app/lab/faq-accordion/index.tsx, repointed current.json and page.tsx) and the build-on-top path.
const { execFileSync } = require("child_process"), fs = require("fs"), os = require("os"), path = require("path"), assert = require("assert");
const gate = path.join(__dirname, "gate.js"), d = fs.mkdtempSync(path.join(os.tmpdir(), "keep-lab-"));
const g = (...a) => execFileSync("git", a, { cwd: d, encoding: "utf8" });
const w = (f, t) => { fs.mkdirSync(path.join(d, path.dirname(f)), { recursive: true }); fs.writeFileSync(path.join(d, f), t); };
const run = (env) => { try { return { code: 0, out: execFileSync("node", [gate, "custom-1792388090", "main", "HEAD"], { cwd: d, encoding: "utf8", env: { ...process.env, ...env } }) }; } catch (e) { return { code: e.status, out: e.stdout }; } };
const PAGE = (imp, body) => `${imp}\nexport default function Page() {\n  return (\n    <main>\n${body}\n    </main>\n  );\n}\n`;
g("init", "-q", "-b", "main"); g("config", "user.name", "t"); g("config", "user.email", "t@t");
w("app/lab/menu.json", JSON.stringify({ features: [{ slug: "faq-accordion" }] })); w("app/lab/current.json", '{"slug":"faq-accordion"}');
w("app/lab/faq-accordion/index.tsx", '"use client";\nexport default function F() { return <section data-lab="faq-accordion"><h2>FAQ</h2></section>; }\n');
w("app/page.tsx", PAGE('import Lab from "./lab/faq-accordion";', "      <Lab /> {/* lab:slot */}")); g("add", "-A"); g("commit", "-qm", "main");
const NEW = '"use client";\nexport default function B() { return <section data-lab="custom-1792388090"><h2>Closed Dec 24-25</h2></section>; }\n';
let n = 0; const t = (name, f) => { f(); n++; console.log("ok", name); };
// #212 shape: replace the current lab
g("checkout", "-q", "-b", "replace"); fs.rmSync(path.join(d, "app/lab/faq-accordion"), { recursive: true }); w("app/lab/custom-1792388090/index.tsx", NEW);
w("app/lab/current.json", '{"slug":"custom-1792388090"}'); w("app/page.tsx", PAGE('import Lab from "./lab/custom-1792388090";', "      <Lab /> {/* lab:slot */}")); g("add", "-A"); g("commit", "-qm", "replace");
t("#212 shape without KEEP_LAB still passes (unchanged rules)", () => assert.strictEqual(run({}).code, 0));
t("#212 shape with KEEP_LAB fails: kept section deleted", () => { const r = run({ KEEP_LAB: "faq-accordion" }); assert.strictEqual(r.code, 1); assert.ok(/app\/lab\/faq-accordion\/index\.tsx was deleted/.test(r.out)); assert.ok(/current\.json must be exactly \{"slug":"faq-accordion"\}/.test(r.out)); });
// build on top
g("checkout", "-q", "-b", "ontop", "main"); w("app/lab/custom-1792388090/index.tsx", NEW);
w("app/page.tsx", PAGE('import Lab from "./lab/faq-accordion";\nimport Extra from "./lab/custom-1792388090";', "      <Extra />\n      <Lab /> {/* lab:slot */}")); g("add", "-A"); g("commit", "-qm", "ontop");
t("build on top with KEEP_LAB passes", () => { const r = run({ KEEP_LAB: "faq-accordion" }); assert.strictEqual(r.code, 0, r.out); });
t("build on top that also edits the kept section fails", () => { fs.appendFileSync(path.join(d, "app/lab/faq-accordion/index.tsx"), "// x\n"); g("commit", "-qam", "edit"); const r = run({ KEEP_LAB: "faq-accordion" }); assert.strictEqual(r.code, 1); assert.ok(/faq-accordion\/index\.tsx was changed/.test(r.out)); });
t("KEEP_LAB without <Extra /> fails", () => { g("reset", "-q", "--hard", "HEAD~1"); w("app/page.tsx", PAGE('import Lab from "./lab/faq-accordion";', "      <Lab /> {/* lab:slot */}")); g("commit", "-qam", "noextra"); assert.strictEqual(run({ KEEP_LAB: "faq-accordion" }).code, 1); });
fs.rmSync(d, { recursive: true, force: true }); console.log(`keep-lab: ${n}/5 passed`);
