"use client";
import { useState } from "react";

const QA = [
  ["Who builds these changes?", "A team of AI agents: a coder writes it, a reviewer checks it and QA verifies production."],
  ["Can the agents change anything?", "No. Each run may only touch one folder, add no dependencies and make no network calls."],
  ["What stops a broken change?", "Automated gates check the files, the size, banned calls and a screenshot before anything merges."],
  ["How do I reset the demo?", "The site returns to its base version before every run and again every night at 3 AM CT."],
];
const css = `
.lab-faq { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-faq h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 6px 0 16px; }
.lab-faq-item { border-top: 1px solid rgba(176, 203, 188, 0.28); }
.lab-faq-item:last-child { border-bottom: 1px solid rgba(176, 203, 188, 0.28); }
.lab-faq button { width: 100%; display: flex; justify-content: space-between; gap: 16px; padding: 16px 4px; background: none; border: 0; color: inherit; font: 500 17px var(--sans); text-align: left; cursor: pointer; }
.lab-faq button span:last-child { color: var(--sage); }
.lab-faq-panel { padding: 0 4px 18px; opacity: 0.85; }
`;

export default function FaqAccordion() {
  const [open, setOpen] = useState<number>(-1);
  return (
    <section data-lab="faq-accordion" className="lab-faq" aria-labelledby="lab-faq-title">
      <style>{css}</style>
      <p className="label">Questions</p>
      <h2 id="lab-faq-title">Frequently asked</h2>
      {QA.map(([q, a], i) => (
        <div className="lab-faq-item" key={q}>
          <h3>
            <button
              type="button"
              id={`lab-faq-q${i}`}
              aria-expanded={open === i}
              aria-controls={`lab-faq-a${i}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span>{q}</span>
              <span aria-hidden="true">{open === i ? "\u2212" : "+"}</span>
            </button>
          </h3>
          <div id={`lab-faq-a${i}`} role="region" aria-labelledby={`lab-faq-q${i}`} className="lab-faq-panel" hidden={open !== i}>
            {a}
          </div>
        </div>
      ))}
    </section>
  );
}
