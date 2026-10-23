"use client";

import { useState } from "react";

const FAQS: [string, string][] = [
  ["What is the agent showcase?", "A timed live run where agents build, review, and ship a small UI feature on a shared Next.js app, with automated gates before merge."],
  ["How does the lab slot work?", "Each feature lives under app/lab as a client component; the page imports it and current.json sets the H1 title."],
  ["What checks must pass before push?", "Layout at mobile and desktop widths, a production build, and gate rules on files, banned APIs, and behavior."],
  ["Who works on a feature during a run?", "A coder implements the spec, design may add artwork, a reviewer reads the diff, and QA signs off via the run kit."],
];

const css = `
.lab-faq{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#f2efe6)}
.lab-faq h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 24px}
.lab-faq-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.lab-faq-item{border:1px solid rgba(176,203,188,.28);border-radius:16px;overflow:hidden;background:rgba(18,26,22,.35)}
.lab-faq-trigger{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 24px;border:none;background:transparent;color:var(--mist,#f2efe6);font-family:var(--sans);font-size:16px;font-weight:500;text-align:left;cursor:pointer;line-height:1.4}
.lab-faq-trigger:hover,.lab-faq-trigger:focus-visible{color:var(--sage,#b0cbb8)}
.lab-faq-trigger:focus-visible{outline:2px solid var(--sage,#b0cbb8);outline-offset:-2px}
.lab-faq-icon{flex-shrink:0;font-size:22px;color:var(--sage,#b0cbb8)}
.lab-faq-panel{padding:0 24px 20px;color:#e8eee9;font-family:var(--sans);font-size:15px;line-height:1.55}
.lab-faq-panel[hidden]{display:none}
`;

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const titleId = "lab-faq-title";

  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby={titleId}>
      <style>{css}</style>
      <h2 id={titleId}>FAQ</h2>
      <ul className="lab-faq-list">
        {FAQS.map(([q, a], i) => {
          const panelId = `lab-faq-panel-${i}`;
          const isOpen = open === i;
          return (
            <li key={panelId} className="lab-faq-item">
              <button type="button" className="lab-faq-trigger" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{q}</span>
                <span className="lab-faq-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              <div id={panelId} role="region" className="lab-faq-panel" hidden={!isOpen}>{a}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
