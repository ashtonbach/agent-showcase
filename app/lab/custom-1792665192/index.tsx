"use client";
import { useState } from "react";
const MAX = 210, KM = 225_000_000; // illustrative ~210-day transfer path length
const fmt = (n: number) => { const s = String(Math.round(n)); return s.replace(/\B(?=(\d{3})+(?!\d))/g, ","); };
const phase = (d: number) => (d <= 30 ? "Launch" : d >= 180 ? "Arrival" : "Cruise");
const bez = (t: number) => {
  const u = 1 - t, x = u * u * 38 + 2 * u * t * 64 + t * t * 90, y = u * u * 50 + 2 * u * t * 28 + t * t * 50;
  const dx = 2 * u * 26 + 2 * t * 26, dy = 2 * u * -22 + 2 * t * 22;
  return { x, y, a: (Math.atan2(dy, dx) * 180) / Math.PI };
};
export default function Lab() {
  const [day, setDay] = useState(0);
  const t = day / MAX, r = bez(t), step = (d: number) => setDay((v) => Math.min(MAX, Math.max(0, v + d)));
  return (
    <section data-lab="custom-1792665192" aria-labelledby="lab-mars-title" className="lab-w" tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); step(e.shiftKey ? -10 : -1); }
        else if (e.key === "ArrowRight") { e.preventDefault(); step(e.shiftKey ? 10 : 1); }
      }}>
      <style>{`.lab-w{max-width:min(960px,100%);margin:8px auto 56px;padding:0 16px;color:var(--mist,#F2EFE6)}
.lab-w h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px}
.lab-c{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
.lab-sv{width:100%;aspect-ratio:16/9;min-height:180px;max-height:300px}.lab-sv svg{width:100%;height:100%;overflow:visible}
.lab-sun{fill:#f5c842;filter:drop-shadow(0 0 16px rgba(245,200,66,.9))}
.lab-earth{fill:#5b9bd5}.lab-mars{fill:#c45c3e}
.lab-path{fill:none;stroke:rgba(176,203,188,.45);stroke-width:.6;stroke-dasharray:2 2}
.lab-rk{font-size:14px}.lab-ctl{margin-top:18px}
.lab-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.lab-row input{flex:1 1 160px;min-width:0;accent-color:var(--sage,#8fb39a)}
.lab-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin-top:14px}
.lab-box{border:1px solid rgba(176,203,188,.2);border-radius:12px;padding:10px 12px}
.lab-lbl{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;opacity:.75;margin-bottom:2px}
.lab-val{font-size:17px;color:var(--sage,#b0cbb8)}.lab-note{margin:18px 0 0;font-size:14px;opacity:.7}`}</style>
      <h2 id="lab-mars-title">Trip to Mars</h2>
      <div className="lab-c">
        <div className="lab-sv" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <circle className="lab-sun" cx="12" cy="50" r="9" />
            <circle className="lab-earth" cx="38" cy="50" r="5" />
            <circle className="lab-mars" cx="90" cy="50" r="4.5" />
            <path className="lab-path" d="M38 50Q64 28 90 50" />
            <text className="lab-rk" x={r.x} y={r.y} textAnchor="middle" dominantBaseline="middle"
              transform={`rotate(${r.a} ${r.x} ${r.y})`}>🚀</text>
          </svg>
        </div>
        <div className="lab-ctl">
          <div className="lab-row">
            <label className="lab-lbl" htmlFor="lab-day">Day</label>
            <input id="lab-day" type="range" min={0} max={MAX} value={day} onChange={(e) => setDay(+e.target.value)}
              aria-valuemin={0} aria-valuemax={MAX} aria-valuenow={day} aria-valuetext={`Day ${day}`} />
          </div>
          <div className="lab-grid">
            <div className="lab-box"><div className="lab-lbl">Day</div><div className="lab-val">{day}</div></div>
            <div className="lab-box"><div className="lab-lbl">Distance</div><div className="lab-val">{fmt((day / MAX) * KM)} km</div></div>
            <div className="lab-box"><div className="lab-lbl">Phase</div><div className="lab-val">{phase(day)}</div></div>
          </div>
        </div>
      </div>
      <p className="lab-note">Example data: distance and phases are illustrative for this slider demo.</p>
    </section>
  );
}
