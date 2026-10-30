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
  const pick = (i: number) => setOpen((v) => (v === i ? null : i));

  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-title" className="lab-faq">
      <h2 id="lab-faq-title" className="lab-faq-h2">
        How the showcase works
      </h2>
      <div className="lab-faq-stack">
        {ITEMS.map((item, i) => {
          const pid = `lab-faq-panel-${i}`;
          const on = open === i;
          return (
            <div key={item.q} className="lab-faq-card">
              <button
                type="button"
                className="lab-faq-btn"
                aria-expanded={on}
                aria-controls={pid}
                onClick={() => pick(i)}
              >
                <span className="lab-faq-q">{item.q}</span>
                <span className="lab-faq-mark" aria-hidden="true">
                  {on ? "−" : "+"}
                </span>
              </button>
              <div id={pid} role="region" className="lab-faq-panel" hidden={!on}>
                <p className="lab-faq-a">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
.lab-faq{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-faq-h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-faq-stack{display:flex;flex-direction:column;gap:12px}
.lab-faq-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:0;background:rgba(18,26,22,.35);overflow:hidden}
.lab-faq-btn{width:100%;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:24px;background:transparent;border:0;color:inherit;text-align:left;cursor:pointer;font:inherit}
.lab-faq-btn:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
.lab-faq-q{flex:1;font-family:var(--sans);font-size:16px;line-height:1.45}
.lab-faq-mark{flex:0 0 auto;font-size:22px;line-height:1;color:var(--sage);width:24px;text-align:center}
.lab-faq-panel{padding:0 24px 24px}
.lab-faq-a{margin:0;font-family:var(--sans);font-size:15px;line-height:1.6;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-faq-btn,.lab-faq-panel{transition:none}}
`}</style>
    </section>
  );
}
