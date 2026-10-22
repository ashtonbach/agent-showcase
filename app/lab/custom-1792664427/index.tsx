"use client";
import { useCallback, useEffect, useState, type KeyboardEvent } from "react";

// Total path ~480M km — illustrative Mars transfer distance (NASA/JPL mission planning refs)
const MAX_KM = 480_000_000;
const MAX_DAY = 210;

function phaseFor(day: number): string {
  if (day <= 21) return "Launch";
  if (day >= 189) return "Arrival";
  return "Cruise";
}

function fmtKm(n: number): string {
  const s = String(Math.round(n));
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += ",";
    out += s[i];
  }
  return out;
}

function curvePoint(t: number, w: number, h: number) {
  const x0 = w * 0.28;
  const x2 = w * 0.88;
  const y0 = h * 0.72;
  const y2 = h * 0.72;
  const cx = w * 0.58;
  const cy = h * 0.12;
  const u = 1 - t;
  const x = u * u * x0 + 2 * u * t * cx + t * t * x2;
  const y = u * u * y0 + 2 * u * t * cy + t * t * y2;
  const tx = 2 * u * (cx - x0) + 2 * t * (x2 - cx);
  const ty = 2 * u * (cy - y0) + 2 * t * (y2 - cy);
  const angle = (Math.atan2(ty, tx) * 180) / Math.PI;
  return { x, y, angle };
}

const css = `
.lab-wrap{max-width:min(960px,100%);margin:8px auto 56px;padding:0 12px;color:var(--mist,#F2EFE6)}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
.lab-wrap h2{font-family:var(--serif,serif);font-weight:400;font-size:30px;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-scene{position:relative;width:100%;aspect-ratio:2.2/1;min-height:140px;margin-bottom:20px}
.lab-scene svg{display:block;width:100%;height:100%}
.lab-sun{position:absolute;left:0;top:50%;transform:translateY(-50%);width:clamp(52px,14vw,88px);height:clamp(52px,14vw,88px);border-radius:50%;background:radial-gradient(circle at 35% 35%,#ffe9a8,#f5a623 55%,#c45c00);box-shadow:0 0 28px rgba(245,166,35,0.55),0 0 60px rgba(245,166,35,0.25)}
@media (prefers-reduced-motion:no-preference){.lab-sun{animation:lab-glow 4s ease-in-out infinite}}
@keyframes lab-glow{0%,100%{box-shadow:0 0 28px rgba(245,166,35,0.55),0 0 60px rgba(245,166,35,0.25)}50%{box-shadow:0 0 36px rgba(245,166,35,0.7),0 0 72px rgba(245,166,35,0.35)}}
.lab-planet{position:absolute;border-radius:50%;transform:translate(-50%,-50%)}
.lab-earth{width:clamp(28px,7vw,40px);height:clamp(28px,7vw,40px);left:28%;top:72%;background:radial-gradient(circle at 30% 30%,#6eb5ff,#1a5fb4 50%,#0d3d6e)}
.lab-mars{width:clamp(22px,5.5vw,32px);height:clamp(22px,5.5vw,32px);left:88%;top:72%;background:radial-gradient(circle at 35% 35%,#e8a088,#c1440e 55%,#8b2500)}
.lab-rock{position:absolute;font-size:clamp(18px,4.5vw,26px);line-height:1;transform:translate(-50%,-50%);pointer-events:none}
.lab-stats{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:16px}
@media(min-width:480px){.lab-stats{grid-template-columns:repeat(3,1fr)}}
.lab-stat-label{font-family:var(--sans,sans-serif);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;color:var(--sage,#B0CBBC);margin-bottom:4px}
.lab-stat-val{font-size:18px;color:var(--mist,#F2EFE6)}
.lab-slider{width:100%;accent-color:var(--sage,#8FAF9A)}
.lab-slider:focus-visible{outline:2px solid var(--sage,#8FAF9A);outline-offset:2px}
.lab-hint{font-size:13px;color:rgba(242,239,230,0.65);margin-top:8px}
.lab-note{margin:20px 0 0;font-size:14px;color:rgba(242,239,230,0.75)}
`;

export default function Lab() {
  const [day, setDay] = useState(0);
  const t = day / MAX_DAY;
  const w = 400;
  const h = 120;
  const { x, y, angle } = curvePoint(t, w, h);
  const pathD = `M ${w * 0.28} ${h * 0.72} Q ${w * 0.58} ${h * 0.12} ${w * 0.88} ${h * 0.72}`;
  const km = (day / MAX_DAY) * MAX_KM;

  const onKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setDay((d) => Math.max(0, d - 1));
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setDay((d) => Math.min(MAX_DAY, d + 1));
    }
  }, []);

  useEffect(() => {
    const hdl = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && el.classList.contains("lab-slider")) return;
      if (e.key === "ArrowLeft") setDay((d) => Math.max(0, d - 1));
      if (e.key === "ArrowRight") setDay((d) => Math.min(MAX_DAY, d + 1));
    };
    window.addEventListener("keydown", hdl);
    return () => window.removeEventListener("keydown", hdl);
  }, []);

  return (
    <section data-lab="custom-1792664427" aria-labelledby="lab-mars-title" className="lab-wrap">
      <style>{css}</style>
      <h2 id="lab-mars-title">Trip to Mars</h2>
      <div className="lab-card">
        <div className="lab-scene" aria-hidden="true">
          <div className="lab-sun" />
          <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
            <path d={pathD} fill="none" stroke="rgba(176,203,188,0.45)" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
          <span className="lab-planet lab-earth" />
          <span className="lab-planet lab-mars" />
          <span
            className="lab-rock"
            style={{ left: `${(x / w) * 100}%`, top: `${(y / h) * 100}%`, transform: `translate(-50%,-50%) rotate(${angle}deg)` }}
          >
            🚀
          </span>
        </div>
        <div className="lab-stats">
          <div>
            <div className="lab-stat-label">Day</div>
            <div className="lab-stat-val">{day}</div>
          </div>
          <div>
            <div className="lab-stat-label">Distance</div>
            <div className="lab-stat-val">{fmtKm(km)} km</div>
          </div>
          <div>
            <div className="lab-stat-label">Phase</div>
            <div className="lab-stat-val">{phaseFor(day)}</div>
          </div>
        </div>
        <label className="lab-stat-label" htmlFor="lab-day-slider">Travel day</label>
        <input
          id="lab-day-slider"
          className="lab-slider"
          type="range"
          min={0}
          max={MAX_DAY}
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          onKeyDown={onKey}
        />
        <p className="lab-hint">Use arrow keys to move the rocket along the path.</p>
      </div>
      <p className="lab-note">Example data: distances and phases illustrate a sample Earth–Mars transfer timeline.</p>
    </section>
  );
}
