"use client";
import { useState, useMemo } from "react";

const MAX = 210; /* Hohmann transfer ~210 days Earth–Mars */
const fmt = (n: number) => {
  const s = String(Math.round(n));
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const phase = (d: number) => (d < 40 ? "Launch" : d < 185 ? "Cruise" : "Approach");
const distKm = (d: number) => 2.5e6 + (d / MAX) * 5.41e7; /* illustrative leg length */
const pt = (t: number) => {
  const x0 = 78, y0 = 92, cx = 155, cy = 38, x1 = 248, y1 = 92;
  const u = 1 - t;
  return { x: u * u * x0 + 2 * u * t * cx + t * t * x1, y: u * u * y0 + 2 * u * t * cy + t * t * y1 };
};
const CONF: [number, number, string][] = [
  [0, -18, "#B0CBBC"], [12, -8, "#E8EEE9"], [-14, -12, "#B5895B"], [8, 14, "#B0CBBC"],
  [-6, 16, "#E8EEE9"], [18, 4, "#B5895B"], [-16, 6, "#B0CBBC"], [4, -22, "#E8EEE9"],
];

export default function Lab() {
  const [day, setDay] = useState(0);
  const t = day / MAX;
  const r = useMemo(() => pt(t), [t]);
  const arrived = day >= MAX;

  return (
    <section data-lab="custom-1792730943" aria-labelledby="lab-mars-title" className="lab-wrap">
      <h2 id="lab-mars-title">Trip to Mars</h2>
      <div className="lab-phone">
        <svg className="lab-scene" viewBox="0 0 300 170" overflow="visible" role="img" aria-label="Earth to Mars transfer">
          <path className="lab-path" d="M 78 92 Q 155 38 248 92" fill="none" />
          <circle className="lab-sun" data-sun="sun" cx="34" cy="92" r="16" />
          <circle className="lab-earth" data-earth="earth" cx="68" cy="92" r="9" />
          <circle className="lab-mars" data-mars="mars" cx="248" cy="92" r="11" />
          {arrived && (
            <g className="lab-confetti" aria-hidden="true">
              {CONF.map((c, i) => (
                <rect key={i} x={248 + c[0]} y={92 + c[1]} width="4" height="7" fill={c[2]} className="lab-conf" />
              ))}
            </g>
          )}
        </svg>
        <span className="lab-rocket" data-rocket="rocket" aria-label="rocket" style={{ left: `${(r.x / 300) * 100}%`, top: `${(r.y / 170) * 100}%` }}>
          🚀
        </span>
        {arrived && <p className="lab-arrived" role="status">Arrived at Mars!</p>}
      </div>
      <dl className="lab-stats">
        <div><dt className="lab-k">Day</dt><dd>{day}</dd></div>
        <div><dt className="lab-k">Distance</dt><dd>{fmt(distKm(day))} km</dd></div>
        <div><dt className="lab-k">Phase</dt><dd>{phase(day)}</dd></div>
      </dl>
      <label className="lab-slider-l">
        <span className="lab-k">Mission day</span>
        <input className="lab-slider" data-slider="slider" type="range" min={0} max={MAX} value={day} onChange={(e) => setDay(+e.target.value)} />
      </label>
      <p className="lab-note">Example data: transfer timeline and distances are illustrative.</p>
      <style>{`
        .lab-wrap{max-width:min(720px,100%);margin:8px auto 56px;padding:0 clamp(12px,4vw,24px);color:var(--mist,#E8EEE9)}
        .lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px;color:var(--mist,#F2EFE6)}
        .lab-phone{position:relative;border:1px solid rgba(176,203,188,.28);border-radius:28px;padding:18px 14px 42px;background:rgba(18,26,22,.55);max-width:320px;margin:0 auto 20px}
        .lab-scene{display:block;width:100%;height:auto;overflow:visible}
        .lab-path{stroke:rgba(176,203,188,.45);stroke-width:2;stroke-dasharray:6 5}
        .lab-sun{fill:#B5895B;filter:drop-shadow(0 0 10px rgba(181,137,91,.55))}
        .lab-earth{fill:#6B9BB8}
        .lab-mars{fill:#C46C52}
        .lab-rocket{position:absolute;transform:translate(-50%,-50%);font-size:18px;line-height:1;pointer-events:none}
        .lab-arrived{position:absolute;left:0;right:0;bottom:10px;text-align:center;font-family:var(--serif);font-size:18px;color:var(--sage,#B0CBBC)}
        .lab-confetti .lab-conf{transform-origin:center;animation:lab-pop .9s ease-out both}
        .lab-confetti .lab-conf:nth-child(odd){animation-name:lab-pop2}
        @keyframes lab-pop{from{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(.6) translateY(-28px)}}
        @keyframes lab-pop2{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.5) translate(12px,-22px)}}
        @media (prefers-reduced-motion:reduce){.lab-confetti .lab-conf{animation:none;opacity:.85}}
        .lab-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:16px 20px;margin-bottom:16px}
        .lab-k{font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--sage,#B0CBBC);margin-bottom:4px}
        .lab-stats dd{font-family:var(--serif);font-size:22px;margin:0}
        .lab-slider-l{display:block}
        .lab-slider-l .lab-k{display:block;margin-bottom:8px}
        .lab-slider{width:100%;accent-color:var(--sage,#B0CBBC)}
        .lab-note{margin-top:20px;font-size:15px;color:rgba(232,238,233,.72)}
        @media (max-width:390px){.lab-stats{grid-template-columns:1fr;gap:10px}}
      `}</style>
    </section>
  );
}
