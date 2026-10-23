"use client";

import { useState } from "react";

const FAQS: [string, string][] = [
  [
    "How does a coder build a feature in the showcase?",
    "They read the spec, implement one client component under app/lab/<slug>/, wire the lab slot in app/page.tsx, and run SHIP so the gate can verify build and behavior.",
  ],
  [
    "What does the SHIP step check?",
    "It runs layout checks at mobile and desktop widths, a production build, gate rules on files and banned APIs, then commits and pushes when everything passes.",
  ],
  [
    "Who reviews after the coder hands off?",
    "Rowan reviews for spec and quality; Cedar runs QA; the coordinator tracks the run transcript and preview deployment.",
  ],
  [
    "How does the lab slot appear on the demo page?",
    "app/lab/current.json sets the page H1 slug; page.tsx imports the active lab component at the lab slot comment.",
  ],
];

const css = `
.lab-faq{width:min(720px,100%);margin:8px auto 56px;box-sizing:border-box}
.lab-faq-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;box-sizing:border-box}
.lab-faq-list{list-style:none;margin:0;padding:0}
.lab-faq-item{border-top:1px solid rgba(176,203,188,.2)}
.lab-faq-item:first-child{border-top:none}
.lab-faq-trigger{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 0;margin:0;border:none;background:transparent;color:var(--mist,#e8eee9);font-family:var(--sans);font-size:1rem;font-weight:500;text-align:left;cursor:pointer}
.lab-faq-trigger:focus-visible{outline:2px solid var(--sage,#b0cbbc);outline-offset:2px}
.lab-faq-icon{flex-shrink:0;width:1.5rem;color:var(--sage,#b0cbbc);font-size:1.25rem;line-height:1;text-align:center}
.lab-faq-panel{margin:0 0 16px;padding:0 0 8px;color:var(--mist,#e8eee9);font-family:var(--sans);font-size:.95rem;line-height:1.55;opacity:.92}
`;

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleId = "lab-faq-title";

  return (
    <section data-lab="faq-accordion" aria-labelledby={titleId}>
      <style>{css}</style>
      <h2 id={titleId}>Showcase FAQ</h2>
      <div className="lab-faq">
        <div className="lab-faq-card">
          <ul className="lab-faq-list">
            {FAQS.map(([q, a], index) => {
              const panelId = `lab-faq-panel-${index}`;
              const expanded = openIndex === index;
              return (
                <li key={panelId} className="lab-faq-item">
                  <button
                    type="button"
                    className="lab-faq-trigger"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(expanded ? null : index)}
                  >
                    <span>{q}</span>
                    <span className="lab-faq-icon" aria-hidden="true">{expanded ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} role="region" className="lab-faq-panel" hidden={!expanded}>{a}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
