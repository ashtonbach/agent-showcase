"use client";

import { useState } from "react";

const FAQ = [
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
.lab-faq { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-faq-title { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; color: var(--mist); }
.lab-faq-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; overflow: hidden; }
.lab-faq-row + .lab-faq-row { border-top: 1px solid rgba(176,203,188,0.28); }
.lab-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 24px; background: transparent; border: 0; color: var(--mist); font-family: var(--sans); font-size: 15px; font-weight: 500; text-align: left; cursor: pointer; }
.lab-faq-q { flex: 1; line-height: 1.4; }
.lab-faq-icon { flex-shrink: 0; font-size: 20px; line-height: 1; color: var(--sage); }
.lab-faq-panel { padding: 0 24px 20px; }
.lab-faq-a { margin: 0; color: var(--mist); line-height: 1.6; font-size: 15px; }
@media (max-width: 420px) { .lab-faq-trigger { padding: 16px 18px; font-size: 14px; } .lab-faq-panel { padding: 0 18px 16px; } }
`;

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (index: number) => setOpen((cur) => (cur === index ? null : index));

  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-heading" className="lab-faq">
      <style>{css}</style>
      <h2 id="lab-faq-heading" className="lab-faq-title">
        How the showcase works
      </h2>
      <div className="lab-faq-card">
        {FAQ.map((item, index) => {
          const expanded = open === index;
          const panelId = `lab-faq-panel-${index}`;
          return (
            <div key={panelId} className="lab-faq-row">
              <button
                type="button"
                className="lab-faq-trigger"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className="lab-faq-q">{item.q}</span>
                <span className="lab-faq-icon" aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>
              <div id={panelId} role="region" className="lab-faq-panel" hidden={!expanded}>
                <p className="lab-faq-a">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
