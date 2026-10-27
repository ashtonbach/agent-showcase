"use client";
import { useState, useCallback } from "react";
const ITEMS = [
  { id: "faq-showcase", q: "What is the agent showcase?", a: "A timed live run where a coder agent builds one UI feature from a written spec on stream." },
  { id: "faq-lab", q: "Where does the feature render?", a: "In a single lab slot under app/lab, imported on the demo page below the title." },
  { id: "faq-ship", q: "What does ship do before push?", a: "Layout checks, a production build, and an automated gate on files and behavior, then commit and push." },
  { id: "faq-accordion", q: "How does this accordion behave?", a: "One panel open at a time; clicking the open question closes it. Enter and Space use native buttons." },
];
const CSS = `.lab-faq{width:min(720px,100%);margin:8px auto 60px;color:var(--mist,#E8EEE9)}
.lab-faq h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.15;margin:10px 0 20px}
.lab-faq-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px}
.lab-faq-item{border:1px solid rgba(176,203,188,.28);border-radius:16px;background:rgba(18,26,22,.35);overflow:hidden}
.lab-faq-trigger{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 24px;border:0;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer}
.lab-faq-trigger:focus-visible{outline:2px solid var(--sage,#B0CBBC);outline-offset:2px}
.lab-faq-q{flex:1;font-family:var(--sans);font-size:16px;font-weight:500;line-height:1.35}
.lab-faq-icon{flex-shrink:0;width:28px;height:28px;border-radius:8px;border:1px solid rgba(176,203,188,.35);display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--sage,#B0CBBC)}
.lab-faq-panel{padding:0 24px 18px;font-size:15px;line-height:1.5;color:rgba(232,238,233,.92)}
@media(min-width:721px){.lab-faq{margin-bottom:26px}.lab-faq h2{margin-bottom:14px}.lab-faq-list{gap:8px}.lab-faq-trigger{padding:14px 24px}.lab-faq-q{line-height:1.3}}`;

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const titleId = "lab-faq-title";
  const toggle = useCallback((id: string) => setOpenId((p) => (p === id ? null : id)), []);
  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby={titleId}>
      <style>{CSS}</style>
      <h2 id={titleId}>FAQ</h2>
      <ul className="lab-faq-list">
        {ITEMS.map((item) => {
          const open = openId === item.id;
          const panelId = `${item.id}-panel`;
          return (
            <li key={item.id} className="lab-faq-item">
              <button type="button" className="lab-faq-trigger" aria-expanded={open} aria-controls={panelId} onClick={() => toggle(item.id)}>
                <span className="lab-faq-q">{item.q}</span>
                <span className="lab-faq-icon" aria-hidden="true">{open ? "−" : "+"}</span>
              </button>
              <div id={panelId} role="region" className="lab-faq-panel" hidden={!open}>{item.a}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
