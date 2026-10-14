"use client";

import { useEffect, useRef, useState } from "react";

type Tier = {
  name: string;
  price: string;
  best?: boolean;
  items: string[];
};

const TIERS: Tier[] = [
  { name: "Starter", price: "$12", items: ["Up to 3 projects", "Community support", "Basic analytics"] },
  { name: "Growth", price: "$36", best: true, items: ["Unlimited projects", "Priority support", "Advanced analytics"] },
  { name: "Scale", price: "$72", items: ["Custom workflows", "Dedicated support", "Audit logs"] },
];

const css = `
.lab-pt{width:min(960px,100%);margin:8px auto 56px;color:#F2EFE6}
.lab-pt h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:16px 0 24px;color:#F2EFE6}
.lab-art{display:block;width:100%;height:auto;aspect-ratio:9/2;border-radius:16px;object-fit:cover}
.lab-fb{display:block;width:100%;aspect-ratio:9/2;border-radius:16px;background:#1A2820}
.lab-tiers{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:0;margin:0}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:#14201A;color:#F2EFE6}
.lab-card[data-best]{border-color:var(--sage,#9BB8A8);background:#1C2C24}
.lab-name{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;margin:0 0 8px;color:#E8EEE9}
.lab-price{font-family:var(--serif);font-size:28px;margin:0;color:#F2EFE6}
.lab-price span{font-family:var(--sans);font-size:13px;font-weight:400;margin-left:6px;color:#E8EEE9}
.lab-items{margin:16px 0 0}
.lab-items p{margin:6px 0 0;padding-left:14px;position:relative;color:#E8EEE9}
.lab-items p:before{content:"•";position:absolute;left:0;color:#E8EEE9}
.lab-badge{display:inline-block;background:var(--sage,#9BB8A8);color:#121A16;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;border-radius:999px;padding:4px 10px;margin:0 0 10px}
.lab-note{margin:24px 0 0;font-size:14px;color:#E8EEE9}
@media (max-width:760px){.lab-tiers{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.lab-pt,.lab-pt *{animation:none;transition:none}}
`;

function Art() {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok) return <span data-art="fallback" className="lab-fb" aria-hidden="true" />;
  return (
    <img
      ref={ref}
      data-art="image"
      className="lab-art"
      src="/lab/pricing-table/header.svg"
      width={720}
      height={160}
      alt=""
      onError={() => setOk(false)}
    />
  );
}

export default function PricingTable() {
  return (
    <section className="lab-pt" data-lab="pricing-table" aria-labelledby="lab-pt-title">
      <style>{css}</style>
      <Art />
      <h2 id="lab-pt-title">Plans</h2>
      <ul className="lab-tiers">
        {TIERS.map((t) => (
          <li key={t.name} className="lab-card" {...(t.best ? { "data-best": "true" } : {})}>
            {t.best ? <span className="lab-badge">Popular</span> : null}
            <p className="lab-name">{t.name}</p>
            <p className="lab-price">
              {t.price}
              <span>per month</span>
            </p>
            <div className="lab-items">
              {t.items.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <p className="lab-note">Example data: these plans are illustrative; the showcase sells nothing.</p>
    </section>
  );
}
