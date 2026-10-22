"use client";
import { useState, useCallback, useMemo } from "react";

const MAX_DAY = 210;
/* Illustrative Hohmann-style transfer ~225M km over ~210 days (not ephemeris). */
const TOTAL_KM = 225_000_000;

function phaseFor(day: number) {
  if (day <= 21) return "Launch";
  if (day >= 189) return "Arrival";
  return "Cruise";
}

function distKm(day: number) {
  return Math.round((day / MAX_DAY) * TOTAL_KM);
}

function fmtKm(n: number) {
  const s = String(n);
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += ",";
    out += s[i];
  }
  return out;
}

function shipAt(t: number) {
  const x = 28 + t * 44;
  const y = 52 - 18 * Math.sin(Math.PI * t);
  return { x, y };
}

export default function Lab() {
  const [day, setDay] = useState(0);
  const t = day / MAX_DAY;
  const ship = useMemo(() => shipAt(t), [t]);

  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setDay((d) => Math.max(0, d - 1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setDay((d) => Math.min(MAX_DAY, d + 1));
    }
  }, []);

  const phase = phaseFor(day);
  const km = distKm(day);

  return (
    <section
      data-lab="custom-1792663201"
      aria-labelledby="mars-trip-title"
      className="lab-mars"
      tabIndex={0}
      onKeyDown={onKey}
    >
      <h2 id="mars-trip-title">Trip to Mars</h2>
      <div className="lab-mars-card">
        <div className="lab-mars-sky" aria-hidden="true">
          <span className="lab-body lab-sun" />
          <span className="lab-body lab-earth" />
          <span className="lab-body lab-mars" />
          <svg className="lab-path" viewBox="0 0 100 60" preserveAspectRatio="none">
            <path
              d="M 28 52 Q 50 22 72 52"
              fill="none"
              stroke="rgba(176,203,188,0.55)"
              strokeWidth="0.6"
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            className="lab-ship"
            style={{ left: `${ship.x}%`, top: `${ship.y}%` }}
            aria-hidden="true"
          />
        </div>
        <label className="lab-slider-wrap" htmlFor="mars-day">
          <span className="lab-slider-label">Mission day</span>
          <input
            id="mars-day"
            className="lab-slider"
            type="range"
            min={0}
            max={MAX_DAY}
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
          />
          <span className="lab-slider-hint">Use arrow keys when focused</span>
        </label>
        <dl className="lab-stats">
          <div>
            <dt className="lab-stat-k">Day</dt>
            <dd>{day}</dd>
          </div>
          <div>
            <dt className="lab-stat-k">Distance</dt>
            <dd>{fmtKm(km)} km</dd>
          </div>
          <div>
            <dt className="lab-stat-k">Phase</dt>
            <dd>{phase}</dd>
          </div>
        </dl>
      </div>
      <p className="lab-note">Example data: distances and timeline are illustrative, not mission-grade.</p>
      <style>{`
        .lab-mars { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        .lab-mars h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; }
        .lab-mars-card {
          border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px;
          background: rgba(18,26,22,0.35);
        }
        .lab-mars-sky { position: relative; height: 140px; margin-bottom: 20px; overflow: hidden; }
        .lab-body {
          position: absolute; border-radius: 50%; transform: translate(-50%, -50%);
        }
        .lab-sun {
          width: 44px; height: 44px; left: 10%; top: 50%;
          background: radial-gradient(circle at 35% 35%, #ffe9a8, #f5a623 55%, #c45c00);
          box-shadow: 0 0 24px rgba(245,166,35,0.45);
        }
        .lab-earth {
          width: 36px; height: 36px; left: 28%; top: 52%;
          background: radial-gradient(circle at 30% 30%, #7ec8e3, #1a5f8a 50%, #0d3d5c);
        }
        .lab-mars {
          width: 30px; height: 30px; left: 72%; top: 52%;
          background: radial-gradient(circle at 35% 35%, #e8a088, #b84a32 55%, #6e2418);
        }
        .lab-path { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
        .lab-ship {
          position: absolute; width: 14px; height: 14px; transform: translate(-50%, -50%) rotate(45deg);
          background: var(--sage, #b0cbbc); border-radius: 2px 6px 2px 6px;
          box-shadow: 0 0 8px rgba(176,203,188,0.6);
        }
        .lab-slider-wrap { display: block; margin-bottom: 16px; }
        .lab-slider-label {
          display: block; font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase; font-size: 11px; margin-bottom: 8px; color: #E8EEE9;
        }
        .lab-slider { width: 100%; accent-color: var(--sage, #b0cbbc); }
        .lab-slider-hint { font-size: 12px; opacity: 0.75; margin-top: 6px; display: block; }
        .lab-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 0;
        }
        .lab-stats dd { margin: 4px 0 0; font-size: 18px; }
        .lab-stat-k {
          font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase; font-size: 10px; margin: 0; opacity: 0.85;
        }
        .lab-note { margin: 16px 0 0; font-size: 14px; opacity: 0.85; }
        @media (max-width: 420px) {
          .lab-stats { grid-template-columns: 1fr; }
          .lab-mars-sky { height: 120px; }
          .lab-sun { width: 36px; height: 36px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-ship { transition: none; }
        }
      `}</style>
    </section>
  );
}
