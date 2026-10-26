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
// Always (every mode, no flag; 10/26, with the companion kit change): the owner's first name as a whole word, any case, is refused
// (exit 8, PR_BODY_NAME_REFUSED). Credit goes to the requester handle in the footer. A longer word that contains it passes.
// The name is built from parts so this public file never spells it. Before matching (same steps as the kit pr-body-check.py):
// decode HTML entities; check several views of the text (tags stripped, tags kept, each tag's inside, each HTML comment's inside,
// the text with comments kept); in each, collapse markdown links ([t](url), [t][ref], [t][], [t]) to their text and check the
// URLs, titles, ref labels and '[ref]: url "title"' definitions as views too; NFKC, drop combining marks, format (Cf) chars, Hangul
// fillers and soft hyphens (each tried both removed and as a space), fold Cyrillic/Greek/small-cap/IPA/Cherokee look-alikes to Latin;
// then match twice with non-alphanumeric boundaries: once with * _ ` ~ inside words removed (bold or code marks inside the name) and
// once with them as separators (name_x). Bidi controls U+202A-202E and U+2066-2069 are refused outright (exit 8, PR_BODY_BIDI_REFUSED).
// CLI: node scripts/v2/pr-body-check.js [--author [--reset]] < body   exit 4 = email, 8 = owner name or bidi control, 5 = bad/missing footer
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
const NAME = new RegExp("(?:^|[^a-z0-9])" + ["d", "a", "v", "i", "d"].join("") + "(?:[^a-z0-9]|$)");
const NAMED_ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00A0", shy: "\u00AD", zwj: "\u200D", zwnj: "\u200C" };
// Cyrillic and Greek letters that look like Latin ones (lowercase after folding case).
const HOMO = { "\u0430": "a", "\u0435": "e", "\u043E": "o", "\u0440": "p", "\u0441": "c", "\u0443": "y", "\u0445": "x", "\u0456": "i", "\u0458": "j",
  "\u0501": "d", "\u0475": "v", "\u03B1": "a", "\u03B5": "e", "\u03BF": "o", "\u03C1": "p", "\u03BD": "v", "\u03B9": "i", "\u03C7": "x", "\u03BA": "k",
  // small capitals, IPA and Cherokee letters that look like d, a, v, i (Cherokee capitals lowercase into U+AB70-ABBF)
  "\u1D05": "d", "\u1D00": "a", "\u1D20": "v", "\u026A": "i", "\u0131": "i", "\u0251": "a", "\u0250": "a", "\u0256": "d", "\u0257": "d", "\u028B": "v", "\u028C": "v",
  "\u13A0": "d", "\uAB70": "d", "\u13AA": "a", "\uAB7A": "a", "\u13D9": "v", "\uABA9": "v", "\u13A5": "i", "\uAB75": "i" };
// Nothing a normalization step removes is dropped unchecked: removed text (HTML comments, tags, link URLs and titles, reference
// labels and definitions) is checked as its own view, and invisible characters are tried both removed and as a space.
function namePre(t) {
  t = String(t || "");
  for (let i = 0; i < 2; i++) t = t.replace(/&#(\d{1,7});?|&#x([0-9a-f]{1,6});?|&([a-z]{2,6});/gi, (m, d, h, n) => {
    const c = d ? +d : h ? parseInt(h, 16) : null; if (c != null) return c <= 0x10ffff ? String.fromCodePoint(c) : "";
    return NAMED_ENT[n.toLowerCase()] ?? m; });
  return t;
}
// Bidi embedding, override and isolate controls are refused outright (they reorder what a reader sees).
const BIDI = /[\u202A-\u202E\u2066-\u2069]/;
const hasBidi = (t) => BIDI.test(String(t || "")) || BIDI.test(namePre(t));
// Index of the bracket that closes the one at i (same open/close pair, nesting counted), or -1.
function closeAt(s, i, o, c) { let d = 0; for (let k = i; k < s.length; k++) { if (s[k] === o) d++; else if (s[k] === c && --d === 0) return k; } return -1; }
// Markdown links: [text](dest with balanced parens), [text][ref], [text][] and [text] collapse to text; dest and ref go to extra.
function mdCollapse(s, extra) {
  let out = "", i = 0;
  while (i < s.length) {
    const j = s[i] === "[" ? closeAt(s, i, "[", "]") : -1;
    if (j < 0) { out += s[i++]; continue; }
    out += mdCollapse(s.slice(i + 1, j), extra); i = j + 1;
    const pair = s[i] === "(" ? ["(", ")"] : s[i] === "[" ? ["[", "]"] : null;
    const m = pair ? closeAt(s, i, pair[0], pair[1]) : -1;
    if (m >= 0) { extra.push(s.slice(i + 1, m)); i = m + 1; }
  }
  return out;
}
const INVIS = /\p{Cf}|[\u00AD\u115F\u1160\u180E\u200B-\u200F\u2060-\u2069\u3164\uFEFF\uFFA0]|[\u{E0000}-\u{E007F}]/gu;
const namePost = (t) => { t = t.normalize("NFKC").normalize("NFD").replace(/\p{M}/gu, "");
  return ["", " "].map((r) => [...t.replace(INVIS, r).toLowerCase()].map((c) => HOMO[c] || c).join("")); };
