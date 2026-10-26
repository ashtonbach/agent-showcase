// Browser check for the "Ask a Question" form (app/lab/custom-1792972217): inline errors, aria, focus, trim, length, no network.
// Run against a LOCAL server only: BASE=http://localhost:3000/showcase node scripts/v2/ask-form.e2e.js [shotDir]
// Client-only form: the test fails if a valid submit makes any non-GET request.
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3000/showcase", SHOTS = process.argv[2];
if (/ashtonbach\.com|vercel\.app/.test(BASE)) { console.log("FAIL refusing to run against a deployed host: " + BASE); process.exit(1); }
const EMAIL = ["someone", "example.test"].join(String.fromCharCode(64));
let fail = 0, n = 0;
const ok = (cond, msg) => { n++; if (cond) console.log("PASS " + msg); else { fail++; console.log("FAIL " + msg); } };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 900, height: 1100 } });
  const posted = [];
  const page = await ctx.newPage();
  page.on("request", (r) => { if (r.method() !== "GET") posted.push(r.method() + " " + r.url()); });
  const open = async () => { await page.goto(BASE, { waitUntil: "networkidle" }); await page.click("button.lab-toggle"); };
  const form = "#lab-contact-form", name = "#lab-name", email = "#lab-email", q = "#lab-question";
  const errOf = (sel) => page.evaluate((s) => { const el = document.querySelector(s); const ids = (el.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
    const e = ids.map((i) => document.getElementById(i)).find((x) => x && x.classList.contains("lab-error"));
    return { invalid: el.getAttribute("aria-invalid"), text: e ? e.textContent : null, color: e ? getComputedStyle(e).color : null, border: getComputedStyle(el).borderTopColor }; }, sel);
  const shot = async (f) => { if (SHOTS) await page.locator("section[data-lab]").screenshot({ path: `${SHOTS}/${f}` }); };

  await open();
  ok(await page.$eval(form, (f) => f.noValidate), "form has novalidate");
  const dialogs = []; page.on("dialog", (d) => { dialogs.push(d.message()); d.dismiss(); });
  await shot("0-clean.png");
  const clean = await errOf(name);

  // 1. empty submit
  await page.click("button.lab-submit");
  let e = await errOf(name); ok(e.invalid === "true" && e.text === "Please enter your name.", "empty: name error + aria-invalid + aria-describedby");
  ok(e.border !== clean.border && e.border === e.color, "empty: name gets the red (--danger) border");
  e = await errOf(email); ok(e.invalid === "true" && e.text === "Please enter your email.", "empty: email error");
  e = await errOf(q); ok(e.invalid === "true" && e.text === "Please enter your question.", "empty: question error");
  ok(await page.evaluate(() => document.activeElement.id) === "lab-name", "empty: focus moves to the first invalid field");
  ok(posted.length === 0 && dialogs.length === 0, "empty: nothing sent, no alert");
  await shot("1-empty-submit.png");

  // 2. bad email; error clears on fix (input), first-invalid focus skips valid fields
  await page.fill(name, "Test Person"); await page.fill(email, "not-an-email"); await page.fill(q, "How does it work?");
  ok((await errOf(name)).invalid === null && (await errOf(name)).text === null, "fix: name error clears on input");
  await page.click("button.lab-submit");
  e = await errOf(email); ok(e.text === "Please enter a valid email address." && e.invalid === "true", "bad email: format error");
  ok(await page.evaluate(() => document.activeElement.id) === "lab-email", "bad email: focus goes to email (first invalid)");
  await shot("2-bad-email.png");
  await page.fill(email, EMAIL);
  e = await errOf(email); ok(e.text === null && e.invalid === null, "fix: email error clears on input");

  // 3. whitespace-only name and question
  await page.fill(name, "    "); await page.fill(q, "   \n  ");
  await page.click("button.lab-submit");
  ok((await errOf(name)).text === "Please enter your name.", "whitespace-only name counts as empty");
  ok((await errOf(q)).text === "Please enter your question.", "whitespace-only question counts as empty");
  ok(posted.length === 0, "whitespace: nothing sent");
  await page.fill(email, "not-an-email"); // keep the screenshot free of any address-shaped text
  await page.click("button.lab-submit");
  await shot("3-whitespace.png");
  await page.fill(email, EMAIL);

  // 4. over-length question with live counter; blur re-check
  await page.fill(name, "Test Person");
  await page.fill(q, "x".repeat(2001));
  ok((await page.textContent("#lab-question-count")).includes("2001 / 2000"), "counter updates live (2001 / 2000)");
  await page.locator(name).focus();
  e = await errOf(q); ok(e.text === "Please keep your question under 2000 characters.", "over-length: error shown");
  await page.fill(email, "not-an-email"); await page.click("button.lab-submit");
  await shot("4-over-length.png");
  await page.fill(email, EMAIL);
  await page.fill(q, "  " + "x".repeat(2000) + "  ");
  ok((await errOf(q)).text === null, "2000 chars after trim is accepted; error clears");

  // 5. blur re-check on an untouched field
  await open();
  await page.focus(name); await page.focus(email);
  ok((await errOf(name)).text === "Please enter your name.", "blur: leaving an empty field shows its error");

  // 6. valid submit -> client-only, existing success message, no request sent
  await page.fill(name, "  Test Person "); await page.fill(q, "Question?");
  await page.fill(email, " " + EMAIL + " ");
  await page.click("button.lab-submit");
  await page.waitForSelector(".lab-thanks");
  await shot("5-valid-sent.png");
  ok((await page.textContent(".lab-thanks")) === "Thank you for your submission. We appreciate you reaching out.", "valid: existing success message");
  // quiet window to prove NO request goes out after submit (a network negative), not a transition: fixed wait is correct
  await page.waitForTimeout(300);
  ok(posted.length === 0, "valid: client-only, no request sent");
  await ctx.close();

  // 8. live region is stable: same node before, during and after an error
  { const c3 = await b.newContext(); const p4 = await c3.newPage();
    await p4.goto(BASE, { waitUntil: "networkidle" }); await p4.click("button.lab-toggle");
    const live = await p4.$("#lab-name-error");
    ok(!!live && (await live.getAttribute("aria-live")) === "polite" && (await live.textContent()) === "", "live: name error node exists, polite, empty before any error");
    await p4.focus("#lab-name"); await p4.focus("#lab-email");
    ok(await live.evaluate((n) => n.isConnected && n === document.getElementById("lab-name-error") && n.textContent === "Please enter your name."), "live: same node gets the error text");
    await p4.fill("#lab-name", "Test Person");
    ok(await live.evaluate((n) => n.isConnected && n === document.getElementById("lab-name-error") && n.textContent === ""), "live: same node cleared to empty, not removed");
    await c3.close(); }
  // 7. error text is a polite live region; form has no server action
  const c2 = await b.newContext(); const p3 = await c2.newPage();
  await p3.goto(BASE, { waitUntil: "networkidle" }); await p3.click("button.lab-toggle"); await p3.click("button.lab-submit");
  ok(await p3.$$eval(".lab-error", (els) => els.length === 3 && els.every((x) => x.getAttribute("aria-live") === "polite")), "errors: aria-live=polite on each error");
  ok(await p3.$eval("#lab-contact-form", (f) => !f.hasAttribute("action") && !f.hasAttribute("method")), "form: no server action or method");
  await c2.close();
  await b.close();
  console.log(`${fail ? "FAIL" : "PASS"} ${n - fail}/${n}`);
  process.exit(fail ? 1 : 0);
})().catch((err) => { console.log("FAIL " + err.message); process.exit(1); });
