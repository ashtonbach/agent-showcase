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
// Limits (10/26, review round 5): bodies over 65,536 characters are refused (exit 8, PR_BODY_TOO_LARGE) and markdown brackets nested
// deeper than 32 (exit 8, PR_BODY_TOO_DEEP); every pass is linear and nothing recurses. Any other internal error fails closed (exit 9,
// PR_BODY_CHECK_ERROR). Same limits and codes as the .py.
// CLI: node scripts/v2/pr-body-check.js [--author [--reset]] < body   exit 4 = email, 8 = owner name, bidi control, too large or too deep, 5 = bad/missing footer, 9 = internal error
//      node scripts/v2/pr-body-check.js --agent NAME                  exit 6 unless NAME is a team agent
const TEAM = ["Ash", "Hazel", "Alder", "Rowan", "Cedar", "Linden"];
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;
const SSH = /\bgit@github\.com:(?=[A-Za-z0-9_./~-])/g;
const ASSET = /\.(?:png|jpe?g|gif|svg|webp|avif|ico|bmp|tiff?|pdf|mp4|webm|css|js|json)$/i;
const MERGED = "Merged by: pending, @ashtonbach (https://github.com/ashtonbach)";
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const FOOT = (reset) => new RegExp(`\\nAuthor: AshtonBach Coder(?: - (?:${TEAM.join("|")}))${reset ? "?" : ""}\\n${esc(MERGED)}[ \\t]*\\n*$`);
const norm = (t) => "\n" + String(t || "").replace(/\r/g, "");
// Linear scanners (round 5): no regex here has a leading \s* or an unbounded run before a literal, so
// every pass is O(n) (Rowan: "a" * 65536 and "\n" * 65536 took seconds with the old regexes).
const WS = "\t\n\v\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff";
const isWs = (c) => WS.includes(c);
// Replace each inner match with rep, dropping whitespace on both sides (same as /\s*inner\s*/ but linear).
const trimAround = (t, inner, rep) => {
  const out = []; let i = 0; inner.lastIndex = 0; let m;
  while ((m = inner.exec(t))) {
    out.push(t.slice(i, m.index));
    let j = m.index + m[0].length; while (j < t.length && isWs(t[j])) j++;
    // pop trailing whitespace already emitted
    while (out.length) { let last = out[out.length - 1], k = last.length; while (k && isWs(last[k - 1])) k--; if (k) { out[out.length - 1] = last.slice(0, k); break; } out.pop(); }
    out.push(rep); i = j; inner.lastIndex = j;
  }
  out.push(t.slice(i)); return out.join("");
};
const BRAT = new RegExp(`[[({][${WS}]*at[${WS}]*[\\])}]`, "gi");
const BRDOT = new RegExp(`[[({][${WS}]*dot[${WS}]*[\\])}]`, "gi");
// "[ \t]*@[ \t]+" -> "@": an at sign with at least one space or tab after it.
const atSpaces = (t) => {
  const parts = t.split("@"), sp = (c) => c === " " || c === "\t";
  for (let k = 1; k < parts.length; k++) {
    const p = parts[k];
    if (!sp(p[0])) continue;
    let i = 0; while (i < p.length && sp(p[i])) i++; parts[k] = p.slice(i);
    const r = parts[k - 1]; let e = r.length; while (e && sp(r[e - 1])) e--; parts[k - 1] = r.slice(0, e);
  }
  return parts.join("@");
};
const deob = (t) => atSpaces(trimAround(trimAround(t.replace(/&#0*64;?|&#x0*40;?|&commat;|\uFF20|%40/gi, "@"), BRAT, "@"), BRDOT, "."));
// Same matches as EMAIL with /g, found from each at sign: the local part runs back to the previous
// match end; the domain is the longest labels.labels.letters{2,} prefix (greedy regex result).
const LOC = /[A-Za-z0-9._%+-]/, LAB = /[A-Za-z0-9-]/, ALPHA = /[A-Za-z]/;
const emailMatches = (t) => {
  const res = []; let lastEnd = 0;
  for (let at = t.indexOf("@"); at !== -1; at = t.indexOf("@", at + 1)) {
    if (at < lastEnd) continue;
    let st = at; while (st > lastEnd && LOC.test(t[st - 1])) st--;
    if (st === at) continue;
    let j = at + 1, seg = 0, end = -1;
    while (true) {
      const s0 = j; while (j < t.length && LAB.test(t[j])) j++;
      if (j === s0) break;
      if (seg > 0) { let a = s0; while (a < j && ALPHA.test(t[a])) a++; if (a - s0 >= 2) end = a; }
      seg++;
      if (t[j] === ".") j++; else break;
    }
    if (end === -1) continue;
    res.push(t.slice(st, end)); lastEnd = end;
  }
  return res;
};
const emailsIn = (t) => emailMatches(deob(norm(t)).replace(SSH, "")).filter((m) => !ASSET.test(m)).length;
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
// Limits (10/26 review round 5): bodies over MAX_BODY code points are refused (exit 8, PR_BODY_TOO_LARGE), and so is markdown
// bracket nesting deeper than MAX_DEPTH (exit 8, PR_BODY_TOO_DEEP). Every pass below is linear and nothing recurses.
const MAX_BODY = 65536, MAX_DEPTH = 32;
class Limit extends Error { constructor(tag, msg) { super(msg); this.tag = tag; } }
const cpLength = (t) => { let n = 0; for (let k = 0; k < t.length; k++) { const c = t.charCodeAt(k); if (c < 0xDC00 || c > 0xDFFF || k === 0 || (t.charCodeAt(k - 1) & 0xFC00) !== 0xD800) n++; } return n; };
// One stack pass: m[k] is the index of the partner of the open or close char at k, or -1 when it has none.
function matchPairs(s, o, c) {
  const m = new Int32Array(s.length).fill(-1), st = [];
  for (let k = 0; k < s.length; k++) { if (s[k] === o) st.push(k); else if (s[k] === c && st.length) { const a = st.pop(); m[a] = k; m[k] = a; } }
  return m;
}
// Markdown links in one left-to-right pass: [text](dest with balanced parens), [text][ref], [text][] and [text] collapse to
// text; each dest or ref goes to extra. An open bracket marks its partner as a link close; a close that is not marked is text.
function mdCollapse(s, extra) {
  const mb = matchPairs(s, "[", "]"), mp = matchPairs(s, "(", ")"), closes = new Uint8Array(s.length), out = [];
  let d = 0;
  for (let k = 0; k < s.length; k++) if (mb[k] >= 0) { if (s[k] === "[") { if (++d > MAX_DEPTH) throw new Limit("PR_BODY_TOO_DEEP", `markdown brackets nest deeper than ${MAX_DEPTH}`); } else d--; }
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === "[" && mb[i] >= 0) { closes[mb[i]] = 1; i++; continue; }
    if (ch === "]" && closes[i]) {
      i++; const m = s[i] === "(" ? mp[i] : s[i] === "[" ? mb[i] : -1;
      if (m > i) { extra.push(s.slice(i + 1, m)); i = m + 1; }
      continue;
    }
    out.push(ch); i++;
  }
  return out.join("");
}
// Split out every <!-- ... --> (or <...>) in one pass: returns the text without them and the inside of each.
function splitOut(s, open, close) {
  const out = [], inner = []; let i = 0;
  for (;;) {
    const a = s.indexOf(open, i), b = a < 0 ? -1 : s.indexOf(close, a + open.length);
    if (b < 0) { out.push(s.slice(i)); break; }
    out.push(s.slice(i, a)); inner.push(s.slice(a + open.length, b)); i = b + close.length;
  }
  return [out.join(""), inner];
}
const REFDEF = /(?:^|\n) {0,3}\[([^\]\n]+)\]:[ \t]*([^\n]*)/g;
const INVIS = /\p{Cf}|[\u00AD\u115F\u1160\u180E\u200B-\u200F\u2060-\u2069\u3164\uFEFF\uFFA0]|[\u{E0000}-\u{E007F}]/gu;
const namePost = (t) => { t = t.normalize("NFKC").normalize("NFD").replace(/\p{M}/gu, "");
  return ["", " "].map((r) => [...t.replace(INVIS, r).toLowerCase()].map((c) => HOMO[c] || c).join("")); };
function nameViews(t) {
  const p = namePre(t), [q, comments] = splitOut(p, "<!--", "-->"), [stripped, tags] = splitOut(q, "<", ">"), views = [];
  for (const v of [stripped, q, ...tags, ...comments, p]) {
    const extra = [];
    for (const m of v.matchAll(REFDEF)) { extra.push(m[1]); extra.push(m[2]); }
    views.push(mdCollapse(v, extra));
    for (const x of extra) views.push(x);
  }
  const out = [];
  for (const v of views) for (const f of namePost(v)) out.push(f);
  return out;
}
const nameFold = (t) => nameViews(t)[0];
const hasOwnerName = (t) => nameViews(t).some((f) =>
  NAME.test(f.replace(/(?<=[a-z0-9])[*_`~]+(?=[a-z0-9])/g, "")) || NAME.test(f.replace(/[*_`~]/g, " ")));
const isAgent = (n) => TEAM.includes(n);
// CodeRabbit appends its release-notes block after the author's text; the footer check ignores that block (emails are still checked in it).
const BOT_OPEN = "<!-- This is an auto-generated comment: release notes by coderabbit.ai -->", BOT_CLOSE = "<!-- end of auto-generated comment: release notes by coderabbit.ai -->";
// Same as t.replace(/\n?OPEN[\s\S]*?CLOSE\s*/g, "\n"), with indexOf (linear; the lazy regex rescanned to the end per open marker).
function stripBot(t) {
  const out = []; let i = 0;
  for (;;) {
    const a = t.indexOf(BOT_OPEN, i), b = a < 0 ? -1 : t.indexOf(BOT_CLOSE, a + BOT_OPEN.length);
    if (b < 0) { out.push(t.slice(i)); break; }
    const s0 = a > i && t[a - 1] === "\n" ? a - 1 : a; let j = b + BOT_CLOSE.length;
    while (j < t.length && /\s/.test(t[j])) j++;
    out.push(t.slice(i, s0), "\n"); i = j;
  }
  return out.join("");
}
const hasAgentAuthor = (t, reset = false) => FOOT(reset).test(stripBot(norm(t)));
function checkInner(body, author, reset) {
  if (cpLength(String(body || "")) > MAX_BODY) return { code: 8, msg: `PR_BODY_TOO_LARGE: body is over ${MAX_BODY} characters; shorten it` };
  if (emailsIn(body)) return { code: 4, msg: `PR_BODY_EMAIL_REFUSED: body contains ${emailsIn(body)} email address(es); remove them` };
  if (hasBidi(body)) return { code: 8, msg: "PR_BODY_BIDI_REFUSED: body contains a bidirectional control character (U+202A-202E or U+2066-2069); remove it" };
  if (hasOwnerName(body)) return { code: 8, msg: "PR_BODY_NAME_REFUSED: body names the owner by first name; credit the requester handle instead" };
  if (author && !hasAgentAuthor(body, reset)) return { code: 5, msg: "PR_BODY_AUTHOR_REFUSED: body must end with 'Author: AshtonBach Coder - <Agent>' then '" + MERGED + "' (team agents: " + TEAM.join(", ") + ")" };
  return { code: 0, msg: "PR_BODY_OK" };
}
// Fail closed: a limit is exit 8 with its own message; any other internal error is exit 9 PR_BODY_CHECK_ERROR (same in the .py).
function check(body, { author = false, reset = false } = {}) {
  try { return checkInner(body, author, reset); } catch (e) {
    if (e instanceof Limit) return { code: 8, msg: e.tag + ": " + e.message };
    return { code: 9, msg: "PR_BODY_CHECK_ERROR: the checker failed (" + (e && e.name) + "); refusing" };
  }
}
module.exports = { MAX_BODY, MAX_DEPTH, TEAM, MERGED, emailsIn, hasOwnerName, hasBidi, nameFold, nameViews, isAgent, hasAgentAuthor, check };
if (require.main === module) {
  const a = process.argv.slice(2);
  if (a.includes("--agent")) { const n = a[a.indexOf("--agent") + 1] || ""; if (isAgent(n)) process.exit(0); console.error(`PR_AGENT_REFUSED: ${JSON.stringify(n)} is not a team agent name`); process.exit(6); }
  const r = check(require("fs").readFileSync(0, "utf8"), { author: a.includes("--author"), reset: a.includes("--reset") });
  (r.code ? console.error : console.log)(r.msg); process.exit(r.code);
}
