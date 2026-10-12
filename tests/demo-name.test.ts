// Run: npm test (compiles with tsc into .test-build, then node --test)
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { demoNameFrom, readDemoName } from "../app/demo-name";
import { BASE_HEADING } from "../app/base-heading";

const dir = mkdtempSync(join(tmpdir(), "demo-name-"));
const file = (name: string, body: string) => { const p = join(dir, name); writeFileSync(p, body); return p; };

test("missing file falls back to the base heading", () => {
  assert.equal(readDemoName(join(dir, "nope.json")), BASE_HEADING);
});
test("malformed JSON falls back", () => {
  assert.equal(readDemoName(file("bad.json", "{ slug: tabs")), BASE_HEADING);
  assert.equal(readDemoName(file("empty.json", "")), BASE_HEADING);
  assert.equal(demoNameFrom("null"), BASE_HEADING);
});
test("non-string or unknown slug falls back", () => {
  assert.equal(demoNameFrom('{"slug":42}'), BASE_HEADING);
  assert.equal(demoNameFrom('{"slug":["tabs"]}'), BASE_HEADING);
  assert.equal(demoNameFrom('{"slug":"not-on-menu"}'), BASE_HEADING);
});
test("valid slug resolves to the menu name", () => {
  assert.equal(readDemoName(file("ok.json", '{ "slug": "tabs" }')), "Tabs");
});
