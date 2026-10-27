"use client";
import { useState } from "react";
const FAQS = [
  { id: "faq-panel-1", q: "What is the showcase?", a: "A timed live run where a coder builds one lab feature from a spec while reviewers and QA watch." },
  { id: "faq-panel-2", q: "Which files can the coder change?", a: "Only the new lab component, two page-slot lines, and app/lab/current.json." },
  { id: "faq-panel-3", q: "What does the gate enforce?", a: "Allowed paths, line limits, banned APIs, production build, and functional layout and behavior checks." },
  { id: "faq-panel-4", q: "How does the feature reach preview?", a: "After SHIP passes self-check and gate, the commit is pushed to the branch and Vercel builds a preview." },
];
const CSS = `.lab-faq{width:min(720px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box}
.lab-faq h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;color:var(--mist,#f2efe6);margin:0 0 20px}
.lab-faq-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.lab-faq-item{border:1px solid rgba(176,203,188,.28);border-radius:16px;background:rgba(18,26,22,.35);overflow:hidden}
.lab-faq-trigger{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 24px;border:0;background:transparent;color:var(--mist,#f2efe6);font-family:var(--sans);font-size:16px;font-weight:500;text-align:left;cursor:pointer}
.lab-faq-trigger:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
.lab-faq-icon{flex-shrink:0;width:28px;height:28px;border-radius:8px;border:1px solid rgba(176,203,188,.35);color:var(--sage);font-size:18px;line-height:26px;text-align:center}
.lab-faq-panel{padding:0 24px 20px;color:#e8eee9;font-family:var(--sans);font-size:15px;line-height:1.55}
@media (prefers-reduced-motion:no-preference){.lab-faq-panel{transition:opacity .2s ease}}`;

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <section data-lab="faq-accordion" aria-labelledby="lab-faq-title" className="lab-faq">
      <style>{CSS}</style>
      <h2 id="lab-faq-title">Showcase FAQ</h2>
      <ul className="lab-faq-list">
        {FAQS.map((item) => {
          const on = openId === item.id;
          return (
            <li key={item.id} className="lab-faq-item">
              <button type="button" className="lab-faq-trigger" aria-expanded={on} aria-controls={item.id} onClick={() => setOpenId(on ? null : item.id)}>
                <span>{item.q}</span>
                <span className="lab-faq-icon" aria-hidden="true">{on ? "−" : "+"}</span>
              </button>
              <div id={item.id} role="region" className="lab-faq-panel" hidden={!on}>{item.a}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
