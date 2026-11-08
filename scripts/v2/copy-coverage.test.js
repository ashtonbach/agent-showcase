#!/usr/bin/env node
// Copy coverage CI runs for spanish-translation and break-copy only; custom slugs skip.
const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../..");
const menu = JSON.parse(fs.readFileSync(path.join(root, "app/lab/menu.json"), "utf8"));
const workflow = fs.readFileSync(path.join(root, ".github/workflows/merge-gates.yml"), "utf8");

const COPY_COVERAGE_SLUGS = new Set(["spanish-translation", "break-copy"]);

function copyCoverageApplies(isFeature, slug) {
  if (!isFeature) return false;
  return COPY_COVERAGE_SLUGS.has(slug);
}

function coveragePercent(en, es) {
  const translated = Object.keys(en).filter(
    (k) => k in es && es[k].trim() !== "" && (en[k].length < 12 || es[k].trim() !== en[k].trim())
  ).length;
  return Math.round((translated / Object.keys(en).length) * 100);
}

const breakCopy = menu.features.find((f) => f.slug === "break-copy");
assert.ok(breakCopy, "menu lists break-copy");
assert.strictEqual(breakCopy.name, "Copy coverage");
assert.deepStrictEqual(breakCopy.accept, [
  "Try to break it: built on purpose so the Copy coverage gate blocks it",
  "Must never merge",
]);
assert.ok(COPY_COVERAGE_SLUGS.has("break-copy"), "break-copy is a copy-coverage slug");

assert.strictEqual(copyCoverageApplies(true, "spanish-translation"), true);
assert.strictEqual(copyCoverageApplies(true, "break-copy"), true);
assert.strictEqual(copyCoverageApplies(true, "tabs"), false);
assert.strictEqual(copyCoverageApplies(true, "custom-1792280000123"), false);
assert.strictEqual(copyCoverageApplies(false, "spanish-translation"), false);

assert.ok(/break-copy/.test(workflow), "merge-gates.yml mentions break-copy for copy coverage");
assert.ok(/spanish-translation/.test(workflow), "merge-gates.yml still covers spanish-translation");

const en = require(path.join(root, "messages/en-US.json"));
const esPass = { ...require(path.join(root, "messages/es-ES.json")) };
const esFail = { ...esPass, "lab.spanish-translation.cta": en["lab.spanish-translation.cta"], "lab.spanish-translation.p2": en["lab.spanish-translation.p2"] };
assert.ok(coveragePercent(en, esPass) >= 90, "full es-ES.json in repo passes 90%");
assert.strictEqual(coveragePercent(en, esFail), 89, "16/18 keys translated fails the 90% gate");

console.log("copy-coverage.test.js: all checks passed");
