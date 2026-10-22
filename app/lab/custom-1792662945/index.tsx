"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_DAY = 210;
// NASA Insight cruise ~6.5 months (~200 d); ~480M km total path length (simplified linear model).
const TOTAL_KM = 480_000_000;

function phaseFor(day: number): string {
  if (day <= 14) return "Launch";
  if (day >= 196) return "Arrival";
  return "Cruise";
}

function distanceKm(day: number): number {
  return Math.round((day / MAX_DAY) * TOTAL_KM);
}

export default function Lab() {
  const [day, setDay] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const progress = day / MAX_DAY;
  const shipLeft = 18 + progress * 64;

  const bump = useCallback((delta: number) => {
    setDay((d) => Math.min(MAX_DAY, Math.max(0, d + delta)));
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        bump(-1);
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        bump(1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [bump]);

  const css = `
.lab-wrap{max-width:min(720px,100%);margin:8px auto 56px;padding:0 12px;box-sizing:border-box}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
.lab-h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;color:var(--mist);margin:0 0 20px}
.lab-sky{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 20px;position:relative;min-height:88px}
.lab-body{position:relative;flex:1;height:72px;margin:0 8px}
.lab-dash{position:absolute;left:8%;right:8%;top:50%;height:0;border-top:2px dashed rgba(176,203,188,0.45);transform:translateY(-50%)}
.lab-ship{position:absolute;top:50%;width:14px;height:10px;transform:translate(-50%,-50%);background:var(--sage);clip-path:polygon(0 50%,100% 0,100% 100%);transition:left 0.15s ease}
@media (prefers-reduced-motion:reduce){.lab-ship{transition:none}}
.lab-orb{flex-shrink:0;border-radius:50%;position:relative;z-index:1}
.lab-sun{width:52px;height:52px;background:radial-gradient(circle at 35% 35%,#ffe9a8,#f5a623 55%,#c45c00)}
.lab-earth{width:40px;height:40px;background:radial-gradient(circle at 30% 30%,#7ec8e3,#1e6b9e 50%,#0d3d56)}
.lab-mars{width:36px;height:36px;background:radial-gradient(circle at 35% 35%,#e8a088,#c1440e 55%,#6b2210)}
.lab-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0 0 20px}
@media(max-width:420px){.lab-stats{grid-template-columns:1fr}}
.lab-stat{border:1px solid rgba(176,203,188,0.2);border-radius:12px;padding:12px}
.lab-label{font-family:var(--sans);font-weight:500;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(232,238,233,0.75);margin:0 0 6px}
.lab-val{font-size:18px;color:var(--mist);margin:0}
.lab-slider-wrap{margin:0}
.lab-slider{width:100%;accent-color:var(--sage);cursor:pointer}
.lab-range-labels{display:flex;justify-content:space-between;font-size:12px;color:rgba(232,238,233,0.65);margin-top:6px}
.lab-note{margin:20px 0 0;font-size:14px;color:rgba(232,238,233,0.7);line-height:1.45}
`;

  return (
    <section
      ref={sectionRef}
      data-lab="custom-1792662945"
      aria-labelledby="lab-mars-title"
      className="lab-wrap"
      tabIndex={0}
    >
      <style>{css}</style>
      <div className="lab-card">
        <h2 id="lab-mars-title" className="lab-h2">Trip to Mars</h2>
        <div className="lab-sky" aria-hidden="true">
          <div className="lab-orb lab-sun" title="Sun" />
          <div className="lab-orb lab-earth" title="Earth" />
          <div className="lab-body">
            <div className="lab-dash" />
            <div className="lab-ship" style={{ left: `${shipLeft}%` }} />
          </div>
          <div className="lab-orb lab-mars" title="Mars" />
        </div>
        <div className="lab-stats">
          <div className="lab-stat">
            <p className="lab-label">Day</p>
            <p className="lab-val">{day}</p>
          </div>
          <div className="lab-stat">
            <p className="lab-label">Distance</p>
            <p className="lab-val">{distanceKm(day)} km</p>
          </div>
          <div className="lab-stat">
            <p className="lab-label">Phase</p>
            <p className="lab-val">{phaseFor(day)}</p>
          </div>
        </div>
        <div className="lab-slider-wrap">
          <input
            className="lab-slider"
            type="range"
            min={0}
            max={MAX_DAY}
            value={day}
            aria-valuemin={0}
            aria-valuemax={MAX_DAY}
            aria-valuenow={day}
            aria-label="Mission day"
            onChange={(e) => setDay(Number(e.target.value))}
          />
          <div className="lab-range-labels">
            <span>Day 0</span>
            <span>Day {MAX_DAY}</span>
          </div>
        </div>
        <p className="lab-note">Example data: timeline and distances are simplified for illustration.</p>
      </div>
    </section>
  );
}
