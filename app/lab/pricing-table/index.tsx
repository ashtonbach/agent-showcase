"use client";

import { useState } from "react";

/* Example plan prices — illustrative only, not offered for sale */
const PLANS = [
  {
    name: "Starter",
    price: "$9",
    features: ["Up to 3 projects", "5 GB storage", "Email support"],
  },
  {
    name: "Professional",
    price: "$19",
    features: ["Unlimited projects", "50 GB storage", "Priority support"],
    best: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    features: ["Custom integrations", "500 GB storage", "Dedicated manager"],
  },
];

const css = `
.lab-pricing { width: min(960px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
.lab-pricing .lab-header-art { display: block; width: 100%; aspect-ratio: 9 / 2; height: auto; border-radius: 12px; margin-bottom: 20px; object-fit: cover; }
.lab-pricing .lab-art-fallback { display: block; width: 100%; aspect-ratio: 9 / 2; border-radius: 12px; margin-bottom: 20px; background: rgba(176, 203, 188, 0.12); }
.lab-pricing h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; color: #F2EFE6; margin: 0 0 28px; text-align: center; }
.lab-pricing .lab-tiers { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.lab-pricing .lab-tier { position: relative; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.45); }
.lab-pricing .lab-tier[data-best="true"] { border-color: var(--sage); background: rgba(176, 203, 188, 0.42); box-shadow: 0 0 0 1px rgba(176, 203, 188, 0.35); }
.lab-pricing .lab-tier[data-best="true"] .lab-tier-name,
.lab-pricing .lab-tier[data-best="true"] .lab-price,
.lab-pricing .lab-tier[data-best="true"] .lab-period,
.lab-pricing .lab-tier[data-best="true"] .lab-features li { color: #121A16; }
.lab-pricing .lab-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); font-family: var(--sans); font-weight: 500; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; background: var(--sage); color: #121A16; padding: 4px 12px; border-radius: 999px; }
.lab-pricing .lab-tier-name { font-family: var(--serif); font-size: 22px; font-weight: 400; color: var(--mist); margin: 0 0 12px; }
.lab-pricing .lab-price { font-family: var(--sans); font-size: 28px; font-weight: 500; color: #F2EFE6; margin: 0 0 4px; }
.lab-pricing .lab-period { font-family: var(--sans); font-size: 13px; color: rgba(232, 238, 233, 0.72); margin: 0 0 20px; }
.lab-pricing .lab-features { list-style: none; margin: 0; padding: 0; }
.lab-pricing .lab-features li { font-family: var(--sans); font-size: 14px; color: var(--mist); padding: 6px 0 6px 18px; position: relative; }
.lab-pricing .lab-features li::before { content: ""; position: absolute; left: 0; top: 12px; width: 6px; height: 6px; border-radius: 50%; background: var(--sage); }
.lab-pricing .lab-note { margin: 28px 0 0; text-align: center; font-family: var(--sans); font-size: 13px; color: rgba(232, 238, 233, 0.65); line-height: 1.5; }
@media (max-width: 760px) {
  .lab-pricing .lab-tiers { grid-template-columns: 1fr; max-width: min(720px, 100%); margin: 0 auto; }
}
@media (prefers-reduced-motion: reduce) {
  .lab-pricing .lab-tier { transition: none; }
}
`;

export default function PricingTableLab() {
  const [artOk, setArtOk] = useState(true);
  const titleId = "lab-pricing-title";

  return (
    <section data-lab="pricing-table" aria-labelledby={titleId} className="lab-pricing">
      <style>{css}</style>
      {artOk ? (
        <img
          data-art="image"
          className="lab-header-art"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          onError={() => setArtOk(false)}
        />
      ) : (
        <span data-art="fallback" className="lab-art-fallback" aria-hidden="true" />
      )}
      <h2 id={titleId}>Choose your plan</h2>
      <ul className="lab-tiers">
        {PLANS.map((plan) => (
          <li
            key={plan.name}
            className="lab-tier"
            {...(plan.best ? { "data-best": "true" } : {})}
          >
            {plan.best ? <span className="lab-badge">Popular</span> : null}
            <h3 className="lab-tier-name">{plan.name}</h3>
            <p className="lab-price">{plan.price}</p>
            <p className="lab-period">per month</p>
            <ul className="lab-features">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="lab-note">
        Example data: these plans are illustrative; the showcase sells nothing.
      </p>
    </section>
  );
}
