"use client";

import { useEffect, useRef, useState } from "react";

const PLANS = [
  {
    name: "Starter",
    price: "$19",
    bullets: ["One project workspace", "Email support on weekdays", "5 GB asset storage"],
  },
  {
    name: "Growth",
    price: "$49",
    popular: true,
    bullets: ["Unlimited workspaces", "Priority chat support", "50 GB asset storage"],
  },
  {
    name: "Enterprise",
    price: "$99",
    bullets: ["Dedicated success manager", "SSO and audit logs", "250 GB asset storage"],
  },
];

const css = `
.lab-pricing { width: min(960px, 100%); margin: 8px auto 56px; padding: 0 16px; color: var(--mist, #F2EFE6); }
.lab-pricing h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.25; margin: 0 0 28px; text-align: center; }
.lab-header { display: block; width: 100%; max-width: 720px; height: auto; aspect-ratio: 9 / 2; margin: 0 auto 24px; border-radius: 12px; object-fit: cover; }
.lab-header-fb { display: block; width: 100%; max-width: 720px; aspect-ratio: 9 / 2; margin: 0 auto 24px; border-radius: 12px; background: rgba(176, 203, 188, 0.12); border: 1px solid rgba(176, 203, 188, 0.2); }
.lab-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.lab-card { position: relative; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.55); }
.lab-card-best { border-color: var(--sage, #B0CBBC); background: rgba(20, 32, 26, 0.85); box-shadow: 0 0 0 1px rgba(176, 203, 188, 0.35); }
.lab-badge { position: absolute; top: 16px; right: 16px; font-family: var(--sans); font-weight: 500; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; padding: 6px 10px; border-radius: 999px; background: var(--sage, #B0CBBC); color: #121A16; }
.lab-tier { font-family: var(--serif); font-weight: 400; font-size: 22px; margin: 0 0 12px; }
.lab-price { margin: 0 0 20px; font-family: var(--sans); font-size: 28px; font-weight: 500; }
.lab-price span { font-size: 14px; font-weight: 400; opacity: 0.85; margin-left: 4px; }
.lab-feats { margin: 0; padding: 0 0 0 18px; font-family: var(--sans); font-size: 15px; line-height: 1.5; }
.lab-feats li { margin-bottom: 8px; }
.lab-note { margin: 28px 0 0; text-align: center; font-family: var(--sans); font-size: 14px; line-height: 1.5; color: #E8EEE9; opacity: 0.9; }
@media (max-width: 760px) { .lab-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .lab-card { transition: none; } }
`;

export default function Lab() {
  const titleId = "lab-pricing-title";
  const imgRef = useRef<HTMLImageElement>(null);
  const [headerOk, setHeaderOk] = useState(true);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setHeaderOk(false);
  }, []);

  return (
    <section className="lab-pricing" data-lab="pricing-table" aria-labelledby={titleId}>
      <style>{css}</style>
      {headerOk ? (
        <img
          ref={imgRef}
          className="lab-header"
          data-art="image"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          onError={() => setHeaderOk(false)}
        />
      ) : (
        <span className="lab-header-fb" data-art="fallback" aria-hidden="true" />
      )}
      <h2 id={titleId}>Choose a plan</h2>
      <ul className="lab-grid">
        {PLANS.map((plan) => (
          <li
            key={plan.name}
            className={`lab-card${plan.popular ? " lab-card-best" : ""}`}
            {...(plan.popular ? { "data-best": "true" as const } : {})}
          >
            {plan.popular ? <span className="lab-badge">Popular</span> : null}
            <h3 className="lab-tier">{plan.name}</h3>
            <p className="lab-price">
              {plan.price}
              <span>per month</span>
            </p>
            <ul className="lab-feats">
              {plan.bullets.map((b) => (
                <li key={b}>{b}</li>
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
