"use client";
import { useState, useEffect } from "react";

/* Example plan prices — illustrative showcase data, not live pricing */
const TIERS = [
  { name: "Starter", price: 12, bullets: ["Up to 3 sites", "5 GB storage", "Community support"] },
  {
    name: "Growth",
    price: 29,
    bullets: ["Up to 15 sites", "50 GB storage", "Priority email"],
    best: true,
  },
  { name: "Scale", price: 79, bullets: ["Unlimited sites", "250 GB storage", "Dedicated support"] },
];

const css = `
.lab-wrap { width: min(960px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
.lab-header-art { display: block; width: 100%; aspect-ratio: 9 / 2; border-radius: 16px; object-fit: cover; margin-bottom: 20px; }
.lab-header-fb { display: block; width: 100%; aspect-ratio: 9 / 2; border-radius: 16px; margin-bottom: 20px; background: rgba(176, 203, 188, 0.12); border: 1px solid rgba(176, 203, 188, 0.28); }
.lab-title { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; color: var(--mist); margin: 0 0 28px; text-align: center; }
.lab-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 760px) { .lab-grid { grid-template-columns: 1fr; max-width: min(720px, 100%); margin: 0 auto; } }
.lab-card { position: relative; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); color: #F2EFE6; }
.lab-card[data-best="true"] { border-color: var(--sage); background: rgba(176, 203, 188, 0.22); box-shadow: 0 0 0 1px rgba(176, 203, 188, 0.35); color: #121A16; }
.lab-card[data-best="true"] .lab-plan { color: #14201A; }
.lab-card[data-best="true"] .lab-price { color: #121A16; }
.lab-card[data-best="true"] .lab-price span { color: #14201A; opacity: 0.9; }
.lab-card[data-best="true"] .lab-feats li { color: #14201A; }
.lab-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); font-family: var(--sans); font-weight: 500; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; background: var(--sage); color: #121A16; padding: 4px 12px; border-radius: 999px; }
.lab-plan { font-family: var(--serif); font-size: 22px; margin: 0 0 8px; color: var(--mist); }
.lab-price { font-size: 28px; margin: 0 0 16px; color: #F2EFE6; }
.lab-price span { font-size: 14px; font-weight: 400; color: #E8EEE9; opacity: 0.85; }
.lab-feats { margin: 0; padding: 0; list-style: none; }
.lab-feats li { padding: 6px 0 6px 18px; position: relative; font-size: 15px; color: #E8EEE9; }
.lab-feats li::before { content: ""; position: absolute; left: 0; top: 13px; width: 6px; height: 6px; border-radius: 50%; background: var(--sage); }
.lab-note { margin: 28px 0 0; text-align: center; font-size: 14px; color: #E8EEE9; opacity: 0.8; }
@media (prefers-reduced-motion: reduce) { .lab-card { transition: none; } }
`;

function HeaderArt() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => {
      if (probe.naturalWidth > 0) setSrc("/lab/pricing-table/header.svg");
    };
    probe.src = "/lab/pricing-table/header.svg";
  }, []);

  if (!src) return <span className="lab-header-fb" data-art="fallback" aria-hidden="true" />;
  return (
    <img
      className="lab-header-art"
      data-art="image"
      src={src}
      width={720}
      height={160}
      alt=""
      onError={() => setSrc(null)}
    />
  );
}

export default function Lab() {
  const titleId = "lab-pricing-title";
  return (
    <section className="lab-wrap" data-lab="pricing-table" aria-labelledby={titleId}>
      <style>{css}</style>
      <HeaderArt />
      <h2 id={titleId} className="lab-title">Choose your plan</h2>
      <ul className="lab-grid">
        {TIERS.map((t) => (
          <li
            key={t.name}
            className="lab-card"
            {...(t.best ? { "data-best": "true" } : {})}
          >
            {t.best ? <span className="lab-badge">Popular</span> : null}
            <h3 className="lab-plan">{t.name}</h3>
            <p className="lab-price">${t.price} <span>per month</span></p>
            <ul className="lab-feats">
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
