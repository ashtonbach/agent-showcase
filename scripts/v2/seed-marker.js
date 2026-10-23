#!/usr/bin/env node
// Change-run seed marker. A change run edits an existing section, copied (seeded) from the commit where that section last
// shipped. The kit sets SEED_FROM=<section>@<commit> and writes exactly one PR body line "<!-- seed-from: <section>@<commit> -->",
// which gate.js reads from the pull_request event (GITHUB_EVENT_PATH) in Merge Gates, the same way as keep-lab (no workflow change).
// parse(): "" = no marker, null = malformed or more than one marker (fail closed), else { slug, sha }.
const fs = require("fs");
const RE = /^([a-z0-9-]+)@([0-9a-f]{40})$/;
const one = (s) => { const m = RE.exec(String(s).trim()); return m ? { slug: m[1], sha: m[2] } : null; };
const parse = (body) => { const lines = String(body || "").split(/\r?\n/).filter((l) => /seed-from:/.test(l));
  if (!lines.length) return ""; const m = lines.length === 1 && /^<!-- seed-from: (\S+) -->$/.exec(lines[0].trim()); return m ? one(m[1]) : null; };
const fromEvent = (p = process.env.GITHUB_EVENT_PATH) => { if (!p) return ""; let e; try { e = JSON.parse(fs.readFileSync(p, "utf8")); } catch (x) { return ""; }
  return e && e.pull_request ? parse(e.pull_request.body) : ""; };
const fromEnv = (v = process.env.SEED_FROM) => (v ? one(v) : "");
module.exports = { parse, fromEvent, fromEnv };
