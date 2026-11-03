"use client";

import { useState } from "react";

const PLANS = [
  { name: "Sprout", price: "$12", feats: ["One showcase lab slot", "Gate checks on every push", "Preview layout screenshots"] },
  { name: "Canopy", price: "$29", best: true, feats: ["Everything in Sprout", "Design-led artwork slots", "Reviewer handoff in team chat"] },
  { name: "Grove", price: "$59", feats: ["Everything in Canopy", "QA sign-off on production", "Nightly base branch reset"] },
] as const;

function HeaderArt() {
  const [bad, setBad] = useState(false);
  if (bad) {
    return <span data-art="fallback" aria-hidden="true" className="lab-pt-art-fb" />;
  }
  return (
    <img
      data-art="image"
      className="lab-pt-art"
      src="/lab/pricing-table/header.svg"
      width={720}
      height={160}
      alt=""
      onError={() => setBad(true)}
    />
  );
}

export default function PricingTable() {
  return (
    <section data-lab="pricing-table" aria-labelledby="pt-title">
      <HeaderArt />
      <h2 id="pt-title">Plans for the showcase</h2>
      <ul className="lab-pt-tiers">
        {PLANS.map((p) => (
          <li key={p.name} className={p.best ? "lab-pt-tier lab-pt-tier-best" : "lab-pt-tier"} {...(p.best ? { "data-best": "true" } : {})}>
            {p.best ? <span className="lab-pt-badge">Popular</span> : null}
            <h3 className="lab-pt-name">{p.name}</h3>
            <p className="lab-pt-price">
              {p.price} <span className="lab-pt-per">per month</span>
            </p>
            <ul className="lab-pt-feats">
              {p.feats.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="lab-note">Example data: these plans are illustrative; the showcase sells nothing.</p>
      <style>{`
        [data-lab="pricing-table"] { max-width: min(960px, 100%); margin: 8px auto 56px; padding: 0 12px; color: var(--mist); }
        .lab-pt-art { display: block; width: 100%; height: auto; aspect-ratio: 9 / 2; border-radius: 12px; margin: 0 0 20px; }
        .lab-pt-art-fb { display: block; width: 100%; aspect-ratio: 9 / 2; border-radius: 12px; margin: 0 0 20px; background: rgba(176,203,188,0.18); }
        [data-lab="pricing-table"] h2 { font-family: var(--serif); font-weight: 400; font-size: 1.875rem; margin: 0 0 24px; color: var(--mist); }
        .lab-pt-tiers { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 761px) { .lab-pt-tiers { grid-template-columns: repeat(3, 1fr); align-items: stretch; } }
        .lab-pt-tier { position: relative; border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); }
        .lab-pt-tier-best { border-color: var(--sage); background: rgba(176,203,188,0.12); box-shadow: 0 0 0 1px rgba(176,203,188,0.35); }
        .lab-pt-badge { position: absolute; top: 12px; right: 12px; font-family: var(--sans); font-weight: 500; font-size: 0.6875rem; letter-spacing: 0.16em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; background: var(--sage); color: #121a16; }
        .lab-pt-name { font-family: var(--serif); font-weight: 400; font-size: 1.25rem; margin: 0 0 8px; }
        .lab-pt-price { font-family: var(--sans); font-size: 1.5rem; margin: 0 0 16px; color: var(--mist); }
        .lab-pt-per { font-size: 0.875rem; color: #e8eee9; font-weight: 400; }
        .lab-pt-feats { margin: 0; padding-left: 1.1rem; font-family: var(--sans); font-size: 0.9375rem; line-height: 1.5; color: #e8eee9; }
        .lab-pt-feats li { margin-bottom: 6px; }
        .lab-note { margin: 24px 0 0; font-family: var(--sans); font-size: 0.875rem; line-height: 1.5; color: #e8eee9; }
        @media (prefers-reduced-motion: reduce) { .lab-pt-tier { transition: none; } }
      `}</style>
    </section>
  );
}
