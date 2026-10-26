// node --test scripts/v2/pr-body-check.test.js
const test = require("node:test"), assert = require("node:assert"), { spawnSync } = require("child_process"), fs = require("fs"), path = require("path");
const { check, emailsIn } = require("./pr-body-check");
// No literal email addresses in this file (public repo, diff rule): build every fixture at runtime.
const AT = "@", em = (l, d) => l + AT + d;
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
  assert.strictEqual(check(FOOT + "contact " + em("me", "example.com") + "\n").code, 4);
  assert.strictEqual(check(em("First.Last", "Sub.Example.co.uk")).code, 4);
  assert.strictEqual(cli("x " + em("a", "b.io") + "\n" + FOOT), 4);
});
test("the noreply commit address is caught too", () => {
  assert.strictEqual(check(FOOT + "Co-authored-by: x <" + em("1+someone", "users.noreply.github.com") + ">").code, 4);
});
test("Author line must name a team agent, and the footer must be the last two lines, adjacent", () => {
  assert.strictEqual(check("Author: AshtonBach Coder\n", { author: true }).code, 5);
  assert.strictEqual(check("Author: AshtonBach Coder (Alder, Builder)\n", { author: true }).code, 5);
  assert.strictEqual(check("x\r\n\r\n" + FOOT.replace(/\n/g, "\r\n"), { author: true }).code, 0);
  for (const n of ["Bob", "Ashton", "Grok", "Jonah", "Priya"]) assert.strictEqual(check("x\n\nAuthor: AshtonBach Coder - " + n + "\nMerged by: pending\n", { author: true }).code, 5, n);
  for (const n of ["Ash", "Hazel", "Alder", "Rowan", "Cedar", "Linden"]) assert.strictEqual(check("x\n\nAuthor: AshtonBach Coder - " + n + "\nMerged by: pending, @ashtonbach (https://github.com/ashtonbach)\n", { author: true }).code, 0, n);
  assert.strictEqual(check(FOOT + "\nAll named contributors are AI agents.\n", { author: true }).code, 5, "footer not last");
  assert.strictEqual(check("Author: AshtonBach Coder - Alder\nReview: x\nMerged by: pending\n", { author: true }).code, 5, "not adjacent");
});
test("--agent accepts only team agent names", () => {
  for (const n of ["Bob", "", "alder", "Jonah", "Ashton"]) assert.strictEqual(cli("", "--agent", n), 6, n);
  for (const n of ["Ash", "Hazel", "Alder", "Rowan", "Cedar", "Linden"]) assert.strictEqual(cli("", "--agent", n), 0, n);
});
test("SSH remotes are not emails; a plain git@host address still is", () => {
  assert.strictEqual(check("clone git@github.com:ashtonbach/agent-showcase.git\n" + FOOT, { author: true }).code, 0);
  assert.strictEqual(check("mail " + em("git", "github.com") + " please").code, 4);
});
test("reset exception: agent-less Author allowed only with --reset, footer still last, email still refused", () => {
  const R = "x\n\nAuthor: AshtonBach Coder\nMerged by: pending, @ashtonbach (https://github.com/ashtonbach)\n";
  assert.strictEqual(check(R, { author: true }).code, 5);
  assert.strictEqual(cli(R, "--author", "--reset"), 0);
  assert.strictEqual(check("x\n\nAuthor: AshtonBach Coder - Bob\nMerged by: x\n", { author: true, reset: true }).code, 5);
  assert.strictEqual(check(em("a", "b.io") + "\n" + R, { author: true, reset: true }).code, 4);
});
test("PR body check workflow runs on edits too, with --author, from the event payload, for all PRs", () => {
  const y = fs.readFileSync(path.join(__dirname, "../../.github/workflows/pr-body-check.yml"), "utf8");
  assert.ok(/types: \[opened, edited, synchronize, reopened\]/.test(y), "edited trigger");
  assert.ok(/PR_BODY: \$\{\{ github\.event\.pull_request\.body \}\}/.test(y), "body comes from the event payload via env");
  assert.ok(/node scripts\/v2\/pr-body-check\.js --author \$RESET_FLAG/.test(y) && !/needs:/.test(y), "--author, runs for all PRs");
  assert.ok(/startsWith\(github\.event\.pull_request\.title, 'Reset: '\) && '--reset'/.test(y), "reset exception keyed on the reset title");
  assert.ok(!/pr-body-check/.test(fs.readFileSync(path.join(__dirname, "../../.github/workflows/merge-gates.yml"), "utf8")), "not in merge-gates (edits must not re-run the gates)");
});
test("reset PR body: checked before gh pr create, footer last, RESET_AGENT allowlisted", () => {
  const s = fs.readFileSync(path.join(__dirname, "reset.sh"), "utf8");
  assert.ok(/-b "\$BODY"/.test(s) && s.indexOf("pr-body-check.js\" --author --reset") > 0 && s.indexOf("pr-body-check.js\" --author --reset") < s.indexOf("gh pr create"));
  assert.ok(/\nAuthor: AshtonBach Coder\$\{RESET_AGENT:\+ - \$RESET_AGENT\}\nMerged by: pending, @ashtonbach \(https:\/\/github\.com\/ashtonbach\)"\n/.test(s), "footer adjacent and last");
  assert.ok(/--agent "\$RESET_AGENT" \|\| \{ echo "RESET_FAIL/.test(s), "invalid RESET_AGENT stops the reset");
  assert.ok(/ALLOWED EXCEPTION/.test(s), "exception documented");
});
test("CodeRabbit's appended release-notes block does not break footer-last, but emails in it still fail", () => {
  const cr = (x) => "\n<!-- This is an auto-generated comment: release notes by coderabbit.ai -->\n## Summary\n* " + x + "\n<!-- end of auto-generated comment: release notes by coderabbit.ai -->\n";
  assert.strictEqual(check("x\n\n" + FOOT + cr("ok"), { author: true }).code, 0);
  assert.strictEqual(check("x\n\n" + FOOT + cr(em("a", "b.io")), { author: true }).code, 4);
  assert.strictEqual(check("x\n\n" + FOOT + cr("ok") + "trailing\n", { author: true }).code, 5);
});
test("Merged-by line must be exactly the pending @ashtonbach line", () => {
  const A = "x\n\nAuthor: AshtonBach Coder - Alder\n";
  for (const m of ["Merged by: whoever", "Merged by: pending", "Merged by: pending, @ashtonbach", "Merged by: pending, @ashtonbach (https://github.com/ashtonbach) extra", "merged by: pending, @ashtonbach (https://github.com/ashtonbach)"])
    assert.strictEqual(check(A + m + "\n", { author: true }).code, 5, m);
  assert.strictEqual(check(A + "Merged by: pending, @ashtonbach (https://github.com/ashtonbach)", { author: true }).code, 0, "no trailing newline");
  assert.strictEqual(check("x\n\nAuthor: AshtonBach Coder\nMerged by: whoever\n", { author: true, reset: true }).code, 5, "reset too");
});
test("only the GitHub SSH form is an SSH remote; obfuscated @ forms are caught; asset names are not emails", () => {
  for (const t of [em("git", "gmail.com") + ":x", em("git", "gitlab.com") + ":o/r", "a&#" + "64;b.com", "a&#" + "x40;b.com", "a&" + "commat;b.com", "a" + "\uFF20" + "b.com", "mailto:a" + "%40b.com", "<a href=\"mailto:a" + "%40b.com\">x</a>"])
    assert.strictEqual(emailsIn(t), 1, t);
  for (const t of ["logo" + AT + "2x.png", "icon" + AT + "3x.webp", "hero" + AT + "2x.JPG", em("git", "github.com") + ":ashtonbach/agent-showcase.git", "https://x.io/a" + "%40b.com"])
    assert.strictEqual(emailsIn(t), 0, t);
});
test("the PR template, filled in, passes: footer is last", () => {
  const t = fs.readFileSync(path.join(__dirname, "../../.github/pull_request_template.md"), "utf8");
  assert.strictEqual(check(t.replaceAll("<Agent>", "Alder"), { author: true }).code, 0);
  assert.ok(/\nAuthor: AshtonBach Coder - <Agent>\nMerged by: pending, @ashtonbach \(https:\/\/github\.com\/ashtonbach\)\n?$/.test(t));
});
test("workflow runs main's checker: checks out the base sha, not the PR head", () => {
  const y = fs.readFileSync(path.join(__dirname, "../../.github/workflows/pr-body-check.yml"), "utf8");
  assert.ok(/uses: actions\/checkout@v4\n\s+with:\n\s+ref: \$\{\{ github\.event\.pull_request\.base\.sha \}\}/.test(y));
  assert.ok(!/head\.(sha|ref)/.test(y));
});
test("this test file has no literal email address", () => {
  assert.strictEqual(emailsIn(fs.readFileSync(__filename, "utf8")), 0);
});
