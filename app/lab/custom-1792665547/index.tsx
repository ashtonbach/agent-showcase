"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MAX_DAY = 210;
// Example arc: ~150M km at departure to ~55M km near Mars (simplified Hohmann-style; NASA cites ~6–9 month transfers)
function distanceKm(day: number) {
  const t = day / MAX_DAY;
  const start = 150_000_000;
  const end = 55_000_000;
  return Math.round(start + (end - start) * t * t);
}

function fmtKm(n: number) {
  const s = String(n);
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i && (s.length - i) % 3 === 0) out += ",";
    out += s[i];
  }
  return out;
}

function phaseFor(day: number) {
  if (day <= 30) return "Launch";
  if (day >= 181) return "Arrival";
  return "Cruise";
}

function curvePoint(t: number) {
  const x = 18 + t * 64;
  const y = 52 - 22 * Math.sin(Math.PI * t);
  const dx = 64;
  const dy = -22 * Math.PI * Math.cos(Math.PI * t);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return { x, y, angle };
}

export default function Lab() {
  const [day, setDay] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);
  const t = day / MAX_DAY;
  const { x, y, angle } = curvePoint(t);
  const dist = distanceKm(day);
  const phase = phaseFor(day);

  const nudge = useCallback((delta: number) => {
    setDay((d) => Math.min(MAX_DAY, Math.max(0, d + delta)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const el = document.activeElement;
      if (el && el !== sliderRef.current && el !== document.body) return;
      e.preventDefault();
      nudge(e.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nudge]);

  return (
    <section data-lab="custom-1792665547" aria-labelledby="lab-mars-title" className="lab-wrap">
      <style>{`
        .lab-wrap { width: min(960px, 100%); margin: 8px auto 56px; padding: 0 12px; box-sizing: border-box; }
        .lab-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; color: var(--mist, #F2EFE6); margin: 0 0 20px; }
        .lab-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px 16px; box-sizing: border-box; }
        .lab-scene { position: relative; width: 100%; max-width: 100%; overflow: hidden; }
        .lab-scene svg { display: block; width: 100%; height: auto; max-height: 200px; }
        .lab-sun { fill: #f5c842; filter: drop-shadow(0 0 18px rgba(245,200,66,0.85)) drop-shadow(0 0 40px rgba(245,160,40,0.45)); }
        .lab-planet-earth { fill: #5b9bd5; }
        .lab-planet-mars { fill: #c45c3e; }
        .lab-path { fill: none; stroke: rgba(176,203,188,0.55); stroke-width: 0.6; stroke-dasharray: 3 2.5; }
        .lab-rocket { font-size: 14px; line-height: 1; }
        @media (prefers-reduced-motion: no-preference) {
          .lab-sun { animation: lab-pulse 4s ease-in-out infinite; }
          @keyframes lab-pulse { 0%,100% { filter: drop-shadow(0 0 18px rgba(245,200,66,0.85)); } 50% { filter: drop-shadow(0 0 26px rgba(245,200,66,1)); } }
        }
        .lab-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 20px; }
        @media (max-width: 420px) { .lab-stats { grid-template-columns: 1fr; } }
        .lab-stat { text-align: center; }
        .lab-stat-label { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; color: rgba(232,238,233,0.75); margin-bottom: 4px; }
        .lab-stat-value { color: var(--mist, #F2EFE6); font-size: 18px; }
        .lab-phase { color: var(--sage, #B0CBBC); }
        .lab-slider-row { margin-top: 20px; }
        .lab-slider-row label { display: block; font-family: var(--sans); font-size: 13px; color: #E8EEE9; margin-bottom: 8px; }
        .lab-slider { width: 100%; accent-color: var(--sage, #B0CBBC); }
        .lab-note { margin: 20px 0 0; font-size: 13px; color: rgba(232,238,233,0.7); }
      `}</style>
      <h2 id="lab-mars-title">Trip to Mars</h2>
      <div className="lab-card">
        <div className="lab-scene" aria-hidden="true">
          <svg viewBox="0 0 100 70" role="presentation">
            <circle className="lab-sun" cx="8" cy="35" r="9" />
            <circle className="lab-planet-earth" cx="38" cy="52" r="5" />
            <circle className="lab-planet-mars" cx="88" cy="52" r="4.5" />
            <path className="lab-path" d="M 38 52 Q 63 18 88 52" />
            <text className="lab-rocket" x={x} y={y} textAnchor="middle" dominantBaseline="middle" transform={`rotate(${angle} ${x} ${y})`}>🚀</text>
          </svg>
        </div>
        <div className="lab-stats">
          <div className="lab-stat"><div className="lab-stat-label">Day</div><div className="lab-stat-value">{day}</div></div>
          <div className="lab-stat"><div className="lab-stat-label">Distance</div><div className="lab-stat-value">{fmtKm(dist)} km</div></div>
          <div className="lab-stat"><div className="lab-stat-label">Phase</div><div className="lab-stat-value lab-phase">{phase}</div></div>
        </div>
        <div className="lab-slider-row">
          <label htmlFor="lab-mars-day">Mission day (0–210)</label>
          <input ref={sliderRef} id="lab-mars-day" className="lab-slider" type="range" min={0} max={MAX_DAY} value={day} onChange={(e) => setDay(Number(e.target.value))} />
        </div>
      </div>
      <p className="lab-note">Example data: distances follow a simplified transfer timeline (NASA Mars missions typically take 6–9 months).</p>
    </section>
  );
}
