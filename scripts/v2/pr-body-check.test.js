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
  for (const t of ["logo" + AT + "2x.png", "icon" + AT + "3x.webp", "hero" + AT + "2x.JPG", em("git", "github.com") + ":ashtonbach/agent-showcase.git"])
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
test("spelled-out and spaced emails are caught; ordinary prose is not", () => {
  // glue pieces at runtime so this file itself holds no spelled-out address
  const g = (...p) => p.join("");
  for (const t of [g("a [", "at] b [", "dot] com"), g("a(", "at)b.com"), g("a (", "at) b (", "dot) io"), g("a {", "AT} b {", "DOT} org"), g("a ", AT, " b.com"), g("a", AT, " b.com"), "a" + "&#" + "64b.com", "a" + "&#" + "x40b.com", "https://x.io/a" + "%40b.com", "a" + "%40" + "b.com"])
    assert.strictEqual(emailsIn(t), 1, t);
  for (const t of ["look at the dot", "meet at noon", "we met at the park. Then left", g("look (", "at) the dot"), "price @ 5.00 each", "thanks @ashtonbach.", "ping @Rowan at noon", "logo" + AT + "2x.png", em("git", "github.com") + ":o/r"])
    assert.strictEqual(emailsIn(t), 0, t);
  assert.strictEqual(check("x\n\nAuthor: AshtonBach Coder - Alder\nMerged by: pending, @ashtonbach (https://github.com/ashtonbach)", { author: true }).code, 0, "footer handle unaffected");
});

