"use client";

import { useState, useCallback } from "react";

const FAQS = [
  {
    q: "What is the agent showcase?",
    a: "It is a timed live run where specialized agents each build, review, and ship a small UI feature on a shared Next.js app, with automated gates before merge.",
  },
  {
    q: "How does the lab slot work?",
    a: "Each feature lives under app/lab/<slug>/ as a client component. The page imports that module and current.json sets the demo title shown in the H1.",
  },
  {
    q: "What checks must pass before push?",
    a: "The ship script runs layout checks at mobile and desktop widths, a production build, and gate.js rules on files, banned APIs, and functional behavior.",
  },
  {
    q: "Who works on a feature during a run?",
    a: "A coder implements the spec, a designer may add artwork in parallel, a reviewer reads the diff, and QA signs off—coordinated by the run kit.",
  },
];

const css = `
.lab-faq {
  width: min(720px, 100%);
  margin: 8px auto 56px;
  color: var(--mist, #f2efe6);
}
.lab-faq h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.25;
  margin: 0 0 24px;
  color: var(--mist, #f2efe6);
}
.lab-faq-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.lab-faq-item {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 0;
  overflow: hidden;
  background: rgba(18, 26, 22, 0.35);
}
.lab-faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  margin: 0;
  border: none;
  background: transparent;
  color: var(--mist, #f2efe6);
  font-family: var(--sans);
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  line-height: 1.4;
}
.lab-faq-trigger:hover {
  color: var(--sage, #b0cbb8);
}
.lab-faq-trigger:focus-visible {
  outline: 2px solid var(--sage, #b0cbb8);
  outline-offset: -2px;
}
.lab-faq-icon {
  flex-shrink: 0;
  font-size: 22px;
  line-height: 1;
  color: var(--sage, #b0cbb8);
}
.lab-faq-panel {
  padding: 0 24px 20px;
  color: #e8eee9;
  font-family: var(--sans);
  font-size: 15px;
  line-height: 1.55;
}
.lab-faq-panel[hidden] {
  display: none;
}
@media (prefers-reduced-motion: no-preference) {
  .lab-faq-panel {
    animation: lab-faq-in 0.2s ease;
  }
}
@keyframes lab-faq-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .lab-faq-panel {
    animation: none;
  }
}
`;

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const titleId = "lab-faq-title";

  const toggle = useCallback((index: number) => {
    setOpen((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby={titleId}>
      <style>{css}</style>
      <h2 id={titleId}>FAQ</h2>
      <ul className="lab-faq-list">
        {FAQS.map((item, i) => {
          const panelId = `lab-faq-panel-${i}`;
          const isOpen = open === i;
          return (
            <li key={panelId} className="lab-faq-item">
              <button
                type="button"
                className="lab-faq-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span>{item.q}</span>
                <span className="lab-faq-icon" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                className="lab-faq-panel"
                hidden={!isOpen}
              >
                {item.a}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
