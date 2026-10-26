// PR body rules (10/25, @ashtonbach): no email address anywhere in a PR body (the GitHub noreply commit address included; it
// belongs in commit trailers, never in bodies). SSH remotes ("git@github.com:owner/repo") are not emails.
// Obfuscated forms are decoded first, then the normal email shape (local @ domain . tld) must still match, so prose such as
// "look at the dot" or "meet at noon" is never flagged: &#64 / &#x40 (semicolon optional), &commat;, fullwidth U+FF20, %40 anywhere,
// the words at / dot inside [] () {} become the at sign / a dot, and a lone at sign with spaces around it is joined up
// (@handles have no space after the at sign, so they are untouched).
// Image/asset names like logo@2x.png are not emails. Only "git@github.com:owner/repo" is an SSH remote.
// --author: the body must END with the two footer lines, adjacent: "Author: AshtonBach Coder - <Agent>" then exactly
// "Merged by: pending, @ashtonbach (https://github.com/ashtonbach)",
// where <Agent> is a team agent (allowlist below; same list as agents-live kit/bin/pr-body-check.py).
// --reset: the one allowed exception. Reset PRs (scripts/v2/reset.sh, run by the Lab reset workflow with no agent) may use
// "Author: AshtonBach Coder" with no agent name; the footer must still be last and the email check still applies.
// Always (every mode, no flag; 10/26, companion kit change): the owner's first name as a whole word, any case, is refused
// (exit 8, PR_BODY_NAME_REFUSED). Credit goes to the requester handle in the footer. Substrings (a longer surname, the worker host) pass.
// The name is built from parts so this public file never spells it.
// CLI: node scripts/v2/pr-body-check.js [--author [--reset]] < body   exit 4 = email, 8 = owner name, 5 = bad/missing footer
//      node scripts/v2/pr-body-check.js --agent NAME                  exit 6 unless NAME is a team agent
const TEAM = ["Ash", "Hazel", "Alder", "Rowan", "Cedar", "Linden"];
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;
const SSH = /\bgit@github\.com:(?=[A-Za-z0-9_./~-])/g;
const ASSET = /\.(?:png|jpe?g|gif|svg|webp|avif|ico|bmp|tiff?|pdf|mp4|webm|css|js|json)$/i;
const MERGED = "Merged by: pending, @ashtonbach (https://github.com/ashtonbach)";
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const FOOT = (reset) => new RegExp(`\\nAuthor: AshtonBach Coder(?: - (?:${TEAM.join("|")}))${reset ? "?" : ""}\\n${esc(MERGED)}[ \\t]*\\n*$`);
const norm = (t) => "\n" + String(t || "").replace(/\r/g, "");
const deob = (t) => t.replace(/&#0*64;?|&#x0*40;?|&commat;|\uFF20|%40/gi, "@").replace(/\s*[[({]\s*at\s*[\])}]\s*/gi, "@")
  .replace(/\s*[[({]\s*dot\s*[\])}]\s*/gi, ".").replace(/[ \t]*@[ \t]+/g, "@");
const emailsIn = (t) => (deob(norm(t)).replace(SSH, "").match(EMAIL) || []).filter((m) => !ASSET.test(m)).length;
const NAME = new RegExp("\\b" + ["d", "a", "v", "i", "d"].join("") + "\\b", "i");
const hasOwnerName = (t) => NAME.test(String(t || ""));
const isAgent = (n) => TEAM.includes(n);
// CodeRabbit appends its release-notes block after the author's text; the footer check ignores that block (emails are still checked in it).
const BOT_BLOCK = /\n?<!-- This is an auto-generated comment: release notes by coderabbit\.ai -->[\s\S]*?<!-- end of auto-generated comment: release notes by coderabbit\.ai -->\s*/g;
const hasAgentAuthor = (t, reset = false) => FOOT(reset).test(norm(t).replace(BOT_BLOCK, "\n"));
function check(body, { author = false, reset = false } = {}) {
  if (emailsIn(body)) return { code: 4, msg: `PR_BODY_EMAIL_REFUSED: body contains ${emailsIn(body)} email address(es); remove them` };
  if (hasOwnerName(body)) return { code: 8, msg: "PR_BODY_NAME_REFUSED: body names the owner by first name; credit the requester handle instead" };
  if (author && !hasAgentAuthor(body, reset)) return { code: 5, msg: "PR_BODY_AUTHOR_REFUSED: body must end with 'Author: AshtonBach Coder - <Agent>' then '" + MERGED + "' (team agents: " + TEAM.join(", ") + ")" };
  return { code: 0, msg: "PR_BODY_OK" };
}
module.exports = { TEAM, MERGED, emailsIn, hasOwnerName, isAgent, hasAgentAuthor, check };
if (require.main === module) {
  const a = process.argv.slice(2);
  if (a.includes("--agent")) { const n = a[a.indexOf("--agent") + 1] || ""; if (isAgent(n)) process.exit(0); console.error(`PR_AGENT_REFUSED: ${JSON.stringify(n)} is not a team agent name`); process.exit(6); }
  const r = check(require("fs").readFileSync(0, "utf8"), { author: a.includes("--author"), reset: a.includes("--reset") });
  (r.code ? console.error : console.log)(r.msg); process.exit(r.code);
}
