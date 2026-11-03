"use client";
import { useEffect, useRef, useState } from "react";

const tiers = [
  { name: "Starter", price: "$12", bullets: ["1 project", "Email support", "5 GB storage"] },
  {
    name: "Growth",
    price: "$29",
    bullets: ["5 projects", "Priority support", "50 GB storage"],
    best: true,
  },
  { name: "Scale", price: "$79", bullets: ["Unlimited projects", "Dedicated support", "500 GB storage"] },
];

export default function Lab() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [artOk, setArtOk] = useState(true);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setArtOk(false);
  }, []);

  return (
    <section data-lab="pricing-table" aria-labelledby="pricing-table-title">
      <style>{`
        [data-lab="pricing-table"] { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        [data-lab="pricing-table"] .lab-header-art { display: block; width: 100%; aspect-ratio: 9 / 2; border-radius: 12px; object-fit: cover; margin-bottom: 24px; }
        [data-lab="pricing-table"] .lab-header-fallback { display: block; width: 100%; aspect-ratio: 9 / 2; border-radius: 12px; margin-bottom: 24px; background: rgba(176, 203, 188, 0.12); }
        [data-lab="pricing-table"] h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 28px; text-align: center; }
        [data-lab="pricing-table"] ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        [data-lab="pricing-table"] li { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); position: relative; }
        [data-lab="pricing-table"] li[data-best="true"] { border-color: var(--sage, #b0cbbc); background: rgba(176, 203, 188, 0.12); box-shadow: 0 0 0 1px rgba(176, 203, 188, 0.35); }
        [data-lab="pricing-table"] .lab-badge { position: absolute; top: 12px; right: 12px; font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; background: var(--sage, #b0cbbc); color: #121a16; }
        [data-lab="pricing-table"] .lab-tier-name { font-family: var(--serif); font-size: 22px; margin: 0 0 8px; }
        [data-lab="pricing-table"] .lab-price { font-size: 28px; margin: 0 0 16px; }
        [data-lab="pricing-table"] .lab-price span { font-size: 14px; opacity: 0.85; }
        [data-lab="pricing-table"] .lab-features { margin: 0; padding: 0; list-style: none; }
        [data-lab="pricing-table"] .lab-features li { border: none; border-radius: 0; padding: 6px 0 6px 18px; background: transparent; box-shadow: none; position: static; font-size: 15px; }
        [data-lab="pricing-table"] .lab-features li::before { content: "•"; position: absolute; left: 0; color: var(--sage, #b0cbbc); }
        [data-lab="pricing-table"] .lab-tier { position: relative; }
        [data-lab="pricing-table"] .lab-note { margin: 28px 0 0; font-size: 14px; text-align: center; opacity: 0.9; }
        @media (max-width: 760px) { [data-lab="pricing-table"] ul { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { [data-lab="pricing-table"] * { transition: none !important; } }
      `}</style>
      {artOk ? (
        <img
          ref={imgRef}
          data-art="image"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          onError={() => setArtOk(false)}
          className="lab-header-art"
        />
      ) : (
        <span data-art="fallback" aria-hidden="true" className="lab-header-fallback" />
      )}
      <h2 id="pricing-table-title">Plans that grow with you</h2>
      <ul>
        {tiers.map((t) => (
          <li key={t.name} className="lab-tier" {...(t.best ? { "data-best": "true" } : {})}>
            {t.best ? <span className="lab-badge">Popular</span> : null}
            <p className="lab-tier-name">{t.name}</p>
            <p className="lab-price">
              {t.price} <span>per month</span>
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
    </section>
  );
}
