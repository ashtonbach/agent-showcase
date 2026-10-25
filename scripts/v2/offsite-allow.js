// Network allowance and visual-reference helpers for check-feature.js (requested Oct 24, 11:17 PM CT).
// allowedOffsite: the only off-site requests a feature page may make. Vercel's preview toolbar, and the Cloudflare
// Web Analytics beacon that the CDN zone injects into production HTML (not app code). Exact host and path only.
const fs = require("fs");
const ALLOW = [/^https:\/\/vercel\.live\//, /^https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js(\/[A-Za-z0-9._-]*)?(\?[^#]*)?$/];
const allowedOffsite = (u) => ALLOW.some((r) => r.test(String(u)));
// refMeta: sidecar written next to a reference on --update-refs, so a later size mismatch can say which build the reference came from.
const pngSize = (buf) => (buf && buf.length >= 24 && buf.toString("ascii", 12, 16) === "IHDR" ? [buf.readUInt32BE(16), buf.readUInt32BE(20)] : null);
const refMeta = (buf, url, now = new Date()) => { const s = pngSize(buf) || [0, 0]; return { w: s[0], h: s[1], from: url || "", at: now.toISOString() }; };
// sizeNote: a size mismatch means the reference was taken from a different layout. It stays a visual FAIL (never silently
// passed), and names the reference's origin so a stale reference is told apart from a real regression.
const sizeNote = (d, ref) => {
  let m = null; try { m = JSON.parse(fs.readFileSync(ref + ".json", "utf8")); } catch (e) { /* older references have no sidecar */ }
  const src = m ? `reference from ${m.from || "unknown"} at ${m.at}` : "reference has no record of its source build (stale until regenerated with --update-refs)";
  return `visual: size ${d[0]}x${d[1]} vs reference ${d[2]}x${d[3]} (${src})`;
};
// blockingFails: visual diffs are informational unless strict; every other FAIL blocks.
const blockingFails = (fails, strict = false) => (strict ? fails.slice() : fails.filter((f) => !String(f).startsWith("visual")));
module.exports = { allowedOffsite, pngSize, refMeta, sizeNote, blockingFails };
