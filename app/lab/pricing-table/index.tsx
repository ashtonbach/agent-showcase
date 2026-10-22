"use client";

import { useState } from "react";

const css = `
.lab-wrap { width: min(960px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
.lab-header { display: block; width: 100%; aspect-ratio: 9 / 2; height: auto; border-radius: 12px; object-fit: cover; margin-bottom: 20px; }
.lab-fallback { display: block; width: 100%; aspect-ratio: 9 / 2; border-radius: 12px; background: rgba(176, 203, 188, 0.12); margin-bottom: 20px; }
.lab-title { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; color: var(--mist, #f2efe6); margin: 0 0 28px; text-align: center; }
.lab-tiers { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 760px) { .lab-tiers { grid-template-columns: 1fr; max-width: min(720px, 100%); margin: 0 auto; } }
.lab-card { position: relative; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.45); color: #e8eee9; }
.lab-card[data-best="true"] { border-color: var(--sage, #b0cbbc); background: rgba(176, 203, 188, 0.55); box-shadow: 0 0 0 1px rgba(176, 203, 188, 0.35); color: #121a16; }
.lab-card[data-best="true"] .lab-name,
.lab-card[data-best="true"] .lab-price { color: #14201a; }
.lab-card[data-best="true"] .lab-price span { color: #121a16; }
.lab-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; background: var(--sage, #b0cbbc); color: #121a16; padding: 4px 12px; border-radius: 999px; }
.lab-name { font-family: var(--serif); font-size: 22px; margin: 8px 0 12px; color: var(--mist, #f2efe6); }
.lab-price { font-size: 28px; margin: 0 0 16px; color: var(--mist, #f2efe6); }
.lab-price span { font-size: 14px; font-weight: 400; color: #e8eee9; margin-left: 4px; }
.lab-features { margin: 0; padding: 0 0 0 18px; line-height: 1.5; }
.lab-features li { margin-bottom: 8px; }
.lab-note { margin: 28px 0 0; text-align: center; font-size: 14px; color: #e8eee9; }
@media (prefers-reduced-motion: reduce) { .lab-card { transition: none; } }
`;

// Example plan prices — illustrative showcase tiers only
const tiers = [
  { name: "Starter", price: "12", features: ["Up to 3 projects", "Community support", "5 GB storage"] },
  {
    name: "Growth",
    price: "29",
    best: true,
    features: ["Unlimited projects", "Priority email support", "50 GB storage"],
  },
  { name: "Studio", price: "59", features: ["Everything in Growth", "Dedicated onboarding", "250 GB storage"] },
];

export default function Lab() {
  const [headerOk, setHeaderOk] = useState(true);
  const titleId = "lab-pricing-title";

  return (
    <section data-lab="pricing-table" aria-labelledby={titleId} className="lab-wrap">
      <style>{css}</style>
      {headerOk ? (
        <img
          data-art="image"
          className="lab-header"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          onError={() => setHeaderOk(false)}
        />
      ) : (
        <span data-art="fallback" className="lab-fallback" aria-hidden="true" />
      )}
      <h2 id={titleId} className="lab-title">Choose your plan</h2>
      <ul className="lab-tiers">
        {tiers.map((t) => (
          <li key={t.name} className="lab-card" {...(t.best ? { "data-best": "true" } : {})}>
            {t.best ? <span className="lab-badge">Popular</span> : null}
            <h3 className="lab-name">{t.name}</h3>
            <p className="lab-price">
              ${t.price}
              <span>per month</span>
            </p>
            <ul className="lab-features">
              {t.features.map((f) => (
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
