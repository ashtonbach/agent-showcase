"use client";

import { useCallback, useState, type KeyboardEvent } from "react";

type Billing = "monthly" | "yearly";

/* Example pricing — illustrative only */
const TIERS = [
  { id: "starter", name: "Starter", monthly: 39, popular: false },
  { id: "pro", name: "Pro", monthly: 79, popular: true },
  { id: "team", name: "Team", monthly: 149, popular: false },
] as const;

const YEARLY_DISCOUNT = 20;

function priceFor(monthly: number, billing: Billing) {
  return billing === "monthly" ? monthly : monthly - YEARLY_DISCOUNT;
}

export default function Lab() {
  const [billing, setBilling] = useState<Billing>("monthly");

  const onTabKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      setBilling((b) => (b === "monthly" ? "yearly" : "monthly"));
    },
    []
  );

  return (
    <section
      data-lab="custom-1792653187"
      aria-labelledby="lab-pricing-title"
      className="lab-pricing"
    >
      <h2 id="lab-pricing-title">Plans</h2>

      <div
        className="lab-billing"
        role="tablist"
        aria-label="Billing period"
        onKeyDown={onTabKey}
      >
        <button
          type="button"
          role="tab"
          id="lab-tab-monthly"
          aria-selected={billing === "monthly"}
          aria-controls="lab-pricing-panels"
          tabIndex={billing === "monthly" ? 0 : -1}
          className={`lab-billing-btn${billing === "monthly" ? " lab-billing-btn--on" : ""}`}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>
        <button
          type="button"
          role="tab"
          id="lab-tab-yearly"
          aria-selected={billing === "yearly"}
          aria-controls="lab-pricing-panels"
          tabIndex={billing === "yearly" ? 0 : -1}
          className={`lab-billing-btn${billing === "yearly" ? " lab-billing-btn--on" : ""}`}
          onClick={() => setBilling("yearly")}
        >
          Yearly
          <span
            className={
              billing === "yearly" ? "lab-save-badge" : "lab-save-hint"
            }
          >
            Save 20
          </span>
        </button>
      </div>

      <div
        id="lab-pricing-panels"
        role="tabpanel"
        aria-labelledby={
          billing === "monthly" ? "lab-tab-monthly" : "lab-tab-yearly"
        }
        className="lab-grid"
      >
        {TIERS.map((tier) => {
          const amount = priceFor(tier.monthly, billing);
          return (
            <article
              key={tier.id}
              className={`lab-card${tier.popular ? " lab-card--popular" : ""}`}
              aria-label={`${tier.name} plan`}
            >
              {tier.popular ? (
                <p className="lab-popular" aria-hidden="true">Most popular</p>
              ) : null}
              <h3 className="lab-tier">{tier.name}</h3>
              <p className="lab-price">
                <span className="lab-amount">${amount}</span>
                <span className="lab-period">/mo</span>
              </p>
              {billing === "yearly" ? (
                <p className="lab-billed">Billed yearly</p>
              ) : (
                <p className="lab-billed lab-billed--muted">Billed monthly</p>
              )}
            </article>
          );
        })}
      </div>

      <p className="lab-note">Example data: prices shown are for demonstration only.</p>

      <style>{`
        .lab-pricing { width: min(960px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
        .lab-pricing h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; color: var(--mist, #F2EFE6); margin: 0 0 20px; }
        .lab-billing { display: inline-flex; gap: 4px; padding: 4px; border: 1px solid rgba(176,203,188,0.28); border-radius: 999px; margin-bottom: 28px; background: rgba(18,26,22,0.35); }
        .lab-billing-btn { font-family: var(--sans); font-size: 15px; min-height: 44px; min-width: 44px; padding: 10px 18px; border: none; border-radius: 999px; background: transparent; color: #F2EFE6; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
        .lab-billing-btn:focus-visible { outline: 2px solid var(--sage); outline-offset: 2px; }
        .lab-billing-btn--on { background: var(--sage); color: #121A16; }
        .lab-save-badge { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; padding: 4px 8px; border-radius: 8px; background: var(--sage); color: #121A16; }
        .lab-save-hint { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(232,238,233,0.65); }
        .lab-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 720px) { .lab-grid { grid-template-columns: 1fr; } }
        .lab-card { position: relative; border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.25); }
        .lab-card--popular { border-color: var(--sage); box-shadow: 0 0 0 1px rgba(176,203,188,0.35); }
        .lab-popular { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); margin: 0 0 12px; }
        .lab-tier { font-family: var(--serif); font-weight: 400; font-size: 22px; color: var(--mist, #F2EFE6); margin: 0 0 12px; }
        .lab-price { margin: 0 0 8px; color: #E8EEE9; }
        .lab-amount { font-size: 36px; font-family: var(--serif); font-weight: 400; }
        .lab-period { font-size: 15px; opacity: 0.85; margin-left: 4px; }
        .lab-billed { font-family: var(--sans); font-size: 14px; margin: 0; color: rgba(232,238,233,0.8); }
        .lab-billed--muted { opacity: 0.65; }
        .lab-note { margin-top: 24px; font-size: 14px; color: rgba(232,238,233,0.75); }
        @media (prefers-reduced-motion: reduce) { .lab-billing-btn, .lab-card { transition: none; } }
      `}</style>
    </section>
  );
}
