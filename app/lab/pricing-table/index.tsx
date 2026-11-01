"use client";
import { useState } from "react";

const TIERS = [
  { name: "Starter", price: "$12", items: ["One workspace", "Community support", "5 GB storage"] },
  { name: "Studio", price: "$29", items: ["Five workspaces", "Priority support", "50 GB storage"], best: true },
  { name: "Scale", price: "$79", items: ["Unlimited workspaces", "Dedicated support", "500 GB storage"] },
];

export default function PricingTable() {
  const [artErr, setArtErr] = useState(false);
  const tid = "lab-pricing-title";
  return (
    <section data-lab="pricing-table" aria-labelledby={tid}>
      {artErr ? (
        <span data-art="fallback" aria-hidden="true" className="lab-art-fb" />
      ) : (
        <img
          data-art="image"
          className="lab-art"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          onError={() => setArtErr(true)}
        />
      )}
      <h2 id={tid}>Plans and pricing</h2>
      <ul className="lab-grid">
        {TIERS.map((t) => (
          <li key={t.name} className={"lab-card" + (t.best ? " lab-card-best" : "")} {...(t.best ? { "data-best": "true" } : {})}>
            {t.best ? <span className="lab-pop">Popular</span> : null}
            <h3 className="lab-tier-name">{t.name}</h3>
            <p className="lab-tier-price">
              {t.price} <span className="lab-per">per month</span>
            </p>
            <ul className="lab-list">
              {t.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="lab-note">Example data: these plans are illustrative; the showcase sells nothing.</p>
      <style>{`
        [data-lab="pricing-table"]{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}
        [data-lab="pricing-table"]>h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.15;margin:16px 0 24px;color:var(--mist,#F2EFE6)}
        [data-lab="pricing-table"] .lab-art{display:block;width:100%;height:auto;aspect-ratio:9/2;border-radius:12px;margin:0 0 8px}
        [data-lab="pricing-table"] .lab-art-fb{display:block;width:100%;aspect-ratio:9/2;border-radius:12px;background:linear-gradient(135deg,rgba(176,203,188,.22),rgba(18,26,22,.5));margin:0 0 8px}
        [data-lab="pricing-table"] .lab-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
        [data-lab="pricing-table"] .lab-card{position:relative;margin:0;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px;background:rgba(18,26,22,.35)}
        [data-lab="pricing-table"] .lab-card-best{border-color:var(--sage,#B0CBBC);background:rgba(176,203,188,.12);box-shadow:0 0 0 1px rgba(176,203,188,.35)}
        [data-lab="pricing-table"] .lab-pop{position:absolute;top:16px;right:16px;font:500 .65rem/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:#121A16;background:var(--sage,#B0CBBC);padding:6px 10px;border-radius:999px}
        [data-lab="pricing-table"] .lab-tier-name{margin:0 0 8px;font-family:var(--serif);font-weight:400;font-size:1.35rem}
        [data-lab="pricing-table"] .lab-tier-price{margin:0 0 16px;font-size:1.75rem;color:var(--mist,#F2EFE6)}
        [data-lab="pricing-table"] .lab-per{font-size:.95rem;color:var(--mist,#E8EEE9);opacity:.85}
        [data-lab="pricing-table"] .lab-list{margin:0;padding:0 0 0 1.1em;display:grid;gap:8px;font-size:.95rem;line-height:1.45}
        [data-lab="pricing-table"] .lab-note{margin:24px 0 0;font-size:.9rem;line-height:1.5;color:var(--mist,#E8EEE9);opacity:.9}
        @media (max-width:760px){[data-lab="pricing-table"] .lab-grid{grid-template-columns:1fr}}
        @media (prefers-reduced-motion:reduce){[data-lab="pricing-table"] *{transition:none!important}}
      `}</style>
    </section>
  );
}
