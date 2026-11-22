"use client";

import { useEffect, useRef, useState } from "react";

/* Example prices — illustrative only; see lab-note on the page. */
const tiers = [
  {
    name: "Starter",
    price: "$19",
  bullets: ["1 project", "Email support", "5 GB storage"],
  },
  {
    name: "Professional",
    price: "$49",
    bullets: ["5 projects", "Priority support", "50 GB storage"],
    best: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    bullets: ["Unlimited projects", "Dedicated support", "500 GB storage"],
  },
];

const css = `
.lab-pt { width: min(960px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
.lab-pt-art { display: block; width: 100%; max-width: 720px; aspect-ratio: 9/2; border-radius: 12px; margin: 0 auto 20px; object-fit: cover; }
.lab-pt-art-fb { display: block; width: 100%; max-width: 720px; aspect-ratio: 9/2; border-radius: 12px; margin: 0 auto 20px; background: rgba(176,203,188,0.12); border: 1px solid rgba(176,203,188,0.28); }
.lab-pt h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.25; color: var(--mist, #f2efe6); text-align: center; margin: 0 0 28px; }
.lab-pt-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 760px) { .lab-pt-grid { grid-template-columns: 1fr; } }
.lab-pt-card { position: relative; border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.55); }
.lab-pt-card[data-best="true"] { border-color: var(--sage, #b0cbbc); background: rgba(176,203,188,0.14); box-shadow: 0 0 0 1px rgba(176,203,188,0.35); }
.lab-pt-badge { position: absolute; top: 12px; right: 12px; font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; padding: 6px 10px; border-radius: 999px; background: var(--sage, #b0cbbc); color: #121a16; }
.lab-pt-name { font-family: var(--serif); font-size: 22px; font-weight: 400; color: var(--mist, #f2efe6); margin: 0 0 8px; }
.lab-pt-price { font-family: var(--sans); font-size: 28px; font-weight: 500; color: #e8eee9; margin: 0 0 4px; }
.lab-pt-per { font-family: var(--sans); font-size: 14px; color: rgba(242,239,230,0.75); margin: 0 0 16px; }
.lab-pt-feats { margin: 0; padding: 0 0 0 18px; color: rgba(232,238,233,0.9); font-family: var(--sans); font-size: 15px; line-height: 1.55; }
.lab-pt-feats li { margin-bottom: 6px; }
.lab-pt-note { margin: 24px 0 0; text-align: center; font-family: var(--sans); font-size: 14px; color: rgba(242,239,230,0.7); }
@media (prefers-reduced-motion: reduce) { .lab-pt * { transition: none !important; } }
`;

export default function PricingTable() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [artOk, setArtOk] = useState(true);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setArtOk(false);
  }, []);

  return (
    <section data-lab="pricing-table" aria-labelledby="lab-pricing-title" className="lab-pt">
      <style>{css}</style>
      {artOk ? (
        <img
          ref={imgRef}
          data-art="image"
          className="lab-pt-art"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          onError={() => setArtOk(false)}
        />
      ) : (
        <span data-art="fallback" className="lab-pt-art-fb" aria-hidden="true" />
      )}
      <h2 id="lab-pricing-title">Choose your plan</h2>
      <ul className="lab-pt-grid">
        {tiers.map((t) => (
          <li key={t.name} className="lab-pt-card" {...(t.best ? { "data-best": "true" } : {})}>
            {t.best ? <span className="lab-pt-badge">Popular</span> : null}
            <h3 className="lab-pt-name">{t.name}</h3>
            <p className="lab-pt-price">{t.price}</p>
            <p className="lab-pt-per">per month</p>
            <ul className="lab-pt-feats">
              {t.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="lab-pt-note">
        Example data: these plans are illustrative; the showcase sells nothing.
      </p>
    </section>
  );
}