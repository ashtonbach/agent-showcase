#!/usr/bin/env node
// KEEP_LAB (build on top): a typed request that says to keep the current section must not delete or change it.
// Replays the shape of PR #212 (deleted app/lab/faq-accordion/index.tsx, repointed current.json and page.tsx) and the build-on-top path.
// 10/20 2:18 AM CT: build on top = composition. The new lab takes the slot and imports + renders the kept lab; page.tsx gets no Extra.
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
const ONTOP = '"use client";\nimport Kept from "../faq-accordion";\nexport default function B() { return <><Kept /><section data-lab="custom-1792388090"><h2>Closed Dec 24-25</h2></section></>; }\n';
const SLOT = () => { w("app/lab/current.json", '{"slug":"custom-1792388090"}'); w("app/page.tsx", PAGE('import Lab from "./lab/custom-1792388090";', "      <Lab /> {/* lab:slot */}")); };
const NEW = '"use client";\nexport default function B() { return <section data-lab="custom-1792388090"><h2>Closed Dec 24-25</h2></section>; }\n';
let n = 0; const t = (name, f) => { f(); n++; console.log("ok", name); };
// #212 shape: replace the current lab
g("checkout", "-q", "-b", "replace"); fs.rmSync(path.join(d, "app/lab/faq-accordion"), { recursive: true }); w("app/lab/custom-1792388090/index.tsx", NEW);
w("app/lab/current.json", '{"slug":"custom-1792388090"}'); w("app/page.tsx", PAGE('import Lab from "./lab/custom-1792388090";', "      <Lab /> {/* lab:slot */}")); g("add", "-A"); g("commit", "-qm", "replace");
t("#212 shape without KEEP_LAB still passes (unchanged rules)", () => assert.strictEqual(run({}).code, 0));
t("#212 shape with KEEP_LAB fails: kept section deleted", () => { const r = run({ KEEP_LAB: "faq-accordion" }); assert.strictEqual(r.code, 1); assert.ok(/app\/lab\/faq-accordion\/index\.tsx was deleted/.test(r.out)); assert.ok(/must import and render the kept section/.test(r.out)); });   /* 10/20: current.json now points at the new lab by design */
// build on top
g("checkout", "-q", "-b", "ontop", "main"); w("app/lab/custom-1792388090/index.tsx", ONTOP); SLOT(); g("add", "-A"); g("commit", "-qm", "ontop");
t("build on top (new lab imports + renders the kept lab, takes the slot) passes", () => { const r = run({ KEEP_LAB: "faq-accordion" }); assert.strictEqual(r.code, 0, r.out); });
t("build on top that also edits the kept section fails", () => { fs.appendFileSync(path.join(d, "app/lab/faq-accordion/index.tsx"), "// x\n"); g("commit", "-qam", "edit"); const r = run({ KEEP_LAB: "faq-accordion" }); assert.strictEqual(r.code, 1); assert.ok(/faq-accordion\/index\.tsx was changed/.test(r.out)); });
t("KEEP_LAB: new lab that does not render the kept lab fails", () => { g("reset", "-q", "--hard", "HEAD~1"); w("app/lab/custom-1792388090/index.tsx", NEW); g("commit", "-qam", "nokept"); const r = run({ KEEP_LAB: "faq-accordion" }); assert.strictEqual(r.code, 1); assert.ok(/must import and render the kept section/.test(r.out), r.out); });
t("KEEP_LAB: the old Extra wiring in page.tsx now fails", () => { g("checkout", "-q", "-b", "oldextra", "main"); w("app/lab/custom-1792388090/index.tsx", ONTOP); w("app/lab/current.json", '{"slug":"custom-1792388090"}'); w("app/page.tsx", PAGE('import Lab from "./lab/custom-1792388090";\nimport Extra from "./lab/faq-accordion";', "      <Extra />\n      <Lab /> {/* lab:slot */}")); g("add", "-A"); g("commit", "-qm", "oldextra"); const r = run({ KEEP_LAB: "faq-accordion" }); assert.strictEqual(r.code, 1); assert.ok(/other lines changed/.test(r.out), r.out); });
t("normal mode: importing another lab is still banned", () => { const r = run({}); assert.strictEqual(r.code, 1); assert.ok(/import not allowed: \.\.\/faq-accordion/.test(r.out), r.out); });
// The CI path: in Merge Gates gate.js reads the PR body marker from the pull_request event (GITHUB_EVENT_PATH), no KEEP_LAB env.
const marker = path.join(__dirname, "keep-marker.js"), ev = path.join(d, "..", path.basename(d) + "-event.json");
const viaBody = (body, env = {}) => { fs.writeFileSync(ev, JSON.stringify({ pull_request: { body } })); return run({ KEEP_LAB: "", GITHUB_EVENT_PATH: ev, ...env }); };
const BODY = "## Requested change\nKeep the FAQ and add a banner\n\n<!-- keep-lab: faq-accordion -->\n";
// normal mode with Extra lines: a normal replace that also keeps the old section through <Extra /> (passed before: Extra lines were ignored)
g("checkout", "-q", "-b", "extra-normal", "main"); w("app/lab/custom-1792388090/index.tsx", NEW); w("app/lab/current.json", '{"slug":"custom-1792388090"}');
w("app/page.tsx", PAGE('import Lab from "./lab/custom-1792388090";\nimport Extra from "./lab/faq-accordion";', "      <Extra />\n      <Lab /> {/* lab:slot */}")); g("add", "-A"); g("commit", "-qm", "extra-normal");
t("normal mode (no marker) fails a page.tsx that adds Extra lines", () => { for (const r of [viaBody("## Requested change\nAdd a banner\n"), run({})]) { assert.strictEqual(r.code, 1); assert.ok(/other lines changed/.test(r.out), r.out); } });
g("checkout", "-q", "-b", "ontop2", "main"); w("app/lab/custom-1792388090/index.tsx", ONTOP); SLOT(); g("add", "-A"); g("commit", "-qm", "ontop2");
t("keep mode from the PR body marker passes a build-on-top change", () => { const r = viaBody(BODY); assert.strictEqual(r.code, 0, r.out); });
t("#212-style deletion fails with the marker and with kit env KEEP_LAB", () => { g("checkout", "-q", "replace"); const a = viaBody(BODY), b = run({ KEEP_LAB: "faq-accordion" }); for (const r of [a, b]) { assert.strictEqual(r.code, 1); assert.ok(/faq-accordion\/index\.tsx was deleted/.test(r.out)); } });
// 10/20 (#243 review): multi-line imports. The `} from "..."` line is checked like any other.
const ML = (src) => '"use client";\nimport {\n  default as Other,\n} from "' + src + '";\nexport default function B() { return <><Other /><section data-lab="custom-1792388090">B</section></>; }\n';
const mlRun = (name, src, env) => { g("checkout", "-q", "-B", name, "main"); w("app/lab/custom-1792388090/index.tsx", ML(src)); SLOT(); g("add", "-A"); g("commit", "-qm", name); return run(env); };
t("multi-line import of @/app/lab/<other> fails in normal and keep mode", () => { for (const env of [{}, { KEEP_LAB: "faq-accordion" }]) { const r = mlRun("ml-alias", "@/app/lab/faq-accordion", env); assert.strictEqual(r.code, 1); assert.ok(/import not allowed: @\/app\/lab\/faq-accordion/.test(r.out), r.out); } });
t("multi-line import of ../<other> fails in normal mode", () => { const r = mlRun("ml-rel", "../faq-accordion", {}); assert.strictEqual(r.code, 1); assert.ok(/import not allowed: \.\.\/faq-accordion/.test(r.out), r.out); });
t("multi-line import of ../<kept> passes in keep mode only", () => { const r = mlRun("ml-kept", "../faq-accordion", { KEEP_LAB: "faq-accordion" }); assert.strictEqual(r.code, 0, r.out); });
t("multi-line import of ../<not-kept> fails in keep mode", () => { w("app/lab/other-lab/index.tsx", "export default function O() { return null; }\n"); g("checkout", "-q", "main"); g("add", "-A"); g("commit", "-qm", "other"); const r = mlRun("ml-other", "../other-lab", { KEEP_LAB: "faq-accordion" }); assert.strictEqual(r.code, 1); assert.ok(/import not allowed: \.\.\/other-lab/.test(r.out), r.out); });
// 10/20 (#243 review 2): whole-file specifier extraction closes the line-based bypasses.
const RAW = (name, body, env) => { g("checkout", "-q", "-B", name, "main"); w("app/lab/custom-1792388090/index.tsx", '"use client";\n' + body + '\nexport default function B() { return <section data-lab="custom-1792388090">B</section>; }\n'); SLOT(); g("add", "-A"); g("commit", "-qm", name); return run(env || {}); };
t("two imports on one line: the second path is checked", () => { const r = RAW("two-one-line", 'import { useState } from "react"; import X from "@/app/lab/faq-accordion";'); assert.strictEqual(r.code, 1); assert.ok(/import not allowed: @\/app\/lab\/faq-accordion/.test(r.out), r.out); });
t("bare import split across lines is checked", () => { const r = RAW("bare-split", 'import\n  "@/app/lab/x";'); assert.strictEqual(r.code, 1); assert.ok(/import not allowed: @\/app\/lab\/x/.test(r.out), r.out); });
t("dynamic import split as import\\n( is banned", () => { const r = RAW("dyn-split", 'const p = import\n("./y");'); assert.strictEqual(r.code, 1); assert.ok(/banned call/.test(r.out), r.out); });
t("multi-import, multi-line mix: every bad specifier is reported", () => { const r = RAW("mix", 'import { useState,\n  useEffect } from "react"; import Y from\n "./local"; import {\n  Z\n} from "../faq-accordion"; import\n"@/app/lab/w";', { KEEP_LAB: "faq-accordion" }); assert.strictEqual(r.code, 1); assert.ok(/import not allowed: @\/app\/lab\/w/.test(r.out), r.out); assert.ok(!/import not allowed: (react|\.\/local|\.\.\/faq-accordion)\b/.test(r.out), r.out); });
t("commented-out banned import fails closed; comment-like string passes", () => { let r = RAW("comment", '// import X from "@/app/lab/faq-accordion";'); assert.strictEqual(r.code, 1); assert.ok(/@\/app\/lab\/faq-accordion/.test(r.out), r.out); r = RAW("comment-ok", 'import { useState } from "react";\nconst s = "see // not a comment";'); assert.strictEqual(r.code, 0, r.out); });
// 10/20 (#243 review 3): the stripper is not a JS lexer; specifiers from the raw text keep it fail-closed.
for (const [k, env] of [["normal", {}], ["keep", { KEEP_LAB: "faq-accordion" }]]) {
  t(`regex literal with a quote cannot hide an import (${k})`, () => { const r = RAW("rx-" + k, "const r = /'/; const s = '//'; import b from \"@/app/lab/dark-mode\";", env); assert.strictEqual(r.code, 1); assert.ok(/@\/app\/lab\/dark-mode/.test(r.out), r.out); });
  t(`\${} in a template cannot hide an import (${k})`, () => { const r = RAW("tpl-" + k, 'const t = `${"`"}`; const s = "//"; import b from "@/app/lab/dark-mode";', env); assert.strictEqual(r.code, 1); assert.ok(/@\/app\/lab\/dark-mode/.test(r.out), r.out); });
}
t("marker parser: none -> normal mode, two or malformed -> fails closed", () => {
  const m = (body) => { try { return { code: 0, out: execFileSync("node", [marker], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], env: { ...process.env, PR_BODY: body } }) }; } catch (e) { return { code: e.status, out: "" }; } };
  assert.deepStrictEqual(m("no marker here"), { code: 0, out: "" }); assert.deepStrictEqual(m(BODY), { code: 0, out: "faq-accordion" });
  assert.strictEqual(m(BODY + "<!-- keep-lab: other -->\n").code, 1); assert.strictEqual(m("<!-- keep-lab: ../x -->").code, 1);
  g("checkout", "-q", "ontop2"); assert.strictEqual(viaBody(BODY + "<!-- keep-lab: other -->\n").code, 1); assert.strictEqual(viaBody(BODY, { KEEP_LAB: "other" }).code, 1); assert.strictEqual(viaBody(BODY, { KEEP_LAB: "faq-accordion" }).code, 0); });
fs.rmSync(ev, { force: true }); fs.rmSync(d, { recursive: true, force: true }); console.log(`keep-lab: ${n}/24 passed`);
