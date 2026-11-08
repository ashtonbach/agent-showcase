#!/usr/bin/env node
// check-feature.js resolves specs/<slug>.js; break-copy must load and treat unused catalog keys separately.
const assert = require("assert");
const fs = require("fs");
const path = require("path");

function specFile(slug) {
  const base = /^custom-[0-9]{10,13}$/.test(slug) ? "custom" : slug;
  return path.join(__dirname, "specs", `${base}.js`);
}

function resolveSpec(slug) {
  const file = specFile(slug);
  assert.ok(fs.existsSync(file), `spec file missing for slug ${slug}: ${file}`);
  return require(file);
}

assert.ok(fs.existsSync(specFile("break-copy")), "break-copy spec file exists");
assert.ok(!fs.existsSync(specFile("no-such-slug-zxy")), "missing slug has no spec file");

const breakCopy = resolveSpec("break-copy");
const spanish = resolveSpec("spanish-translation");
assert.strictEqual(typeof breakCopy.check, "function");
assert.strictEqual(typeof breakCopy.after, "function");
assert.notStrictEqual(breakCopy._test.S, spanish._test.S);
assert.match(breakCopy._test.S, /break-copy/);

const { unusedKey, PAGE_TITLE } = breakCopy._test;
assert.strictEqual(PAGE_TITLE, "demo.break-copy");
assert.strictEqual(unusedKey("lab.spanish-translation.cta"), true);
assert.strictEqual(unusedKey("lab.spanish-translation.eyebrow"), true);
assert.strictEqual(unusedKey("demo.feature-grid"), true);
assert.strictEqual(unusedKey("demo.break-copy"), false);
assert.strictEqual(unusedKey("skip"), false);
assert.strictEqual(unusedKey("footer.disclaimer"), false);
assert.strictEqual(unusedKey("lab.spanish-translation.p1"), false);

const en = require(path.join(__dirname, "../../messages/en-US.json"));
const esPartial = { ...require(path.join(__dirname, "../../messages/es-ES.json")) };
esPartial["lab.spanish-translation.cta"] = en["lab.spanish-translation.cta"];
esPartial["demo.feature-grid"] = en["demo.feature-grid"];
const es = require(path.join(__dirname, "../../messages/es-ES.json"));
assert.ok("demo.break-copy" in en, "en-US.json has demo.break-copy");
assert.ok("demo.break-copy" in es, "es-ES.json has demo.break-copy");
assert.strictEqual(en["demo.break-copy"], "Copy coverage");
assert.ok(es["demo.break-copy"].trim(), "es-ES demo.break-copy is non-empty");
assert.notStrictEqual(es["demo.break-copy"].trim(), en["demo.break-copy"].trim(), "es-ES demo.break-copy differs from en-US");
assert.ok(/[áéíóúñ¿¡]|\b(de|del|la|el|cobertura|textos)\b/i.test(es["demo.break-copy"]), "es-ES demo.break-copy reads as Spanish");
assert.deepStrictEqual(Object.keys(en).sort(), Object.keys(es).sort(), "en-US and es-ES share the same message keys");

for (const it of [
  { key: "lab.spanish-translation.cta", en: en["lab.spanish-translation.cta"], es: esPartial["lab.spanish-translation.cta"] },
  { key: "lab.spanish-translation.heading", en: en["lab.spanish-translation.heading"], es: esPartial["lab.spanish-translation.heading"] },
  { key: "demo.break-copy", en: en["demo.break-copy"], es: es["demo.break-copy"] },
]) {
  const sameEn = it.es.trim() === it.en.trim();
  if (unusedKey(it.key)) assert.ok(sameEn, `unused ${it.key} may equal English in es-ES`);
  else assert.ok(!sameEn || it.en.length < 12, `visible ${it.key} is translated in fixture es-ES`);
}

console.log("spec-load.test.js: all checks passed");
