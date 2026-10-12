"use client";

import { useEffect, useRef, useState } from "react";

// Prices are example data.
const TIERS = [
  { name: "Starter", price: 0, best: false, features: ["1 demo run a day", "Public preview", "Email support"] },
  { name: "Team", price: 49, best: true, features: ["20 demo runs a day", "Review and QA agents", "Priority support"] },
  { name: "Studio", price: 199, best: false, features: ["Unlimited runs", "Custom agent roles", "Dedicated channel"] },
];

export default function PricingTable() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setBroken(true);
  }, []);

  return (
    <section className="pt-wrap" aria-labelledby="pt-heading">
      <style>{`
        .pt-wrap { max-width: 960px; margin: 0 auto; color: #121A16; font-family: var(--sans); }
        .pt-art { aspect-ratio: 9 / 2; border-radius: 16px; overflow: hidden; background: linear-gradient(135deg, #B0CBBC, #F2EFE6 55%, #D9B45A); margin-bottom: 20px; }
        .pt-art img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pt-art.is-fallback img { display: none; }
        .pt-wrap .label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--sage, #B0CBBC); margin: 0 0 8px; }
        .pt-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 28px; color: #121A16; }
        .pt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 760px) { .pt-grid { grid-template-columns: 1fr; } }
        .pt-card { background: #F2EFE6; border: 1px solid #B0CBBC; border-radius: 16px; padding: 22px 20px; position: relative; }
        .pt-card.best { border-color: #B0CBBC; background: #E4EDE6; }
        .pt-card h3 { margin: 0 0 8px; font-family: var(--sans); font-size: 16px; font-weight: 600; }
        .pt-price { font-family: var(--serif); font-size: 44px; line-height: 1; margin: 0; color: #121A16; }
        .pt-period { font-family: var(--sans); font-size: 13px; color: #121A16; opacity: 0.7; margin: 6px 0 16px; }
        .pt-card ul { margin: 0; padding: 0; list-style: none; }
        .pt-card li { font-size: 14px; padding: 6px 0; border-top: 1px solid #B0CBBC44; }
        .pt-pill { position: absolute; top: 14px; right: 14px; background: #D9B45A; color: #121A16; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; padding: 3px 9px; border-radius: 999px; }
      `}</style>
      <div className={broken ? "pt-art is-fallback" : "pt-art"}>
        <img
          ref={imgRef}
          src="/lab/pricing-table/header.svg"
          alt=""
          onError={() => setBroken(true)}
        />
      </div>
      <p className="label">Pricing · Example data</p>
      <h2 id="pt-heading">Pick a plan</h2>
      <div className="pt-grid">
        {TIERS.map((t) => (
          <article key={t.name} className={t.best ? "pt-card best" : "pt-card"}>
            {t.best ? <span className="pt-pill">Popular</span> : null}
            <h3>{t.name}</h3>
            <p className="pt-price">${t.price}</p>
            <p className="pt-period">per month</p>
            <ul>
              {t.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
