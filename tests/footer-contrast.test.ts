// Run: npm test. Footer text (.site-footer, .site-disclaimer) must meet WCAG AA 4.5:1 on both page background stops,
// with the footer's own opacity applied. Reads app/globals.css as text; no browser.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync(join(__dirname, "..", "..", "app", "globals.css"), "utf8");
const vars: Record<string, string> = {};
for (const m of css.matchAll(/--([a-z-]+):\s*([^;]+);/g)) if (!(m[1] in vars)) vars[m[1]] = m[2].trim();
const rules = (sel: string) => [...css.matchAll(new RegExp("(?:^|\\n)\\s*" + sel.replace(".", "\\.") + "\\s*\\{([^}]*)\\}", "g"))].map(m => m[1]).join(";");
const prop = (body: string, p: string) => { const all = [...body.matchAll(new RegExp("(?:^|[;{\\s])" + p + ":\\s*([^;]+)", "g"))]; return all.length ? all[all.length - 1][1].trim() : ""; };
type RGBA = [number, number, number, number];
const parse = (v: string): RGBA => {
  v = v.replace(/var\(--([a-z-]+)\)/, (_, n) => vars[n]).trim();
  const h = v.match(/^#([0-9a-f]{6})$/i); if (h) return [0, 2, 4].map(i => parseInt(h[1].slice(i, i + 2), 16)).concat(1) as RGBA;
  const r = v.match(/rgba?\(([^)]+)\)/); if (r) { const p = r[1].split(",").map(Number); return [p[0], p[1], p[2], p[3] ?? 1]; }
  throw new Error("cannot parse color " + v);
};
const lum = (c: number[]) => { const l = c.slice(0, 3).map(x => { x /= 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2]; };
const ratio = (a: number[], b: number[]) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const over = (fg: RGBA, a: number, bg: number[]) => fg.slice(0, 3).map((v, i) => a * v + (1 - a) * bg[i]);
const BGS = ["#14201A", "#101a15"].map(parse);   // body linear-gradient stops behind the footer
const footOpacity = Number(prop(rules(".site-footer"), "opacity") || 1);

for (const sel of [".site-footer", ".site-disclaimer"]) {
  test(`${sel} text is WCAG AA (4.5:1) on the page background`, () => {
    const c = parse(prop(rules(sel), "color"));
    for (const bg of BGS) {
      const r = ratio(over(c, c[3] * footOpacity, bg), bg);
      assert.ok(r >= 4.5, `${sel} contrast ${r.toFixed(2)}:1 < 4.5:1 on rgb(${bg.slice(0, 3)})`);
    }
  });
}
