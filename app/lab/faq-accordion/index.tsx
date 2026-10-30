"use client";
import { useId, useState } from "react";

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
  const titleId = useId().replace(/:/g, "");

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  return (
    <section data-lab="faq-accordion" aria-labelledby={titleId}>
      <style>{`
.lab-faq{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-faq h2{font:400 30px/1.25 var(--serif,serif);margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-faq-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
.lab-faq-item+ .lab-faq-item{border-top:1px solid rgba(176,203,188,.22)}
.lab-faq-btn{width:100%;display:flex;align-items:flex-start;gap:12px;padding:14px 0;background:none;border:0;color:inherit;text-align:left;cursor:pointer;font:500 1rem/1.4 var(--sans,sans-serif)}
.lab-faq-btn:focus-visible{outline:2px solid var(--sage,#B0CBBC);outline-offset:2px;border-radius:4px}
.lab-faq-q{flex:1}
.lab-faq-mark{flex:0 0 auto;font:400 1.25rem/1 var(--sans,sans-serif);color:var(--sage,#B0CBBC)}
.lab-faq-panel{padding:0 0 14px 0}
.lab-faq-panel p{margin:0;font:400 .95rem/1.55 var(--sans,sans-serif);color:#E8EEE9}
@media (prefers-reduced-motion:no-preference){.lab-faq-mark{transition:transform .15s ease}}
`}</style>
      <div className="lab-faq">
        <h2 id={titleId}>How the showcase works</h2>
        <div className="lab-faq-card">
          {FAQ.map((item, i) => {
            const panelId = `lab-faq-p-${i}`;
            const expanded = open === i;
            return (
              <div className="lab-faq-item" key={item.q}>
                <button
                  type="button"
                  className="lab-faq-btn"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <span className="lab-faq-q">{item.q}</span>
                  <span className="lab-faq-mark" aria-hidden="true">
                    {expanded ? "−" : "+"}
                  </span>
                </button>
                <div id={panelId} role="region" className="lab-faq-panel" hidden={!expanded}>
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
