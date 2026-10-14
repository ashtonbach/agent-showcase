"use client";

import { useState } from "react";

type Item = { id: string; q: string; a: string };

const items: Item[] = [
  {
    id: "faq-slot",
    q: "What is the lab slot on this page?",
    a: "A single client component mounts into the showcase home page so viewers can watch one feature land in place.",
  },
  {
    id: "faq-toggle",
    q: "How does this accordion open and close?",
    a: "Only one answer is open at a time. Opening a question closes the others, and clicking the open question closes it.",
  },
  {
    id: "faq-brand",
    q: "What brand system does this showcase use?",
    a: "AshtonBach Forest Mist: dark forest green, mist-colored body text, sage accents, and serif headings.",
  },
  {
    id: "faq-fit",
    q: "Will this feature fit a phone-sized screen?",
    a: "Yes. The card is a single column that stays within the viewport so a phone-width layout does not scroll sideways.",
  },
];

const css = `
.lab-faq { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); box-sizing: border-box; }
.lab-faq *, .lab-faq *::before, .lab-faq *::after { box-sizing: border-box; }
.lab-faq .label { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 12px; color: var(--sage); margin: 0 0 8px; }
.lab-faq h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 0 0 24px; color: var(--mist, #F2EFE6); }
.lab-list { display: flex; flex-direction: column; gap: 12px; margin: 0; padding: 0; }
.lab-item { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; }
.lab-item h3 { margin: 0; font-size: 17px; font-weight: 500; }
.lab-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 0; border: 0; background: none; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.lab-mark { color: var(--sage); font-size: 22px; line-height: 1; flex: 0 0 auto; }
.lab-a { margin: 12px 0 0; color: #E8EEE9; line-height: 1.55; }
@media (prefers-reduced-motion: reduce) { .lab-faq * { transition: none !important; } }
`;

function nextOpen(cur: string | null, id: string) {
  return cur === id ? null : id;
}

export default function FaqAccordion() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby="faq-title">
      <style>{css}</style>
      <p className="label">How it works</p>
      <h2 id="faq-title">FAQ accordion</h2>
      <div className="lab-list">
        {items.map((item) => {
          const expanded = open === item.id;
          const panel = item.id + "-panel";
          return (
            <article className="lab-item" key={item.id}>
              <h3>
                <button className="lab-q" aria-expanded={expanded} aria-controls={panel} onClick={() => setOpen((cur) => nextOpen(cur, item.id))}>
                  <span>{item.q}</span>
                  <span className="lab-mark" aria-hidden="true">{expanded ? "−" : "+"}</span>
                </button>
              </h3>
              <div id={panel} role="region" hidden={!expanded}>
                <p className="lab-a">{item.a}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
