"use client";

import { useState } from "react";

const HEADING_ID = "faq-accordion-heading";

const FAQ_ITEMS = [
  {
    panelId: "faq-panel-1",
    question: "What is the agent showcase?",
    answer:
      "It is a timed live run where specialist agents each take a role—coder, reviewer, QA, and design—and ship a small UI feature from a written spec onto a preview deployment.",
  },
  {
    panelId: "faq-panel-2",
    question: "What does the gate check before merge?",
    answer:
      "An automated gate enforces allowed files, line limits, banned APIs, a production build, layout at mobile and desktop widths, and functional behavior such as accordion semantics.",
  },
  {
    panelId: "faq-panel-3",
    question: "How do coder and reviewer work together?",
    answer:
      "The coder implements the lab slot, runs SHIP to self-check and push, then hands off to the reviewer; fix rounds apply only the notes returned until checks pass.",
  },
  {
    panelId: "faq-panel-4",
    question: "Where does the feature render on the page?",
    answer:
      "Each run swaps the single lab import in the app shell so the new section mounts under the page title, styled inside its own scoped classes without leaking globals.",
  },
] as const;

const FAQ_CSS = `
  .lab-faq {
    width: min(720px, 100%);
    margin: 8px auto 56px;
    color: var(--mist, #f2efe6);
  }
  .lab-faq h2 {
    font-family: var(--serif);
    font-weight: 400;
    font-size: 30px;
    line-height: 1.2;
    margin: 0 0 20px;
    color: var(--mist, #f2efe6);
  }
  .lab-faq-card {
    border: 1px solid rgba(176, 203, 188, 0.28);
    border-radius: 16px;
    padding: 0;
    overflow: hidden;
    background: rgba(18, 26, 22, 0.35);
  }
  .lab-faq-item {
    border-bottom: 1px solid rgba(176, 203, 188, 0.2);
  }
  .lab-faq-item:last-child {
    border-bottom: none;
  }
  .lab-faq-trigger {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    margin: 0;
    border: none;
    background: transparent;
    color: inherit;
    font-family: var(--sans);
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    line-height: 1.45;
  }
  .lab-faq-trigger:hover,
  .lab-faq-trigger:focus-visible {
    background: rgba(176, 203, 188, 0.08);
    outline: none;
  }
  .lab-faq-trigger:focus-visible {
    box-shadow: inset 0 0 0 2px var(--sage, #b0cbbc);
  }
  .lab-faq-icon {
    flex-shrink: 0;
    width: 1.5rem;
    font-size: 22px;
    line-height: 1;
    color: var(--sage, #b0cbbc);
    text-align: center;
  }
  .lab-faq-panel {
    padding: 0 24px 20px;
    font-family: var(--sans);
    font-size: 15px;
    line-height: 1.6;
    color: #e8eee9;
  }
  @media (prefers-reduced-motion: no-preference) {
    .lab-faq-trigger,
    .lab-faq-panel {
      transition: background 0.15s ease;
    }
  }
`;

export default function FaqAccordion() {
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  function toggle(panelId: string) {
    setOpenPanel((current) => (current === panelId ? null : panelId));
  }

  return (
    <section
      className="lab-faq"
      data-lab="faq-accordion"
      aria-labelledby={HEADING_ID}
    >
      <style>{FAQ_CSS}</style>
      <h2 id={HEADING_ID}>How the showcase works</h2>
      <div className="lab-faq-card">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openPanel === item.panelId;
          return (
            <div className="lab-faq-item" key={item.panelId}>
              <button
                type="button"
                className="lab-faq-trigger"
                aria-expanded={isOpen}
                aria-controls={item.panelId}
                onClick={() => toggle(item.panelId)}
              >
                <span>{item.question}</span>
                <span className="lab-faq-icon" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                id={item.panelId}
                className="lab-faq-panel"
                role="region"
                hidden={!isOpen}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
