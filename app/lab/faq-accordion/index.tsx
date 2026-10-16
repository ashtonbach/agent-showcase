"use client";

import { useState } from "react";

const FAQ = [
  {
    q: "What is this showcase?",
    a: "This is a live public run: named agents take turns writing, reviewing, and checking a small lab feature in one shared repo.",
  },
  {
    q: "Who owns each step?",
    a: "Alder writes the lab component. When a spec lists artwork, Hazel adds it. Rowan reviews the preview. Cedar signs off QA.",
  },
  {
    q: "How does a feature land on this page?",
    a: "The home page imports the current lab component into a marked slot. A small current.json file names the live slug so the heading matches.",
  },
  {
    q: "What keeps the lab feature bounded?",
    a: "The component may import only from React, must not make network calls, and the change stays compact so the gate can check files, build, and behavior.",
  },
];

const css = `
.lab-faq{width:min(720px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box;color:var(--mist,#F2EFE6)}
.lab-faq h2{font-family:var(--serif,Georgia,serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 20px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:8px 24px}
.lab-item{border-bottom:1px solid rgba(176,203,188,.18)}
.lab-item:last-child{border-bottom:0}
.lab-q{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;margin:0;padding:16px 0;border:0;background:transparent;color:var(--mist,#F2EFE6);font-family:var(--sans,system-ui,sans-serif);font-size:16px;font-weight:500;text-align:left;cursor:pointer;line-height:1.4}
.lab-q:focus-visible{outline:2px solid var(--sage,#B0CBBC);outline-offset:2px}
.lab-q>span:first-child{min-width:0;flex:1;overflow-wrap:anywhere}
.lab-mark{flex:0 0 auto;font-size:22px;line-height:1;color:var(--sage,#B0CBBC)}
.lab-a{margin:0;padding:0 0 16px;font-family:var(--sans,system-ui,sans-serif);font-size:15px;line-height:1.55;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){.lab-q,.lab-a{transition:none}}
`;

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  function toggle(i: number) {
    setOpen((cur) => (cur === i ? null : i));
  }
  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <h2 id="lab-faq-title">FAQ accordion</h2>
      <style>{css}</style>
      <div className="lab-card">
        {FAQ.map((item, i) => {
          const id = "lab-faq-panel-" + i;
          const on = open === i;
          return (
            <div className="lab-item" key={id}>
              <button className="lab-q" type="button" aria-expanded={on} aria-controls={id} onClick={() => toggle(i)}>
                <span>{item.q}</span>
                <span className="lab-mark" aria-hidden="true">{on ? "−" : "+"}</span>
              </button>
              <div id={id} role="region" hidden={!on}>
                <p className="lab-a">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
