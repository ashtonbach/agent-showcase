"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Flake = { id: number; left: number; delay: number; dur: number; size: number; drift: number };

const HEADERS = [
  { label: "Crimson pine", bg: "linear-gradient(90deg, rgba(139,26,26,0.55) 0%, rgba(22,78,44,0.5) 100%)" },
  { label: "Holly stripe", bg: "repeating-linear-gradient(90deg, rgba(178,34,34,0.45) 0 24px, rgba(34,100,56,0.42) 24px 48px)" },
  { label: "Evergreen glow", bg: "radial-gradient(ellipse 80% 120% at 50% 0%, rgba(196,48,48,0.38), transparent 70%), rgba(28,92,58,0.48)" },
  { label: "Candy ribbon", bg: "linear-gradient(135deg, rgba(160,32,32,0.5) 25%, rgba(32,96,58,0.48) 25% 50%, rgba(160,32,32,0.5) 50% 75%, rgba(32,96,58,0.48) 75%)" },
];

const FLAKE_COUNT = 48;

export default function Lab() {
  const [flakes, setFlakes] = useState<Flake[]>([]);

  useEffect(() => {
    const next: Flake[] = [];
    for (let i = 0; i < FLAKE_COUNT; i++) {
      next.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        dur: 9 + Math.random() * 14,
        size: 2 + Math.random() * 3,
        drift: -30 + Math.random() * 60,
      });
    }
    setFlakes(next);
  }, []);

  return (
    <section data-lab="custom-1792301756" aria-labelledby="lab-xmas-h2">
      <h2 id="lab-xmas-h2">Christmas headers &amp; snowfall</h2>
      <div className="lab-snow" aria-hidden="true">
        {flakes.map((f) => (
          <span
            key={f.id}
            className="lab-snowflake"
            style={
              {
                left: `${f.left}%`,
                animationDelay: `${f.delay}s`,
                animationDuration: `${f.dur}s`,
                width: `${f.size}px`,
                height: `${f.size}px`,
                "--lab-drift": `${f.drift}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <p className="lab-lead">
        Four festive header bands with solid reds and greens at gentle opacity so the navigation text stays readable, plus a light snowfall across the page.
      </p>
      <div className="lab-grid">
        {HEADERS.map((h, i) => (
          <article key={i} className="lab-card">
            <p className="lab-tag">Variation {i + 1}</p>
            <div className="lab-xmas-bar" style={{ background: h.bg }}>
              <span className="lab-bar-mark" aria-hidden="true" />
              <span className="lab-bar-brand">AshtonBach</span>
              <span className="lab-bar-nav label">Watch · Contact</span>
            </div>
            <p className="lab-caption">{h.label}</p>
          </article>
        ))}
      </div>
      <style>{`
        .lab-snow { position: fixed; inset: 0; pointer-events: none; z-index: 15; overflow: hidden; }
        .lab-snowflake {
          position: absolute; top: -8px; border-radius: 50%;
          background: rgba(242, 239, 230, 0.85);
          box-shadow: 0 0 4px rgba(255,255,255,0.35);
          animation: lab-fall linear infinite;
          opacity: 0.75;
        }
        @keyframes lab-fall {
          0% { transform: translate3d(0, -10px, 0); opacity: 0; }
          8% { opacity: 0.85; }
          100% { transform: translate3d(var(--lab-drift), 100vh, 0); opacity: 0.35; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-snowflake { animation: none; opacity: 0.4; }
        }
        [data-lab="custom-1792301756"] { position: relative; z-index: 1; max-width: min(960px, 100%); margin: 8px auto 56px; }
        .lab-lead { color: var(--muted); max-width: 52ch; margin-bottom: 24px; }
        .lab-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        @media (max-width: 640px) { .lab-grid { grid-template-columns: 1fr; } }
        .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 16px;
          background: rgba(18, 26, 22, 0.35);
        }
        .lab-tag {
          font-family: var(--sans); font-size: 12px; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); margin-bottom: 12px;
        }
        .lab-xmas-bar {
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          min-height: 52px; padding: 10px 14px; border-radius: 10px;
          color: #F2EFE6; font-family: var(--sans); font-size: 13px;
        }
        .lab-bar-mark {
          width: 20px; height: 14px; border-radius: 2px;
          background: linear-gradient(135deg, #B0CBBC 40%, #8aa896);
          flex-shrink: 0;
        }
        .lab-bar-brand {
          font-family: var(--serif); font-size: 18px; letter-spacing: 0.1em; flex: 1; text-align: center;
          text-shadow: 0 1px 3px rgba(0,0,0,0.45);
        }
        .lab-bar-nav { font-size: 10px; color: #F2EFE6; opacity: 0.95; white-space: nowrap; }
        .lab-caption { margin-top: 10px; font-size: 14px; color: var(--mist); }
      `}</style>
    </section>
  );
}
