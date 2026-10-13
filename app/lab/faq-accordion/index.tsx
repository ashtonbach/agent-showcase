"use client";
import { useState } from "react";

const FAQS = [
  {
    id: "faq-panel-run",
    q: "What happens in a showcase run?",
    a: "A coder implements a small lab feature from a written spec. A reviewer and QA then check the rendered page against that spec.",
  },
  {
    id: "faq-panel-toggle",
    q: "How does this accordion behave?",
    a: "Only one answer stays open. Opening a question closes any other; clicking the open question closes it. Enter and Space toggle the focused button.",
  },
  {
    id: "faq-panel-slot",
    q: "Where does a lab feature render?",
    a: "Each feature is a client component in the lab slot. current.json sets the page title slug, and the page mounts that component.",
  },
  {
    id: "faq-panel-crew",
    q: "Who else works on the same run?",
    a: "A designer may add artwork in parallel. The reviewer checks the spec, and QA signs off on what actually rendered.",
  },
];
const css = `
.lab-faq{width:min(720px,100%);margin:8px auto 56px;box-sizing:border-box;padding:0 12px;color:var(--mist,#F2EFE6);overflow-wrap:anywhere}
.lab-faq .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;color:var(--sage);margin:0 0 8px}
.lab-faq h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-faq .lab-item{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;margin:0 0 10px;box-sizing:border-box}
.lab-faq button{all:unset;box-sizing:border-box;display:flex;width:100%;justify-content:space-between;align-items:center;gap:16px;cursor:pointer;font-family:var(--sans);font-size:16px;line-height:1.35;color:var(--mist,#E8EEE9);text-align:left}
.lab-faq button:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
.lab-faq .lab-mark{flex-shrink:0;font-size:22px;color:var(--sage);line-height:1}
.lab-faq .lab-panel{margin:12px 0 0;font-family:var(--sans);line-height:1.5;color:var(--mist,#E8EEE9)}
@media (prefers-reduced-motion:reduce){.lab-faq *{transition:none!important}}
`;
export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  function toggle(id: string) {
    setOpenId((cur) => (cur === id ? null : id));
  }
  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-title" className="lab-faq">
      <style>{css}</style>
      <p className="label">How the showcase works</p>
      <h2 id="lab-faq-title">Questions about this run</h2>
      {FAQS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="lab-item">
            <button type="button" aria-expanded={isOpen} aria-controls={item.id} onClick={() => toggle(item.id)}>
              {item.q}
              <span className="lab-mark" aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            <div id={item.id} role="region" hidden={!isOpen} className="lab-panel">
              {item.a}
            </div>
          </div>
        );
      })}
    </section>
  );
}
