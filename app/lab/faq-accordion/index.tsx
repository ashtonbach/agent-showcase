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
  const pick = (i: number) => setOpen((v) => (v === i ? null : i));

  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <h2 id="lab-faq-title">How the showcase works</h2>
      <div className="lab-faq">
        {ITEMS.map((item, i) => {
          const on = open === i;
          const pid = `faq-panel-${i}`;
          const bid = `faq-btn-${i}`;
          return (
            <div key={pid} className="lab-faq-row">
              <button
                id={bid}
                type="button"
                className="lab-faq-trigger"
                aria-expanded={on}
                aria-controls={pid}
                onClick={() => pick(i)}
              >
                <span className="lab-faq-q">{item.q}</span>
                <span className="lab-faq-mark" aria-hidden="true">
                  {on ? "−" : "+"}
                </span>
              </button>
              <div
                id={pid}
                role="region"
                aria-labelledby={bid}
                hidden={!on}
                className="lab-faq-panel"
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        [data-lab="faq-accordion"] {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist, #f2efe6);
        }
        [data-lab="faq-accordion"] h2 {
          margin: 0 0 20px;
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.2;
          color: var(--mist, #f2efe6);
        }
        .lab-faq {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          overflow: hidden;
          background: rgba(18, 26, 22, 0.35);
        }
        .lab-faq-row + .lab-faq-row {
          border-top: 1px solid rgba(176, 203, 188, 0.28);
        }
        .lab-faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          margin: 0;
          border: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          text-align: left;
          cursor: pointer;
        }
        .lab-faq-trigger:focus-visible {
          outline: 2px solid var(--sage, #b0cbb8);
          outline-offset: -2px;
        }
        .lab-faq-q {
          flex: 1;
          font-family: var(--sans);
          font-size: 16px;
          line-height: 1.45;
        }
        .lab-faq-mark {
          flex-shrink: 0;
          width: 28px;
          font-size: 22px;
          line-height: 1;
          color: var(--sage, #b0cbb8);
          text-align: center;
        }
        .lab-faq-panel {
          padding: 0 24px 24px;
        }
        .lab-faq-panel[hidden] {
          display: none;
        }
        .lab-faq-panel p {
          margin: 0;
          font-family: var(--sans);
          font-size: 15px;
          line-height: 1.55;
          color: #e8eee9;
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-faq-trigger {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
