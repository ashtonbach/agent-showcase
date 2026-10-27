"use client";
import { useState } from "react";
const HID = "lab-faq-title";
const FAQ_ITEMS = [
  { id: "faq-panel-1", question: "What is the showcase?", answer: "The showcase is a timed run where each role ships one lab feature on a shared Next.js app, then review and QA verify it against a written spec." },
  { id: "faq-panel-2", question: "Who builds the feature?", answer: "The coder designs and implements the lab component from the spec only—no blueprint copy—while design may add artwork in parallel under public/lab/." },
  { id: "faq-panel-3", question: "How does a feature reach the page?", answer: "The coder wires app/page.tsx to the lab import, sets current.json to the slug, and ships through the gate script, which runs build and layout checks before push." },
  { id: "faq-panel-4", question: "What happens after ship?", answer: "Review checks the diff and behavior; QA runs functional checks; fix rounds address failures until the run closes or times out." },
];
const CSS = `.lab-faq{width:min(720px,100%);margin:8px auto 56px}.lab-faq__list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}.lab-faq__item{border:1px solid rgba(176,203,188,.28);border-radius:16px;overflow:hidden;background:rgba(18,26,22,.35)}.lab-faq__trigger{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:24px;margin:0;border:none;background:transparent;color:var(--mist,#e8eee9);font-family:var(--sans),system-ui,sans-serif;font-size:1rem;font-weight:500;text-align:left;cursor:pointer}.lab-faq__trigger:hover{color:#f2efe6}.lab-faq__trigger:focus-visible{outline:2px solid var(--sage,#b0cbbc);outline-offset:2px}.lab-faq__q{flex:1;line-height:1.4}.lab-faq__icon{flex-shrink:0;width:1.25rem;text-align:center;color:var(--sage,#b0cbbc);font-size:1.25rem;line-height:1}.lab-faq__panel{padding:0 24px 24px;color:var(--mist,#e8eee9);font-family:var(--sans),system-ui,sans-serif;font-size:.95rem;line-height:1.55}.lab-faq__panel[hidden]{display:none}`;

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((p) => (p === id ? null : id));
  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby={HID}>
      <style>{CSS}</style>
      <h2 id={HID}>How the showcase works</h2>
      <ul className="lab-faq__list">
        {FAQ_ITEMS.map((item) => {
          const open = openId === item.id;
          return (
            <li key={item.id} className="lab-faq__item">
              <button type="button" className="lab-faq__trigger" aria-expanded={open} aria-controls={item.id} onClick={() => toggle(item.id)}>
                <span className="lab-faq__q">{item.question}</span>
                <span className="lab-faq__icon" aria-hidden="true">{open ? "−" : "+"}</span>
              </button>
              <div id={item.id} role="region" className="lab-faq__panel" hidden={!open}>{item.answer}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
