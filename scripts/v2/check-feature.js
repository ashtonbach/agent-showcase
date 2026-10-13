#!/usr/bin/env node
// Showcase v2 feature check + visual gate (Priya on the preview, Felix on production).
// usage: node check-feature.js <url> <slug> <who> <outdir> [--engine chromium|webkit] [--widths 1280,390] [--update-refs] [--threshold 0.01]
// Needs only `playwright` (run from a folder where it is installed, or set NODE_PATH). Exit 0 = PASS.
const path = require("path"), fs = require("fs");
const args = process.argv.slice(2), flag = (n, d) => { const i = args.indexOf(n); return i < 0 ? d : args[i + 1]; };
const [url, slug, who = "Check", outdir = "/tmp"] = args.filter((a, i) => !a.startsWith("--") && !(args[i - 1] || "").startsWith("--"));
// ART-CHECK-BEGIN
// Real-art rule (2026-10-13): flat line icons (e.g. 3-colour Forest Mist) must pass; blank, near-blank or single flat colour
// slots must fail. Background = the most common colour; "drawn" pixels differ clearly from it. Main colours = colours
// covering at least 1% of the slot's inner area (coarse 4-bit buckets, so anti-aliasing does not count as extra colours).
const ART_STATS = async (s) => {
  const i = await new Promise((r, j) => { const m = new Image(); m.onload = () => r(m); m.onerror = j; m.src = "data:image/png;base64," + s; });
  const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const g = c.getContext("2d"); g.drawImage(i, 0, 0);
  // Measure the inner 70% of the slot so a tile's rounded corners or border against the page cannot pass for drawn content.
  const ix = Math.floor(i.width * 0.15), iy = Math.floor(i.height * 0.15);
  const d = g.getImageData(ix, iy, Math.max(1, i.width - 2 * ix), Math.max(1, i.height - 2 * iy)).data, hist = new Map(); let n = 0, sum = 0, sq = 0;
  for (let q = 0; q < d.length; q += 4) { const L = 0.299 * d[q] + 0.587 * d[q + 1] + 0.114 * d[q + 2]; sum += L; sq += L * L; n++; const key = (d[q] >> 4) << 8 | (d[q + 1] >> 4) << 4 | (d[q + 2] >> 4); hist.set(key, (hist.get(key) || 0) + 1); }
  let bg = 0, best = -1; for (const [k, v] of hist) if (v > best) { best = v; bg = k; }
  const br = ((bg >> 8) & 15) * 16 + 8, bgG = ((bg >> 4) & 15) * 16 + 8, bb = (bg & 15) * 16 + 8; let drawn = 0;
  for (let q = 0; q < d.length; q += 4) if (Math.max(Math.abs(d[q] - br), Math.abs(d[q + 1] - bgG), Math.abs(d[q + 2] - bb)) > 32) drawn++;
  let colors = 0; for (const v of hist.values()) if (v >= n * 0.01) colors++;
  const m = sum / n; return { sd: Math.sqrt(Math.max(0, sq / n - m * m)), colors, content: drawn / n };
};
const artVerdict = (st) => st.content >= 0.03 && st.colors >= 2 && st.sd >= 4;
// ART-CHECK-END
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
    // Anti-alias tolerant: a pixel only counts as different if no pixel within 1px in the OTHER image matches it
    // (both directions). Glyph-edge smoothing that differs between machines (cloud VM vs box fonts/hinting) is ignored;
    // moved, missing or changed content (different text, colour, layout) still counts. The 1% ratio limit is unchanged.
    // Compare luminance too: subpixel (LCD, coloured-fringe) vs greyscale text smoothing differs between machines but keeps luminance.
    const L = (a, i) => 0.299 * a[i] + 0.587 * a[i + 1] + 0.114 * a[i + 2];
    const d = (a, i, b, j) => Math.abs(a[i] - b[j]) + Math.abs(a[i + 1] - b[j + 1]) + Math.abs(a[i + 2] - b[j + 2]) <= 48 || Math.abs(L(a, i) - L(b, j)) <= 16;
    const near = (a, b, x0, y0) => { for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x0 + dx, yy = y0 + dy; if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue; if (d(a, (y0 * w + x0) * 4, b, (yy * w + xx) * 4)) return true; } return false; };
    let raw = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = (y * w + x) * 4; if (d(p, i, q, i)) continue; raw++; if (!near(p, q, x, y) || !near(q, p, x, y)) bad++; }
    return { w, h, bad, raw, ratio: bad / (w * h), rawRatio: raw / (w * h) };
  }, [a, b]);
}
if (args[0] === "--compare") { // node check-feature.js --compare a.png b.png : print the diff ratio only
  (async () => { const b = await require("playwright").chromium.launch(); const pg = await b.newPage();
    const d = await pixelDiff(pg, fs.readFileSync(args[1]).toString("base64"), fs.readFileSync(args[2]).toString("base64"));
    console.log(JSON.stringify(d)); await b.close(); process.exit(d.size || d.ratio > THRESH ? 1 : 0); })(); return; }
