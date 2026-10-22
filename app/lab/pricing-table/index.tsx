"use client";
import { useState } from "react";

const plans = [
  { name: "Starter", price: "$9", items: ["1 workspace", "Email support", "Core reports"] },
  { name: "Growth", price: "$29", items: ["5 workspaces", "Priority support", "Shared dashboards"], best: true },
  { name: "Scale", price: "$79", items: ["Unlimited workspaces", "Dedicated support", "Custom reports"] },
];

const css = `
.lab-wrap{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-art{display:block;width:100%;height:auto;aspect-ratio:9/2;border-radius:16px;margin:0 0 16px;object-fit:cover}
.lab-fb{display:block;width:100%;aspect-ratio:9/2;border-radius:16px;margin:0 0 16px;background:#1A2620}
.lab-title{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px}
.lab-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
@media (max-width:760px){.lab-grid{grid-template-columns:1fr}}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;color:var(--mist,#F2EFE6);background:#14201A}
.lab-card[data-best="true"]{border:2px solid var(--sage);background:#1A2620}
.lab-badge{display:inline-block;margin:0 0 10px;padding:4px 8px;border-radius:999px;background:var(--sage);color:#121A16;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px}
.lab-name{margin:0 0 8px;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;color:var(--mist,#F2EFE6)}
.lab-price{margin:0;font-family:var(--serif);font-size:28px;color:var(--mist,#F2EFE6)}
.lab-per{display:block;margin:4px 0 12px;font-size:13px;color:#E8EEE9}
.lab-items{margin:0;padding-left:18px;color:var(--mist,#F2EFE6)}
.lab-items li{margin:6px 0}
.lab-note{margin:20px 0 0;font-size:14px;color:#E8EEE9}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

function ArtSlot() {
  const [ok, setOk] = useState(true);
  if (!ok) return <span data-art="fallback" className="lab-fb" aria-hidden="true" />;
  return (
    <img data-art="image" className="lab-art" src="/lab/pricing-table/header.svg" width={720} height={160} alt="" onError={() => setOk(false)} />
  );
}

export default function PricingTable() {
  return (
    <section className="lab-wrap" data-lab="pricing-table" aria-labelledby="lab-pricing-title">
      <style>{css}</style>
      <ArtSlot />
      <h2 id="lab-pricing-title" className="lab-title">Choose a plan</h2>
      <ul className="lab-grid">
        {plans.map((p) => (
          <li key={p.name} className="lab-card" {...(p.best ? { "data-best": "true" } : {})}>
            {p.best ? <span className="lab-badge">Popular</span> : null}
            <p className="lab-name">{p.name}</p>
            <p className="lab-price">{p.price}</p>
            <span className="lab-per">per month</span>
            <ul className="lab-items">
              {p.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </li>
        ))}
      </ul>
      <p className="lab-note">Example data: these plans are illustrative; the showcase sells nothing.</p>
    </section>
  );
}
