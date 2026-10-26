// PR body rules: no email address anywhere in a PR body (the GitHub noreply commit address included; it belongs in
// commit trailers, never in bodies), and an Author line that names the agent: "Author: AshtonBach Coder - <Agent>".
// CLI: node scripts/v2/pr-body-check.js [--author] < body   (exit 4 = email found, 5 = no agent-named Author line)
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;
const AUTHOR = /^Author: AshtonBach Coder - [A-Z][A-Za-z]+$/m;
const emailsIn = (t) => (String(t || "").match(EMAIL) || []).length;
const hasAgentAuthor = (t) => AUTHOR.test(String(t || "").replace(/\r/g, ""));
function check(body, { author = false } = {}) {
  if (emailsIn(body)) return { code: 4, msg: `PR_BODY_EMAIL_REFUSED: body contains ${emailsIn(body)} email address(es); remove them` };
  if (author && !hasAgentAuthor(body)) return { code: 5, msg: "PR_BODY_AUTHOR_REFUSED: no 'Author: AshtonBach Coder - <Agent>' line" };
  return { code: 0, msg: "PR_BODY_OK" };
}
module.exports = { emailsIn, hasAgentAuthor, check };
if (require.main === module) {
  const body = require("fs").readFileSync(0, "utf8"), r = check(body, { author: process.argv.includes("--author") });
  (r.code ? console.error : console.log)(r.msg); process.exit(r.code);
}
