"use client";
import { useState } from "react";

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
  const [open, setOpen] = useState<number | null>(null);
  const onToggle = (i: number) => setOpen((v) => (v === i ? null : i));

  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <h2 id="lab-faq-title">How the showcase works</h2>
      <div className="lab-faq-card">
        {ITEMS.map((item, i) => {
          const pid = `lab-faq-panel-${i}`;
          const expanded = open === i;
          return (
            <div key={item.q} className="lab-faq-row">
              <button
                type="button"
                className="lab-faq-btn"
                aria-expanded={expanded}
                aria-controls={pid}
                onClick={() => onToggle(i)}
              >
                <span className="lab-faq-q">{item.q}</span>
                <span className="lab-faq-sign" aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>
              <div id={pid} role="region" className="lab-faq-panel" hidden={!expanded}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
.lab-faq-card{width:min(720px,100%);margin:8px auto 56px;border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
[data-lab="faq-accordion"] h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 20px;line-height:1.2}
.lab-faq-row{border-top:1px solid rgba(176,203,188,.2)}
.lab-faq-row:first-child{border-top:none}
.lab-faq-btn{width:100%;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:16px 0;background:none;border:none;color:var(--mist);font-family:var(--sans);font-size:16px;font-weight:500;text-align:left;cursor:pointer}
.lab-faq-btn:focus-visible{outline:2px solid var(--sage);outline-offset:2px;border-radius:4px}
.lab-faq-sign{flex:0 0 auto;color:var(--sage);font-size:22px;line-height:1}
.lab-faq-panel{padding:0 0 16px;color:#E8EEE9;font-family:var(--sans);font-size:15px;line-height:1.55}
.lab-faq-panel p{margin:0}
@media (prefers-reduced-motion:reduce){.lab-faq-btn,.lab-faq-panel{transition:none}}
`}</style>
    </section>
  );
}
