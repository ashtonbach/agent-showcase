"use client";

import { useState, useCallback } from "react";

const FAQ = [
  {
    q: "What is the agent showcase?",
    a: "A timed live run where specialized agents each own a step—coding, design, review, and QA—on a real branch with a Vercel preview.",
  },
  {
    q: "How do agents hand off work?",
    a: "Each role posts a short status or handoff message; the next agent picks up from the repo state and the notes in the run transcript.",
  },
  {
    q: "What does the gate check before merge?",
    a: "File scope, line budget, banned APIs, a production build, and automated layout and behavior checks on the lab feature.",
  },
  {
    q: "Where does the preview come from?",
    a: "Pushing the feature branch triggers a Vercel deployment; reviewers use that URL to verify layout at desktop and mobile widths.",
  },
];

export default function Lab() {
  const [open, setOpen] = useState<number | null>(null);
  const titleId = "lab-faq-title";

  const toggle = useCallback((i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  }, []);

  const css = `
    .lab-faq { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
    .lab-faq h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; line-height: 1.25; }
    .lab-faq-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
    .lab-faq-item { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 0; overflow: hidden; background: rgba(18,26,22,0.35); }
    .lab-faq-trigger {
      width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px;
      padding: 20px 24px; margin: 0; border: none; background: transparent; color: inherit;
      font-family: var(--sans); font-size: 1rem; text-align: left; cursor: pointer;
    }
    .lab-faq-trigger:hover { color: var(--sage, #B0CBBC); }
    .lab-faq-trigger:focus-visible { outline: 2px solid var(--sage, #B0CBBC); outline-offset: 2px; }
    .lab-faq-icon { flex-shrink: 0; width: 1.25rem; text-align: center; color: var(--sage, #B0CBBC); font-weight: 500; }
    .lab-faq-panel { padding: 0 24px 20px; margin: 0; font-size: 0.95rem; line-height: 1.55; color: #E8EEE9; }
    @media (prefers-reduced-motion: no-preference) {
      .lab-faq-panel { animation: lab-faq-in 0.2s ease; }
      @keyframes lab-faq-in { from { opacity: 0; } to { opacity: 1; } }
    }
  `;

  return (
    <section data-lab="faq-accordion" aria-labelledby={titleId} className="lab-faq">
      <style>{css}</style>
      <h2 id={titleId}>FAQ</h2>
      <ul className="lab-faq-list">
        {FAQ.map((item, i) => {
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
                <span className="lab-faq-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
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
