"use client";

import { useEffect, useId, useRef, useState } from "react";

/* Example tier prices — illustrative only (showcase demo). */
const TIERS = [
  { name: "Starter", price: 19, features: ["One project", "Community support", "Basic analytics"] },
  { name: "Growth", price: 49, features: ["Five projects", "Priority support", "Advanced analytics"] },
  { name: "Scale", price: 99, features: ["Unlimited projects", "Dedicated support", "Custom reports"] },
] as const;

function HeaderArt() {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (!img || !ok) return;
    if (img.complete && img.naturalWidth === 0) setOk(false);
  }, [ok]);
  if (!ok) {
    return <span data-art="fallback" aria-hidden="true" className="lab-pt-art-fb" />;
  }
  return (
    <img
      ref={ref}
      data-art="image"
      className="lab-pt-art"
      src="/lab/pricing-table/header.svg"
      width={720}
      height={160}
      alt=""
      onError={() => setOk(false)}
    />
  );
}

export default function PricingTableLab() {
  const titleId = `${useId().replace(/:/g, "")}-title`;
  return (
    <section data-lab="pricing-table" aria-labelledby={titleId} className="lab-pt">
      <HeaderArt />
      <h2 id={titleId}>Simple monthly plans</h2>
      <ul className="lab-pt-tiers">
        {TIERS.map((tier, i) => (
          <li key={tier.name} className={i === 1 ? "lab-pt-tier lab-pt-tier--best" : "lab-pt-tier"} {...(i === 1 ? { "data-best": "true" } : {})}>
            {i === 1 ? <span className="lab-pt-badge">Popular</span> : null}
            <span className="lab-pt-name">{tier.name}</span>
            <p className="lab-pt-price">
              <span className="lab-pt-amount">${tier.price}</span> per month
            </p>
            <ul className="lab-pt-features">
              {tier.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="lab-note">Example data: these plans are illustrative; the showcase sells nothing.</p>
      <style>{`
        .lab-pt { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        .lab-pt-art, .lab-pt-art-fb { display: block; width: 100%; aspect-ratio: 9 / 2; border-radius: 12px; margin: 0 0 20px; object-fit: cover; }
        .lab-pt-art-fb { background: rgba(176, 203, 188, 0.12); min-height: 80px; }
        .lab-pt h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 24px; color: var(--mist, #F2EFE6); }
        .lab-pt-tiers { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .lab-pt-tier { position: relative; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
        .lab-pt-tier--best { border-color: var(--sage, #B0CBBC); background: rgba(176, 203, 188, 0.1); box-shadow: 0 0 0 1px rgba(176, 203, 188, 0.35); }
        .lab-pt-badge { display: inline-block; font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; padding: 4px 10px; border-radius: 999px; background: var(--sage, #B0CBBC); color: #121A16; margin-bottom: 12px; }
        .lab-pt-name { font-family: var(--serif); font-size: 22px; display: block; margin-bottom: 8px; }
        .lab-pt-price { margin: 0 0 16px; font-size: 15px; color: #E8EEE9; }
        .lab-pt-amount { font-size: 28px; font-weight: 500; margin-right: 4px; }
        .lab-pt-features { margin: 0; padding: 0 0 0 18px; font-size: 14px; line-height: 1.6; color: #E8EEE9; }
        .lab-note { margin: 24px 0 0; font-size: 14px; color: rgba(242, 239, 230, 0.75); }
        @media (max-width: 760px) { .lab-pt-tiers { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .lab-pt * { transition: none !important; } }
      `}</style>
    </section>
  );
}