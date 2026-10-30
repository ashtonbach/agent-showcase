"use client";
import { useState } from "react";

const ITEMS: readonly [string, string][] = [
  [
    "What is the agent showcase?",
    "It is a timed live run where specialist agents each take a role—coder, reviewer, QA, and design—and ship a small UI feature from a written spec onto a preview deployment.",
  ],
  [
    "What does the gate check before merge?",
    "An automated gate enforces allowed files, line limits, banned APIs, a production build, layout at mobile and desktop widths, and functional behavior such as accordion semantics.",
  ],
  [
    "How do coder and reviewer work together?",
    "The coder implements the lab slot, runs SHIP to self-check and push, then hands off to the reviewer; fix rounds apply only the notes returned until checks pass.",
  ],
  [
    "Where does the feature render on the page?",
    "Each run swaps the single lab import in the app shell so the new section mounts under the page title, styled inside its own scoped classes without leaking globals.",
  ],
];

export default function Lab() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <h2 id="lab-faq-title">How the showcase works</h2>
      <div className="lab-shell">
        {ITEMS.map(([q, a], i) => {
          const on = open === i;
          const pid = `lab-faq-panel-${i}`;
          return (
            <div key={i} className="lab-item">
              <button
                type="button"
                className="lab-trigger"
                aria-expanded={on}
                aria-controls={pid}
                onClick={() => setOpen(on ? null : i)}
              >
                <span className="lab-q">{q}</span>
                <span className="lab-mark" aria-hidden="true">
                  {on ? "−" : "+"}
                </span>
              </button>
              <div id={pid} role="region" hidden={!on} className="lab-panel">
                <p>{a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        [data-lab="faq-accordion"] { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist); }
        [data-lab="faq-accordion"] .lab-shell {
          border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 8px 24px 16px;
          background: rgba(18, 26, 22, 0.35);
        }
        [data-lab="faq-accordion"] .lab-item + .lab-item { border-top: 1px solid rgba(176, 203, 188, 0.2); }
        [data-lab="faq-accordion"] .lab-trigger {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 16px 0; background: none; border: 0; color: var(--mist); text-align: left; cursor: pointer;
          font-family: var(--sans); font-size: 1rem; line-height: 1.4;
        }
        [data-lab="faq-accordion"] .lab-trigger:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        [data-lab="faq-accordion"] .lab-mark { color: var(--sage); font-size: 1.25rem; flex-shrink: 0; }
        [data-lab="faq-accordion"] .lab-panel { padding: 0 0 12px; }
        [data-lab="faq-accordion"] .lab-panel p { margin: 0; color: #F2EFE6; line-height: 1.55; font-size: 0.95rem; }
        @media (prefers-reduced-motion: reduce) {
          [data-lab="faq-accordion"] .lab-trigger { transition: none; }
        }
      `}</style>
    </section>
  );
}
