#!/usr/bin/env node
// Build on top marker. The kit writes exactly one line "<!-- keep-lab: <slug> -->" in the PR body when the request says to keep
// the current section. gate.js reads it from the pull_request event (GITHUB_EVENT_PATH) in Merge Gates, so CI turns on KEEP_LAB
// without a workflow change. parse(): "" = no marker (normal mode), null = malformed or more than one marker (fail closed).
const fs = require("fs");
const parse = (body) => { const lines = String(body || "").split(/\r?\n/).filter((l) => /keep-lab:/.test(l));
  if (!lines.length) return ""; const m = lines.length === 1 && /^<!-- keep-lab: ([a-z0-9-]+) -->$/.exec(lines[0].trim()); return m ? m[1] : null; };
const fromEvent = (p = process.env.GITHUB_EVENT_PATH) => { if (!p) return ""; let e; try { e = JSON.parse(fs.readFileSync(p, "utf8")); } catch (x) { return ""; }
  return e && e.pull_request ? parse(e.pull_request.body) : ""; };
module.exports = { parse, fromEvent };
if (require.main === module) { const k = parse(process.env.PR_BODY); if (k === null) { console.error("bad keep-lab marker in PR body"); process.exit(1); } process.stdout.write(k); }
