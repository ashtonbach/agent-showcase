// node --test scripts/v2/pr-body-check.test.js
const test = require("node:test"), assert = require("node:assert"), { spawnSync } = require("child_process"), fs = require("fs"), path = require("path");
const { check } = require("./pr-body-check");
const FOOT = "Author: AshtonBach Coder - Alder\nMerged by: pending, @ashtonbach (https://github.com/ashtonbach)\n";
const cli = (body, ...a) => spawnSync(process.execPath, [path.join(__dirname, "pr-body-check.js"), ...a], { input: body }).status;
test("clean body with the standard footer passes", () => {
  assert.strictEqual(check("## Requested change\n- x\n\n" + FOOT, { author: true }).code, 0);
  assert.strictEqual(cli("## x\n" + FOOT, "--author"), 0);
});
test("github.com URL and @handle in the Merged-by line are not emails", () => {
  assert.strictEqual(check(FOOT).code, 0);
  assert.strictEqual(check("see https://github.com/ashtonbach/agent-showcase/pull/1 by @ashtonbach").code, 0);
});
test("a body with an email fails", () => {
  assert.strictEqual(check(FOOT + "contact me@example.com\n").code, 4);
  assert.strictEqual(check("First.Last@Sub.Example.co.uk").code, 4);
  assert.strictEqual(cli("x a@b.io\n" + FOOT), 4);
});
test("the noreply commit address is caught too", () => {
  assert.strictEqual(check(FOOT + "Co-authored-by: x <334832153+ashtonbach-coder@users.noreply.github.com>").code, 4);
});
test("Author line must name the agent", () => {
  assert.strictEqual(check("Author: AshtonBach Coder\n", { author: true }).code, 5);
  assert.strictEqual(check("Author: AshtonBach Coder (Alder, Builder)\n", { author: true }).code, 5);
  assert.strictEqual(check("Author: AshtonBach Coder - Alder\r\n", { author: true }).code, 0);
});
test("merge-gates runs the email check on every PR body from the event payload", () => {
  const y = fs.readFileSync(path.join(__dirname, "../../.github/workflows/merge-gates.yml"), "utf8");
  const job = y.slice(y.indexOf("  pr-body-check:"));
  assert.ok(job.length > 0 && /PR_BODY: \$\{\{ github\.event\.pull_request\.body \}\}/.test(job), "body comes from the event payload via env");
  assert.ok(/node scripts\/v2\/pr-body-check\.js/.test(job) && !/needs:/.test(job.split("\n  ").slice(0, 3).join()), "runs for all PRs, not only feature PRs");
});
test("reset PR body carries the Author line and is checked before gh pr create", () => {
  const s = fs.readFileSync(path.join(__dirname, "reset.sh"), "utf8");
  assert.ok(/-b "\$BODY"/.test(s) && s.indexOf("pr-body-check.js") < s.indexOf("gh pr create"));
  assert.ok(/^BODY="Author: AshtonBach Coder\$\{RESET_AGENT:\+ - \$RESET_AGENT\}$/m.test(s));
});
