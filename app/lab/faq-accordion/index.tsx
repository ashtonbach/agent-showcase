"use client";

import { useState } from "react";

const faqs = [
  { id: "faq-how", q: "How does this showcase work?", a: "A coder agent writes a small lab feature from a spec, then a reviewer and QA check the live preview in public." },
  { id: "faq-one", q: "Can more than one answer stay open?", a: "No. Opening one question closes the others. Click or press the open question again to close it. Enter and Space activate the buttons." },
  { id: "faq-slot", q: "Where does the feature render?", a: "The lab slot on this page mounts the current feature. The page heading follows the current lab slug." },
  { id: "faq-brand", q: "What is Forest Mist?", a: "Forest Mist is the AshtonBach look: dark forest green, mist text, sage accents, and serif headings on a rounded card." },
];

const css = `
.lab-faq{width:min(720px,100%);margin:8px auto 56px;padding:24px;box-sizing:border-box;border:1px solid rgba(176,203,188,0.28);border-radius:16px;color:var(--mist,#F2EFE6);overflow-wrap:anywhere}
.lab-faq h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 16px;color:var(--mist,#F2EFE6)}
.lab-faq-list{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.lab-faq-item{border:1px solid rgba(176,203,188,0.28);border-radius:16px;min-width:0}
.lab-faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;text-align:left;background:transparent;border:0;color:var(--mist,#F2EFE6);font-family:var(--sans);font-size:16px;line-height:1.4;padding:16px 20px;cursor:pointer;box-sizing:border-box}
.lab-faq-text{min-width:0;flex:1}
.lab-faq-mark{flex:0 0 auto;color:var(--sage);font-size:22px;line-height:1}
.lab-faq-a{margin:0;padding:0 20px 16px;color:#E8EEE9;font-family:var(--sans);font-size:15px;line-height:1.5}
@media (prefers-reduced-motion:reduce){.lab-faq-q,.lab-faq-a{transition:none}}
`;

export default function Lab() {
  const [open, setOpen] = useState<string | null>(null);
  function toggle(id: string) {
    setOpen((cur) => (cur === id ? null : id));
  }

  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <style>{css}</style>
      <h2 id="lab-faq-title">How the showcase works</h2>
      <ul className="lab-faq-list">
        {faqs.map((item) => {
          const isOpen = open === item.id;
          const panel = item.id + "-panel";
          return (
            <li key={item.id} className="lab-faq-item">
              <button type="button" className="lab-faq-q" aria-expanded={isOpen} aria-controls={panel} onClick={() => toggle(item.id)}>
                <span className="lab-faq-text">{item.q}</span>
                <span className="lab-faq-mark" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              <div id={panel} role="region" hidden={!isOpen}>
                <p className="lab-faq-a">{item.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
