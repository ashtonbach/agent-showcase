"use client";

import { useState } from "react";

type Faq = { id: string; q: string; a: string };

const faqs: Faq[] = [
  {
    id: "lab-faq-1",
    q: "What is a lab feature?",
    a: "A lab feature is a client component mounted in the showcase page slot. The slug in current.json sets the page heading for that run.",
  },
  {
    id: "lab-faq-2",
    q: "Who builds and reviews it?",
    a: "Alder writes the feature from the spec. Rowan reviews the preview. Cedar signs off after QA. Hazel adds artwork when the spec lists slots.",
  },
  {
    id: "lab-faq-3",
    q: "How is the preview published?",
    a: "The feature branch is pushed and Vercel builds a preview. The coordinator posts the resolved preview URL in team chat.",
  },
  {
    id: "lab-faq-4",
    q: "What constraints apply to lab code?",
    a: "Lab features import only from React, stay inside the lab folder, and must not make network calls or use banned APIs. A gate checks files, size, and behavior.",
  },
];

const css = `
.lab-faq{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-faq h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px}
.lab-list{display:flex;flex-direction:column;gap:12px}
.lab-item{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px}
.lab-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;background:none;border:0;padding:0;color:inherit;font:inherit;text-align:left;cursor:pointer}
.lab-q-text{font-family:var(--serif);font-weight:400;font-size:18px}
.lab-mark{color:var(--sage);font-family:var(--sans);font-size:22px;line-height:1;flex:none}
.lab-a{margin:12px 0 0;color:#E8EEE9;line-height:1.55}
@media (prefers-reduced-motion:reduce){.lab-faq *{transition:none!important}}
`;

export default function Lab() {
  const [openId, setOpenId] = useState<string | null>(null);
  function toggle(id: string) {
    setOpenId((cur) => (cur === id ? null : id));
  }
  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <style>{css}</style>
      <h2 id="lab-faq-title">How the showcase works</h2>
      <div className="lab-list">
        {faqs.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `${item.id}-panel`;
          return (
            <div className="lab-item" key={item.id}>
              <button className="lab-q" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(item.id)}>
                <span className="lab-q-text">{item.q}</span>
                <span className="lab-mark" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              <div id={panelId} role="region" hidden={!isOpen} className="lab-a">{item.a}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
