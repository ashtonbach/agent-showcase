// PR body rules (10/25, @ashtonbach): no email address anywhere in a PR body (the GitHub noreply commit address included; it
// belongs in commit trailers, never in bodies). SSH remotes ("git@github.com:owner/repo") are not emails.
// --author: the body must END with the two footer lines, adjacent: "Author: AshtonBach Coder - <Agent>" then "Merged by: ...",
// where <Agent> is a team agent (allowlist below; same list as agents-live kit/bin/pr-body-check.py).
// --reset: the one allowed exception. Reset PRs (scripts/v2/reset.sh, run by the Lab reset workflow with no agent) may use
// "Author: AshtonBach Coder" with no agent name; the footer must still be last and the email check still applies.
// CLI: node scripts/v2/pr-body-check.js [--author [--reset]] < body   exit 4 = email, 5 = bad/missing footer
//      node scripts/v2/pr-body-check.js --agent NAME                  exit 6 unless NAME is a team agent
const TEAM = ["Ash", "Hazel", "Alder", "Rowan", "Cedar", "Linden"];
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;
const SSH = /\bgit@[A-Za-z0-9.-]+:(?=[A-Za-z0-9_./~-])/g;
const FOOT = (reset) => new RegExp(`\\nAuthor: AshtonBach Coder(?: - (?:${TEAM.join("|")}))${reset ? "?" : ""}\\nMerged by: [^\\n]+\\s*$`);
const norm = (t) => "\n" + String(t || "").replace(/\r/g, "");
const emailsIn = (t) => (norm(t).replace(SSH, "").match(EMAIL) || []).length;
const isAgent = (n) => TEAM.includes(n);
// CodeRabbit appends its release-notes block after the author's text; the footer check ignores that block (emails are still checked in it).
const BOT_BLOCK = /\n?<!-- This is an auto-generated comment: release notes by coderabbit\.ai -->[\s\S]*?<!-- end of auto-generated comment: release notes by coderabbit\.ai -->\s*/g;
const hasAgentAuthor = (t, reset = false) => FOOT(reset).test(norm(t).replace(BOT_BLOCK, "\n"));
function check(body, { author = false, reset = false } = {}) {
  if (emailsIn(body)) return { code: 4, msg: `PR_BODY_EMAIL_REFUSED: body contains ${emailsIn(body)} email address(es); remove them` };
  if (author && !hasAgentAuthor(body, reset)) return { code: 5, msg: "PR_BODY_AUTHOR_REFUSED: body must end with 'Author: AshtonBach Coder - <Agent>' then 'Merged by: ...' (team agents: " + TEAM.join(", ") + ")" };
  return { code: 0, msg: "PR_BODY_OK" };
}
module.exports = { TEAM, emailsIn, isAgent, hasAgentAuthor, check };
if (require.main === module) {
  const a = process.argv.slice(2);
  if (a.includes("--agent")) { const n = a[a.indexOf("--agent") + 1] || ""; if (isAgent(n)) process.exit(0); console.error(`PR_AGENT_REFUSED: ${JSON.stringify(n)} is not a team agent name`); process.exit(6); }
  const r = check(require("fs").readFileSync(0, "utf8"), { author: a.includes("--author"), reset: a.includes("--reset") });
  (r.code ? console.error : console.log)(r.msg); process.exit(r.code);
}
