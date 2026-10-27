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
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  function toggle(i: number) {
    setOpen((prev) => (prev === i ? null : i));
  }

  return (
    <section data-lab="faq-accordion" aria-labelledby="faq-accordion-h2">
      <h2 id="faq-accordion-h2" className="lab-faq-h2">How the showcase works</h2>
      <div className="lab-faq-card">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          const panelId = `faq-accordion-panel-${i}`;
          return (
            <div key={i} className="lab-faq-item">
              <button
                type="button"
                className="lab-faq-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span className="lab-faq-q">{item.q}</span>
                <span className="lab-faq-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              <div id={panelId} role="region" hidden={!isOpen} className="lab-faq-panel">
                <p className="lab-faq-a">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
.lab-faq-h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-faq-card{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px;box-sizing:border-box}
.lab-faq-item{border-bottom:1px solid rgba(176,203,188,.2)}
.lab-faq-item:last-child{border-bottom:none}
.lab-faq-trigger{width:100%;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:14px 0;background:transparent;border:none;cursor:pointer;text-align:left;color:#f2efe6;font-family:var(--sans);font-size:15px;line-height:1.4}
.lab-faq-trigger:focus-visible{outline:2px solid var(--sage);outline-offset:2px;border-radius:4px}
.lab-faq-q{flex:1}
.lab-faq-icon{flex-shrink:0;font-size:20px;line-height:1;color:var(--sage);font-family:var(--sans)}
.lab-faq-panel{padding:0 0 14px}
.lab-faq-a{margin:0;font-family:var(--sans);font-size:15px;line-height:1.55;color:#e8eee9}
@media (prefers-reduced-motion:reduce){.lab-faq-panel{transition:none}}
      `}</style>
    </section>
  );
}
