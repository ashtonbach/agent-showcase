#!/usr/bin/env node
// Visual verdict: nothing compared is SKIPPED (never FAIL); a real diff over the threshold, or a size mismatch, still FAILs.
const assert = require("assert"), fs = require("fs"), path = require("path");
const { verdict, noRefNote } = require("./visual-verdict");
let n = 0; const t = (name, f) => { f(); n++; console.log("ok", name); };
t("no comparison (maxDiff null, e.g. typed request) -> SKIPPED, not FAIL", () => assert.strictEqual(verdict({ fails: [], diffs: [] }), "SKIPPED"));
t("missing reference with other non-visual failures -> visual SKIPPED", () => assert.strictEqual(verdict({ fails: ["English after switching back: inactive segment is outlined, not filled"], diffs: [] }), "SKIPPED"));
t("real diff over threshold -> FAIL", () => assert.strictEqual(verdict({ fails: ["visual: 4.20% pixels differ from reference (max 1%)"], diffs: [0.042] }), "FAIL"));
t("size mismatch against a reference -> FAIL", () => assert.strictEqual(verdict({ fails: ["visual: size 1280x900 vs reference 1280x700"], diffs: [] }), "FAIL"));
t("diff under threshold -> PASS", () => assert.strictEqual(verdict({ fails: [], diffs: [0.003] }), "PASS"));
t("--update-refs -> UPDATED", () => assert.strictEqual(verdict({ update: true }), "UPDATED"));
t("no-reference note is labeled skipped and is not a visual failure", () => { const m = noRefNote("spanish-translation-chromium-1280.png"); assert.ok(/^visual: no reference \(skipped\)/.test(m)); assert.strictEqual(verdict({ fails: [], diffs: [] }), "SKIPPED"); });
const src = fs.readFileSync(path.join(__dirname, "check-feature.js"), "utf8");
t("check-feature: a missing reference is logged as skipped, never ok(false)", () => { assert.ok(!/ok\(false, `visual: reference \$\{name\} missing`\)/.test(src)); assert.ok(/else if \(!fs\.existsSync\(ref\)\) \{ const m = noRefNote\(name\); log\(m\); skipped\.push\(m\); \}/.test(src)); });
t("check-feature: VISUAL result comes from the verdict (no 'v === null ? FAIL')", () => { assert.ok(!/v === null \? "FAIL"/.test(src)); assert.ok(src.includes("visualVerdict({ update: UPDATE, fails, diffs: visual })")); });
t("check-feature: a real diff over the threshold still calls ok(false) via the threshold check", () => assert.ok(src.includes("ok(d.ratio <= THRESH,") && src.includes('if (d.size) ok(false, `visual: size')));
console.log(`visual-verdict: ${n}/10 passed`);
