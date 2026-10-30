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
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const titleId = "faq-showcase-heading";

  return (
    <section data-lab="faq-accordion" aria-labelledby={titleId}>
      <h2 id={titleId}>How the showcase works</h2>
      <div className="lab-card">
        {ITEMS.map((item, i) => {
          const panelId = `faq-panel-${i}`;
          const expanded = open === i;
          return (
            <div className="lab-row" key={item.q}>
              <button
                type="button"
                className="lab-trigger"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
              >
                <span className="lab-q">{item.q}</span>
                <span className="lab-sign" aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                hidden={!expanded}
                className="lab-panel"
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        [data-lab="faq-accordion"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        [data-lab="faq-accordion"] h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 0 0 20px; }
        [data-lab="faq-accordion"] .lab-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 8px 24px 16px; }
        [data-lab="faq-accordion"] .lab-row + .lab-row { border-top: 1px solid rgba(176,203,188,0.2); }
        [data-lab="faq-accordion"] .lab-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 0; background: none; border: 0; color: inherit; font: inherit; text-align: left; cursor: pointer; }
        [data-lab="faq-accordion"] .lab-trigger:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        [data-lab="faq-accordion"] .lab-q { flex: 1; font-family: var(--serif); font-size: 18px; line-height: 1.35; }
        [data-lab="faq-accordion"] .lab-sign { flex-shrink: 0; width: 28px; text-align: center; font-size: 22px; color: var(--sage); line-height: 1; }
        [data-lab="faq-accordion"] .lab-panel { padding: 0 0 16px; }
        [data-lab="faq-accordion"] .lab-panel p { margin: 0; font-family: var(--sans); font-size: 15px; line-height: 1.55; color: #E8EEE9; }
        @media (prefers-reduced-motion: reduce) {
          [data-lab="faq-accordion"] * { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
