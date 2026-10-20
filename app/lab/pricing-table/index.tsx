"use client";
import { useState } from "react";

// Example plan prices for showcase layout only (not live product data).
const TIERS = [
  { name: "Starter", price: 12, bullets: ["Up to 3 projects", "5 GB storage", "Email support"] },
  { name: "Growth", price: 29, bullets: ["Unlimited projects", "50 GB storage", "Priority support"], best: true },
  { name: "Scale", price: 79, bullets: ["Dedicated workspace", "500 GB storage", "24/7 phone support"] },
];

export default function PricingTable() {
  const [headerErr, setHeaderErr] = useState(false);
  return (
    <section data-lab="pricing-table" aria-labelledby="lab-pricing-title" className="lab-pricing">
      <h2 id="lab-pricing-title">Plans that grow with you</h2>
      {headerErr ? (
        <span data-art="fallback" aria-hidden="true" className="lab-header-fb" />
      ) : (
        <img
          data-art="image"
          className="lab-header-art"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          onError={() => setHeaderErr(true)}
        />
      )}
      <ul className="lab-tier-list">
        {TIERS.map((t) => (
          <li key={t.name} className={t.best ? "lab-tier lab-tier-best" : "lab-tier"} {...(t.best ? { "data-best": "true" } : {})}>
            {t.best && <span className="lab-badge">Popular</span>}
            <h3 className="lab-tier-name">{t.name}</h3>
            <p className="lab-tier-price">
              <span className="lab-amount">${t.price}</span>
              <span className="lab-period">per month</span>
            </p>
            <ul className="lab-features">
              {t.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="lab-note">Example data: these plans are illustrative; the showcase sells nothing.</p>
      <style>{css}</style>
    </section>
  );
}

const css = `
.lab-pricing{display:grid;max-width:min(960px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box}
.lab-pricing>h2{grid-row:2;font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.15;color:var(--mist);margin:0 0 20px}
.lab-header-art,.lab-header-fb{grid-row:1;width:100%;max-width:720px;margin:0 auto 20px;aspect-ratio:9/2;border-radius:16px;object-fit:cover;display:block}
.lab-header-fb{background:rgba(176,203,188,0.12);min-height:80px}
.lab-tier-list{grid-row:3;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.lab-tier{position:relative;border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
.lab-tier-best{border-color:var(--sage);background:rgba(176,203,188,0.55);box-shadow:0 0 0 1px rgba(176,203,188,0.35)}
.lab-tier-best .lab-tier-name,.lab-tier-best .lab-tier-price,.lab-tier-best .lab-amount,.lab-tier-best .lab-period,.lab-tier-best .lab-features{color:#14201A}
.lab-tier-best .lab-features li::before{background:#121A16}
.lab-badge{display:inline-block;font-family:var(--sans);font-weight:500;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#14201A;background:var(--sage);padding:4px 10px;border-radius:999px;margin-bottom:12px}
.lab-tier-name{font-family:var(--serif);font-weight:400;font-size:22px;margin:0 0 8px;color:var(--mist)}
.lab-tier-price{margin:0 0 16px;color:var(--mist)}
.lab-amount{font-family:var(--serif);font-size:36px;font-weight:400;color:var(--sage)}
.lab-period{display:block;font-family:var(--sans);font-size:13px;color:#E8EEE9;opacity:0.85;margin-top:4px}
.lab-features{list-style:none;margin:0;padding:0;font-family:var(--sans);font-size:14px;line-height:1.5;color:#F2EFE6}
.lab-features li{padding:6px 0 6px 18px;position:relative}
.lab-features li::before{content:"";position:absolute;left:0;top:12px;width:6px;height:6px;border-radius:50%;background:var(--sage)}
.lab-note{grid-row:4;margin:24px 0 0;font-family:var(--sans);font-size:13px;line-height:1.5;color:#E8EEE9;opacity:0.8}
@media(max-width:760px){.lab-tier-list{grid-template-columns:1fr;max-width:min(720px,100%)}}
@media(prefers-reduced-motion:reduce){.lab-tier,.lab-badge{transition:none}}
`;
