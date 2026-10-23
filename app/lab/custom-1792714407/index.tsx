"use client";
import { useEffect, useRef, useState } from "react";
const MAX_DAY = 210, TOTAL_KM = 225000000; /* ~225M km / ~210 d transfer */
const EARTH_X = 50, MARS_X = 88, SUN_X = 12, ROW_Y = 52;
function fmtKm(n: number) {
  const s = String(Math.round(n)); let o = "";
  for (let i = 0; i < s.length; i++) { if (i > 0 && (s.length - i) % 3 === 0) o += ","; o += s[i]; }
  return o;
}
function phase(day: number) {
  if (day <= 14) return "Launch";
  if (day >= 196) return "Arrival";
  return "Cruise";
}
function arcPoint(t: number) {
  const x0 = EARTH_X + 1.2, y0 = ROW_Y, x1 = MARS_X - 1.2, y1 = ROW_Y;
  const cx = (x0 + x1) / 2, cy = ROW_Y - 22, u = 1 - t;
  return { x: u * u * x0 + 2 * u * t * cx + t * t * x1, y: u * u * y0 + 2 * u * t * cy + t * t * y1 };
}
export default function Lab() {
  const [day, setDay] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);
  const t = day / MAX_DAY, pos = arcPoint(t);
  const angle = (Math.atan2(ROW_Y - pos.y, MARS_X - pos.x) * 180) / Math.PI + 55;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); setDay((d) => Math.max(0, d - 1)); }
      else if (e.key === "ArrowRight") { e.preventDefault(); setDay((d) => Math.min(MAX_DAY, d + 1)); }
    };
    window.addEventListener("keydown", onKey);
    const el = sliderRef.current, sync = () => el && setDay(Number(el.value));
    if (el) { el.addEventListener("input", sync); el.addEventListener("change", sync); }
    return () => {
      window.removeEventListener("keydown", onKey);
      if (el) { el.removeEventListener("input", sync); el.removeEventListener("change", sync); }
    };
  }, []);
  const css = `
.lab-wrap{max-width:min(960px,100%);margin:8px auto 56px;padding:0 12px;box-sizing:border-box}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
section[data-lab="custom-1792714407"]>h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin:0 auto 12px;padding:0 12px;max-width:min(960px,100%)}
.lab-scene{position:relative;width:100%;height:140px;overflow:visible;margin:0 0 20px}
.lab-arc{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.lab-sun{position:absolute;left:${SUN_X}%;top:${ROW_Y}%;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:radial-gradient(circle,#ffe08a 0%,#f5a623 45%,rgba(245,166,35,0.35) 70%,transparent 72%);box-shadow:0 0 28px 12px rgba(255,200,80,0.45),0 0 48px 20px rgba(255,160,40,0.2)}
.lab-earth,.lab-mars{position:absolute;top:${ROW_Y}%;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%}
.lab-earth{left:${EARTH_X}%;background:radial-gradient(circle at 35% 35%,#6eb5ff,#1a5fb4 60%,#0d3d7a)}
.lab-mars{left:${MARS_X}%;background:radial-gradient(circle at 40% 35%,#e88b6a,#b33c2e 65%,#6e2218)}
.lab-rocket{position:absolute;font-size:22px;line-height:1;margin:-11px 0 0 -11px;transform-origin:center}
.lab-stats{display:grid;gap:8px;margin-bottom:16px;color:#E8EEE9;font-family:var(--sans);font-size:15px}
.lab-stat-label{font-size:11px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:var(--sage);margin-right:8px}
.lab-slider{width:100%;accent-color:var(--sage)}
.lab-note{margin:16px 0 0;font-size:14px;color:rgba(242,239,230,0.75)}`;
  const arc = `M ${EARTH_X + 1.2} ${ROW_Y} Q ${(EARTH_X + MARS_X) / 2} ${ROW_Y - 22} ${MARS_X - 1.2} ${ROW_Y}`;
  return (
    <section data-lab="custom-1792714407" aria-labelledby="lab-mars-title">
      <style>{css}</style>
      <h2 id="lab-mars-title">Trip to Mars</h2>
      <div className="lab-wrap"><div className="lab-card">
        <div className="lab-scene" aria-hidden="true">
          <svg className="lab-arc" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d={arc} fill="none" stroke="rgba(176,203,188,0.45)" strokeWidth="0.4" strokeDasharray="1.2 1.2" />
          </svg>
          <div className="lab-sun" data-lab-obj="sun" />
          <div className="lab-earth" data-lab-obj="earth" />
          <div className="lab-mars" data-lab-obj="mars" />
          <span className="lab-rocket" data-lab-obj="rocket" style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: `rotate(${angle}deg)` }}>🚀</span>
        </div>
        <div className="lab-stats">
          <div><span className="lab-stat-label">Day</span>{day}</div>
          <div><span className="lab-stat-label">Distance</span>{fmtKm((day / MAX_DAY) * TOTAL_KM)} km</div>
          <div><span className="lab-stat-label">Phase</span>{phase(day)}</div>
        </div>
        <label className="lab-stat-label" htmlFor="lab-day-slider">Journey timeline</label>
        <input id="lab-day-slider" ref={sliderRef} className="lab-slider" type="range" min={0} max={MAX_DAY} value={day}
          onChange={(e) => setDay(Number(e.target.value))} aria-valuetext={`Day ${day}, ${phase(day)}`} />
        <p className="lab-note">Example data: distances approximate a ~210-day Earth–Mars transfer (~225 million km).</p>
      </div></div>
    </section>
  );
}
