#!/usr/bin/env node
// Showcase v2 feature check + visual gate (Priya on the preview, Felix on production).
// usage: node check-feature.js <url> <slug> <who> <outdir> [--engine chromium|webkit] [--widths 1280,390] [--update-refs] [--threshold 0.01]
// Needs only `playwright` (run from a folder where it is installed, or set NODE_PATH). Exit 0 = PASS.
const path = require("path"), fs = require("fs");
const args = process.argv.slice(2), flag = (n, d) => { const i = args.indexOf(n); return i < 0 ? d : args[i + 1]; };
const [url, slug, who = "Check", outdir = "/tmp"] = args.filter((a, i) => !a.startsWith("--") && !(args[i - 1] || "").startsWith("--"));
const engine = flag("--engine", "chromium"), widths = flag("--widths", "1280,390").split(",").map(Number);
const UPDATE = args.includes("--update-refs"), THRESH = +flag("--threshold", "0.01");
const REFS = path.join(__dirname, "refs");
const pw = require("playwright");
const log = (m) => console.log(`[${who}] ${m}`);
const fails = [], ok = (c, m) => { log((c ? "PASS " : "FAIL ") + m); if (!c) fails.push(m); return !!c; };
const visual = [];
async function pixelDiff(page, a, b) {
  // in-page compare (no extra npm packages): returns {w,h,bad,ratio} or {size:[...]}
  return page.evaluate(async ([a, b]) => {
    const load = (s) => new Promise((r, j) => { const i = new Image(); i.onload = () => r(i); i.onerror = j; i.src = "data:image/png;base64," + s; });
    const [x, y] = await Promise.all([load(a), load(b)]);
    if (x.width !== y.width || Math.abs(x.height - y.height) > 2) return { size: [x.width, x.height, y.width, y.height] };
    const w = x.width, h = Math.min(x.height, y.height), c = (i) => { const k = document.createElement("canvas"); k.width = w; k.height = h; const g = k.getContext("2d"); g.drawImage(i, 0, 0); return g.getImageData(0, 0, w, h).data; };
    const p = c(x), q = c(y); let bad = 0;
    for (let i = 0; i < p.length; i += 4) if (Math.abs(p[i] - q[i]) + Math.abs(p[i + 1] - q[i + 1]) + Math.abs(p[i + 2] - q[i + 2]) > 48) bad++;
    return { w, h, bad, ratio: bad / (w * h) };
  }, [a, b]);
}
(async () => {
  const spec = require(path.join(__dirname, "specs", slug + ".js"));
  const b = await pw[engine].launch({ headless: true });
  for (const w of widths) {
    log(`--- ${engine} ${w}px`);
    const ctx = await b.newContext({ viewport: { width: w, height: w > 600 ? 800 : 844 }, deviceScaleFactor: 1, reducedMotion: spec.reducedMotion || "no-preference" });
    const page = await ctx.newPage();
    const errs = [], offsite = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    page.on("pageerror", (e) => errs.push(String(e)));
    const origin = new URL(url).origin;
    page.on("request", (r) => { const u = r.url(); if (!u.startsWith(origin) && !u.startsWith("data:") && !u.startsWith("blob:")) offsite.push(u); });
    const r = await page.goto(url + (url.includes("?") ? "&" : "?") + "v=" + Date.now(), { waitUntil: "networkidle" });
    ok(r && r.status() === 200, `HTTP status ${r && r.status()}`);
    const sec = page.locator(`section[data-lab="${slug}"]`);
    if (!ok((await sec.count()) === 1, `feature section [data-lab="${slug}"] present on first load`)) { await ctx.close(); continue; }
    await sec.scrollIntoViewIfNeeded();
    ok(await sec.isVisible(), "feature visible");
    ok(await page.locator("h1.page-title").isVisible(), "classic hero heading still visible");
    const sx = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(sx <= 0, `no sideways scroll (${sx}px overflow)`);
    const bb = await sec.boundingBox();
    ok(bb && bb.x >= 0 && bb.x + bb.width <= w + 1, `feature fits the ${w}px viewport`);
    await spec.check({ page, sec, ok, w, engine, log, phase: "before-shot" });
    if (spec.beforeShot) await spec.beforeShot({ page, sec, w });
    await page.addStyleTag({ content: ".site-header{position:static !important}" }); // sticky header must not cover tall features in the shot
    await page.waitForTimeout(300);
    const shot = await sec.screenshot({ animations: "disabled" });
    const name = `${slug}-${engine}-${w}.png`;
    fs.mkdirSync(outdir, { recursive: true }); fs.writeFileSync(path.join(outdir, name), shot);
    const ref = path.join(REFS, name);
    if (UPDATE) { fs.writeFileSync(ref, shot); log(`reference updated ${ref}`); }
    else if (!fs.existsSync(ref)) ok(false, `visual: reference ${name} missing`);
    else {
      const d = await pixelDiff(page, shot.toString("base64"), fs.readFileSync(ref).toString("base64"));
      if (d.size) ok(false, `visual: size ${d.size[0]}x${d.size[1]} vs reference ${d.size[2]}x${d.size[3]}`);
      else { visual.push(d.ratio); ok(d.ratio <= THRESH, `visual: ${(d.ratio * 100).toFixed(2)}% pixels differ from reference (max ${(THRESH * 100).toFixed(0)}%)`); }
    }
    if (spec.after) await spec.after({ page, sec, ok, w, engine, log, ctx });
    ok(offsite.length === 0, `no off-site network requests${offsite.length ? ": " + offsite.slice(0, 3).join(", ") : ""}`);
    ok(errs.length === 0, `console errors: ${errs.length ? errs.join(" | ").slice(0, 300) : "none"}`);
    await ctx.close();
  }
  await b.close();
  const v = visual.length ? Math.max(...visual) : null;
  log(fails.length ? `RESULT FAIL (${fails.length}): ${fails.join("; ")}` : "RESULT PASS, all checks passed");
  console.log("VISUAL " + JSON.stringify({ result: UPDATE ? "UPDATED" : fails.some((f) => f.startsWith("visual")) || v === null ? "FAIL" : "PASS", maxDiff: v, engine, widths }));
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { log(`RESULT FAIL error ${e.message}`); console.log('VISUAL {"result":"FAIL"}'); process.exit(1); });
