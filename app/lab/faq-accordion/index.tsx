"use client";

import { useState } from "react";

const ITEMS = [
  {
    id: "faq-what",
    q: "What is this live showcase?",
    a: "This page is a timed team run. A coder ships one lab feature, then review and QA check the preview before the run closes.",
  },
  {
    id: "faq-slot",
    q: "How does the lab slot load a feature?",
    a: "The page heading comes from the lab current slug, and the feature is the default export of that slug’s client component.",
  },
  {
    id: "faq-brand",
    q: "What brand does the lab use?",
    a: "AshtonBach Forest Mist: dark forest green, mist-colored text, sage accents, serif headings, and small-caps labels.",
  },
  {
    id: "faq-open",
    q: "How does this accordion behave?",
    a: "Only one answer stays open. Opening another question closes the rest, and clicking the open question again closes it.",
  },
];

const css = `
.lab-faq { width: min(720px, 100%); max-width: 100%; margin: 8px auto 56px; padding: 0 8px; color: var(--mist, #F2EFE6); box-sizing: border-box; }
.lab-faq *, .lab-faq *::before, .lab-faq *::after { box-sizing: border-box; }
.lab-faq .label { margin: 0 0 8px; font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); }
.lab-faq h2 { margin: 0 0 20px; font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; color: var(--mist, #F2EFE6); }
.lab-faq-list { display: grid; gap: 10px; }
.lab-faq-item { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 8px 24px; background: rgba(18, 26, 22, 0.35); }
.lab-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 16px; width: 100%; margin: 0; padding: 16px 0; border: 0; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; overflow-wrap: anywhere; }
.lab-faq-q:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
.lab-faq-mark { flex: 0 0 auto; color: var(--sage); font-size: 22px; line-height: 1; }
.lab-faq-a { margin: 0; padding: 0 0 16px; color: #E8EEE9; line-height: 1.55; overflow-wrap: anywhere; }
@media (prefers-reduced-motion: no-preference) {
  .lab-faq-item { transition: border-color 160ms ease; }
}
`;

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((cur) => (cur === id ? null : id));
  }

  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby="faq-heading">
      <style>{css}</style>
      <p className="label">How the showcase works</p>
      <h2 id="faq-heading">Common questions</h2>
      <div className="lab-faq-list">
        {ITEMS.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `${item.id}-panel`;
          return (
            <div key={item.id} className="lab-faq-item">
              <button
                className="lab-faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.q}</span>
                <span className="lab-faq-mark" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div id={panelId} role="region" hidden={!isOpen}>
                <p className="lab-faq-a">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
