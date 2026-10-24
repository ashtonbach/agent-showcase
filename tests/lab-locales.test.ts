// Every locale in the live language switcher must have a pack with the same keys, a button, and its own text.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const slug = JSON.parse(readFileSync(join(__dirname, "../../app/lab/current.json"), "utf8")).slug;
const src = readFileSync(join(__dirname, `../../app/lab/${slug}/index.tsx`), "utf8");
const EXPECTED = ["en-US", "es-ES", "fr-FR", "zh-CN", "ja-JP", "de-DE", "pt-BR"];

const union = [...(src.match(/type Locale = ([^;]+);/)?.[1] ?? "").matchAll(/"([\w-]+)"/g)].map((m) => m[1]);
const buttons = [...src.matchAll(/data-locale="([\w-]+)"/g)].map((m) => m[1]);
const packMap = Object.fromEntries([...(src.match(/const packs: Record<Locale, Msg> = \{([^}]+)\}/)?.[1] ?? "").matchAll(/"([\w-]+)": (\w+)/g)].map((m) => [m[1], m[2]]));
const block = (name: string) => {
  const b = src.match(new RegExp(`const ${name}: Msg = \\{([\\s\\S]*?)\\n\\};`))?.[1] ?? "";
  return Object.fromEntries([...b.matchAll(/^\s*"?([\w.-]+)"?:\s*\n?\s*("(?:[^"\\]|\\.)*")/gm)].map((m) => [m[1], JSON.parse(m[2])]));
};

test("all 7 locales are in the type, the packs and the buttons", () => {
  for (const l of EXPECTED) {
    assert.ok(union.includes(l), `Locale type has ${l}`);
    assert.ok(packMap[l], `packs has ${l}`);
    assert.ok(buttons.includes(l), `button for ${l}`);
  }
});
test("every pack has the English keys with distinct, non-empty text", () => {
  const en = block(packMap["en-US"]);
  assert.ok(Object.keys(en).length >= 5);
  for (const l of EXPECTED.slice(1)) {
    const p = block(packMap[l]);
    assert.deepEqual(Object.keys(p).sort(), Object.keys(en).sort(), `${l} keys`);
    assert.notEqual(p["lab.spanish-translation.heading"], en["lab.spanish-translation.heading"], `${l} heading translated`);
    for (const k of Object.keys(p)) assert.ok(p[k].trim(), `${l} ${k} non-empty`);
  }
});
