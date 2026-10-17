"use client";

import { useState } from "react";

const items = [
  {
    id: "faq-panel-1",
    q: "What is this showcase?",
    a: "A timed live coding run. A coder writes a feature from a spec, then a reviewer and QA check the result.",
  },
  {
    id: "faq-panel-2",
    q: "Who writes the feature?",
    a: "Alder designs and writes the component from the spec. There is no blueprint or reference implementation.",
  },
  {
    id: "faq-panel-3",
    q: "How is the work reviewed?",
    a: "Rowan reviews the preview against the spec. Cedar then runs QA before the run can close.",
  },
  {
    id: "faq-panel-4",
    q: "How does this accordion behave?",
    a: "Only one answer is open at a time. Opening another closes the current one. Clicking the open question closes it.",
  },
];

const css = `
.lab-faq { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); box-sizing: border-box; }
.lab-faq *, .lab-faq *::before, .lab-faq *::after { box-sizing: border-box; }
.lab-faq h2 { font-family: var(--serif, Georgia, serif); font-weight: 400; font-size: 30px; line-height: 1.25; margin: 0 0 20px; }
.lab-list { display: flex; flex-direction: column; gap: 10px; }
.lab-item { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 8px 0; background: transparent; }
.lab-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 24px; margin: 0; border: 0; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.lab-q span:first-child { font-size: 17px; line-height: 1.4; }
.lab-mark { flex: 0 0 auto; color: var(--sage, #9BB8A8); font-size: 22px; line-height: 1; }
.lab-a { padding: 0 24px 16px; margin: 0; font-size: 15px; line-height: 1.55; color: #E8EEE9; }
@media (prefers-reduced-motion: reduce) { .lab-q, .lab-a { transition: none; } }
`;

export default function FaqAccordion() {
  const [open, setOpen] = useState<string | null>(null);
  function toggle(id: string) {
    setOpen((cur) => (cur === id ? null : id));
  }

  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <style>{css}</style>
      <h2 id="lab-faq-title">How this showcase works</h2>
      <div className="lab-list">
        {items.map((item) => {
          const isOpen = open === item.id;
          return (
            <div key={item.id} className="lab-item">
              <button type="button" className="lab-q" aria-expanded={isOpen} aria-controls={item.id} onClick={() => toggle(item.id)}>
                <span>{item.q}</span>
                <span className="lab-mark" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              <div id={item.id} role="region" hidden={!isOpen}>
                <p className="lab-a">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
