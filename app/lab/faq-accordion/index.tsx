"use client";

import { useState } from "react";

type FaqItem = { id: string; question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "q1",
    question: "What is the agent showcase?",
    answer:
      "It is a timed live run where specialist agents each take a role—coder, reviewer, QA, and design—and ship a small UI feature from a written spec onto a preview deployment.",
  },
  {
    id: "q2",
    question: "What does the gate check before merge?",
    answer:
      "An automated gate enforces allowed files, line limits, banned APIs, a production build, layout at mobile and desktop widths, and functional behavior such as accordion semantics.",
  },
  {
    id: "q3",
    question: "How do coder and reviewer work together?",
    answer:
      "The coder implements the lab slot, runs SHIP to self-check and push, then hands off to the reviewer; fix rounds apply only the notes returned until checks pass.",
  },
  {
    id: "q4",
    question: "Where does the feature render on the page?",
    answer:
      "Each run swaps the single lab import in the app shell so the new section mounts under the page title, styled inside its own scoped classes without leaking globals.",
  },
];

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <h2 id="lab-faq-title" className="lab-faq-title">How the showcase works</h2>
      <div className="lab-faq-card">
        {FAQ_ITEMS.map((item) => {
          const panelId = `lab-faq-panel-${item.id}`;
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="lab-faq-item">
              <button
                type="button"
                className="lab-faq-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span className="lab-faq-question">{item.question}</span>
                <span className="lab-faq-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              <div id={panelId} role="region" className="lab-faq-panel" hidden={!isOpen}>
                <p className="lab-faq-answer">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        .lab-faq-title { font-family: var(--serif); font-weight: 400; font-size: 30px; color: var(--mist); margin: 0 0 15px; }
        .lab-faq-card { width: min(720px, 100%); margin: 8px auto 56px; border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; box-sizing: border-box; }
        .lab-faq-item { border-bottom: 1px solid rgba(176,203,188,0.2); }
        .lab-faq-item:last-child { border-bottom: none; }
        .lab-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0; background: none; border: none; cursor: pointer; text-align: left; color: var(--mist); font-family: var(--sans); font-size: 16px; line-height: 1.4; }
        .lab-faq-trigger:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; border-radius: 4px; }
        .lab-faq-question { flex: 1; }
        .lab-faq-icon { flex-shrink: 0; font-size: 22px; line-height: 1; color: var(--sage); width: 1.25em; text-align: center; }
        .lab-faq-panel { padding-bottom: 16px; }
        .lab-faq-answer { margin: 0; font-family: var(--sans); font-size: 15px; line-height: 1.55; color: #e8eee9; }
        @media (prefers-reduced-motion: reduce) { .lab-faq-trigger, .lab-faq-panel { transition: none; } }
      `}</style>
    </section>
  );
}
