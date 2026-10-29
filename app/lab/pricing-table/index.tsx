"use client";

import { useState } from "react";

type Tier = { name: string; price: string; items: string[]; best?: boolean };

const TIERS: Tier[] = [
  { name: "Starter", price: "$9", items: ["1 workspace", "Community support", "Core building blocks"] },
  { name: "Growth", price: "$29", items: ["5 workspaces", "Priority support", "Advanced components"], best: true },
  { name: "Scale", price: "$79", items: ["Unlimited workspaces", "Dedicated support", "Custom components"] },
];

export default function PricingTable() {
  const [artBroken, setArtBroken] = useState(false);

  return (
    <section data-lab="pricing-table" aria-labelledby="pricing-table-h2">
      {artBroken ? (
        <span data-art="fallback" aria-hidden="true" className="lab-pricing-art lab-pricing-art-fb" />
      ) : (
        <img
          data-art="image"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          className="lab-pricing-art"
          onError={() => setArtBroken(true)}
        />
      )}
      <h2 id="pricing-table-h2">Simple, transparent pricing</h2>
      <ul className="lab-pricing-grid">
        {TIERS.map((t) => (
          <li
            key={t.name}
            className={`lab-pricing-tier${t.best ? " lab-pricing-best" : ""}`}
            data-best={t.best ? "true" : undefined}
          >
            {t.best && <span className="lab-pricing-badge">Popular</span>}
            <h3 className="lab-pricing-name">{t.name}</h3>
            <p className="lab-pricing-price">
              {t.price}
              <span className="lab-pricing-per"> per month</span>
            </p>
            <ul className="lab-pricing-items">
              {t.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="lab-note">Example data: these plans are illustrative; the showcase sells nothing.</p>
      <style>{`
.lab-pricing-art{display:block;width:100%;max-width:960px;aspect-ratio:9/2;margin:0 auto 24px;border-radius:16px;object-fit:cover}
.lab-pricing-art-fb{background:linear-gradient(135deg,rgba(176,203,188,.35),rgba(20,32,26,.6))}
.lab-pricing-grid{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;width:min(960px,100%);margin:8px auto 24px;padding:0}
.lab-pricing-tier{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:12px;background:transparent;min-width:0}
.lab-pricing-best{border-color:var(--sage);background:#1a2b23}
.lab-pricing-badge{align-self:flex-start;background:var(--sage);color:#121A16;font-family:var(--sans);font-weight:500;font-size:11px;letter-spacing:.16em;text-transform:uppercase;padding:4px 10px;border-radius:999px}
.lab-pricing-name{font-family:var(--serif);font-weight:400;font-size:22px;color:var(--mist);margin:0}
.lab-pricing-price{font-family:var(--sans);font-size:28px;color:var(--mist);margin:0;display:flex;align-items:baseline;gap:4px}
.lab-pricing-per{font-size:14px;color:rgba(232,238,233,.72);font-weight:400}
.lab-pricing-items{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.lab-pricing-items li{font-family:var(--sans);font-size:15px;color:#e8eee9;padding-left:18px;position:relative}
.lab-pricing-items li::before{content:"✓";position:absolute;left:0;color:var(--sage)}
.lab-note{width:min(960px,100%);margin:0 auto 56px;font-family:var(--sans);font-size:14px;color:rgba(232,238,233,.72)}
@media (max-width:760px){.lab-pricing-grid{grid-template-columns:1fr}}
      `}</style>
    </section>
  );
}
