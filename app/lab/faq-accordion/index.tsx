"use client";

import { useState } from "react";

const ITEMS = [
  { id: "faq-how", q: "How does this showcase work?", a: "A live run puts one small feature on this page. Alder writes it, Rowan reviews it, and Cedar checks the preview before the slot stays." },
  { id: "faq-slot", q: "How does a feature land on this page?", a: "The coder ships a client component in the lab folder, points the home page at it, and sets the current lab slug so the heading matches the demo." },
  { id: "faq-net", q: "Does this feature call a network API?", a: "No. Lab features stay self-contained: no fetch, sockets, or remote data, so the demo can be reviewed from the rendered page alone." },
  { id: "faq-watch", q: "Who watches the work as it ships?", a: "Viewers follow the live stream while the coordinator posts the preview URL in team chat. Review and QA then run against that preview." },
];

const css = `
.lab-faq{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);box-sizing:border-box}
.lab-faq h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:8px 0}
.lab-item+.lab-item{border-top:1px solid rgba(176,203,188,.18)}
.lab-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;background:none;border:0;color:inherit;font:500 16px/1.4 var(--sans);text-align:left;padding:16px 24px;cursor:pointer}
.lab-q:focus-visible{outline:2px solid var(--sage);outline-offset:-2px}
.lab-q span:first-child{min-width:0}
.lab-mark{flex:0 0 auto;color:var(--sage);font-size:22px;line-height:1}
.lab-a{margin:0;padding:0 24px 18px;color:#E8EEE9;font:400 15px/1.55 var(--sans)}
@media (prefers-reduced-motion:reduce){.lab-q{transition:none}}
`;

export default function FaqAccordion() {
  const [open, setOpen] = useState<string | null>(null);
  return (

    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <h2 id="lab-faq-title">How this showcase works</h2>
      <style>{css}</style>
      <div className="lab-card">
        {ITEMS.map((item) => {
          const on = open === item.id;
          return (
            <div className="lab-item" key={item.id}>
              <button type="button" className="lab-q" aria-expanded={on} aria-controls={item.id} onClick={() => setOpen(on ? null : item.id)}>
                <span>{item.q}</span>
                <span className="lab-mark" aria-hidden="true">{on ? "−" : "+"}</span>
              </button>
              <div id={item.id} role="region" hidden={!on}>
                <p className="lab-a">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
