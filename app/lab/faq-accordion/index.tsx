"use client";

import { useState } from "react";
const ITEMS = [
  ["How are roles split in a run?", "Coder, Designer, Reviewer, and QA each get a fixed scope; the coder owns the lab folder while others review, supply art, or sign off in parallel."],
  ["What runs before a push lands?", "Layout at 390px and 1280px, production build, allowlist gates, and functional checks on accordion behavior and console errors."],
  ["What can the coder edit?", "Only app/lab/<slug>/index.tsx, the Lab import and render lines in app/page.tsx, and app/lab/current.json—no dependencies or network calls."],
  ["How is the preview shared?", "The feature branch push updates the PR and Vercel comments with a preview URL for reviewers and QA."],
] as const;
export default function LabFaq() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-heading">
      <h2 id="lab-faq-heading">Showcase FAQ</h2>
      <ul className="lab-stack">
        {ITEMS.map(([question, answer], idx) => (
          <li className="lab-row" key={idx}>
            <button type="button" className="lab-row-btn" aria-expanded={active === idx} aria-controls={`lab-faq-ans-${idx}`} onClick={() => setActive(active === idx ? null : idx)}>
              <span className="lab-row-text">{question}</span>
              <span className="lab-row-glyph" aria-hidden="true">{active === idx ? "−" : "+"}</span>
            </button>
            <div id={`lab-faq-ans-${idx}`} role="region" className="lab-row-body" hidden={active !== idx}>{answer}</div>
          </li>
        ))}
      </ul>
      <style>{`
[data-lab="faq-accordion"] .lab-stack{list-style:none;margin:8px auto 56px;padding:0;width:min(720px,100%);display:grid;gap:10px}
[data-lab="faq-accordion"] .lab-row{border:1px solid rgba(176,203,188,.28);border-radius:16px;background:rgba(20,32,26,.45)}
[data-lab="faq-accordion"] .lab-row-btn{width:100%;display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:24px;border:0;background:transparent;color:#F2EFE6;font:inherit;text-align:left;cursor:pointer}
[data-lab="faq-accordion"] .lab-row-btn:focus-visible{outline:2px solid var(--sage);outline-offset:-2px}
[data-lab="faq-accordion"] .lab-row-glyph{color:var(--sage);font-size:1.35rem;line-height:1}
[data-lab="faq-accordion"] .lab-row-body{padding:0 24px 22px;color:#E8EEE9;line-height:1.55}
[data-lab="faq-accordion"] .lab-row-body[hidden]{display:none}
`}</style>
    </section>
  );
}
