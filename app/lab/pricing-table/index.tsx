"use client";
import { useEffect, useRef, useState } from "react";

const plans = [
  { name: "Starter", price: "$9", items: ["1 workspace", "Email support", "Core reports"] },
  { name: "Growth", price: "$29", items: ["10 workspaces", "Priority support", "Team reports"], best: true },
  { name: "Scale", price: "$79", items: ["Unlimited workspaces", "Dedicated support", "Custom reports"] },
];

const css = `
.lab-pt{width:min(960px,100%);margin:8px auto 56px;color:#F2EFE6}
.lab-pt h2{font-family:var(--serif,Georgia);font-weight:400;font-size:30px;margin:16px 0 20px;color:#F2EFE6}
.lab-art{display:block;width:100%;height:auto;aspect-ratio:9/2;object-fit:cover;border-radius:16px}
.lab-fb{display:block;width:100%;aspect-ratio:9/2;border-radius:16px;background:#1A2620}
.lab-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:#1A2620;color:#F2EFE6}
.lab-card[data-best="true"]{border-color:var(--sage,#B0CBBC);background:#26382F;color:#F2EFE6}
.lab-badge{display:inline-block;font-family:var(--sans,system-ui);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;background:var(--sage,#B0CBBC);color:#121A16;border-radius:999px;padding:4px 10px;margin-bottom:8px}
.lab-name{font-family:var(--serif,Georgia);font-size:22px;font-weight:400;margin:0 0 8px;color:#F2EFE6}
.lab-price{margin:0 0 16px;font-size:20px;color:#F2EFE6}
.lab-price span{font-size:14px;color:#E8EEE9}
.lab-items{margin:0;padding-left:18px;color:#E8EEE9}
.lab-items li{margin:6px 0}
.lab-note{margin:20px 0 0;font-size:14px;color:#E8EEE9}
@media (max-width:760px){.lab-list{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.lab-pt *{transition:none;animation:none}}
`;

function HeaderArt() {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok) return <span data-art="fallback" aria-hidden="true" className="lab-fb" />;
  return (
    <img ref={ref} data-art="image" className="lab-art" src="/lab/pricing-table/header.svg" width={720} height={160} alt="" onError={() => setOk(false)} />
  );
}

export default function PricingTable() {
  return (
    <section data-lab="pricing-table" aria-labelledby="lab-pt-title" className="lab-pt">
      <style>{css}</style>
      <HeaderArt />
      <h2 id="lab-pt-title">Pricing table</h2>
      <ul className="lab-list">
        {plans.map((p) => (
          <li key={p.name} className="lab-card" {...(p.best ? { "data-best": "true" } : {})}>
            {p.best ? <span className="lab-badge">Popular</span> : null}
            <h3 className="lab-name">{p.name}</h3>
            <p className="lab-price">{p.price} <span>per month</span></p>
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
