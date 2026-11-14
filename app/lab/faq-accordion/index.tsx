"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "What is the agent showcase?",
    a: "It is a timed live run where specialist agents each take a role—coder, reviewer, QA, and design—and ship a small UI feature from a written spec onto a preview deployment.",
  },
  {
    q: "What does the gate check before merge?",
    a: "An automated gate enforces allowed files, line limits, banned APIs, a production build, layout at mobile and desktop widths, and functional behavior such as accordion semantics.",
  },
  {
    q: "How do coder and reviewer work together?",
    a: "The coder implements the lab slot, runs SHIP to self-check and push, then hands off to the reviewer; fix rounds apply only the notes returned until checks pass.",
  },
  {
    q: "Where does the feature render on the page?",
    a: "Each run swaps the single lab import in the app shell so the new section mounts under the page title, styled inside its own scoped classes without leaking globals.",
  },
] as const;

const css = `
[data-lab="faq-accordion"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}
.lab-h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
.lab-item+ .lab-item{border-top:1px solid rgba(176,203,188,.2)}
.lab-trigger{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;width:100%;padding:14px 0;background:transparent;border:0;color:var(--mist,#E8EEE9);font-family:var(--sans);font-size:1rem;line-height:1.45;text-align:left;cursor:pointer}
.lab-trigger:focus-visible{outline:2px solid var(--sage);outline-offset:4px;border-radius:6px}
.lab-icon{flex:0 0 auto;font-family:var(--sans);font-size:1.25rem;line-height:1;color:var(--sage,#B0CBBC);width:1.5em;text-align:center}
.lab-panel{padding:0 0 14px 0;font-family:var(--sans);font-size:.95rem;line-height:1.55;color:var(--mist,#E8EEE9)}
.lab-panel p{margin:0}
@media (prefers-reduced-motion:reduce){.lab-trigger{transition:none}}
`;

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const titleId = "lab-faq-heading";

  const onToggle = (index: number) => {
    setOpen((prev) => (prev === index ? null : index));
  };

  return (
    <section data-lab="faq-accordion" aria-labelledby={titleId}>
      <style>{css}</style>
      <h2 id={titleId} className="lab-h2">
        How the showcase works
      </h2>
      <div className="lab-card">
        {ITEMS.map((item, index) => {
          const panelId = `lab-faq-panel-${index}`;
          const expanded = open === index;
          return (
            <div key={item.q} className="lab-item">
              <button
                type="button"
                className="lab-trigger"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => onToggle(index)}
              >
                <span>{item.q}</span>
                <span className="lab-icon" aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                className="lab-panel"
                hidden={!expanded}
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}