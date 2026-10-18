"use client";

import { useEffect, useState } from "react";

const CLOSED = "We're closed Dec 24–25 for Christmas.";

const VARIATIONS = [
  {
    label: "Evergreen stripe",
    decor: "🎄",
    bg: "linear-gradient(90deg, #8b0000 0%, #8b0000 33%, #0d5c2e 33%, #0d5c2e 66%, #c9a227 66%, #c9a227 100%)",
  },
  {
    label: "Gold glow",
    decor: "⭐",
    bg: "linear-gradient(135deg, #6b0f0f 0%, #0d5c2e 45%, #b8860b 100%)",
  },
  {
    label: "Holly cheer",
    decor: "🎁",
    bg: "repeating-linear-gradient(-45deg, #7a1010, #7a1010 12px, #145a32 12px, #145a32 24px)",
  },
  {
    label: "Winter sparkle",
    decor: "❄️",
    bg: "linear-gradient(90deg, #0d5c2e, #8b0000, #d4af37, #0d5c2e)",
  },
];

export default function Lab() {
  const [pick, setPick] = useState(0);

  useEffect(() => {
    setPick(Math.floor(Math.random() * VARIATIONS.length));
    document.documentElement.classList.add("lab-christmas-banner-on");
    return () => document.documentElement.classList.remove("lab-christmas-banner-on");
  }, []);

  const v = VARIATIONS[pick];

  return (
    <section data-lab="custom-1792299462" aria-labelledby="lab-christmas-heading">
      <h2 id="lab-christmas-heading">Holiday closure banner</h2>
      <p className="lab-lead">
        A fixed full-width banner sits directly under the site header, capped at 100px tall, in festive red, green, and gold.
      </p>
      <div
        className="lab-banner"
        role="status"
        aria-live="polite"
        data-variant={pick}
        style={{ background: v.bg }}
      >
        <span className="lab-banner-decor" aria-hidden="true">{v.decor}</span>
        <span className="lab-banner-text">{CLOSED}</span>
        <span className="lab-banner-tag">{v.label}</span>
      </div>
      <style>{`
        html.lab-christmas-banner-on main.page { padding-top: 88px; }
        @media (max-width: 640px) {
          html.lab-christmas-banner-on main.page { padding-top: 80px; }
        }
        .lab-lead {
          max-width: min(720px, 100%);
          margin: 0 auto 24px;
          color: var(--mist);
          line-height: 1.55;
          font-size: 17px;
        }
        .lab-banner {
          position: fixed;
          top: var(--header-h);
          left: 0;
          right: 0;
          z-index: 19;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          width: 100%;
          max-height: 100px;
          min-height: 56px;
          padding: 10px 20px;
          box-sizing: border-box;
          border-bottom: 2px solid rgba(201, 162, 39, 0.55);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
          color: #f2efe6;
          text-align: center;
        }
        .lab-banner-decor { font-size: 28px; line-height: 1; }
        .lab-banner-text {
          font-family: var(--sans);
          font-weight: 600;
          font-size: clamp(14px, 2.8vw, 18px);
          letter-spacing: 0.02em;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
        }
        .lab-banner-tag {
          font-family: var(--sans);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(18, 26, 22, 0.55);
          color: #e8eee9;
        }
        @media (prefers-reduced-motion: no-preference) {
          .lab-banner { animation: lab-banner-in 0.45s ease-out; }
          @keyframes lab-banner-in {
            from { opacity: 0; transform: translateY(-6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
    </section>
  );
}
