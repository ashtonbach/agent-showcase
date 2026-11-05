"use client";

import { useCallback, useState } from "react";

const ITEMS = [
  {
    q: "What is the agent showcase?",
    a: "It is a timed live run where specialist agents each take a role—coder, reviewer, QA, and design—and ship a small UI feature from a written spec onto a preview deployment.",
  },
  {
    q: "What does the gate check before merge?",
    a: "An automated gate enforces allowed files, line limits, banned APIs, a production build, layout at mobile and desktop widths, and functional behavior such as accordion semantics.",
  },
  {
    q: "How do coder and reviewer work together?",
    a: "The coder implements the lab slot, runs SHIP to self-check and push, then hands off to the reviewer; fix rounds apply only the notes returned until checks pass.",
  },
  {
    q: "Where does the feature render on the page?",
    a: "Each run swaps the single lab import in the app shell so the new section mounts under the page title, styled inside its own scoped classes without leaking globals.",
  },
] as const;

const css = `
.lab-faq { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-faq-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.45);
}
.lab-faq h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  color: var(--mist, #f2efe6);
  margin: 0 0 20px;
}
.lab-faq-item { border-top: 1px solid rgba(176, 203, 188, 0.2); }
.lab-faq-item:first-of-type { border-top: none; }
.lab-faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--sans);
  font-size: 16px;
  font-weight: 500;
  color: var(--mist, #f2efe6);
}
.lab-faq-trigger:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
.lab-faq-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sage);
  font-size: 20px;
  line-height: 1;
}
.lab-faq-panel {
  padding: 0 0 16px;
  color: #e8eee9;
  font-family: var(--sans);
  font-size: 15px;
  line-height: 1.55;
}
@media (prefers-reduced-motion: reduce) {
  .lab-faq-panel { transition: none; }
}
`;

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = useCallback((i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-heading">
      <style>{css}</style>
      <div className="lab-faq">
        <div className="lab-faq-card">
          <h2 id="lab-faq-heading">How the showcase works</h2>
          {ITEMS.map((item, i) => {
            const panelId = `faq-panel-${i}`;
            const expanded = open === i;
            return (
              <div className="lab-faq-item" key={panelId}>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
