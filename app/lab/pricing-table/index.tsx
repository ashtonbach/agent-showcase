"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Example data: these plans, prices and limits are illustrative only; the showcase sells nothing (labeled on the page).
const TIERS = [
  { name: "Starter", price: "$0", note: "per month", items: ["1 demo run a day", "Public preview", "Email support"] },
  { name: "Team", price: "$49", note: "per month", items: ["20 demo runs a day", "Review and QA agents", "Priority support"], best: true },
  { name: "Studio", price: "$199", note: "per month", items: ["Unlimited runs", "Custom agent roles", "Dedicated channel"] },
];
const css = `
.lab-pricing [data-art] { display: block; width: 100%; height: auto; aspect-ratio: 9 / 2; border-radius: 16px; margin-bottom: 20px; }
.lab-pricing [data-art="fallback"] { background: linear-gradient(120deg, rgba(176, 203, 188, 0.16), rgba(217, 180, 90, 0.10)); border: 1px solid rgba(176, 203, 188, 0.2); }
.lab-pricing { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-pricing > h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 6px 0 20px; }
.lab-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; list-style: none; }
.lab-tier { padding: 24px; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; }
.lab-tier--best { border-color: var(--sage); background: rgba(176, 203, 188, 0.1); }
.lab-tier h3 { font: 500 14px var(--sans); letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); }
.lab-tier .lab-price { font-family: var(--serif); font-size: 44px; line-height: 1.1; margin-top: 10px; }
.lab-tier ul { list-style: none; margin-top: 14px; display: grid; gap: 6px; opacity: 0.88; }
.lab-badge { display: inline-block; margin-left: 8px; padding: 2px 8px; border-radius: 999px; background: var(--sage); color: #14201A; font-size: 11px; letter-spacing: 0.1em; }
@media (max-width: 760px) { .lab-pricing-grid { grid-template-columns: 1fr; } }
`;

// Artwork slot: Naomi Sato commits the image at a fixed path; a quiet fallback shows if it is missing or fails to load.
function Art({ src, w, h, alt, children }: { src: string; w: number; h: number; alt: string; children: ReactNode }) {
  const r = useRef<HTMLImageElement>(null);
  const [ok, setOk] = useState(true);
  useEffect(() => { const i = r.current; if (i && i.complete && i.naturalWidth === 0) setOk(false); }, [src]);
  return ok ? <img ref={r} data-art="image" src={src} width={w} height={h} alt={alt} onError={() => setOk(false)} /> : <span data-art="fallback" aria-hidden="true">{children}</span>;
}

export default function PricingTable() {
  return (
    <section data-lab="pricing-table" className="lab-pricing" aria-labelledby="lab-pricing-title">
      <style>{css}</style>
      <Art src="/lab/pricing-table/header.svg" w={720} h={160} alt="">{null}</Art>
      <p className="label">Pricing · Example data</p>
      <h2 id="lab-pricing-title">Pick a plan</h2>
      <ul className="lab-pricing-grid">
        {TIERS.map((t) => (
          <li key={t.name} className={t.best ? "lab-tier lab-tier--best" : "lab-tier"} data-best={t.best ? "true" : undefined}>
            <h3>
              {t.name}
              {t.best ? <span className="lab-badge">Popular</span> : null}
            </h3>
            <p className="lab-price">
              {t.price} <span className="label">{t.note}</span>
            </p>
            <ul>
              {t.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
