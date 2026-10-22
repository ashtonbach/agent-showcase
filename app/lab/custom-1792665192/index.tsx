"use client";

import { useCallback, useMemo, useRef, useState } from "react";

const MAX_DAY = 210;
// Illustrative cruise profile (~225M km total path length for a ~210-day transfer window).
const CRUISE_KM = 225_000_000;

function formatKm(n: number): string {
  const s = Math.round(n).toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += ",";
    out += s[i];
  }
  return out;
}

function phaseFor(day: number): string {
  if (day <= 30) return "Launch";
  if (day >= 180) return "Arrival";
  return "Cruise";
}

function pointOnCurve(t: number): { x: number; y: number; angle: number } {
  const x0 = 38;
  const y0 = 50;
  const x1 = 64;
  const y1 = 28;
  const x2 = 90;
  const y2 = 50;
  const u = 1 - t;
  const x = u * u * x0 + 2 * u * t * x1 + t * t * x2;
  const y = u * u * y0 + 2 * u * t * y1 + t * t * y2;
  const dx = 2 * u * (x1 - x0) + 2 * t * (x2 - x1);
  const dy = 2 * u * (y1 - y0) + 2 * t * (y2 - y1);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return { x, y, angle };
}

export default function Lab() {
  const [day, setDay] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  const t = day / MAX_DAY;
  const rocket = useMemo(() => pointOnCurve(t), [t]);
  const distance = (day / MAX_DAY) * CRUISE_KM;
  const phase = phaseFor(day);

  const nudge = useCallback((delta: number) => {
    setDay((d) => Math.min(MAX_DAY, Math.max(0, d + delta)));
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      nudge(e.shiftKey ? -10 : -1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nudge(e.shiftKey ? 10 : 1);
    }
  };

  return (
    <section
      data-lab="custom-1792665192"
      aria-labelledby="lab-mars-title"
      className="lab-wrap"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <style>{`
        .lab-wrap { max-width: min(960px, 100%); margin: 8px auto 56px; padding: 0 16px; color: var(--mist, #F2EFE6); }
        .lab-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; }
        .lab-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; }
        .lab-scene { position: relative; width: 100%; aspect-ratio: 16/9; min-height: 200px; max-height: 320px; }
        .lab-scene svg { width: 100%; height: 100%; display: block; overflow: visible; }
        .lab-sun { fill: #f5c842; filter: drop-shadow(0 0 18px rgba(245,200,66,0.85)) drop-shadow(0 0 36px rgba(245,160,40,0.45)); }
        @media (prefers-reduced-motion: no-preference) {
          .lab-sun { animation: lab-glow 4s ease-in-out infinite; }
          @keyframes lab-glow { 50% { filter: drop-shadow(0 0 22px rgba(245,200,66,0.95)) drop-shadow(0 0 48px rgba(245,160,40,0.55)); } }
        }
        .lab-earth { fill: #5b9bd5; }
        .lab-mars { fill: #c45c3e; }
        .lab-path { fill: none; stroke: rgba(176,203,188,0.45); stroke-width: 0.6; stroke-dasharray: 2 2; }
        .lab-rocket { font-size: 14px; line-height: 1; }
        .lab-controls { margin-top: 20px; }
        .lab-slider-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .lab-slider-row input[type=range] { flex: 1 1 180px; min-width: 0; accent-color: var(--sage, #8fb39a); }
        .lab-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-top: 16px; }
        .lab-stat { border: 1px solid rgba(176,203,188,0.2); border-radius: 12px; padding: 12px 14px; }
        .lab-stat-label { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; color: rgba(242,239,230,0.75); margin-bottom: 4px; }
        .lab-stat-value { font-size: 18px; color: var(--sage, #b0cbb8); }
        .lab-note { margin: 20px 0 0; font-size: 14px; color: rgba(242,239,230,0.7); }
      `}</style>
      <h2 id="lab-mars-title">Trip to Mars</h2>
      <div className="lab-card">
        <div className="lab-scene" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <circle className="lab-sun" cx="12" cy="50" r="9" />
            <circle className="lab-earth" cx="38" cy="50" r="5" />
            <circle className="lab-mars" cx="90" cy="50" r="4.5" />
            <path
              className="lab-path"
              d="M 38 50 Q 64 28 90 50"
            />
            <text
              className="lab-rocket"
              x={rocket.x}
              y={rocket.y}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${rocket.angle} ${rocket.x} ${rocket.y})`}
            >
              🚀
            </text>
          </svg>
        </div>
        <div className="lab-controls">
          <div className="lab-slider-row">
            <label className="lab-stat-label" htmlFor="lab-day-slider">Mission day</label>
            <input
              id="lab-day-slider"
              ref={sliderRef}
              type="range"
              min={0}
              max={MAX_DAY}
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              aria-valuemin={0}
              aria-valuemax={MAX_DAY}
              aria-valuenow={day}
              aria-valuetext={`Day ${day}`}
            />
          </div>
          <div className="lab-stats">
            <div className="lab-stat">
              <div className="lab-stat-label">Day</div>
              <div className="lab-stat-value">{day}</div>
            </div>
            <div className="lab-stat">
              <div className="lab-stat-label">Distance</div>
              <div className="lab-stat-value">{formatKm(distance)} km</div>
            </div>
            <div className="lab-stat">
              <div className="lab-stat-label">Phase</div>
              <div className="lab-stat-value">{phase}</div>
            </div>
          </div>
        </div>
      </div>
      <p className="lab-note">Example data: distance and phases are illustrative for this slider demo.</p>
    </section>
  );
}
