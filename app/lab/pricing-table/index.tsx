"use client";
import { useState } from "react";

type Tier = {
  name: string;
  price: string;
  best?: boolean;
  bullets: string[];
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "$9",
    bullets: ["1 workspace", "Email support", "Basic reports"],
  },
  {
    name: "Growth",
    price: "$29",
    best: true,
    bullets: ["5 workspaces", "Priority support", "Advanced reports"],
  },
  {
    name: "Scale",
    price: "$79",
    bullets: ["Unlimited workspaces", "Dedicated support", "Custom reports"],
  },
];

export default function Lab() {
  const [artOk, setArtOk] = useState(true);

  return (
    <section data-lab="pricing-table" aria-labelledby="pricing-table-h2">
      <h2 id="pricing-table-h2">Pricing table</h2>
      {artOk ? (
        <img
          data-art="image"
          src="/lab/pricing-table/header.svg"
          width={720}
          height={160}
          alt=""
          className="lab-pt-art"
          onError={() => setArtOk(false)}
        />
      ) : (
        <span data-art="fallback" aria-hidden="true" className="lab-pt-art lab-pt-fallback" />
      )}
      <ul className="lab-pt-grid">
        {TIERS.map((tier) => (
          <li
            key={tier.name}
            className={"lab-pt-card" + (tier.best ? " lab-pt-best" : "")}
            data-best={tier.best ? "true" : undefined}
          >
            {tier.best && <span className="lab-pt-badge">Popular</span>}
            <h3 className="lab-pt-name">{tier.name}</h3>
            <p className="lab-pt-price">
              {tier.price} <span className="lab-pt-per">per month</span>
            </p>
            <ul className="lab-pt-features">
              {tier.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="lab-pt-note">
        Example data: these plans are illustrative; the showcase sells nothing.
      </p>
      <style>{css}</style>
    </section>
  );
}

const css = `
[data-lab="pricing-table"] { max-width: min(960px, 100%); margin: 8px auto 56px; }
.lab-pt-art { display: block; width: 100%; height: auto; aspect-ratio: 9 / 2; border-radius: 16px; margin: 0 0 24px; object-fit: cover; }
.lab-pt-fallback { background: rgba(176,203,188,0.16); }
.lab-pt-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.lab-pt-card { position: relative; border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: transparent; color: #E8EEE9; }
.lab-pt-best { border-color: var(--sage); background: rgba(176,203,188,0.1); }
.lab-pt-badge { position: absolute; top: -12px; right: 20px; background: var(--sage); color: #14201A; font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; padding: 4px 10px; border-radius: 999px; }
.lab-pt-name { font-family: var(--serif); font-weight: 400; font-size: 22px; margin: 4px 0 8px; color: #F2EFE6; }
.lab-pt-price { font-size: 28px; margin: 0 0 16px; color: #F2EFE6; }
.lab-pt-per { font-size: 13px; color: var(--sage); font-family: var(--sans); }
.lab-pt-features { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: #E8EEE9; }
.lab-pt-features li { padding-left: 18px; position: relative; }
.lab-pt-features li::before { content: "\\2713"; position: absolute; left: 0; color: var(--sage); }
.lab-pt-note { margin-top: 24px; font-size: 14px; color: rgba(232,238,233,0.75); }
@media (max-width: 760px) {
  .lab-pt-grid { grid-template-columns: 1fr; }
  .lab-pt-badge { top: -10px; }
}
`;
