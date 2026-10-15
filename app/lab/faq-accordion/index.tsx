"use client";

import { useState } from "react";

const faqs = [
  {
    id: "faq-panel-roles",
    q: "Who builds a showcase feature?",
    a: "Alder writes the lab component from the spec. Hazel can add artwork in parallel. Rowan reviews the result, and Cedar runs QA.",
  },
  {
    id: "faq-panel-slot",
    q: "How does the feature appear on the page?",
    a: "The lab slot reads current.json for the page heading and mounts the feature as the default export of its folder. Only that slot file and two lines in the home page change.",
  },
  {
    id: "faq-panel-rules",
    q: "What rules does a lab feature follow?",
    a: "It is a client component that imports only from React, keeps styles inside the section with lab- class names, and makes no network calls.",
  },
  {
    id: "faq-panel-toggle",
    q: "How do these answers open and close?",
    a: "Only one answer is open at a time. Opening a question closes the others; pressing the open question again closes it. Enter and Space activate the focused button.",
  },
];

const css = `
.lab-faq { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); box-sizing: border-box; }
.lab-faq *, .lab-faq *::before, .lab-faq *::after { box-sizing: border-box; }
.lab-faq h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.25; margin: 0 0 20px; }
.lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 8px 0; }
.lab-item + .lab-item { border-top: 1px solid rgba(176, 203, 188, 0.18); }
.lab-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; background: none; border: 0; color: inherit; text-align: left; font: inherit; padding: 16px 24px; cursor: pointer; }
.lab-q:focus-visible { outline: 2px solid var(--sage, #9BB8A8); outline-offset: -2px; }
.lab-q span:first-child { min-width: 0; }
.lab-mark { color: var(--sage); font-size: 22px; line-height: 1; flex: 0 0 auto; }
.lab-a { margin: 0; padding: 0 24px 20px; color: #E8EEE9; line-height: 1.55; }
@media (prefers-reduced-motion: reduce) { .lab-faq * { transition: none !important; } }
`;

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  function toggle(id: string) {
    setOpenId((cur) => (cur === id ? null : id));
  }

  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby="faq-heading">
      <style>{css}</style>
      <h2 id="faq-heading">How the showcase works</h2>
      <div className="lab-card">
        {faqs.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div className="lab-item" key={item.id}>
              <button
                className="lab-q"
                aria-expanded={isOpen}
                aria-controls={item.id}
                onClick={() => toggle(item.id)}
              >
                <span>{item.q}</span>
                <span className="lab-mark" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
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
