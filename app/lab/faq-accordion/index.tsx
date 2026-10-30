"use client";

import { useCallback, useState } from "react";

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
  const toggle = useCallback((i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <style>{`
        [data-lab="faq-accordion"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        [data-lab="faq-accordion"] h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.25; margin: 0 0 20px; }
        .lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 8px 24px; background: rgba(18, 26, 22, 0.35); }
        .lab-row { border-bottom: 1px solid rgba(176, 203, 188, 0.18); }
        .lab-row:last-child { border-bottom: none; }
        .lab-trigger { width: 100%; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 16px 0; background: none; border: none; color: inherit; font: inherit; text-align: left; cursor: pointer; }
        .lab-trigger:focus-visible { outline: 2px solid var(--sage, #b0cbbc); outline-offset: 2px; }
        .lab-q { flex: 1; font-family: var(--serif); font-size: 18px; line-height: 1.35; }
        .lab-icon { flex-shrink: 0; width: 28px; height: 28px; display: grid; place-items: center; font-size: 22px; line-height: 1; color: var(--sage, #b0cbbc); }
        .lab-panel { padding: 0 0 16px 0; }
        .lab-panel p { margin: 0; font-family: var(--sans); font-size: 15px; line-height: 1.55; color: #e8eee9; }
        @media (prefers-reduced-motion: reduce) { .lab-trigger, .lab-panel { transition: none; } }
      `}</style>
      <h2 id="lab-faq-title">How the showcase works</h2>
      <div className="lab-card">
        {ITEMS.map((item, i) => {
          const panelId = `lab-faq-panel-${i}`;
          const expanded = open === i;
          return (
            <div className="lab-row" key={item.q}>
              <button
                type="button"
                className="lab-trigger"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span className="lab-q">{item.q}</span>
                <span className="lab-icon" aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>
              <div id={panelId} role="region" className="lab-panel" hidden={!expanded}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
