"use client";

import { useEffect, useState } from "react";

const GREETINGS = [
  "Warm wishes from the forest",
  "Season's greetings",
  "Peace and good cheer",
];

export default function Extra() {
  const [greeting, setGreeting] = useState(GREETINGS[0]);

  useEffect(() => {
    setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
  }, []);

  return (
    <section
      data-lab="custom-1792476731"
      aria-labelledby="lab-xmas-title"
      className="lab-xmas-wrap"
    >
      <h2 id="lab-xmas-title" className="lab-xmas-title">Christmas banner</h2>
      <div className="lab-xmas-banner" role="status">
        <span className="lab-xmas-ornament lab-xmas-ornament-left" aria-hidden="true" />
        <p className="lab-xmas-message">{greeting}</p>
        <span className="lab-xmas-ornament lab-xmas-ornament-right" aria-hidden="true" />
      </div>
      <p className="lab-xmas-sub">Happy holidays from AshtonBach — thank you for visiting the showcase.</p>
      <style>{`
        .lab-xmas-wrap {
          width: min(720px, 100%);
          margin: 8px auto 56px;
          padding: 0 16px;
          box-sizing: border-box;
        }
        .lab-xmas-title {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.2;
          color: var(--mist);
          margin: 0 0 16px;
        }
        .lab-xmas-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 20px 24px;
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            rgba(176, 203, 188, 0.12) 0%,
            rgba(196, 74, 74, 0.08) 50%,
            rgba(176, 203, 188, 0.1) 100%
          );
          position: relative;
          overflow: hidden;
        }
        .lab-xmas-banner::before {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 8px,
            rgba(176, 203, 188, 0.04) 8px,
            rgba(176, 203, 188, 0.04) 16px
          );
          pointer-events: none;
        }
        .lab-xmas-message {
          margin: 0;
          font-family: var(--serif);
          font-size: 22px;
          color: #f2efe6;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .lab-xmas-ornament {
          flex-shrink: 0;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #e8eee9, var(--sage) 55%, #8b3a3a 100%);
          box-shadow: 0 0 0 2px rgba(176, 203, 188, 0.35);
          position: relative;
          z-index: 1;
        }
        .lab-xmas-ornament::after {
          content: "";
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: #c9a227;
          border-radius: 1px;
        }
        .lab-xmas-sub {
          margin: 14px 0 0;
          font-size: 15px;
          line-height: 1.5;
          color: #e8eee9;
          text-align: center;
        }
        @media (max-width: 390px) {
          .lab-xmas-banner {
            flex-direction: column;
            gap: 10px;
            padding: 18px 16px;
          }
          .lab-xmas-ornament-left,
          .lab-xmas-ornament-right {
            display: none;
          }
          .lab-xmas-message {
            font-size: 19px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-xmas-banner::before {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
