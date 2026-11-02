"use client";
import { useCallback, useId, useState } from "react";

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

export default function FaqAccordion() {
  const baseId = useId();
  const headingId = `${baseId}-heading`;
  const [open, setOpen] = useState<number | null>(null);
  const toggle = useCallback((i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section data-lab="faq-accordion" aria-labelledby={headingId} className="lab-faq">
      <style>{`
.lab-faq { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist); }
.lab-faq h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 24px; color: var(--mist); }
.lab-faq-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); }
.lab-faq-item + .lab-faq-item { border-top: 1px solid rgba(176,203,188,0.28); }
.lab-faq-q { display: flex; align-items: flex-start; gap: 12px; width: 100%; padding: 16px 0; margin: 0; border: none; background: transparent; color: var(--mist); font-family: var(--sans); font-size: 1rem; font-weight: 500; text-align: left; cursor: pointer; }
.lab-faq-q:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; border-radius: 4px; }
.lab-faq-icon { flex-shrink: 0; width: 1.25rem; font-size: 1.25rem; line-height: 1; color: var(--sage); }
.lab-faq-a { margin: 0 0 16px; padding: 0 0 0 2.25rem; font-family: var(--sans); font-size: 0.95rem; line-height: 1.55; color: var(--mist); opacity: 0.92; }
@media (prefers-reduced-motion: no-preference) { .lab-faq-a { transition: opacity 0.2s ease; } }
`}</style>
      <h2 id={headingId}>How the showcase works</h2>
      <div className="lab-faq-card">
        {ITEMS.map((item, i) => {
          const panelId = `${baseId}-panel-${i}`;
          const expanded = open === i;
          return (
            <div key={item.q} className="lab-faq-item">
              <button
                type="button"
                className="lab-faq-q"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span className="lab-faq-icon" aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
                <span>{item.q}</span>
              </button>
              <div
                id={panelId}
                role="region"
                hidden={!expanded}
                className="lab-faq-a"
              >
                {item.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
