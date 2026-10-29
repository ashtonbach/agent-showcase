"use client";

import { useState } from "react";

type Entry = { question: string; answer: string };

const ENTRIES: Entry[] = [
  {
    question: "What is the agent showcase?",
    answer:
      "It is a timed live run where specialist agents each take a role—coder, reviewer, QA, and design—and ship a small UI feature from a written spec onto a preview deployment.",
  },
  {
    question: "What does the gate check before merge?",
    answer:
      "An automated gate enforces allowed files, line limits, banned APIs, a production build, layout at mobile and desktop widths, and functional behavior such as accordion semantics.",
  },
  {
    question: "How do coder and reviewer work together?",
    answer:
      "The coder implements the lab slot, runs SHIP to self-check and push, then hands off to the reviewer; fix rounds apply only the notes returned until checks pass.",
  },
  {
    question: "Where does the feature render on the page?",
    answer:
      "Each run swaps the single lab import in the app shell so the new section mounts under the page title, styled inside its own scoped classes without leaking globals.",
  },
];

const panelId = (index: number) => `lab-faqaccordion-panel-${index}`;

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faqaccordion-heading" className="lab-faqaccordion-section">
      <h2 id="lab-faqaccordion-heading" className="lab-faqaccordion-heading">How the showcase works</h2>
      <ul className="lab-faqaccordion-list">
        {ENTRIES.map((entry, index) => {
          const expanded = openIndex === index;
          return (
            <li className="lab-faqaccordion-row" key={entry.question}>
              <button
                type="button"
                className="lab-faqaccordion-trigger"
                aria-expanded={expanded}
                aria-controls={panelId(index)}
                onClick={() => handleToggle(index)}
              >
                <span className="lab-faqaccordion-question">{entry.question}</span>
                <span className="lab-faqaccordion-sign" aria-hidden="true">{expanded ? "\u2212" : "+"}</span>
              </button>
              <div id={panelId(index)} role="region" hidden={!expanded} className="lab-faqaccordion-panel">
                <p className="lab-faqaccordion-answer">{entry.answer}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <style>{`
.lab-faqaccordion-section{width:min(720px,100%);margin:8px auto 56px}
.lab-faqaccordion-heading{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 0 16px}
.lab-faqaccordion-list{list-style:none;margin:0;padding:0;border:1px solid rgba(176,203,188,.28);border-radius:16px;overflow:hidden}
.lab-faqaccordion-row + .lab-faqaccordion-row{border-top:1px solid rgba(176,203,188,.28)}
.lab-faqaccordion-trigger{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 24px;background:transparent;border:none;text-align:left;cursor:pointer;font-family:var(--sans);color:var(--mist)}
.lab-faqaccordion-trigger:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
.lab-faqaccordion-question{font-size:16px;line-height:1.4}
.lab-faqaccordion-sign{flex-shrink:0;font-size:20px;line-height:1;color:var(--sage)}
.lab-faqaccordion-panel{padding:0 24px 20px}
.lab-faqaccordion-answer{margin:0;font-family:var(--sans);font-size:15px;line-height:1.6;color:var(--muted)}
@media (max-width:420px){.lab-faqaccordion-trigger{padding:16px 18px}.lab-faqaccordion-panel{padding:0 18px 16px}}
      `}</style>
    </section>
  );
}
