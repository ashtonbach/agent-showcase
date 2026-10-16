"use client";

import { useState } from "react";

const ITEMS = [
  {
    id: "faq-lab-slot",
    q: "What does the lab slot show?",
    a: "Each showcase run mounts one client feature in the lab slot. The page heading comes from the current lab slug.",
  },
  {
    id: "faq-wiring",
    q: "How does a feature land on the page?",
    a: "The coder ships a lab component, points the current slug at it, and renders that component in the lab slot on the home page.",
  },
  {
    id: "faq-gate",
    q: "What does the gate actually check?",
    a: "The gate checks files, size, banned calls, the production build, and the functional checks in the spec. It does not require the code to match a blueprint.",
  },
  {
    id: "faq-brand",
    q: "What is Forest Mist?",
    a: "Forest Mist is the showcase look: a dark forest-green page, mist-colored text, sage accents, serif headings, and cards with a soft sage border.",
  },
];

const css = `
.lab-faq{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;color:var(--mist,#F2EFE6);box-sizing:border-box}
.lab-faq h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-faq-list{display:flex;flex-direction:column;gap:8px;margin:0;padding:0;list-style:none}
.lab-faq-item{border:1px solid rgba(176,203,188,0.28);border-radius:16px;overflow:hidden}
.lab-faq-q{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;margin:0;padding:16px 18px;border:0;background:transparent;color:var(--mist,#F2EFE6);font-family:var(--sans);font-size:16px;font-weight:500;text-align:left;cursor:pointer}
.lab-faq-q:focus-visible{outline:2px solid var(--sage);outline-offset:-2px}
.lab-faq-mark{flex:0 0 auto;color:var(--sage);font-size:22px;line-height:1}
.lab-faq-a{margin:0;padding:0 18px 16px;color:#E8EEE9;font-family:var(--sans);font-size:15px;line-height:1.5}
.lab-faq-a[hidden]{display:none}
@media (prefers-reduced-motion:reduce){.lab-faq-q,.lab-faq-a{transition:none}}
`;

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  function toggle(id: string) {
    setOpenId((cur) => (cur === id ? null : id));
  }

  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <style>{css}</style>
      <h2 id="lab-faq-title">How the showcase works</h2>
      <ul className="lab-faq-list">
        {ITEMS.map((item) => {
          const open = openId === item.id;
          return (
            <li key={item.id} className="lab-faq-item">
              <button type="button" className="lab-faq-q" aria-expanded={open} aria-controls={item.id} onClick={() => toggle(item.id)}>
                <span>{item.q}</span>
                <span className="lab-faq-mark" aria-hidden="true">{open ? "−" : "+"}</span>
              </button>
              <div id={item.id} role="region" hidden={!open} className="lab-faq-a">{item.a}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

