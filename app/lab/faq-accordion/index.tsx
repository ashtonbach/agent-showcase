"use client";

import { useId, useState } from "react";

type FaqEntry = { question: string; answer: string };

const FAQ_ENTRIES: FaqEntry[] = [
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

function FaqRow({
  entry,
  index,
  panelId,
  isOpen,
  onToggle,
}: {
  entry: FaqEntry;
  index: number;
  panelId: string;
  isOpen: boolean;
  onToggle: (index: number) => void;
}) {
  return (
    <li className="lab-faqacc-row">
      <h3 className="lab-faqacc-qheading">
        <button
          type="button"
          className="lab-faqacc-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
        >
          <span>{entry.question}</span>
          <span className="lab-faqacc-sign" aria-hidden="true">
            {isOpen ? "\u2212" : "+"}
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" hidden={!isOpen} className="lab-faqacc-panel">
        <p className="lab-faqacc-answer">{entry.answer}</p>
      </div>
    </li>
  );
}

export default function FaqAccordion() {
  const baseId = useId();
  const headingId = `${baseId}-heading`;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section className="lab-faqacc" data-lab="faq-accordion" aria-labelledby={headingId}>
      <h2 id={headingId} className="lab-faqacc-title">
        How the showcase works
      </h2>
      <ul className="lab-faqacc-list">
        {FAQ_ENTRIES.map((entry, index) => (
          <FaqRow
            key={entry.question}
            entry={entry}
            index={index}
            panelId={`${baseId}-panel-${index}`}
            isOpen={openIndex === index}
            onToggle={handleToggle}
          />
        ))}
      </ul>
      <style>{`
        .lab-faqacc { width: min(720px, 100%); margin: 8px auto 56px; box-sizing: border-box; }
        .lab-faqacc-title { font-family: var(--serif); font-weight: 400; font-size: 30px; color: var(--mist); margin: 0 0 16px; }
        .lab-faqacc-list { list-style: none; margin: 0; padding: 24px; box-sizing: border-box; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; }
        .lab-faqacc-row + .lab-faqacc-row { border-top: 1px solid rgba(176, 203, 188, 0.2); }
        .lab-faqacc-qheading { margin: 0; font-size: 1em; font-weight: 400; }
        .lab-faqacc-trigger { width: 100%; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 14px 0; background: transparent; border: none; cursor: pointer; text-align: left; font-family: var(--sans); font-size: 16px; line-height: 1.4; color: #f2efe6; }
        .lab-faqacc-row:first-child .lab-faqacc-trigger { padding-top: 0; }
        .lab-faqacc-trigger:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; border-radius: 4px; }
        .lab-faqacc-sign { flex-shrink: 0; width: 1.2em; text-align: center; color: var(--sage); font-family: var(--sans); transition: transform 0.15s ease; }
        .lab-faqacc-panel { padding: 0 0 16px; }
        .lab-faqacc-answer { margin: 0; font-family: var(--sans); font-size: 15px; line-height: 1.6; color: #e8eee9; }
        @media (prefers-reduced-motion: reduce) {
          .lab-faqacc-sign { transition: none; }
        }
      `}</style>
    </section>
  );
}
