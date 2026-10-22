"use client";

import { useState } from "react";

const TITLE_ID = "faq-accordion-title";

const FAQS = [
  {
    q: "What is this showcase?",
    a: "A timed live run where designers, coders, and reviewers ship a small feature on a shared Next.js app, with automated gates before merge.",
  },
  {
    q: "Who works on each feature?",
    a: "Roles include a coder who implements the lab component, a designer for artwork when needed, a reviewer, and QA—each with fixed file and scope rules.",
  },
  {
    q: "How is quality enforced?",
    a: "Scripts check file limits, banned APIs, layout at mobile and desktop widths, production build, and browser console errors before push.",
  },
  {
    q: "Where does the feature render?",
    a: "Only inside app/lab under a slug; the home page swaps a single Lab import so each demo stays isolated and gate-checked.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  };

  const css = `
.lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-item { border-bottom: 1px solid rgba(176, 203, 188, 0.2); }
.lab-item:last-child { border-bottom: none; }
.lab-trigger {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  margin: 0;
  border: none;
  background: transparent;
  color: var(--mist, #E8EEE9);
  font-family: var(--sans, system-ui, sans-serif);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
}
.lab-trigger:hover { color: var(--sage, #B0CBBC); }
.lab-trigger:focus-visible {
  outline: 2px solid var(--sage, #B0CBBC);
  outline-offset: 2px;
}
.lab-mark {
  flex-shrink: 0;
  width: 1.25rem;
  color: var(--sage, #B0CBBC);
  font-size: 1.25rem;
  line-height: 1.2;
}
.lab-q { flex: 1; line-height: 1.4; }
.lab-panel {
  padding: 0 0 16px 2.45rem;
  color: var(--mist, #E8EEE9);
  font-family: var(--sans, system-ui, sans-serif);
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0.92;
}
@media (prefers-reduced-motion: no-preference) {
  .lab-panel { transition: opacity 0.2s ease; }
}
`;

  return (
    <section data-lab="faq-accordion" aria-labelledby={TITLE_ID}>
      <style>{css}</style>
      <div className="lab-wrap">
        <h2 id={TITLE_ID}>FAQ</h2>
        <div className="lab-card">
          {FAQS.map((item, i) => {
            const panelId = `faq-panel-${i}`;
            const isOpen = open === i;
            return (
              <div key={panelId} className="lab-item">
                <button
                  type="button"
                  className="lab-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <span className="lab-mark" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                  <span className="lab-q">{item.q}</span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  className="lab-panel"
                  hidden={!isOpen}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
