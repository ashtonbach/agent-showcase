"use client";
import { useState } from "react";

const tiers = [
  { name: "Seedling", price: "12", feats: ["1 site", "Community help", "Monthly tips"] },
  {
    name: "Canopy",
    price: "36",
    feats: ["5 sites", "Priority help", "Workshop access"],
    best: true,
  },
  { name: "Old Growth", price: "72", feats: ["Unlimited sites", "Office hours", "Early previews"] },
];

export default function PricingTable() {
  const [artOk, setArtOk] = useState(true);
  return (
    <section
      data-lab="pricing-table"
      aria-labelledby="pricing-table-heading"
      className="lab-pricing"
    >
      <style>{`
.lab-pricing{width:min(960px,100%);margin:8px auto 56px;padding:0 16px;color:var(--mist,#F2EFE6)}
.lab-pricing img[data-art="image"]{display:block;width:100%;aspect-ratio:9/2;height:auto;border-radius:12px;margin:0 0 20px}
.lab-pricing img[data-art="fallback"]{display:none}
.lab-pricing span[data-art="fallback"]{display:block;width:100%;aspect-ratio:9/2;border-radius:12px;background:rgba(176,203,188,.12);margin:0 0 20px}
.lab-pricing h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 24px;text-align:center}
.lab-pricing>ul{list-style:none;margin:0;padding:0;display:grid;gap:16px;grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:760px){.lab-pricing>ul{grid-template-columns:1fr}}
.lab-pricing>ul>li{position:relative;border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
.lab-pricing>ul>li[data-best="true"]{border-color:var(--sage,#B0CBBC);background:rgba(176,203,188,.12);box-shadow:0 0 0 1px rgba(176,203,188,.35)}
.lab-pricing .lab-badge{position:absolute;top:16px;right:16px;font-family:var(--sans);font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;padding:6px 10px;border-radius:999px;background:var(--sage,#B0CBBC);color:#121A16}
.lab-pricing .lab-name{margin:0 0 8px;font-family:var(--serif);font-size:22px;font-weight:400}
.lab-pricing .lab-price{margin:0 0 16px;font-family:var(--sans);font-size:28px;font-weight:500}
.lab-pricing .lab-price span{font-size:14px;font-weight:400;opacity:.85;margin-left:6px}
.lab-pricing .lab-feats{margin:0;padding:0 0 0 18px;color:#E8EEE9}
.lab-pricing .lab-feats li{border:none;border-radius:0;padding:0;margin:0 0 8px;background:none;list-style:disc;font-size:15px;line-height:1.45}
.lab-pricing .lab-note{margin:24px 0 0;font-size:14px;line-height:1.5;color:#E8EEE9;text-align:center}
@media(prefers-reduced-motion:reduce){.lab-pricing *{transition:none!important}}
`}</style>
      {artOk ? (
        <img
          data-art="image"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          onError={() => setArtOk(false)}
        />
      ) : (
        <span data-art="fallback" aria-hidden="true" />
      )}
      <h2 id="pricing-table-heading">Choose a plan</h2>
      <ul>
        {tiers.map((t) => (
          <li key={t.name} {...(t.best ? { "data-best": "true" } : {})}>
            {t.best ? <span className="lab-badge">Popular</span> : null}
            <p className="lab-name">{t.name}</p>
            <p className="lab-price">
              ${t.price}
              <span>per month</span>
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
