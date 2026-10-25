"use client";
import { useState } from "react";

const css = `
.lab-wrap { width: min(960px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
.lab-header { width: 100%; aspect-ratio: 9 / 2; border-radius: 12px; object-fit: cover; display: block; margin-bottom: 20px; }
.lab-header-fb { display: block; width: 100%; aspect-ratio: 9 / 2; border-radius: 12px; margin-bottom: 20px; background: rgba(176, 203, 188, 0.12); }
.lab-title { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; color: var(--mist); margin: 0 0 28px; text-align: center; }
.lab-tiers { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: stretch; }
@media (max-width: 760px) { .lab-tiers { grid-template-columns: 1fr; max-width: min(720px, 100%); margin: 0 auto; } }
.lab-card { position: relative; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); color: var(--mist); }
.lab-card[data-best="true"] { border-color: var(--sage); background: rgba(20, 32, 26, 0.92); box-shadow: 0 0 0 1px rgba(176, 203, 188, 0.45), 0 12px 32px rgba(0, 0, 0, 0.25); }
.lab-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); font-family: var(--sans); font-weight: 500; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; background: var(--sage); color: #121A16; padding: 4px 12px; border-radius: 999px; }
@media (prefers-reduced-motion: reduce) { .lab-card { transition: none; } }
.lab-name { font-family: var(--serif); font-weight: 400; font-size: 22px; margin: 0 0 8px; text-align: center; }
.lab-price { text-align: center; margin: 0 0 20px; font-size: 15px; color: #E8EEE9; }
.lab-price strong { font-family: var(--serif); font-size: 36px; font-weight: 400; color: var(--mist); }
.lab-feats { margin: 0; padding: 0; list-style: none; }
.lab-feats li { padding: 8px 0 8px 22px; position: relative; font-size: 14px; line-height: 1.45; border-top: 1px solid rgba(176, 203, 188, 0.18); }
.lab-feats li::before { content: ""; position: absolute; left: 0; top: 14px; width: 8px; height: 8px; border-radius: 50%; background: var(--sage); }
.lab-note { margin: 28px 0 0; font-size: 13px; line-height: 1.5; color: rgba(232, 238, 233, 0.75); text-align: center; }
`;

// Example illustrative monthly prices (USD) for showcase UI only
const tiers = [
  { name: "Starter", price: 9, feats: ["Up to 3 projects", "Community support", "1 GB storage"] },
  { name: "Pro", price: 19, best: true, feats: ["Unlimited projects", "Priority email support", "50 GB storage"] },
  { name: "Team", price: 49, feats: ["Shared workspaces", "Admin controls", "250 GB storage"] },
];

export default function PricingTable() {
  const [headerErr, setHeaderErr] = useState(false);
  const titleId = "lab-pricing-title";

  return (
    <section data-lab="pricing-table" aria-labelledby={titleId} className="lab-wrap">
      <style>{css}</style>
      {headerErr ? (
        <span data-art="fallback" className="lab-header-fb" aria-hidden="true" />
      ) : (
        <img
          data-art="image"
          className="lab-header"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          onError={() => setHeaderErr(true)}
        />
      )}
      <h2 id={titleId} className="lab-title">Choose your plan</h2>
      <ul className="lab-tiers">
        {tiers.map((t) => (
          <li key={t.name} className="lab-card" {...(t.best ? { "data-best": "true" } : {})}>
            {t.best ? <span className="lab-badge">Popular</span> : null}
            <h3 className="lab-name">{t.name}</h3>
            <p className="lab-price">
              <strong>${t.price}</strong> per month
            </p>
            <ul className="lab-feats">
              {t.feats.map((f) => (
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
