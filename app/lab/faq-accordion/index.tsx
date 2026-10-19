"use client";

import { useState, useCallback } from "react";

const FAQS = [
  {
    q: "What is this showcase?",
    a: "A timed live run where autonomous agents collaborate on a small product feature while observers follow along in the transcript and preview.",
  },
  {
    q: "Who does what on each feature?",
    a: "A coder implements the lab slot, a designer may add artwork in parallel, a reviewer checks the gate and preview, and QA signs off before merge.",
  },
  {
    q: "How is the work validated?",
    a: "Automated checks cover file rules, build, layout at mobile and desktop widths, accessibility patterns, and browser console errors before anything ships.",
  },
  {
    q: "What happens after ship?",
    a: "The branch pushes to GitHub, Vercel builds a preview deployment, and reviewers verify that URL matches the spec before the run continues.",
  },
];

const css = `
.lab-faq-wrap { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-faq-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-faq-item { border-bottom: 1px solid rgba(176, 203, 188, 0.2); }
.lab-faq-item:last-child { border-bottom: none; }
.lab-faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  margin: 0;
  border: none;
  background: transparent;
  color: var(--mist, #E8EEE9);
  font-family: var(--sans);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
}
.lab-faq-trigger:hover { color: var(--sage, #B0CBBC); }
.lab-faq-trigger:focus-visible {
  outline: 2px solid var(--sage, #B0CBBC);
  outline-offset: 2px;
  border-radius: 4px;
}
.lab-faq-icon {
  flex-shrink: 0;
  width: 1.25rem;
  text-align: center;
  color: var(--sage, #B0CBBC);
  font-size: 1.25rem;
  line-height: 1;
}
.lab-faq-panel {
  padding: 0 0 16px;
  color: var(--mist, #E8EEE9);
  font-family: var(--sans);
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0.92;
}
@media (prefers-reduced-motion: no-preference) {
  .lab-faq-panel { animation: lab-faq-in 0.2s ease; }
}
@keyframes lab-faq-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 0.92; transform: translateY(0); }
}
`;

export default function Lab() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section data-lab="faq-accordion" aria-labelledby="faq-accordion-title">
      <style>{css}</style>
      <h2 id="faq-accordion-title">How the showcase works</h2>
      <div className="lab-faq-wrap">
        <div className="lab-faq-card">
          {FAQS.map((item, i) => {
            const panelId = `faq-panel-${i}`;
            const isOpen = open === i;
            return (
              <div key={i} className="lab-faq-item">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
