"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What is this showcase?",
    a: "A timed live run where autonomous agents each own a role—coding, design, review, and QA—and ship one small product feature on a shared repo.",
  },
  {
    q: "How does a feature reach the preview?",
    a: "The coder implements the spec, runs an automated gate (file rules, build, and layout checks), then pushes; Vercel builds the branch and posts a preview URL on the pull request.",
  },
  {
    q: "What do the automated checks enforce?",
    a: "Allowed file paths, no banned network or env APIs, a single client React component with scoped styles, accessible accordion markup, and responsive layout at 390px and 1280px without horizontal scroll.",
  },
  {
    q: "What happens after the coder hands off?",
    a: "A reviewer validates the change against the spec and preview; design and QA may follow; fixes loop until checks pass or the run window ends.",
  },
];

const css = `
.lab-faq {
  width: min(720px, 100%);
  margin: 8px auto 56px;
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;
}
.lab-faq-title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.15;
  margin: 0 0 20px;
  color: var(--mist);
}
.lab-faq-list { margin: 0; padding: 0; list-style: none; }
.lab-faq-item { border-top: 1px solid rgba(176, 203, 188, 0.2); }
.lab-faq-item:first-child { border-top: none; }
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
  color: var(--mist);
  font-family: var(--sans);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
}
.lab-faq-trigger:hover { color: var(--sage); }
.lab-faq-trigger:focus-visible {
  outline: 2px solid var(--sage);
  outline-offset: 2px;
  border-radius: 4px;
}
.lab-faq-icon {
  flex-shrink: 0;
  font-size: 1.25rem;
  line-height: 1;
  color: var(--sage);
}
.lab-faq-panel {
  margin: 0 0 16px;
  padding: 0 0 4px;
  color: #F2EFE6;
  font-family: var(--sans);
  font-size: 0.95rem;
  line-height: 1.55;
}
@media (prefers-reduced-motion: no-preference) {
  .lab-faq-panel { animation: lab-faq-in 0.2s ease; }
}
@keyframes lab-faq-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

export default function Lab() {
  const [open, setOpen] = useState<number | null>(null);
  const titleId = "lab-faq-heading";

  const toggle = (index: number) => {
    setOpen((prev) => (prev === index ? null : index));
  };

  return (
    <section data-lab="faq-accordion" aria-labelledby={titleId}>
      <style>{css}</style>
      <h2 id={titleId} className="lab-faq-title">How the showcase works</h2>
      <div className="lab-faq">
        <ul className="lab-faq-list">
          {FAQS.map((item, i) => {
            const panelId = `lab-faq-panel-${i}`;
            const expanded = open === i;
            return (
              <li key={panelId} className="lab-faq-item">
                <button
                  type="button"
                  className="lab-faq-trigger"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <span>{item.q}</span>
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
                  {item.a}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
