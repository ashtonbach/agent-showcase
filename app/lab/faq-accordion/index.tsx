"use client";
import { useId, useState } from "react";

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
];

export default function FaqAccordion() {
  const titleId = useId().replace(/:/g, "");
  const base = useId().replace(/:/g, "");
  const [open, setOpen] = useState<number | null>(null);

  const onToggle = (index: number) => {
    setOpen((prev) => (prev === index ? null : index));
  };

  return (
    <section data-lab="faq-accordion" aria-labelledby={titleId}>
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; box-sizing: border-box; }
        .lab-title { margin: 0 0 20px; font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; color: var(--mist, #F2EFE6); }
        .lab-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); }
        .lab-item + .lab-item { border-top: 1px solid rgba(176,203,188,0.2); margin-top: 4px; padding-top: 4px; }
        .lab-trigger { width: 100%; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 14px 0; background: none; border: 0; cursor: pointer; text-align: left; color: var(--mist, #F2EFE6); font-family: var(--sans); font-size: 16px; font-weight: 500; }
        .lab-trigger:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; border-radius: 6px; }
        .lab-icon { flex-shrink: 0; width: 24px; text-align: center; font-size: 20px; line-height: 1; color: var(--sage); }
        .lab-panel { padding: 0 0 12px 0; color: #E8EEE9; font-family: var(--sans); font-size: 15px; line-height: 1.55; }
        .lab-panel[hidden] { display: none; }
        @media (prefers-reduced-motion: reduce) { .lab-trigger, .lab-panel { transition: none; } }
      `}</style>
      <div className="lab-wrap">
        <h2 id={titleId} className="lab-title">
          How the showcase works
        </h2>
        <div className="lab-card">
          {ITEMS.map((item, index) => {
            const panelId = `${base}-p-${index}`;
            const expanded = open === index;
            return (
              <div key={item.q} className="lab-item">
                <button
                  type="button"
                  className="lab-trigger"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => onToggle(index)}
                >
                  <span>{item.q}</span>
                  <span className="lab-icon" aria-hidden="true">
                    {expanded ? "−" : "+"}
                  </span>
                </button>
                <div id={panelId} role="region" className="lab-panel" hidden={!expanded}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