function nameViews(t) {
  const p = namePre(t), comments = [...p.matchAll(/<!--([\s\S]*?)-->/g)].map((m) => m[1]), q = p.replace(/<!--[\s\S]*?-->/g, "");
  const raw = [q.replace(/<[^>]*>/g, ""), q, ...[...q.matchAll(/<([^>]*)>/g)].map((m) => m[1]), ...comments, p], views = [];
  for (const v of raw) {
    const extra = [...v.matchAll(/(?:^|\n) {0,3}\[([^\]\n]+)\]:[ \t]*([^\n]*)/g)].flatMap((m) => [m[1], m[2]]);
    views.push(mdCollapse(v, extra), ...extra);
  }
  return views.flatMap(namePost);
}
const nameFold = (t) => nameViews(t)[0];
const hasOwnerName = (t) => nameViews(t).some((f) =>
  NAME.test(f.replace(/(?<=[a-z0-9])[*_`~]+(?=[a-z0-9])/g, "")) || NAME.test(f.replace(/[*_`~]/g, " ")));
const isAgent = (n) => TEAM.includes(n);
// CodeRabbit appends its release-notes block after the author's text; the footer check ignores that block (emails are still checked in it).
const BOT_BLOCK = /\n?<!-- This is an auto-generated comment: release notes by coderabbit\.ai -->[\s\S]*?<!-- end of auto-generated comment: release notes by coderabbit\.ai -->\s*/g;
const hasAgentAuthor = (t, reset = false) => FOOT(reset).test(norm(t).replace(BOT_BLOCK, "\n"));
function check(body, { author = false, reset = false } = {}) {
  if (emailsIn(body)) return { code: 4, msg: `PR_BODY_EMAIL_REFUSED: body contains ${emailsIn(body)} email address(es); remove them` };
  if (hasBidi(body)) return { code: 8, msg: "PR_BODY_BIDI_REFUSED: body contains a bidirectional control character (U+202A-202E or U+2066-2069); remove it" };
  if (hasOwnerName(body)) return { code: 8, msg: "PR_BODY_NAME_REFUSED: body names the owner by first name; credit the requester handle instead" };
  if (author && !hasAgentAuthor(body, reset)) return { code: 5, msg: "PR_BODY_AUTHOR_REFUSED: body must end with 'Author: AshtonBach Coder - <Agent>' then '" + MERGED + "' (team agents: " + TEAM.join(", ") + ")" };
  return { code: 0, msg: "PR_BODY_OK" };
}
module.exports = { TEAM, MERGED, emailsIn, hasOwnerName, hasBidi, nameFold, nameViews, isAgent, hasAgentAuthor, check };
if (require.main === module) {
  const a = process.argv.slice(2);
  if (a.includes("--agent")) { const n = a[a.indexOf("--agent") + 1] || ""; if (isAgent(n)) process.exit(0); console.error(`PR_AGENT_REFUSED: ${JSON.stringify(n)} is not a team agent name`); process.exit(6); }
  const r = check(require("fs").readFileSync(0, "utf8"), { author: a.includes("--author"), reset: a.includes("--reset") });
  (r.code ? console.error : console.log)(r.msg); process.exit(r.code);
}
