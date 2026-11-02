"use client";
import { useCallback, useState } from "react";

/* Example plan prices — illustrative only; see disclaimer in UI */
const PLANS = [
  {
    name: "Starter",
    price: 12,
    features: ["1 project workspace", "Email support", "5 GB storage"],
  },
  {
    name: "Growth",
    price: 29,
    features: ["5 project workspaces", "Priority support", "50 GB storage"],
    best: true,
  },
  {
    name: "Studio",
    price: 59,
    features: ["Unlimited workspaces", "Dedicated support", "200 GB storage"],
  },
];

export default function PricingTable() {
  const titleId = "lab-pricing-table-title";
  const [artOk, setArtOk] = useState(true);
  const onArtError = useCallback(() => setArtOk(false), []);

  return (
    <section data-lab="pricing-table" aria-labelledby={titleId} className="lab-pricing">
      <style>{`
        .lab-pricing { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist); }
        .lab-pricing .lab-head { width: 100%; aspect-ratio: 9 / 2; border-radius: 12px; object-fit: cover; display: block; margin-bottom: 16px; }
        .lab-pricing .lab-head-fb { display: block; width: 100%; aspect-ratio: 9 / 2; border-radius: 12px; background: rgba(176,203,188,0.12); margin-bottom: 16px; }
        .lab-pricing h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 24px; line-height: 1.15; }
        .lab-pricing .lab-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .lab-pricing .lab-tier { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); position: relative; }
        .lab-pricing .lab-tier[data-best="true"] { border-color: var(--sage); background: rgba(176,203,188,0.12); box-shadow: 0 0 0 1px rgba(176,203,188,0.35); }
        .lab-pricing .lab-badge { position: absolute; top: 12px; right: 12px; font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; background: var(--sage); color: #14201A; padding: 4px 10px; border-radius: 999px; }
        .lab-pricing .lab-name { font-family: var(--serif); font-size: 22px; margin: 0 0 8px; font-weight: 400; }
        .lab-pricing .lab-price { margin: 0 0 16px; font-size: 15px; color: #E8EEE9; }
        .lab-pricing .lab-price strong { font-family: var(--serif); font-size: 32px; font-weight: 400; color: var(--mist); }
        .lab-pricing .lab-feats { margin: 0; padding-left: 18px; color: #E8EEE9; font-size: 14px; line-height: 1.5; }
        .lab-pricing .lab-feats li { margin-bottom: 6px; }
        .lab-pricing .lab-note { margin: 24px 0 0; font-size: 14px; color: rgba(232,238,233,0.85); line-height: 1.45; }
        @media (max-width: 760px) { .lab-pricing .lab-grid { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .lab-pricing * { transition: none !important; animation: none !important; } }
      `}</style>
      {artOk ? (
        <img
          data-art="image"
          className="lab-head"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          onError={onArtError}
        />
      ) : (
        <span data-art="fallback" className="lab-head-fb" aria-hidden="true" />
      )}
      <h2 id={titleId}>Choose a plan</h2>
      <ul className="lab-grid">
        {PLANS.map((plan) => (
          <li key={plan.name} className="lab-tier" {...(plan.best ? { "data-best": "true" } : {})}>
            {plan.best ? <span className="lab-badge">Popular</span> : null}
            <p className="lab-name">{plan.name}</p>
            <p className="lab-price">
              <strong>${plan.price}</strong> per month
            </p>
            <ul className="lab-feats">
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
