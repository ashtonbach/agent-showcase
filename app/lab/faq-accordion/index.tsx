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

export default function LabFaqAccordion() {
  const titleId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section
      data-lab="faq-accordion"
      aria-labelledby={titleId}
      className="lab-faq"
    >
      <h2 id={titleId} className="lab-faq-title">
        How the showcase works
      </h2>
      <div className="lab-faq-card">
        <ul className="lab-faq-list">
          {ITEMS.map((item, index) => {
            const expanded = openIndex === index;
            const panelId = `lab-faq-panel-${index}`;
            return (
              <li key={panelId} className="lab-faq-item">
                <h3 className="lab-faq-q-wrap">
                  <button
                    type="button"
                    className="lab-faq-trigger"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span className="lab-faq-q-text">{item.q}</span>
                    <span className="lab-faq-icon" aria-hidden="true">
                      {expanded ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  className="lab-faq-panel"
                  hidden={!expanded}
                >
                  <p className="lab-faq-a">{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <style>{`
        .lab-faq {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          color: var(--mist);
        }
        .lab-faq-title {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.15;
          margin: 0 0 20px;
          color: #f2efe6;
        }
        .lab-faq-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 8px 24px 16px;
          background: rgba(18, 26, 22, 0.35);
        }
        .lab-faq-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .lab-faq-item {
          border-top: 1px solid rgba(176, 203, 188, 0.2);
        }
        .lab-faq-item:first-child {
          border-top: none;
        }
        .lab-faq-q-wrap {
          margin: 0;
          font-size: inherit;
          font-weight: inherit;
        }
        .lab-faq-trigger {
          display: flex;
          width: 100%;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 0;
          border: none;
          background: transparent;
          color: var(--mist);
          font-family: var(--sans);
          font-size: 17px;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
        }
        .lab-faq-trigger:focus-visible {
          outline: 2px solid var(--sage);
          outline-offset: 2px;
          border-radius: 4px;
        }
        .lab-faq-icon {
          flex-shrink: 0;
          width: 1.5em;
          text-align: center;
          color: var(--sage);
          font-size: 22px;
          line-height: 1;
        }
        .lab-faq-panel {
          padding: 0 0 16px;
        }
        .lab-faq-a {
          margin: 0;
          color: rgba(232, 238, 233, 0.88);
          line-height: 1.55;
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
