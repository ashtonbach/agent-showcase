"use client";

import { useState } from "react";

const TIERS = [
  { name: "Sprout", price: "14", items: ["One workspace", "Community help", "Basic analytics"] },
  { name: "Grove", price: "32", items: ["Five collaborators", "Shared libraries", "Email support"] },
  { name: "Canopy", price: "68", items: ["Unlimited projects", "Audit history", "Success manager"] },
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
  const tid = "lab-pricing-title";
  return (
    <section data-lab="pricing-table" aria-labelledby={tid} className="lab-pt">
      <HeaderArt />
      <h2 id={tid}>Plans for every stage</h2>
      <ul className="lab-pt-grid">
        {TIERS.map((tier, idx) => {
          const best = idx === 1;
          return (
            <li key={tier.name} className={best ? "lab-pt-card lab-pt-card-best" : "lab-pt-card"} {...(best ? { "data-best": "true" } : {})}>
              {best ? <span className="lab-pt-pop">Popular</span> : null}
              <h3 className="lab-pt-name">{tier.name}</h3>
              <p className="lab-pt-price">
                <span className="lab-pt-amt">${tier.price}</span> per month
              </p>
              <ul className="lab-pt-list">
                {tier.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <p className="lab-pt-note">Example data: these plans are illustrative; the showcase sells nothing.</p>
      <style>{`
        .lab-pt { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); box-sizing: border-box; }
        .lab-pt-art, .lab-pt-art-fb { display: block; width: 100%; height: auto; aspect-ratio: 9 / 2; border-radius: 12px; margin: 0 0 20px; object-fit: cover; }
        .lab-pt-art-fb { min-height: 80px; background: linear-gradient(120deg, rgba(176,203,188,0.35), rgba(18,26,22,0.5)); }
        .lab-pt > h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 24px; color: var(--mist, #F2EFE6); }
        .lab-pt-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; }
        .lab-pt-card { position: relative; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
        .lab-pt-card-best { border-color: var(--sage, #B0CBBC); background: rgba(18, 26, 22, 0.55); box-shadow: 0 0 0 1px rgba(176, 203, 188, 0.45); }
        .lab-pt-pop { position: absolute; top: 16px; right: 16px; font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; padding: 6px 10px; border-radius: 999px; background: var(--sage, #B0CBBC); color: #121A16; }
        .lab-pt-name { margin: 0 0 8px; font-family: var(--serif); font-weight: 400; font-size: 22px; color: var(--mist, #F2EFE6); }
        .lab-pt-price { margin: 0 0 16px; font-family: var(--sans); font-size: 15px; }
        .lab-pt-amt { font-family: var(--serif); font-size: 28px; color: var(--mist, #F2EFE6); margin-right: 6px; }
        .lab-pt-list { margin: 0; padding: 0 0 0 18px; font-family: var(--sans); font-size: 15px; line-height: 1.5; }
        .lab-pt-list li { margin-bottom: 6px; }
        .lab-pt-note { margin: 20px 0 0; font-family: var(--sans); font-size: 14px; line-height: 1.45; color: var(--mist, #E8EEE9); }
        @media (max-width: 760px) { .lab-pt-grid { grid-template-columns: minmax(0, 1fr); } .lab-pt { width: min(720px, 100%); } }
        @media (prefers-reduced-motion: reduce) { .lab-pt * { animation: none !important; transition: none !important; } }
      `}</style>
    </section>
  );
}
