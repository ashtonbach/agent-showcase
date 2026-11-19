#!/usr/bin/env node
// Locale specs (spanish-translation, break-copy) run from a trusted main checkout, but must compare the page with the PR's own
// messages/*.json. The kit passes the PR head's message files as PR_MESSAGES_DIR; without it the checkout's messages/ is used.
// Run spanish-translation-1795041974 (PR #492): the spec read main's es-ES.json, so the PR's own translation failed "matches es-ES.json".
const assert = require("assert"), fs = require("fs"), os = require("os"), path = require("path"), { execFileSync } = require("child_process");
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pr-msg-"));
fs.writeFileSync(path.join(dir, "es-ES.json"), JSON.stringify({ "nav.live": "Texto del PR" }));
fs.writeFileSync(path.join(dir, "en-US.json"), JSON.stringify({ "nav.live": "PR text" }));
const probe = (slug, env) => JSON.parse(execFileSync(process.execPath, ["-e",
  `const s=require(${JSON.stringify(path.join(__dirname, "specs"))}+"/"+process.argv[1]+".js")._test; const es=s.load("es-ES.json")||{}; console.log(JSON.stringify({msg:s.MSG, live:es["nav.live"]}))`, slug],
  { env: { PATH: process.env.PATH, ...env } }).toString());
const repoMsg = path.join(__dirname, "..", "..", "messages"), mainEs = JSON.parse(fs.readFileSync(path.join(repoMsg, "es-ES.json"), "utf8"));
for (const slug of ["spanish-translation", "break-copy"]) {
  const a = probe(slug, { PR_MESSAGES_DIR: dir });
  assert.strictEqual(a.msg, dir, `${slug}: PR_MESSAGES_DIR is the message folder`);
  assert.strictEqual(a.live, "Texto del PR", `${slug}: es-ES.json comes from PR_MESSAGES_DIR (the PR's file), not this checkout`);
  const b = probe(slug, {});
  assert.strictEqual(path.resolve(b.msg), path.resolve(repoMsg), `${slug}: no PR_MESSAGES_DIR -> this checkout's messages/`);
  assert.strictEqual(b.live, mainEs["nav.live"], `${slug}: no PR_MESSAGES_DIR -> this checkout's es-ES.json`);
  const c = probe(slug, { PR_MESSAGES_DIR: "relative/dir" });
  assert.strictEqual(path.resolve(c.msg), path.resolve(repoMsg), `${slug}: a relative PR_MESSAGES_DIR is ignored`);
}
fs.rmSync(dir, { recursive: true, force: true });
console.log("spec-messages-dir: all passed");
