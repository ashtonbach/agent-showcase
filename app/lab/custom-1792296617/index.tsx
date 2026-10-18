"use client";

import { useMemo } from "react";

const BANNERS = [
  {
    id: "trees",
    emoji: "🎄",
    css: `.lab-banner-inner{background:linear-gradient(90deg,#8b1a1a 0%,#8b1a1a 33%,#1a5c34 33%,#1a5c34 66%,#c9a227 66%,#c9a227 100%);}`,
  },
  {
    id: "stars",
    emoji: "⭐",
    css: `.lab-banner-inner{background:repeating-linear-gradient(45deg,#1a5c34,#1a5c34 12px,#8b1a1a 12px,#8b1a1a 24px);border-bottom:4px solid #c9a227;}`,
  },
  {
    id: "gift",
    emoji: "🎁",
    css: `.lab-banner-inner{background:#1a5c34;box-shadow:inset 0 -6px 0 #c9a227,inset 0 6px 0 #8b1a1a;}`,
  },
];

export default function Lab() {
  const pick = useMemo(
    () => BANNERS[Math.floor(Math.random() * BANNERS.length)],
    []
  );

  return (
    <section
      data-lab="custom-1792296617"
      aria-labelledby="lab-holiday-heading"
    >
      <h2 id="lab-holiday-heading">Christmas banner</h2>
      <div
        className="lab-banner-fixed"
        role="status"
        aria-label="We're closed December 24 and 25 for Christmas"
      >
        <div className={`lab-banner-inner lab-banner-${pick.id}`}>
          <span className="lab-banner-emoji" aria-hidden="true">
            {pick.emoji}
          </span>
          <p className="lab-banner-text">
            We&apos;re closed Dec 24 &amp; 25 for Christmas.
          </p>
        </div>
      </div>
      <div className="lab-card">
        <p className="lab-lead">
          A fixed full-width strip sits directly under the site header on each
          visit, with a random festive style so the page still reads clearly
          underneath.
        </p>
      </div>
      <style>{`
        main.page:has([data-lab="custom-1792296617"]) .page-stack {
          padding-top: 100px;
        }
        .lab-banner-fixed {
          position: fixed;
          top: var(--header-h);
          left: 0;
          right: 0;
          z-index: 20;
          max-height: 100px;
          pointer-events: none;
        }
        .lab-banner-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 56px;
          max-height: 100px;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        ${pick.css}
        .lab-banner-emoji {
          font-size: clamp(1.5rem, 4vw, 2rem);
          line-height: 1;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
        }
        .lab-banner-text {
          margin: 0;
          font-family: var(--sans);
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #f2efe6;
          text-align: center;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
        }
        .lab-card {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          padding: 24px;
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          color: var(--mist);
        }
        .lab-lead {
          margin: 0;
          line-height: 1.55;
          color: #e8eee9;
        }
        @media (max-width: 640px) {
          main.page:has([data-lab="custom-1792296617"]) .page-stack {
            padding-top: 88px;
          }
          .lab-banner-inner {
            flex-direction: column;
            gap: 6px;
            min-height: 72px;
            padding: 8px 16px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-banner-fixed {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
