"use client";

import { useState } from "react";

const PLANS = [
  { name: "Solo", price: "$12", perks: ["1 seat", "Email support", "Weekly digest"] },
  { name: "Crew", price: "$34", perks: ["10 seats", "Priority support", "Live reporting"] },
  { name: "Fleet", price: "$89", perks: ["Unlimited seats", "Dedicated contact", "Custom exports"] },
];

export default function Lab() {
  const [artBroken, setArtBroken] = useState(false);

  return (
    <section data-lab="pricing-table" aria-labelledby="pricing-table-title" className="lab-pt">
      <h2 id="pricing-table-title" className="lab-pt-title">Pricing table</h2>
      {artBroken ? (
        <span data-art="fallback" aria-hidden="true" className="lab-pt-art lab-pt-art-fallback" />
      ) : (
        <img
          data-art="image"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          className="lab-pt-art"
          onError={() => setArtBroken(true)}
        />
      )}
      <ul className="lab-pt-grid">
        {PLANS.map((plan, i) => {
          const popular = i === 1;
          return (
            <li
              key={plan.name}
              className={popular ? "lab-pt-card lab-pt-card-best" : "lab-pt-card"}
              data-best={popular ? "true" : undefined}
            >
              {popular && <span className="lab-pt-badge">Popular</span>}
              <h3 className="lab-pt-name">{plan.name}</h3>
              <p className="lab-pt-price">{plan.price}<span className="lab-pt-period"> per month</span></p>
              <ul className="lab-pt-perks">
                {plan.perks.map((perk) => <li key={perk}>{perk}</li>)}
              </ul>
            </li>
          );
        })}
      </ul>
      <p className="lab-pt-note">Example data: these plans are illustrative; the showcase sells nothing.</p>
      <style>{css}</style>
    </section>
  );
}

const css = `
  .lab-pt { width: min(960px, 100%); margin: 8px auto 56px; color: #F2EFE6; }
  .lab-pt-title { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 16px; }
  .lab-pt-art, .lab-pt-art-fallback { display: block; width: 100%; aspect-ratio: 9 / 2; border-radius: 16px; margin: 0 0 24px; }
  .lab-pt-art { height: auto; }
  .lab-pt-art-fallback { background: rgba(176, 203, 188, 0.14); }
  .lab-pt-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .lab-pt-card { position: relative; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
  .lab-pt-card-best { border-color: var(--sage); background: rgba(176, 203, 188, 0.12); }
  .lab-pt-badge {
    position: absolute; top: -12px; right: 20px; font-family: var(--sans); font-weight: 500; font-size: 11px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #121A16; background: var(--sage); border-radius: 999px; padding: 4px 12px;
  }
  .lab-pt-name { font-family: var(--serif); font-weight: 400; font-size: 20px; margin: 0 0 8px; }
  .lab-pt-price { font-size: 28px; margin: 0 0 16px; }
  .lab-pt-period { font-size: 14px; color: #E8EEE9; }
  .lab-pt-perks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; font-size: 15px; color: #E8EEE9; }
  .lab-pt-note { margin: 24px 0 0; font-size: 14px; color: #E8EEE9; }
  @media (max-width: 760px) {
    .lab-pt-grid { grid-template-columns: 1fr; }
    .lab-pt-badge { right: auto; left: 20px; }
  }
`;
