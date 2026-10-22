"use client";
import { useState, useCallback } from "react";

const MAX = 210; /* ~225M km illustrative transfer, ~210 days (not ephemeris) */
const TOTAL_KM = 225_000_000;
const phase = (d: number) => (d <= 21 ? "Launch" : d >= 189 ? "Arrival" : "Cruise");

export default function Lab() {
  const [day, setDay] = useState(0);
  const t = day / MAX;
  const ship = { x: 28 + t * 44, y: 52 - 18 * Math.sin(Math.PI * t) };
  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); setDay((d) => Math.max(0, d - 1)); }
    else if (e.key === "ArrowRight") { e.preventDefault(); setDay((d) => Math.min(MAX, d + 1)); }
  }, []);

  return (
    <section data-lab="custom-1792663201" aria-labelledby="mars-trip-title" className="lab-m" tabIndex={0} onKeyDown={onKey}>
      <h2 id="mars-trip-title">Trip to Mars</h2>
      <div className="lab-c">
        <div className="lab-sky" aria-hidden="true">
          <span className="lab-b lab-sun" /><span className="lab-b lab-earth" /><span className="lab-b lab-mars" />
          <svg className="lab-path" viewBox="0 0 100 60" preserveAspectRatio="none">
            <path d="M28 52Q50 22 72 52" fill="none" stroke="rgba(176,203,188,0.55)" strokeWidth="0.6" strokeDasharray="2 2" />
          </svg>
          <span className="lab-ship" style={{ left: `${ship.x}%`, top: `${ship.y}%` }} />
        </div>
        <label htmlFor="mars-day"><span className="lab-k">Mission day</span>
          <input id="mars-day" className="lab-rng" type="range" min={0} max={MAX} value={day} onChange={(e) => setDay(+e.target.value)} />
        </label>
        <dl className="lab-st">
          <div><dt className="lab-k">Day</dt><dd>{day}</dd></div>
          <div><dt className="lab-k">Distance</dt><dd>{Math.round((day / MAX) * TOTAL_KM)} km</dd></div>
          <div><dt className="lab-k">Phase</dt><dd>{phase(day)}</dd></div>
        </dl>
      </div>
      <p className="lab-note">Example data: distances and timeline are illustrative, not mission-grade.</p>
      <style>{`
.lab-m{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-m h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px}
.lab-c{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
.lab-sky{position:relative;height:130px;margin-bottom:16px;overflow:hidden}
.lab-b{position:absolute;border-radius:50%;transform:translate(-50%,-50%)}
.lab-sun{width:40px;height:40px;left:10%;top:50%;background:radial-gradient(circle at 35% 35%,#ffe9a8,#f5a623 55%,#c45c00);box-shadow:0 0 20px rgba(245,166,35,.4)}
.lab-earth{width:34px;height:34px;left:28%;top:52%;background:radial-gradient(circle at 30% 30%,#7ec8e3,#1a5f8a 50%,#0d3d5c)}
.lab-mars{width:28px;height:28px;left:72%;top:52%;background:radial-gradient(circle at 35% 35%,#e8a088,#b84a32 55%,#6e2418)}
.lab-path{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.lab-ship{position:absolute;width:12px;height:12px;transform:translate(-50%,-50%) rotate(45deg);background:var(--sage,#b0cbbc);border-radius:2px 5px 2px 5px}
.lab-k{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:10px;display:block;margin-bottom:6px;color:#E8EEE9}
.lab-rng{width:100%;accent-color:var(--sage,#b0cbbc);margin-bottom:12px}
.lab-st{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:0}
.lab-st dd{margin:2px 0 0;font-size:17px}
.lab-note{margin:14px 0 0;font-size:14px;opacity:.85}
@media(max-width:420px){.lab-st{grid-template-columns:1fr}.lab-sky{height:110px}}
      `}</style>
    </section>
  );
}
