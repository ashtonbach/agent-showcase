"use client";

import { useState } from "react";

type FaqItem = { id: string; q: string; a: string };

const FAQS: FaqItem[] = [
  {
    id: "what",
    q: "What is the agent showcase?",
    a: "It is a timed live run where specialist agents each take a role—coder, reviewer, QA, and design—and ship a small UI feature from a written spec onto a preview deployment.",
  },
  {
    id: "gate",
    q: "What does the gate check before merge?",
    a: "An automated gate enforces allowed files, line limits, banned APIs, a production build, layout at mobile and desktop widths, and functional behavior such as accordion semantics.",
  },
  {
    id: "handoff",
    q: "How do coder and reviewer work together?",
    a: "The coder implements the lab slot, runs SHIP to self-check and push, then hands off to the reviewer; fix rounds apply only the notes returned until checks pass.",
  },
  {
    id: "render",
    q: "Where does the feature render on the page?",
    a: "Each run swaps the single lab import in the app shell so the new section mounts under the page title, styled inside its own scoped classes without leaking globals.",
  },
];

const css = `
.lab-faq-section { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-faq-title { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; color: var(--mist); }
.lab-faq-list { display: flex; flex-direction: column; gap: 10px; }
.lab-faq-item { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; overflow: hidden; }
.lab-faq-question { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; background: transparent; border: none; color: var(--mist); font-family: var(--sans); font-size: 16px; text-align: left; padding: 20px 24px; cursor: pointer; }
.lab-faq-indicator { color: var(--sage); font-size: 20px; line-height: 1; flex-shrink: 0; }
.lab-faq-panel { padding: 0 24px 20px; color: var(--mist); line-height: 1.6; }
.lab-faq-panel p { margin: 0; }
@media (max-width: 420px) { .lab-faq-question { padding: 16px 18px; font-size: 15px; } .lab-faq-panel { padding: 0 18px 16px; } }
`;

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-heading" className="lab-faq-section">
      <h2 id="lab-faq-heading" className="lab-faq-title">How the showcase works</h2>
      <div className="lab-faq-list">
        {FAQS.map((item) => {
          const isOpen = openId === item.id;
          const questionId = `lab-faq-question-${item.id}`;
          const panelId = `lab-faq-panel-${item.id}`;
          return (
            <div key={item.id} className="lab-faq-item">
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="lab-faq-question"
                onClick={() => toggle(item.id)}
              >
                <span>{item.q}</span>
                <span className="lab-faq-indicator" aria-hidden="true">{isOpen ? "\u2212" : "+"}</span>
              </button>
              <div id={panelId} role="region" aria-labelledby={questionId} className="lab-faq-panel" hidden={!isOpen}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{css}</style>
    </section>
  );
}
