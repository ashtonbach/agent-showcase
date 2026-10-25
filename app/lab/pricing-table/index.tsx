"use client";
import { useState } from "react";

/* Example plan prices — illustrative only; see lab-note on page */
const PLANS = [
  { name: "Starter", price: "9", features: ["Up to 3 projects", "Community support", "1 GB storage"] },
  { name: "Pro", price: "19", features: ["Unlimited projects", "Priority support", "50 GB storage"], best: true },
  { name: "Team", price: "49", features: ["Everything in Pro", "Shared workspaces", "250 GB storage"] },
];

const css = `
.lab-wrap { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-wrap [data-art="image"] { display: block; width: 100%; aspect-ratio: 9/2; height: auto; border-radius: 12px; margin-bottom: 20px; object-fit: cover; }
.lab-wrap [data-art="fallback"] { display: block; width: 100%; aspect-ratio: 9/2; border-radius: 12px; margin-bottom: 20px; background: rgba(176,203,188,0.12); }
.lab-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; color: var(--mist); margin: 0 0 28px; }
.lab-tiers { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 760px) { .lab-tiers { grid-template-columns: 1fr; max-width: min(720px, 100%); margin: 0 auto; } }
.lab-tier { position: relative; border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); color: #F2EFE6; }
.lab-tier[data-best="true"] { border-color: var(--sage); background: rgba(176,203,188,0.14); box-shadow: 0 0 0 1px rgba(176,203,188,0.35); }
.lab-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); font-family: var(--sans); font-weight: 500; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; background: var(--sage); color: #121A16; padding: 4px 12px; border-radius: 999px; }
.lab-name { font-family: var(--serif); font-size: 22px; font-weight: 400; margin: 0 0 8px; color: var(--mist); }
.lab-price { margin: 0 0 16px; font-size: 28px; color: var(--mist); }
.lab-price span { font-size: 14px; font-weight: 400; color: #E8EEE9; opacity: 0.85; }
.lab-feats { margin: 0; padding: 0 0 0 18px; color: #E8EEE9; font-size: 15px; line-height: 1.5; }
.lab-feats li { margin-bottom: 6px; }
.lab-note { margin: 28px 0 0; font-size: 14px; color: #E8EEE9; opacity: 0.75; text-align: center; }
@media (prefers-reduced-motion: reduce) { .lab-tier { transition: none; } }
`;

export default function Lab() {
  const [artErr, setArtErr] = useState(false);
  return (
    <section data-lab="pricing-table" aria-labelledby="pricing-table-title" className="lab-wrap">
      <style>{css}</style>
      {artErr ? (
        <span data-art="fallback" aria-hidden="true" className="lab-art-fb" />
      ) : (
        <img
          data-art="image"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          onError={() => setArtErr(true)}
        />
      )}
      <h2 id="pricing-table-title">Choose your plan</h2>
      <ul className="lab-tiers">
        {PLANS.map((p) => (
          <li key={p.name} className="lab-tier" {...(p.best ? { "data-best": "true" } : {})}>
            {p.best ? <span className="lab-badge">Popular</span> : null}
            <h3 className="lab-name">{p.name}</h3>
            <p className="lab-price">${p.price} <span>per month</span></p>
            <ul className="lab-feats">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="lab-note">Example data: these plans are illustrative; the showcase sells nothing.</p>
    </section>
  );
}
