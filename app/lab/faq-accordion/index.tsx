"use client";
import { useState } from "react";

const ITEMS = [
  { q: "What is this showcase?", a: "A live run where an AI coder writes a small lab feature into this page from a spec, with no blueprint or reference code." },
  { q: "How does a feature land on the page?", a: "The coder mounts one client component in the lab slot. current.json sets the title slug, and the home page imports that component into the slot." },
  { q: "How is the work checked?", a: "A gate checks files, size, banned APIs, and accordion behavior. A reviewer then inspects the preview, and QA signs off before the run closes." },
  { q: "What is Forest Mist?", a: "The AshtonBach brand for this page: dark forest green, mist-colored text, a sage accent, and serif headings." },
];

const css = `
.lab-faq{width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px;color:var(--mist,#F2EFE6);box-sizing:border-box}
.lab-faq h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 16px}
.lab-item{border-top:1px solid rgba(176,203,188,.28)}
.lab-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0;padding:14px 0;background:none;border:0;color:inherit;font:500 16px/1.4 var(--sans,system-ui);text-align:left;cursor:pointer;overflow-wrap:anywhere}
.lab-icon{flex:none;color:var(--sage,#9BB8A8);font-size:22px;line-height:1}
.lab-a{margin:0;padding:0 0 14px;font:400 15px/1.55 var(--sans,system-ui);color:var(--mist,#E8EEE9);overflow-wrap:anywhere}
.lab-a[hidden]{display:none}
@media (prefers-reduced-motion:reduce){.lab-faq *{transition:none!important;animation:none!important}}
`;

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  function toggle(i: number) {
    setOpen((cur) => (cur === i ? null : i));
  }

  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby="lab-faq-title">
      <style>{css}</style>
      <h2 id="lab-faq-title">FAQ accordion</h2>
      {ITEMS.map((item, i) => {
        const pid = "lab-faq-p" + i;
        const expanded = open === i;
        return (
          <div className="lab-item" key={pid}>
            <button type="button" className="lab-q" aria-expanded={expanded} aria-controls={pid} onClick={() => toggle(i)}>
              {item.q}
              <span className="lab-icon" aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>
            <div id={pid} role="region" className="lab-a" hidden={!expanded}>{item.a}</div>
          </div>
        );
      })}
    </section>
  );
}
