"use client";
import { useState } from "react";

const FAQ = [
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
  const [open, setOpen] = useState<number | null>(null);
  const titleId = "lab-faq-title";

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  return (
    <section data-lab="faq-accordion" aria-labelledby={titleId} className="lab-wrap">
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); font-family: var(--sans, system-ui, sans-serif); }
        .lab-wrap h2 { font-family: var(--serif, Georgia, serif); font-weight: 400; font-size: 30px; line-height: 1.25; margin: 0 0 20px; color: var(--mist, #F2EFE6); }
        .lab-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 8px 24px; background: rgba(18,26,22,0.35); }
        .lab-item { border-bottom: 1px solid rgba(176,203,188,0.2); }
        .lab-item:last-child { border-bottom: none; }
        .lab-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 0; margin: 0; border: none; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; }
        .lab-q:focus-visible { outline: 2px solid var(--sage, #B0CBBC); outline-offset: 2px; }
        .lab-mark { flex-shrink: 0; width: 1.5em; text-align: center; color: var(--sage, #B0CBBC); font-size: 1.25rem; line-height: 1; }
        .lab-a { margin: 0 0 18px; padding-right: 2em; color: #E8EEE9; line-height: 1.55; font-size: 15px; }
        @media (prefers-reduced-motion: no-preference) { .lab-mark { transition: transform 0.2s ease; } }
      `}</style>
      <h2 id={titleId}>How the showcase works</h2>
      <div className="lab-card">
        {FAQ.map((item, i) => {
          const panelId = `lab-faq-panel-${i}`;
          const expanded = open === i;
          return (
            <div key={panelId} className="lab-item">
              <button
                type="button"
                className="lab-q"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span>{item.q}</span>
                <span className="lab-mark" aria-hidden="true">{expanded ? "−" : "+"}</span>
              </button>
              <div id={panelId} role="region" hidden={!expanded}>
                <p className="lab-a">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
