"use client";

import { useState } from "react";

const FAQ = [
  {
    id: "faq-a1",
    q: "What is the agent showcase?",
    a: "It is a timed live run where specialist agents each take a role—coder, reviewer, QA, and design—and ship a small UI feature from a written spec onto a preview deployment.",
  },
  {
    id: "faq-a2",
    q: "What does the gate check before merge?",
    a: "An automated gate enforces allowed files, line limits, banned APIs, a production build, layout at mobile and desktop widths, and functional behavior such as accordion semantics.",
  },
  {
    id: "faq-a3",
    q: "How do coder and reviewer work together?",
    a: "The coder implements the lab slot, runs SHIP to self-check and push, then hands off to the reviewer; fix rounds apply only the notes returned until checks pass.",
  },
  {
    id: "faq-a4",
    q: "Where does the feature render on the page?",
    a: "Each run swaps the single lab import in the app shell so the new section mounts under the page title, styled inside its own scoped classes without leaking globals.",
  },
] as const;

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const titleId = "faq-accordion-title";

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  };

  return (
    <section data-lab="faq-accordion" aria-labelledby={titleId} className="lab-wrap">
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        .lab-title { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.25; margin: 0 0 20px; }
        .lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
        .lab-item { border-top: 1px solid rgba(176, 203, 188, 0.2); }
        .lab-item:first-child { border-top: none; }
        .lab-trigger {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 16px 0; background: none; border: none; color: inherit; font: inherit; text-align: left; cursor: pointer;
        }
        .lab-trigger:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        .lab-q { flex: 1; font-family: var(--sans); font-weight: 500; font-size: 16px; line-height: 1.4; }
        .lab-icon { flex-shrink: 0; color: var(--sage); font-size: 22px; line-height: 1; width: 1.25em; text-align: center; }
        .lab-panel { padding: 0 0 16px; font-size: 15px; line-height: 1.6; color: #E8EEE9; }
        @media (prefers-reduced-motion: no-preference) {
          .lab-panel { transition: opacity 0.2s ease; }
        }
      `}</style>
      <h2 id={titleId} className="lab-title">
        How the showcase works
      </h2>
      <div className="lab-card">
        {FAQ.map((item, i) => {
          const expanded = open === i;
          return (
            <div key={item.id} className="lab-item">
              <button
                type="button"
                className="lab-trigger"
                aria-expanded={expanded}
                aria-controls={item.id}
                onClick={() => toggle(i)}
              >
                <span className="lab-q">{item.q}</span>
                <span className="lab-icon" aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>
              <div id={item.id} role="region" className="lab-panel" hidden={!expanded}>
                {item.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
