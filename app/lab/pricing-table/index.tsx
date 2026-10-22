"use client";
import { useState } from "react";

type Tier = { name: string; price: string; items: string[]; best?: boolean };

// Example data — illustrative plans, not a live offer
const tiers: Tier[] = [
  { name: "Starter", price: "$12", items: ["One project workspace", "Email support in two days", "Shared template library"] },
  { name: "Growth", price: "$36", items: ["Five project workspaces", "Chat support same day", "Custom brand kit"], best: true },
  { name: "Studio", price: "$72", items: ["Unlimited workspaces", "Priority support", "Role-based access"] },
];

const css = `
.lab-pt{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-art,.lab-fb{display:block;width:100%;aspect-ratio:9/2;border-radius:16px}
.lab-art{height:auto;object-fit:cover}
.lab-fb{background:rgba(176,203,188,0.16)}
.lab-pt h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:16px 0 20px}
.lab-tiers{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.lab-tiers>li{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:#14201A;color:#F2EFE6}
.lab-tiers>li[data-best]{border:2px solid var(--sage,#9BB8A8);background:#1C2A22}
.lab-badge{display:inline-block;font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;background:var(--sage,#9BB8A8);color:#121A16;border-radius:999px;padding:4px 10px;margin-bottom:8px}
.lab-tiers h3{font-family:var(--serif);font-weight:400;font-size:22px;margin:0 0 8px;color:#F2EFE6}
.lab-price{margin:0 0 12px;font-size:28px;color:#F2EFE6}
.lab-price span{display:block;font-size:13px;color:#E8EEE9}
.lab-items{margin:0;padding-left:18px;color:#E8EEE9}
.lab-items li{margin:6px 0}
.lab-note{margin:20px 0 0;font-size:14px;color:#E8EEE9}
@media (max-width:760px){.lab-tiers{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.lab-pt *{transition:none}}
`;

export default function Lab() {
  const [showArt, setShowArt] = useState(true);
  return (
    <section className="lab-pt" data-lab="pricing-table" aria-labelledby="lab-pt-title">
      <style>{css}</style>
      {showArt ? (
        <img data-art="image" className="lab-art" src="/lab/pricing-table/header.svg" width={720} height={160} alt="" onError={() => setShowArt(false)} />
      ) : (
        <span data-art="fallback" className="lab-fb" aria-hidden="true" />
      )}
      <h2 id="lab-pt-title">Pricing</h2>
      <ul className="lab-tiers">
        {tiers.map((t) => (
          <li key={t.name} {...(t.best ? { "data-best": "true" } : {})}>
            {t.best ? <span className="lab-badge">Popular</span> : null}
            <h3>{t.name}</h3>
            <p className="lab-price">{t.price}<span>per month</span></p>
            <ul className="lab-items">{t.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </li>
        ))}
      </ul>
      <p className="lab-note">Example data: these plans are illustrative; the showcase sells nothing.</p>
    </section>
  );
}

