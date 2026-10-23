"use client";
import { useState, useCallback, useId } from "react";

/* Example tiers: monthly list price; yearly is $20/mo less per tier */
const TIERS = [
  { id: "starter", name: "Starter", monthly: 29, yearly: 9 },
  { id: "pro", name: "Pro", monthly: 59, yearly: 39 },
  { id: "team", name: "Team", monthly: 99, yearly: 79 },
] as const;

type Cycle = "monthly" | "yearly";

const css = `
.lab-pricing { width: min(960px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
.lab-toggle-wrap { display: flex; justify-content: center; margin-bottom: 28px; }
.lab-toggle {
  display: inline-flex; border: 1px solid rgba(176,203,188,0.28); border-radius: 999px; padding: 4px;
  background: rgba(18,26,22,0.45); gap: 4px;
}
.lab-toggle button {
  font-family: var(--sans); font-size: 14px; font-weight: 500; letter-spacing: 0.06em;
  padding: 10px 20px; border: none; border-radius: 999px; cursor: pointer;
  color: var(--mist); background: transparent; min-height: 44px; min-width: 88px;
}
.lab-toggle button[aria-pressed="true"] { background: var(--sage); color: #121A16; }
.lab-toggle button:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
.lab-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: stretch; }
@media (max-width: 720px) { .lab-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; } }
.lab-card {
  position: relative; border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px;
  display: flex; flex-direction: column; gap: 12px; background: rgba(18,26,22,0.35);
}
.lab-card-popular { border-color: var(--sage); box-shadow: 0 0 0 1px rgba(176,203,188,0.2); }
.lab-badge-pop {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
  background: var(--sage); color: #121A16; padding: 6px 12px; border-radius: 999px; white-space: nowrap;
}
.lab-badge-save {
  display: inline-block; font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em;
  text-transform: uppercase; color: #121A16; background: var(--sage); padding: 4px 8px; border-radius: 6px;
}
.lab-tier-name { font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); margin: 0; }
.lab-price { font-family: var(--serif); font-size: 36px; font-weight: 400; color: var(--mist); margin: 0; line-height: 1.1; }
.lab-price span { font-size: 16px; color: #E8EEE9; opacity: 0.75; }
.lab-features { margin: 0; padding: 0; list-style: none; color: #E8EEE9; font-size: 15px; line-height: 1.5; flex: 1; }
.lab-features li { padding: 4px 0; }
.lab-cta {
  margin-top: 8px; padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(176,203,188,0.45);
  background: transparent; color: var(--mist); font-family: var(--sans); font-size: 14px; font-weight: 500;
  cursor: pointer; min-height: 44px;
}
.lab-card-popular .lab-cta { background: var(--sage); color: #121A16; border-color: var(--sage); }
.lab-card:not(.lab-card-popular) .lab-cta:hover { border-color: var(--sage); }
.lab-cta:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
.lab-note { margin-top: 24px; text-align: center; font-size: 14px; color: #E8EEE9; opacity: 0.8; }
@media (prefers-reduced-motion: reduce) { .lab-card, .lab-toggle button { transition: none; } }
`;

export default function LabPricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const headingId = useId();
  const toggleId = useId();

  const onToggleKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setCycle((c) => (c === "monthly" ? "yearly" : "monthly"));
    }
  }, []);

  return (
    <section data-lab="custom-1792718695" aria-labelledby={headingId}>
      <style>{css}</style>
      <h2 id={headingId}>Plans that scale with you</h2>
      <div className="lab-pricing">
        <div className="lab-toggle-wrap">
          <div
            className="lab-toggle"
            role="group"
            aria-label="Billing period"
            id={toggleId}
            onKeyDown={onToggleKey}
          >
            <button
              type="button"
              aria-pressed={cycle === "monthly"}
              onClick={() => setCycle("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={cycle === "yearly"}
              onClick={() => setCycle("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
        <ul className="lab-grid" role="list">
          {TIERS.map((tier) => {
            const price = cycle === "monthly" ? tier.monthly : tier.yearly;
            const showSave = cycle === "yearly";
            const isPopular = tier.id === "pro";
            return (
              <li key={tier.id} className={`lab-card${isPopular ? " lab-card-popular" : ""}`}>
                {isPopular && <span className="lab-badge-pop">Most popular</span>}
                <p className="lab-tier-name">{tier.name}</p>
                <p className="lab-price">
                  ${price}
                  <span> /mo</span>
                </p>
                {showSave && <span className="lab-badge-save">Save 20</span>}
                <ul className="lab-features" aria-label={`${tier.name} includes`}>
                  <li>Core features</li>
                  <li>Email support</li>
                </ul>
                <button type="button" className="lab-cta">Choose {tier.name}</button>
              </li>
            );
          })}
        </ul>
        <p className="lab-note">Example data: sample prices for this demo.</p>
      </div>
    </section>
  );
}
