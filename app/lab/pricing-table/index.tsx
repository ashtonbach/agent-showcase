"use client";

import { useEffect, useRef, useState } from "react";

const plans = [
  { name: "Starter", price: "$12", items: ["1 workspace", "Email support", "Community templates"] },
  { name: "Growth", price: "$29", best: true, items: ["5 workspaces", "Priority support", "Custom domains"] },
  { name: "Studio", price: "$59", items: ["Unlimited workspaces", "Dedicated support", "Team analytics"] },
];

const css = `
.lab-pt{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);box-sizing:border-box;padding:0 12px}
.lab-pt .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;margin:0 0 12px}
.lab-pt h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:12px 0 24px;color:var(--mist,#F2EFE6)}
.lab-art{width:100%;aspect-ratio:9/2;border-radius:16px;display:block;object-fit:cover;height:auto}
.lab-fb{display:block;width:100%;aspect-ratio:9/2;border-radius:16px;background:rgba(176,203,188,.14)}
.lab-tiers{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;list-style:none;margin:0;padding:0}
.lab-tier{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;position:relative}
.lab-best{background:rgba(176,203,188,.12);border-color:var(--sage,#B0CBBC)}
.lab-badge{display:inline-block;background:var(--sage,#B0CBBC);color:#121A16;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;border-radius:999px;padding:4px 10px;margin-bottom:10px}
.lab-tier h3{font-family:var(--serif);font-weight:400;font-size:22px;margin:0 0 8px}
.lab-price{margin:0 0 16px;font-size:28px;font-family:var(--serif)}
.lab-price span{font-family:var(--sans);font-size:13px;letter-spacing:.04em;opacity:.8}
.lab-items{margin:0;padding-left:18px;color:#E8EEE9}
.lab-items li{margin:8px 0}
@media (max-width:760px){.lab-tiers{grid-template-columns:1fr}}
`;

export default function PricingTable() {
  const [show, setShow] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setShow(false);
  }, []);
  return (
    <section data-lab="pricing-table" aria-labelledby="lab-pt-title" className="lab-pt">
      <p className="label">Plans · Example data</p>
      {show ? (
        <img ref={ref} data-art="image" src="/lab/pricing-table/header.svg" width={720} height={160} alt="Pricing header artwork" className="lab-art" onError={() => setShow(false)} />
      ) : (
        <span data-art="fallback" aria-hidden="true" className="lab-fb" />
      )}
      <h2 id="lab-pt-title">Simple pricing</h2>
      <ul className="lab-tiers">
        {plans.map((p) => (
          <li key={p.name} className={p.best ? "lab-tier lab-best" : "lab-tier"} data-best={p.best ? "true" : undefined}>
            {p.best ? <span className="lab-badge">Popular</span> : null}
            <h3>{p.name}</h3>
            <p className="lab-price">{p.price} <span>per month</span></p>
            <ul className="lab-items">
              {p.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </li>
        ))}
      </ul>
      <style>{css}</style>
    </section>
  );
}
