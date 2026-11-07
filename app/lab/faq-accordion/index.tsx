"use client";

import { useCallback, useId, useState } from "react";

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

export default function LabFaqAccordion() {
  const base = useId().replace(/:/g, "");
  const [open, setOpen] = useState<number | null>(null);
  const toggle = useCallback((i: number) => {
    setOpen((cur) => (cur === i ? null : i));
  }, []);

  return (
    <section data-lab="faq-accordion" aria-labelledby={`${base}-title`}>
      <h2 id={`${base}-title`} className="lab-heading">
        How the showcase works
      </h2>
      <div className="lab-card">
        <dl className="lab-faq">
          {FAQ.map((item, i) => {
            const pid = `${base}-p${i}`;
            const expanded = open === i;
            return (
              <div key={item.q} className="lab-entry">
                <dt className="lab-qhead">
                  <button
                    type="button"
                    className="lab-qbtn"
                    aria-expanded={expanded}
                    aria-controls={pid}
                    onClick={() => toggle(i)}
                  >
                    <span className="lab-qtext">{item.q}</span>
                    <span className="lab-sign" aria-hidden="true">
                      {expanded ? "−" : "+"}
                    </span>
                  </button>
                </dt>
                <dd
                  id={pid}
                  role="region"
                  className="lab-answrap"
                  hidden={!expanded}
                >
                  <p className="lab-ans">{item.a}</p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
      <style>{`
[data-lab="faq-accordion"] {
  width: min(720px, 100%);
  margin: 8px auto 56px;
  color: var(--mist, #e8eee9);
}
[data-lab="faq-accordion"] .lab-heading {
  margin: 0 0 20px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.2;
  color: var(--mist, #f2efe6);
}
[data-lab="faq-accordion"] .lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
}
[data-lab="faq-accordion"] .lab-faq { margin: 0; }
[data-lab="faq-accordion"] .lab-entry { border-top: 1px solid rgba(176, 203, 188, 0.22); }
[data-lab="faq-accordion"] .lab-entry:first-child { border-top: none; }
[data-lab="faq-accordion"] .lab-qhead { margin: 0; font-weight: inherit; }
[data-lab="faq-accordion"] .lab-qbtn {
  display: flex; width: 100%; align-items: flex-start; gap: 16px;
  padding: 16px 0; border: none; background: transparent; cursor: pointer;
  text-align: left; color: inherit; font: inherit;
}
[data-lab="faq-accordion"] .lab-qbtn:focus-visible {
  outline: 2px solid var(--sage, #b0cbbc); outline-offset: 2px;
}
[data-lab="faq-accordion"] .lab-qtext { flex: 1; }
[data-lab="faq-accordion"] .lab-sign {
  color: var(--sage, #b0cbbc); font-size: 22px; line-height: 1; min-width: 1.2em; text-align: center;
}
[data-lab="faq-accordion"] .lab-answrap { margin: 0; padding: 0 0 16px; }
[data-lab="faq-accordion"] .lab-ans { margin: 0; line-height: 1.55; color: var(--mist, #e8eee9); }
@media (prefers-reduced-motion: reduce) {
  [data-lab="faq-accordion"] .lab-qbtn { transition: none; }
}
`}</style>
    </section>
  );
}
