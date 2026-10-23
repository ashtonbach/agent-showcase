"use client";

import { useState } from "react";

const ITEMS = [
  ["Fresh branch", "Each run starts on a clean base so leftover demo code cannot leak into the next feature."],
  ["Allowlist", "Only the lab slot, two page lines, and current.json may change. Everything else is gated."],
  ["Size cap", "The whole feature diff stays under a hard line budget so the change stays reviewable in one pass."],
  ["No network", "The lab component never fetches, sockets, or reads env. It renders from local data only."],
  ["Visual gate", "Layout is checked at desktop and phone widths so cards stay readable without sideways scroll."],
  ["Nightly reset", "The showcase resets on a schedule so the next run starts from a known empty lab slot."],
] as const;

const css = `
.lab-fg{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-fg h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr;gap:16px}
@media (min-width:601px){.lab-list{grid-template-columns:1fr 1fr}}
@media (min-width:901px){.lab-list{grid-template-columns:1fr 1fr 1fr}}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;margin:0;box-shadow:0 2px 10px rgba(0,0,0,.14);transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease}
.lab-card:hover,.lab-card:focus-within{border-color:rgba(229,168,75,.92);transform:translateY(-4px);box-shadow:0 12px 28px rgba(0,0,0,.32)}
.lab-card h3{font-family:var(--serif);font-weight:400;font-size:20px;margin:12px 0 8px;color:var(--mist,#F2EFE6)}
.lab-card p{margin:0;font-family:var(--sans);font-size:15px;line-height:1.5;color:#E8EEE9}
.lab-card img,.lab-fb{display:block;width:32px;height:32px}
.lab-fb{color:var(--sage);display:flex;align-items:center;justify-content:center}
@media (prefers-reduced-motion:reduce){.lab-card{transition:border-color .2s ease}.lab-card:hover,.lab-card:focus-within{transform:none;box-shadow:0 2px 10px rgba(0,0,0,.14)}}
`;

function Card({ i, title, body }: { i: number; title: string; body: string }) {
  const [bad, setBad] = useState(false);
  return (
    <li className="lab-card" tabIndex={0}>
      {bad ? (
        <span data-art="fallback" aria-hidden="true" className="lab-fb">
          <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        </span>
      ) : (
        <img data-art="image" src={"/lab/feature-grid/icon-" + i + ".svg"} width={32} height={32} alt="" onError={() => setBad(true)} />
      )}
      <h3>{title}</h3>
      <p>{body}</p>
    </li>
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="custom-1792783434" aria-labelledby="lab-fg-title" className="lab-fg">
      <style>{css}</style>
      <h2 id="lab-fg-title">Feature grid</h2>
      <ul className="lab-list">
        {ITEMS.map(([title, body], i) => (
          <Card key={title} i={i} title={title} body={body} />
        ))}
      </ul>
    </section>
  );
}
