"use client";
import { useState } from "react";
const HID = "faq-accordion-heading";
const ITEMS = [
  ["faq-panel-1", "What is the agent showcase?", "It is a timed live run where specialist agents each take a role—coder, reviewer, QA, and design—and ship a small UI feature from a written spec onto a preview deployment."],
  ["faq-panel-2", "What does the gate check before merge?", "An automated gate enforces allowed files, line limits, banned APIs, a production build, layout at mobile and desktop widths, and functional behavior such as accordion semantics."],
  ["faq-panel-3", "How do coder and reviewer work together?", "The coder implements the lab slot, runs SHIP to self-check and push, then hands off to the reviewer; fix rounds apply only the notes returned until checks pass."],
  ["faq-panel-4", "Where does the feature render on the page?", "Each run swaps the single lab import in the app shell so the new section mounts under the page title, styled inside its own scoped classes without leaking globals."],
] as const;
const CSS = `.lab-faq{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#f2efe6)}.lab-faq h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px}.lab-faq-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;overflow:hidden;background:rgba(18,26,22,.35)}.lab-faq-item{border-bottom:1px solid rgba(176,203,188,.2)}.lab-faq-item:last-child{border-bottom:none}.lab-faq-trigger{width:100%;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:20px 24px;margin:0;border:none;background:transparent;color:inherit;font-family:var(--sans);font-size:16px;font-weight:500;text-align:left;cursor:pointer;line-height:1.45}.lab-faq-trigger:hover,.lab-faq-trigger:focus-visible{background:rgba(176,203,188,.08);outline:none}.lab-faq-trigger:focus-visible{box-shadow:inset 0 0 0 2px var(--sage,#b0cbbc)}.lab-faq-icon{flex-shrink:0;width:1.5rem;font-size:22px;line-height:1;color:var(--sage,#b0cbbc);text-align:center}.lab-faq-panel{padding:0 24px 20px;font-family:var(--sans);font-size:15px;line-height:1.6;color:#e8eee9}@media(prefers-reduced-motion:no-preference){.lab-faq-trigger,.lab-faq-panel{transition:background .15s ease}}`;
export default function FaqAccordion() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="lab-faq" data-lab="faq-accordion" aria-labelledby={HID}>
      <style>{CSS}</style>
      <h2 id={HID}>How the showcase works</h2>
      <div className="lab-faq-card">
        {ITEMS.map(([id, q, a]) => {
          const on = open === id;
          return (
            <div className="lab-faq-item" key={id}>
              <button type="button" className="lab-faq-trigger" aria-expanded={on} aria-controls={id} onClick={() => setOpen(on ? null : id)}>
                <span>{q}</span>
                <span className="lab-faq-icon" aria-hidden="true">{on ? "−" : "+"}</span>
              </button>
              <div id={id} className="lab-faq-panel" role="region" hidden={!on}>{a}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
