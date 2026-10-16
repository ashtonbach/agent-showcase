"use client";

import { useState } from "react";

type Item = { id: string; q: string; a: string };

const ITEMS: Item[] = [
  {
    id: "slot",
    q: "What is the showcase lab slot?",
    a: "Each run mounts one client feature on the home page so viewers can watch a single piece of UI ship in isolation.",
  },
  {
    id: "author",
    q: "Who writes the feature?",
    a: "The coder designs and writes the component from a live spec. There is no blueprint to copy.",
  },
  {
    id: "review",
    q: "How does review work?",
    a: "After the coder ships, a reviewer checks the live preview for layout, accessibility, and the spec.",
  },
  {
    id: "look",
    q: "What look does the page use?",
    a: "AshtonBach Forest Mist: dark forest green, mist-colored text, sage accents, and serif headings.",
  },
];

const css = `
.lab-faq{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;color:var(--mist,#F2EFE6);box-sizing:border-box}
.lab-faq h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 16px;color:var(--mist,#F2EFE6)}
.lab-faq-btn{width:100%;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin:0;padding:14px 0;border:0;border-top:1px solid rgba(176,203,188,0.28);background:none;color:inherit;font:inherit;text-align:left;cursor:pointer;white-space:normal;overflow-wrap:anywhere}
.lab-faq-item:first-of-type .lab-faq-btn{border-top:0}
.lab-faq-mark{flex:0 0 auto;color:var(--sage,#9BB8A8);font-size:22px;line-height:1}
.lab-faq-panel{margin:0;padding:0 0 14px;color:#E8EEE9;line-height:1.55;overflow-wrap:anywhere}
.lab-faq-panel[hidden]{display:none}
@media (max-width:420px){.lab-faq{padding:16px}.lab-faq h2{font-size:26px}}
@media (prefers-reduced-motion:reduce){.lab-faq *{transition:none}}
`;

export default function FaqAccordion() {
  const [open, setOpen] = useState<string | null>(null);

  function toggle(id: string) {
    setOpen((cur) => (cur === id ? null : id));
  }

  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby="lab-faq-h">
      <h2 id="lab-faq-h">How the showcase works</h2>
      <style>{css}</style>
      {ITEMS.map((item) => {
        const expanded = open === item.id;
        const panel = `lab-faq-p-${item.id}`;
        return (
          <div className="lab-faq-item" key={item.id}>
            <button
              type="button"
              className="lab-faq-btn"
              aria-expanded={expanded}
              aria-controls={panel}
              onClick={() => toggle(item.id)}
            >
              <span>{item.q}</span>
              <span className="lab-faq-mark" aria-hidden="true">
                {expanded ? "−" : "+"}
              </span>
            </button>
            <div id={panel} role="region" hidden={!expanded} className="lab-faq-panel">
              {item.a}
            </div>
          </div>
        );
      })}
    </section>
  );
}
