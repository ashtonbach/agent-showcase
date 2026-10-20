"use client";

import { useState } from "react";

const TITLE_ID = "lab-faq-title";

const FAQS = [
  {
    id: "faq-showcase",
    q: "What is this showcase?",
    a: "A timed live run where specialized agents each own a step—coding, design, review, and QA—to ship a small feature on a shared repo.",
  },
  {
    id: "faq-branch",
    q: "How does the coder deliver work?",
    a: "They implement only the lab slot files on a feature branch, run automated layout and gate checks locally, then push for a Vercel preview build.",
  },
  {
    id: "faq-gate",
    q: "What do the automated checks enforce?",
    a: "File scope, banned APIs, build health, responsive layout without horizontal scroll, accessibility patterns, and zero console errors on the page.",
  },
  {
    id: "faq-handoff",
    q: "What happens after the coder hands off?",
    a: "The reviewer validates the spec on the preview URL, design may add artwork in parallel, and QA signs off before the run completes.",
  },
];

const css = `
.lab-faq-wrap {
  width: min(720px, 100%);
  margin: 8px auto 56px;
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
  background: rgba(18, 26, 22, 0.35);
  overflow: hidden;
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
  color: #F2EFE6;
  font-family: var(--sans);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  line-height: 1.4;
}
.lab-faq-trigger:hover,
.lab-faq-trigger:focus-visible {
  color: var(--mist);
  outline: 2px solid var(--sage);
  outline-offset: -2px;
}
.lab-faq-icon {
  flex-shrink: 0;
  width: 1.5rem;
  text-align: center;
  color: var(--sage);
  font-size: 1.25rem;
  line-height: 1;
}
.lab-faq-panel {
  padding: 0 24px 20px;
  color: var(--mist);
  font-family: var(--sans);
  font-size: 0.95rem;
  line-height: 1.55;
}
@media (prefers-reduced-motion: no-preference) {
  .lab-faq-panel {
    animation: lab-faq-in 0.2s ease-out;
  }
}
@keyframes lab-faq-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

export default function Lab() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section data-lab="faq-accordion" aria-labelledby={TITLE_ID}>
      <style>{css}</style>
      <div className="lab-faq-wrap">
        <h2 id={TITLE_ID}>How the showcase works</h2>
        <ul className="lab-faq-list">
          {FAQS.map(({ id, q, a }) => {
            const expanded = openId === id;
            const panelId = `${id}-panel`;
            return (
              <li key={id} className="lab-faq-item">
                <button
                  type="button"
                  className="lab-faq-trigger"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => toggle(id)}
                >
                  <span>{q}</span>
                  <span className="lab-faq-icon" aria-hidden="true">
                    {expanded ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  className="lab-faq-panel"
                  hidden={!expanded}
                >
                  {a}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