// Owner first name (with the companion kit change): built at runtime so this public file never contains it.
const NM = ["D", "a", "v", "i", "d"].join("");
test("the owner's first name is refused as a whole word, any case, with or without --author (exit 8)", () => {
  for (const b of [NM + " asked for this", "per " + NM.toLowerCase() + "'s rule", NM.toUpperCase(), "x\n(" + NM + ")\n"]) {
    assert.strictEqual(check("## Requested change\n" + b + "\n\n" + FOOT, { author: true }).code, 8, b);
    assert.strictEqual(check(b).code, 8, b);
    assert.strictEqual(cli(b + "\n" + FOOT, "--author"), 8, b);
    assert.strictEqual(cli(b + "\n" + FOOT.replace(" - Alder", ""), "--author", "--reset"), 8, "reset PRs too: " + b);
  }
  assert.match(check(NM).msg, /^PR_BODY_NAME_REFUSED/);
});
test("only the whole word: longer words that contain it pass", () => {
  for (const ok of [NM + "son", "x" + NM.toLowerCase() + "y.example", NM.toLowerCase() + "2", "**" + NM + "son**"])
    assert.strictEqual(check("## Requested change\n" + ok + "\n\n" + FOOT, { author: true }).code, 0, ok);
});
// Bypasses from review: every variant is built from NM at runtime.
const ins = (s, i, x) => s.slice(0, i) + x + s.slice(i);
const BYPASS = {
  "Cyrillic a": NM.replace("a", "\u0430"),
  "Cyrillic d and Greek v": NM.slice(0, 2) + "\u03BDi\u0501",
  "zero-width space": ins(NM, 2, "\u200B"),
  "zero-width joiner and BOM": ins(ins(NM, 1, "\u200D"), 4, "\uFEFF"),
  "soft hyphen": ins(NM, 3, "\u00AD"),
  "fullwidth D": "\uFF24" + NM.slice(1),
  "math bold D": "\u{1D403}" + NM.slice(1),
  "combining marks": [...NM].map((c) => c + "\u0301").join(""),
  "bold inside the word": ins(ins(NM, 2, "**"), 1, "**"),
  "code ticks inside the word": ins(ins(NM, 3, "`"), 2, "`"),
  "strike and underscore inside the word": ins(ins(NM, 3, "~~"), 2, "_"),
  "HTML comment inside the word": ins(NM, 3, "<!-- -->"),
  "decimal entity": NM[0] + "&#" + NM.charCodeAt(1) + ";" + NM.slice(2),
  "hex entity, no semicolon": NM.slice(0, 2) + "&#x" + NM.charCodeAt(2).toString(16) + NM.slice(3),
  "soft hyphen entity": ins(NM, 2, "&shy;"),
  "underscore suffix": NM + "_x",
  "markdown bold around it": "**" + NM + "**",  // round 3: format chars, HTML tags, markdown links, more look-alikes
  "bidi override inside the word": ins(ins(NM, 3, "\u202C"), 1, "\u202E"),
  "bidi isolate inside the word": ins(ins(NM, 4, "\u2069"), 2, "\u2066"),
  "tag characters": ins(ins(NM, 3, "\u{E0020}"), 1, "\u{E0061}"),
  "Hangul filler U+3164": ins(NM, 1, "\u3164"),
  "Hangul filler U+115F": ins(NM, 3, "\u115F"),
  "halfwidth Hangul filler U+FFA0": ins(NM, 4, "\uFFA0"),
  "HTML tags inside the word": ins(ins(NM, 3, "</b>"), 2, "<b>"),
  "entity-encoded tag inside the word": ins(NM, 2, "&lt;i&gt;"),
  "markdown link text": "[" + NM.slice(0, 2) + "](https://x.example/a)" + NM.slice(2),
  "small capital d": "\u1D05" + NM.slice(1),
  "small capitals a, v, i": NM[0] + "\u1D00\u1D20\u026A" + NM[4],
  "Latin alpha": NM.replace("a", "\u0251"),
  "Cherokee D": "\u13A0" + NM.slice(1),
  "Cherokee lowercase d": "\uAB70" + NM.slice(1),
  "Cherokee a, v, i": NM[0] + "\u13AA\u13D9\u13A5" + NM[4],
  "IPA d with tail, v with hook, dotless i": "\u0256" + NM[1] + "\u028B\u0131" + NM[4],
  // round 4: tags must not hide the name
  "the name as a whole tag": "see <" + NM + "> here",
  "the name in a tag attribute": '<a title="' + NM + '">x</a>',
  "the name between < and > across words": "if a < b then " + NM + " said c > d",
  // round 4 review: links, references, comments and fillers
  "link URL": "[docs](https://x.example/" + NM + ")",
  "link title": '[docs](https://x.example/ "' + NM + '")',
  "link URL with balanced parens": "[" + NM.slice(0, 2) + "](https://x.example/a(b))" + NM.slice(2),
  "reference link [text][ref]": "[" + NM.slice(0, 2) + "][r]" + NM.slice(2) + "\n\n[r]: https://x.example/",
  "collapsed reference [text][]": "[" + NM.slice(0, 2) + "][]" + NM.slice(2),
  "shortcut reference [text]": "[" + NM.slice(0, 2) + "]" + NM.slice(2),
  "reference label": "[docs][" + NM + "]",
  "reference definition URL": "[docs]\n\n[docs]: https://x.example/" + NM,
  "reference definition title": '[docs]\n\n[docs]: https://x.example/ "' + NM + '"',
  "inside an HTML comment": "<!-- " + NM + " -->",
  "Hangul filler as a space": NM + "\u3164son",
};
for (const [why, b] of Object.entries(BYPASS)) test("name bypass refused: " + why, () => {
  assert.strictEqual(check("## Requested change\n" + b + "\n\n" + FOOT, { author: true }).code, 8, JSON.stringify(b));
  assert.strictEqual(cli(b + "\n" + FOOT, "--author"), 8, JSON.stringify(b));
});
test("bidi controls are refused outright, with or without the name (exit 8, PR_BODY_BIDI_REFUSED)", () => {
  for (const b of ["hello \u202E world", "a\u2066b\u2069", "x &#x" + "202D; y", "x &#" + "8238; y"]) {
    const r = check("## Requested change\n" + b + "\n\n" + FOOT, { author: true });
    assert.strictEqual(r.code, 8, JSON.stringify(b)); assert.match(r.msg, /^PR_BODY_BIDI_REFUSED/);
    assert.strictEqual(cli(b + "\n" + FOOT, "--author"), 8, JSON.stringify(b));
  }
});
test("tags and links that do not hide the name still pass", () => {
  for (const ok of ["a <b>bold</b> word", "<i>x</i> and <br/> and <code>y</code>", '<a href="https://x.example/">link</a>', "a < b > c", "<" + NM + "son>", "\u1D05ata", "[docs](https://x.example/a(b))", "[x][y] and [z]", 'see [docs]\n\n[docs]: https://x.example/ "Guide"'])
    assert.strictEqual(check("## Requested change\n" + ok + "\n\n" + FOOT, { author: true }).code, 0, JSON.stringify(ok));
});
test("the workflow also checks the PR title with the same checker", () => {
  const y = fs.readFileSync(path.join(__dirname, "../../.github/workflows/pr-body-check.yml"), "utf8");
  assert.match(y, /PR_TITLE: \$\{\{ github\.event\.pull_request\.title \}\}/);
  assert.match(y, /printf '%s' "\$PR_TITLE" \| node scripts\/v2\/pr-body-check\.js\s*(\|\||$)/m);
  assert.strictEqual(cli("Coder: " + NM + "'s feature"), 8);
  assert.strictEqual(cli("Coder: feature grid (showcase v2)"), 0);
});
test("the email check runs before the name check", () => {
  assert.strictEqual(check(NM + " " + em("a", "b.co")).code, 4);
});
test("the name refusal runs before the footer check", () => {
  assert.strictEqual(check(NM + "\n", { author: true }).code, 8);
});
test("this test file and the checker never spell the name", () => {
  for (const f of [__filename, path.join(__dirname, "pr-body-check.js")]) assert.strictEqual(check(fs.readFileSync(f, "utf8")).code === 8, false, f);
});
// Round 5 (10/26): linear passes, limits, fail closed. Each worst case is exactly MAX_BODY characters.
const { MAX_BODY, MAX_DEPTH } = require("./pr-body-check");
const fill = (unit) => unit.repeat(Math.ceil(MAX_BODY / unit.length)).slice(0, MAX_BODY);
const WORST = {
  "unclosed [": fill("["), "unclosed (": fill("("), "unclosed ](": fill("]("), "[x]( runs": fill("[x]("),
  "nested to the cap, repeated": fill("[".repeat(MAX_DEPTH) + "a" + "]".repeat(MAX_DEPTH)),
  "many links": fill("[a](b) "), "many reference links": fill("[a][b] "), "many ref definitions": fill("\n[a]: b"),
  "unclosed <": fill("<"), "unclosed comment": fill("<!--"), "many tags": fill("<b>"),
  "letters": fill("a"), "a. runs": fill("a."), "spaces": fill(" "), "newlines": fill("\n"), "tabs then at signs": fill("\t@"),
  "at sign space runs": fill("@ "), "bracketed at runs": fill(" (at"), "entities": fill("&#97;"), "markers in a word": fill("a*"),
  "marker run": fill("*"), "combining marks": fill("a\u0301"), "zero width": fill("a\u200B"),
  "unclosed bot blocks": fill("<!-- This is an auto-generated comment: release notes by coderabbit.ai -->\n"),
};
for (const [why, b] of Object.entries(WORST)) test("worst case under 1s at " + MAX_BODY + " chars: " + why, () => {
  assert.strictEqual(b.length, MAX_BODY);
  const t0 = process.hrtime.bigint(), r = check(b, { author: true }), ms = Number(process.hrtime.bigint() - t0) / 1e6;
  assert.ok(ms < 1000, why + " took " + ms + "ms");
  assert.ok([5, 8].includes(r.code), why + ": " + r.msg);
  if (r.code === 8) assert.match(r.msg, /^PR_BODY_TOO_DEEP: /);
});
test("bodies over 65,536 characters are refused: exit 8 PR_BODY_TOO_LARGE (code points, not UTF-16 units)", () => {
  assert.strictEqual(MAX_BODY, 65536);
  const r = check("a".repeat(MAX_BODY + 1));
  assert.strictEqual(r.code, 8); assert.match(r.msg, /^PR_BODY_TOO_LARGE: /);
  assert.notStrictEqual(check("\u{1F600}".repeat(MAX_BODY)).msg.startsWith("PR_BODY_TOO_LARGE"), true);
  const c = spawnSync(process.execPath, [path.join(__dirname, "pr-body-check.js")], { input: "a".repeat(MAX_BODY + 1), encoding: "utf8" });
  assert.strictEqual(c.status, 8); assert.match(c.stderr, /PR_BODY_TOO_LARGE/);
});
test("markdown bracket nesting is capped at 32: 32 passes, 33 is exit 8 PR_BODY_TOO_DEEP", () => {
  assert.strictEqual(MAX_DEPTH, 32);
  assert.strictEqual(check("[".repeat(32) + "a" + "]".repeat(32)).code, 0);
  const r = check("[".repeat(33) + "a" + "]".repeat(33));
  assert.strictEqual(r.code, 8); assert.match(r.msg, /^PR_BODY_TOO_DEEP: /);
  assert.strictEqual(check("[".repeat(33) + "a").code, 0, "unmatched brackets do not nest");
});
test("an unexpected internal error fails closed: exit 9 PR_BODY_CHECK_ERROR", () => {
  const r = check({ toString() { throw new TypeError("boom"); } });
  assert.strictEqual(r.code, 9); assert.match(r.msg, /^PR_BODY_CHECK_ERROR: /);
});
test("the workflow job has a 2-minute timeout", () => {
  const y = fs.readFileSync(path.join(__dirname, "../../.github/workflows/pr-body-check.yml"), "utf8");
  assert.match(y, /\n  pr-body-check:\n(?:    .*\n)*?    timeout-minutes: 2\n/);
});
