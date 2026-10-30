"use client";
import { useState } from "react";

const FAQ: { q: string; a: string }[] = [
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

export default function Lab() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <h2 id="lab-faq-title">How the showcase works</h2>
      <div className="lab-card">
        {FAQ.map((item, i) => {
          const panelId = `lab-faq-panel-${i}`;
          const isOpen = open === i;
          return (
            <div key={item.q} className="lab-item">
              <button
                type="button"
                className="lab-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="lab-q">{item.q}</span>
                <span className="lab-toggle" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div id={panelId} role="region" hidden={!isOpen} className="lab-panel">
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
[data-lab="faq-accordion"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);font-family:var(--sans,system-ui,sans-serif);}
[data-lab="faq-accordion"] h2{margin:0 0 20px;font:400 30px/1.25 var(--serif,Georgia,serif);color:var(--mist,#F2EFE6);}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.45);}
.lab-item+.lab-item{border-top:1px solid rgba(176,203,188,.2);}
.lab-trigger{width:100%;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:16px 0;background:none;border:0;color:inherit;text-align:left;cursor:pointer;font:inherit;}
.lab-trigger:focus-visible{outline:2px solid var(--sage,#B0CBBC);outline-offset:2px;border-radius:4px;}
.lab-q{flex:1;font-size:17px;line-height:1.45;color:#E8EEE9;}
.lab-toggle{flex-shrink:0;width:28px;font-size:22px;line-height:1;color:var(--sage,#B0CBBC);text-align:center;}
.lab-panel{padding:0 0 12px;}
.lab-panel[hidden]{display:none;}
.lab-panel p{margin:0;font-size:15px;line-height:1.6;color:rgba(242,239,230,.88);}
@media (prefers-reduced-motion:no-preference){.lab-panel p{transition:opacity .2s ease;}}
`}</style>
    </section>
  );
}
