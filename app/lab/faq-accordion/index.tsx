"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What is the agent showcase?",
    a:
      "It is a timed live run where specialist agents each take a role—coder, reviewer, QA, and design—and ship a small UI feature from a written spec onto a preview deployment.",
  },
  {
    q: "What does the gate check before merge?",
    a:
      "An automated gate enforces allowed files, line limits, banned APIs, a production build, layout at mobile and desktop widths, and functional behavior such as accordion semantics.",
  },
  {
    q: "How do coder and reviewer work together?",
    a:
      "The coder implements the lab slot, runs SHIP to self-check and push, then hands off to the reviewer; fix rounds apply only the notes returned until checks pass.",
  },
  {
    q: "Where does the feature render on the page?",
    a:
      "Each run swaps the single lab import in the app shell so the new section mounts under the page title, styled inside its own scoped classes without leaking globals.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section data-lab="faq-accordion" aria-labelledby="faq-accordion-title">
      <h2 id="faq-accordion-title">How the showcase works</h2>
      <div className="lab-faq">
        {FAQS.map((item, index) => {
          const open = openIndex === index;
          const panelId = `faq-accordion-panel-${index}`;
          return (
            <div key={panelId} className="lab-faq-item">
              <button
                type="button"
                className="lab-faq-trigger"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className="lab-faq-q">{item.q}</span>
                <span className="lab-faq-icon" aria-hidden="true">
                  {open ? "−" : "+"}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                className="lab-faq-panel"
                hidden={!open}
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        [data-lab="faq-accordion"] .lab-faq {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 8px 24px 16px;
          box-sizing: border-box;
        }
        [data-lab="faq-accordion"] .lab-faq-item {
          border-bottom: 1px solid rgba(176, 203, 188, 0.2);
        }
        [data-lab="faq-accordion"] .lab-faq-item:last-child {
          border-bottom: none;
        }
        [data-lab="faq-accordion"] .lab-faq-trigger {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
          padding: 16px 0;
          margin: 0;
          border: none;
          background: transparent;
          color: var(--mist, #e8eee9);
          font-family: var(--sans), system-ui, sans-serif;
          font-size: 1rem;
          line-height: 1.45;
          text-align: left;
          cursor: pointer;
        }
        [data-lab="faq-accordion"] .lab-faq-trigger:hover {
          color: var(--sage, #b0cbbc);
        }
        [data-lab="faq-accordion"] .lab-faq-trigger:focus-visible {
          outline: 2px solid var(--sage, #b0cbbc);
          outline-offset: 2px;
          border-radius: 4px;
        }
        [data-lab="faq-accordion"] .lab-faq-q {
          flex: 1;
        }
        [data-lab="faq-accordion"] .lab-faq-icon {
          flex-shrink: 0;
          font-size: 1.25rem;
          line-height: 1.2;
          color: var(--sage, #b0cbbc);
          font-weight: 500;
        }
        [data-lab="faq-accordion"] .lab-faq-panel {
          padding: 0 0 16px;
        }
        [data-lab="faq-accordion"] .lab-faq-panel p {
          margin: 0;
          color: var(--mist, #e8eee9);
          opacity: 0.92;
          font-size: 0.95rem;
          line-height: 1.55;
        }
        [data-lab="faq-accordion"] .lab-faq-panel[hidden] {
          display: none;
        }
        @media (prefers-reduced-motion: no-preference) {
          [data-lab="faq-accordion"] .lab-faq-icon {
            transition: transform 0.15s ease;
          }
        }
      `}</style>
    </section>
  );
}
