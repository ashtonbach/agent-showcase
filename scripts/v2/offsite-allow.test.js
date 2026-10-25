// node --test scripts/v2/offsite-allow.test.js
const test = require("node:test"), assert = require("node:assert"), fs = require("fs"), os = require("os"), path = require("path");
const { allowedOffsite, refMeta, sizeNote, exitCodeFor, pngSize } = require("./offsite-allow");
const B = "https://static.cloudflareinsights.com/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092";
test("edge beacon is allowed, with or without its version path", () => {
  assert.ok(allowedOffsite(B)); assert.ok(allowedOffsite("https://static.cloudflareinsights.com/beacon.min.js"));
  assert.ok(allowedOffsite("https://vercel.live/_next/x.js"));
});
test("look-alikes and other off-site requests are not allowed", () => {
  for (const u of ["https://static.cloudflareinsights.com.evil.io/beacon.min.js", "http://static.cloudflareinsights.com/beacon.min.js",
    "https://static.cloudflareinsights.com/other.js", "https://static.cloudflareinsights.com/beacon.min.js/../x", "https://evil.example.com/x.js",
    "https://cloudflareinsights.com/cdn-cgi/rum"]) assert.ok(!allowedOffsite(u), u);
});
test("a visual mismatch fails by default", () => {
  assert.strictEqual(exitCodeFor(["visual: 3.10% pixels differ from reference (max 2%)"]), 1);
  assert.strictEqual(exitCodeFor(["visual: size 1024x330 vs reference 1024x172"]), 1);
  assert.strictEqual(exitCodeFor(["one toggle button with aria-pressed"]), 1); assert.strictEqual(exitCodeFor([]), 0);
});
test("size mismatch stays a visual FAIL and names the reference source", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "refs-")), ref = path.join(d, "x.png");
  assert.match(sizeNote([1024, 330, 1024, 172], ref), /^visual: size 1024x330 vs reference 1024x172 \(reference has no record/);
  const png = Buffer.alloc(24); png.write("IHDR", 12, "ascii"); png.writeUInt32BE(1024, 16); png.writeUInt32BE(330, 20);
  assert.deepStrictEqual(pngSize(png), [1024, 330]);
  fs.writeFileSync(ref + ".json", JSON.stringify(refMeta(png, "https://example.test/showcase", new Date("2026-10-25T04:00:00Z"))));
  assert.match(sizeNote([1024, 300, 1024, 330], ref), /reference from https:\/\/example\.test\/showcase at 2026-10-25T04:00:00\.000Z/);
});
