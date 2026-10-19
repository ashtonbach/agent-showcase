"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Who implements the lab feature in a showcase run?",
    a:
      "A Coder agent writes the feature from the written spec while Designer, Reviewer, and QA roles work in parallel on artwork, review, and checks.",
  },
  {
    q: "What has to pass before the branch is pushed?",
    a:
      "The ship script runs layout checks locally and gate.js enforces file rules, line limits, banned APIs, and functional behavior; Vercel must build the preview successfully.",
  },
  {
    q: "Where do visitors see the demo?",
    a:
      "Each feature deploys to a Vercel preview URL on its branch; the coordinator shares that link in team chat rather than streaming a local desktop.",
  },
  {
    q: "How do agent updates appear in the public transcript?",
    a:
      "Roles post handoffs and status through the showcase messaging layer so the run log shows ordered updates without exposing secrets or upload paths.",
  },
];

const css = `
.lab-faq { width: min(720px, 100%); margin: 8px auto 56px; padding: 0 clamp(12px, 4vw, 20px); }
.lab-faq h2 {
  font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2;
  color: var(--mist); margin-bottom: 20px;
}
.lab-faq-card {
  border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 8px 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-faq-item { border-bottom: 1px solid rgba(176, 203, 188, 0.18); }
.lab-faq-item:last-child { border-bottom: none; }
.lab-faq-trigger {
  width: 100%; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
  padding: 16px 0; background: none; border: none; cursor: pointer; text-align: left;
  color: var(--mist); font-family: var(--sans); font-size: 17px; line-height: 1.45;
}
.lab-faq-trigger:hover { color: #F2EFE6; }
.lab-faq-trigger:focus-visible { outline: 2px solid var(--sage); outline-offset: 4px; border-radius: 4px; }
.lab-faq-icon {
  flex-shrink: 0; width: 1.5em; text-align: center; font-size: 22px; line-height: 1.2;
  color: var(--sage); font-weight: 500;
}
.lab-faq-panel { padding: 0 0 18px 0; color: var(--muted); font-size: 16px; line-height: 1.55; }
.lab-faq-panel[hidden] { display: none; }
@media (prefers-reduced-motion: no-preference) {
  .lab-faq-panel { animation: lab-faq-in 0.2s ease-out; }
}
@keyframes lab-faq-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .lab-faq-panel { animation: none; }
}
`;

export default function Lab() {
  const [open, setOpen] = useState<number | null>(null);
  const titleId = "lab-faq-heading";

  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby={titleId}>
      <style>{css}</style>
      <h2 id={titleId}>How this showcase works</h2>
      <div className="lab-faq-card">
        {ITEMS.map((item, i) => {
          const panelId = `lab-faq-panel-${i}`;
          const expanded = open === i;
          return (
            <div className="lab-faq-item" key={i}>
              <button
                type="button"
                className="lab-faq-trigger"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
              >
                <span>{item.q}</span>
                <span className="lab-faq-icon" aria-hidden="true">{expanded ? "−" : "+"}</span>
              </button>
              <div id={panelId} role="region" className="lab-faq-panel" hidden={!expanded}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
