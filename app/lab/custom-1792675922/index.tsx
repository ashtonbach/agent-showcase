"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Example arc length ~189M km (NASA Mars transfer scale, illustrative). */
const MAX_DAY = 210;
const ARC_KM = 189_000_000;

function formatKm(n: number) {
  const s = String(Math.round(n));
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function phaseFor(day: number) {
  if (day <= 14) return "Launch";
  if (day >= 196) return "Arrival";
  return "Cruise";
}

export default function Lab() {
  const [day, setDay] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);
  const t = day / MAX_DAY;
  const distance = t * ARC_KM;
  const phase = phaseFor(day);

  const onKey = useCallback((e: KeyboardEvent) => {
    const el = sliderRef.current;
    if (!el || document.activeElement !== el) return;
    let d = day;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      d = Math.max(0, day - 1);
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      d = Math.min(MAX_DAY, day + 1);
      e.preventDefault();
    } else return;
    setDay(d);
  }, [day]);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const u = t;
  const earthX = 28;
  const ctrlX = 58;
  const marsX = 88;
  const rx = (1 - u) * (1 - u) * earthX + 2 * (1 - u) * u * ctrlX + u * u * marsX;
  const ry = (1 - u) * (1 - u) * 72 + 2 * (1 - u) * u * 18 + u * u * 72;
  const dx = 2 * (1 - u) * (ctrlX - earthX) + 2 * u * (marsX - ctrlX);
  const dy = 2 * (1 - u) * (18 - 72) + 2 * u * (72 - 18);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const arrived = day === MAX_DAY;

  return (
    <section data-lab="custom-1792675922" aria-labelledby="lab-mars-title" className="lab-wrap">
      <h2 id="lab-mars-title">Trip to Mars</h2>
      <div className="lab-card">
        <div className={`lab-sky-wrap${arrived ? " lab-sky-wrap--arrived" : ""}`}>
          <div className="lab-sky" aria-hidden="true">
          <span className="lab-sun" style={{ left: "12%" }}>☀️</span>
          <span className="lab-earth" style={{ left: "28%" }}>🌍</span>
          <span className="lab-mars" style={{ left: "88%" }}>🔴</span>
          {arrived && (
              <div className="lab-confetti">
                <i /><i /><i /><i /><i /><i /><i /><i />
              </div>
          )}
          <svg className="lab-arc" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M 28 72 Q 58 18 88 72"
              fill="none"
              stroke="rgba(176,203,188,0.45)"
              strokeWidth="0.6"
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            className="lab-rocket"
            style={{ left: `${rx}%`, top: `${ry}%`, transform: `translate(-50%,-50%) rotate(${angle}deg)` }}
          >
            🚀
          </span>
          </div>
          {arrived && <p className="lab-arrived" aria-live="polite">Arrived at Mars!</p>}
        </div>
        <label className="lab-slider-label" htmlFor="lab-mars-day">
          <span className="lab-cap">Mission day</span>
          <input
            id="lab-mars-day"
            ref={sliderRef}
            type="range"
            min={0}
            max={MAX_DAY}
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
          />
        </label>
        <dl className="lab-stats">
          <div>
            <dt className="lab-cap">Day</dt>
            <dd>{day}</dd>
          </div>
          <div>
            <dt className="lab-cap">Distance</dt>
            <dd>{formatKm(distance)} km</dd>
          </div>
          <div>
            <dt className="lab-cap">Phase</dt>
            <dd>{phase}</dd>
          </div>
        </dl>
      </div>
      <p className="lab-note">Example data: illustrative transfer arc and distances for layout.</p>
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; padding: 0 12px; box-sizing: border-box; color: var(--mist, #F2EFE6); }
        .lab-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; }
        .lab-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; box-sizing: border-box; }
        .lab-sky-wrap { position: relative; margin-bottom: 20px; }
        .lab-sky-wrap--arrived { margin-bottom: 24px; }
        .lab-sky { position: relative; height: 140px; overflow: hidden; }
        .lab-sky-wrap--arrived .lab-sky { overflow: visible; height: 160px; }
        .lab-arrived { position: absolute; left: 88%; top: 4px; transform: translateX(-50%); margin: 0; font-family: var(--sans); font-size: 0.85rem; font-weight: 500; color: var(--sage, #B0CBBC); white-space: nowrap; z-index: 2; }
        .lab-confetti { position: absolute; left: 88%; bottom: 28px; width: 72px; height: 72px; transform: translateX(-50%); pointer-events: none; }
        .lab-confetti i { position: absolute; width: 6px; height: 10px; border-radius: 1px; opacity: 0; animation: lab-pop 0.9s ease-out forwards; }
        .lab-confetti i:nth-child(1) { left: 50%; top: 50%; background: #E8C547; --lab-a: -55deg; --lab-d: 38px; animation-delay: 0s; }
        .lab-confetti i:nth-child(2) { left: 50%; top: 50%; background: #B0CBBC; --lab-a: -10deg; --lab-d: 44px; animation-delay: 0.05s; }
        .lab-confetti i:nth-child(3) { left: 50%; top: 50%; background: #F2EFE6; --lab-a: 35deg; --lab-d: 36px; animation-delay: 0.08s; }
        .lab-confetti i:nth-child(4) { left: 50%; top: 50%; background: #E8A87C; --lab-a: 80deg; --lab-d: 42px; animation-delay: 0.03s; }
        .lab-confetti i:nth-child(5) { left: 50%; top: 50%; background: #7BA38C; --lab-a: 125deg; --lab-d: 40px; animation-delay: 0.1s; }
        .lab-confetti i:nth-child(6) { left: 50%; top: 50%; background: #E8C547; --lab-a: 170deg; --lab-d: 34px; animation-delay: 0.06s; }
        .lab-confetti i:nth-child(7) { left: 50%; top: 50%; background: #B0CBBC; --lab-a: 215deg; --lab-d: 46px; animation-delay: 0.02s; }
        .lab-confetti i:nth-child(8) { left: 50%; top: 50%; background: #F2EFE6; --lab-a: 260deg; --lab-d: 38px; animation-delay: 0.09s; }
        @keyframes lab-pop { 0% { opacity: 1; transform: translate(-50%,-50%) rotate(var(--lab-a,0deg)) translateY(0); } 100% { opacity: 0; transform: translate(-50%,-50%) rotate(var(--lab-a,0deg)) translateY(calc(-1 * var(--lab-d, 36px))); } }
        @media (prefers-reduced-motion: reduce) {
          .lab-confetti i { animation: none; opacity: 0.85; transform: translate(-50%,-50%) rotate(var(--lab-a,0deg)) translateY(calc(-0.55 * var(--lab-d, 36px))); }
        }
        .lab-sun, .lab-earth, .lab-mars { position: absolute; bottom: 8px; transform: translateX(-50%); line-height: 1; }
        .lab-sun { font-size: 2.4rem; filter: drop-shadow(0 0 12px rgba(255,200,80,0.85)); bottom: 20px; }
        .lab-earth { font-size: 1.5rem; }
        .lab-mars { font-size: 1.35rem; }
        .lab-arc { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
        .lab-rocket { position: absolute; font-size: 1.4rem; transition: left 0.08s linear, top 0.08s linear; }
        @media (prefers-reduced-motion: reduce) { .lab-rocket { transition: none; } }
        .lab-cap { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 0.7rem; color: var(--sage, #B0CBBC); display: block; margin-bottom: 4px; }
        .lab-slider-label input { width: 100%; accent-color: var(--sage, #B0CBBC); }
        .lab-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 16px 0 0; }
        .lab-stats dd { margin: 0; font-size: 1.05rem; }
        .lab-note { margin: 16px 0 0; font-size: 0.9rem; opacity: 0.85; }
        @media (max-width: 400px) { .lab-stats { grid-template-columns: 1fr; gap: 8px; } .lab-sun { font-size: 2rem; } }
      `}</style>
    </section>
  );
}
