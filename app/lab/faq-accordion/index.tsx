"use client";

import { useState } from "react";

const FAQS = [
  {
    panel: "faq-panel-1",
    q: "What is the agent showcase?",
    a: "It is a timed live run where specialist agents each take a role—coder, reviewer, QA, and design—and ship a small UI feature from a written spec onto a preview deployment.",
  },
  {
    panel: "faq-panel-2",
    q: "What does the gate check before merge?",
    a: "An automated gate enforces allowed files, line limits, banned APIs, a production build, layout at mobile and desktop widths, and functional behavior such as accordion semantics.",
  },
  {
    panel: "faq-panel-3",
    q: "How do coder and reviewer work together?",
    a: "The coder implements the lab slot, runs SHIP to self-check and push, then hands off to the reviewer; fix rounds apply only the notes returned until checks pass.",
  },
  {
    panel: "faq-panel-4",
    q: "Where does the feature render on the page?",
    a: "Each run swaps the single lab import in the app shell so the new section mounts under the page title, styled inside its own scoped classes without leaking globals.",
  },
];

export default function FaqAccordion() {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const titleId = "faq-accordion-title";

  const onToggle = (panelId: string) => {
    setOpenPanel((prev) => (prev === panelId ? null : panelId));
  };

  return (
    <section data-lab="faq-accordion" aria-labelledby={titleId}>
      <h2 id={titleId}>How the showcase works</h2>
      <div className="lab-wrap">
        {FAQS.map(({ panel, q, a }) => {
          const expanded = openPanel === panel;
          return (
            <div key={panel} className="lab-row">
              <button
                type="button"
                className="lab-trigger"
                aria-expanded={expanded}
                aria-controls={panel}
                onClick={() => onToggle(panel)}
              >
                <span className="lab-question">{q}</span>
                <span className="lab-sign" aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>
              <div id={panel} role="region" hidden={!expanded} className="lab-answer">
                <p>{a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        [data-lab="faq-accordion"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
        [data-lab="faq-accordion"] > h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 20px; color: var(--mist, #F2EFE6); }
        [data-lab="faq-accordion"] .lab-wrap { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 8px 24px 16px; background: rgba(18, 26, 22, 0.35); }
        [data-lab="faq-accordion"] .lab-row + .lab-row { border-top: 1px solid rgba(176, 203, 188, 0.2); }
        [data-lab="faq-accordion"] .lab-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 0; background: none; border: 0; color: inherit; font: inherit; text-align: left; cursor: pointer; }
        [data-lab="faq-accordion"] .lab-trigger:focus-visible { outline: 2px solid var(--sage, #B0CBBC); outline-offset: 2px; }
        [data-lab="faq-accordion"] .lab-question { flex: 1; font-family: var(--serif); font-size: 1.125rem; line-height: 1.35; }
        [data-lab="faq-accordion"] .lab-sign { flex-shrink: 0; width: 1.5rem; text-align: center; font-size: 1.25rem; color: var(--sage, #B0CBBC); }
        [data-lab="faq-accordion"] .lab-answer { padding: 0 0 16px; color: var(--mist, #E8EEE9); line-height: 1.55; }
        [data-lab="faq-accordion"] .lab-answer p { margin: 0; font-size: 0.95rem; }
        @media (prefers-reduced-motion: reduce) { [data-lab="faq-accordion"] * { transition: none !important; } }
      `}</style>
    </section>
  );
}
