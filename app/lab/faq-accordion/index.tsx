"use client";

import { useId, useState } from "react";

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

export default function FaqAccordionLab() {
  const base = useId().replace(/:/g, "");
  const titleId = `${base}-title`;
  const [open, setOpen] = useState<number | null>(null);

  const onToggle = (index: number) => {
    setOpen((prev) => (prev === index ? null : index));
  };

  return (
    <section data-lab="faq-accordion" aria-labelledby={titleId} className="lab-faq">
      <h2 id={titleId}>How the showcase works</h2>
      <div className="lab-faq-card">
        {ITEMS.map((item, i) => {
          const panelId = `${base}-panel-${i}`;
          const expanded = open === i;
          return (
            <div key={item.q} className="lab-faq-row">
              <button
                type="button"
                className="lab-faq-trigger"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => onToggle(i)}
              >
                <span className="lab-faq-question">{item.q}</span>
                <span className="lab-faq-glyph" aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                className="lab-faq-answer"
                hidden={!expanded}
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        .lab-faq { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        .lab-faq h2 { margin: 0 0 20px; font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; color: var(--mist, #f2efe6); }
        .lab-faq-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 8px 24px 16px; background: rgba(18, 26, 22, 0.35); }
        .lab-faq-row + .lab-faq-row { border-top: 1px solid rgba(176, 203, 188, 0.2); }
        .lab-faq-trigger { display: flex; align-items: flex-start; gap: 16px; width: 100%; margin: 0; padding: 16px 0; border: 0; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; }
        .lab-faq-trigger:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; border-radius: 4px; }
        .lab-faq-question { flex: 1; font-family: var(--sans); font-size: 16px; font-weight: 500; line-height: 1.45; }
        .lab-faq-glyph { flex-shrink: 0; width: 1.5em; font-size: 20px; line-height: 1.2; text-align: center; color: var(--sage); }
        .lab-faq-answer { padding: 0 0 16px 0; }
        .lab-faq-answer p { margin: 0; font-family: var(--sans); font-size: 15px; line-height: 1.55; color: #e8eee9; }
        @media (prefers-reduced-motion: no-preference) {
          .lab-faq-glyph { transition: transform 0.15s ease; }
          .lab-faq-trigger[aria-expanded="true"] .lab-faq-glyph { transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}