(async () => {
  const spec = require(path.join(__dirname, "specs", slug + ".js"));
  const b = await pw[engine].launch({ headless: true });
  for (const w of widths) {
    log(`--- ${engine} ${w}px`);
    const ctx = await b.newContext({ viewport: { width: w, height: w > 600 ? 800 : 844 }, deviceScaleFactor: 1, reducedMotion: spec.reducedMotion || "no-preference" });
    const page = await ctx.newPage();
    const errs = [], offsite = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    let artMiss = 0; // missing artwork (404 under /lab/<slug>/) is allowed: the feature shows its fallback
    page.on("response", (r) => { if (r.status() === 404 && new URL(r.url()).pathname.startsWith(`/lab/${slug}/`)) artMiss++; });
    page.on("pageerror", (e) => errs.push(String(e)));
    const origin = new URL(url).origin;
    // Vercel injects its preview toolbar (vercel.live) on preview deployments only: block it, it is not part of the site.
    await page.route(/^https:\/\/vercel\.live\//, (rt) => rt.fulfill({ status: 200, contentType: "application/javascript", body: "" }));
    page.on("request", (r) => { const u = r.url(); if (/^https:\/\/vercel\.live\//.test(u)) return; if (!u.startsWith(origin) && !u.startsWith("data:") && !u.startsWith("blob:")) offsite.push(u); });
    const r = await page.goto(url + (url.includes("?") ? "&" : "?") + "v=" + Date.now(), { waitUntil: "networkidle" });
    ok(r && r.status() === 200, `HTTP status ${r && r.status()}`);
    const sec = page.locator(`section[data-lab="${slug}"]`);
    if (!ok((await sec.count()) === 1, `feature section [data-lab="${slug}"] present on first load`)) { await ctx.close(); continue; }
    await sec.scrollIntoViewIfNeeded();
    ok(await sec.isVisible(), "feature visible");
    ok(!(await page.locator("h1.page-title").isVisible()), "hero hidden while a feature is shown");
    const sx = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(sx <= 0, `no sideways scroll (${sx}px overflow)`);
    const bb = await sec.boundingBox();
    ok(bb && bb.x >= 0 && bb.x + bb.width <= w + 1, `feature fits the ${w}px viewport`);
    await spec.check({ page, sec, ok, w, engine, log, phase: "before-shot" });
    if (spec.art) { // design-led: Naomi's artwork must load (or show its fallback) and fit; its pixels are masked from the diff
      const arts = sec.locator("[data-art]"), n = await arts.count(), sb = await sec.boundingBox();
      let img = 0, fb = 0, broken = 0, outside = 0;
      for (let k = 0; k < n; k++) {
        const a = arts.nth(k); if (!(await a.isVisible())) continue;
        const kind = await a.getAttribute("data-art");
        if (kind === "image") { img++; if (!(await a.evaluate((e) => e.complete && e.naturalWidth > 0))) broken++; } else fb++;
        const b = await a.boundingBox(); if (!b || b.x < sb.x - 1 || b.y < sb.y - 1 || b.x + b.width > sb.x + sb.width + 1 || b.y + b.height > sb.y + sb.height + 1 || b.width < 8 || b.height < 8) outside++;
      }
      ok(img + fb >= spec.art, `artwork slots shown (${img} image, ${fb} fallback; want ${spec.art})`);
      ok(broken === 0, `artwork images load (${broken} broken)`);
      ok(outside === 0, `artwork fits the feature (${outside} outside or too small)`);
      // Render check: a blank art slot must never pass. An art file that is served (no 404) but shows the fallback means
      // the browser could not decode it (e.g. malformed SVG); every visible slot's pixels must also show real artwork.
      ok(!(fb > 0 && artMiss === 0), `artwork renders, not the fallback (${fb} fallback shown while the art file is served)`);
      await page.addStyleTag({ content: ".site-header{position:static !important}" }); // fixed header must not overlap the measured slot
      for (let k = 0; k < n; k++) {
        const a = arts.nth(k); if (!(await a.isVisible())) continue;
        await a.scrollIntoViewIfNeeded(); await page.waitForTimeout(150);
        const png = await a.screenshot({ animations: "disabled" });
        const st = await page.evaluate(ART_STATS, png.toString("base64"));
        ok(artVerdict(st), `artwork slot ${k + 1} shows real drawn art, not a blank box or flat colour (${(st.content * 100).toFixed(1)}% drawn pixels, min 3%; ${st.colors} main colours, min 2; luminance stddev ${st.sd.toFixed(1)}, min 4)`);
      }
    }
    if (spec.beforeShot) await spec.beforeShot({ page, sec, w });
    await page.addStyleTag({ content: ".site-header{position:static !important} vercel-live-feedback,#vercel-live-feedback-container{display:none !important}" }); // sticky header must not cover tall features in the shot
    await page.waitForTimeout(300);
    const shot = await sec.screenshot({ animations: "disabled", ...(spec.art ? { mask: [sec.locator("[data-art]")], maskColor: "#FF00FF" } : {}) });
    const name = `${slug}-${engine}-${w}.png`;
    fs.mkdirSync(outdir, { recursive: true });
    // The saved screenshot is the real page (art visible). Only the pixel-diff copy masks the art; saving the masked copy made
    // reports show a magenta square where Naomi's avatar really renders (Quote card, 10/13).
    fs.writeFileSync(path.join(outdir, name), spec.art ? await sec.screenshot({ animations: "disabled" }) : shot);
    const ref = path.join(REFS, name);
    if (UPDATE) { fs.writeFileSync(ref, shot); log(`reference updated ${ref}`); }
    else if (!fs.existsSync(ref)) ok(false, `visual: reference ${name} missing`);
    else {
      const d = await pixelDiff(page, shot.toString("base64"), fs.readFileSync(ref).toString("base64"));
      if (d.size) ok(false, `visual: size ${d.size[0]}x${d.size[1]} vs reference ${d.size[2]}x${d.size[3]}`);
      else { visual.push(d.ratio); ok(d.ratio <= THRESH, `visual: ${(d.ratio * 100).toFixed(2)}% pixels differ from reference (max ${(THRESH * 100).toFixed(0)}%; raw ${(d.rawRatio * 100).toFixed(2)}% before anti-alias tolerance)`); }
    }
    if (spec.after) await spec.after({ page, sec, ok, w, engine, log, ctx });
    ok(offsite.length === 0, `no off-site network requests${offsite.length ? ": " + offsite.slice(0, 3).join(", ") : ""}`);
    if (artMiss) { log(`artwork missing: ${artMiss} file(s) under /lab/${slug}/, fallback shown`); for (let k = 0; k < artMiss; k++) { const j = errs.findIndex((e) => /Failed to load resource.*404/.test(e)); if (j >= 0) errs.splice(j, 1); } }
    ok(errs.length === 0, `console errors: ${errs.length ? errs.join(" | ").slice(0, 300) : "none"}`);
    await ctx.close();
  }
  await b.close();
  const v = visual.length ? Math.max(...visual) : null;
  log(fails.length ? `RESULT FAIL (${fails.length}): ${fails.join("; ")}` : "RESULT PASS, all checks passed");
  console.log("VISUAL " + JSON.stringify({ result: UPDATE ? "UPDATED" : fails.some((f) => f.startsWith("visual")) || v === null ? "FAIL" : "PASS", maxDiff: v, engine, widths }));
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { log(`RESULT FAIL error ${e.message}`); console.log('VISUAL {"result":"FAIL"}'); process.exit(1); });
