"use client";
import { useState, useEffect, useMemo } from "react";

const MAX = 210; // illustrative trans-Mars cruise (NASA-class ~7-month transfer)
const PATH_MKM = 225; // source: illustrative Earth–Mars arc length, millions km

type Piece = { id: number; dx: number; dy: number; rot: number; c: string; d: number };

function phase(d: number): string {
  if (d >= MAX) return "Arrival";
  if (d >= 180) return "Approach";
  if (d >= 30) return "Trans-Mars coast";
  if (d > 0) return "Ascent & departure";
  return "Pad";
}

function pointAt(t: number) {
  const sx = 52, sy = 118, ex = 318, ey = 72, cx = 185, cy = 28;
  const u = 1 - t;
  return { x: u * u * sx + 2 * u * t * cx + t * t * ex, y: u * u * sy + 2 * u * t * cy + t * t * ey };
}

export default function Lab() {
  const [day, setDay] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const t = day / MAX;
  const rocket = useMemo(() => pointAt(t), [t]);
  const dist = useMemo(() => ((day / MAX) * PATH_MKM).toFixed(1), [day]);
  const arrived = day >= MAX;

  useEffect(() => {
    if (!arrived) {
      setPieces([]);
      return;
    }
    const cols = ["#B0CBBC", "#E8EEE9", "#D4A574", "#8FBC8F"];
    const next: Piece[] = [];
    for (let i = 0; i < 28; i++)
      next.push({
        id: i,
        dx: (Math.random() - 0.5) * 90,
        dy: (Math.random() - 0.5) * 90,
        rot: Math.random() * 360,
        c: cols[i % cols.length],
        d: Math.random() * 0.35,
      });
    setPieces(next);
  }, [arrived]);

  return (
    <section data-lab="custom-1792718081" aria-labelledby="lab-mars-title" className="lab-wrap">
      <h2 id="lab-mars-title" className="lab-h2">Trip to Mars</h2>
      <div className="lab-card">
        <div className="lab-phone" aria-hidden="true">
          <svg className="lab-svg" viewBox="0 0 360 200" role="img" aria-label="Earth–Mars transfer diagram">
            <defs>
              <radialGradient id="lab-sun-g" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E8C87A" />
                <stop offset="100%" stopColor="#C9A227" />
              </radialGradient>
            </defs>
            <path className="lab-path" d="M 52 118 Q 185 28 318 72" fill="none" />
            <circle cx="28" cy="118" r="16" fill="url(#lab-sun-g)" />
            <circle cx="68" cy="118" r="9" fill="#6B9BD1" stroke="#B0CBBC" strokeWidth="1.2" />
            <circle cx="318" cy="72" r="11" fill="#C46B4A" stroke="#B0CBBC" strokeWidth="1" />
            <g transform={`translate(${rocket.x} ${rocket.y}) rotate(-28)`}>
              <path d="M0 -7 L5 6 L0 3 L-5 6 Z" fill="#E8EEE9" />
            </g>
            {arrived && (
              <g className="lab-confetti-host" transform="translate(318 72)">
                {pieces.map((p) => (
                  <rect
                    key={p.id}
                    className="lab-conf"
                    x={p.dx}
                    y={p.dy}
                    width="5"
                    height="8"
                    fill={p.c}
                    transform={`rotate(${p.rot} ${p.dx + 2.5} ${p.dy + 4})`}
                    style={{ animationDelay: `${p.d}s` }}
                  />
                ))}
              </g>
            )}
          </svg>
        </div>
        {arrived && <p className="lab-arrived" role="status">Arrived at Mars!</p>}
        <div className="lab-stats">
          <div><span className="lab-label">Day</span><span className="lab-val">{day}</span></div>
          <div><span className="lab-label">Distance</span><span className="lab-val">{dist} M km</span></div>
          <div><span className="lab-label">Phase</span><span className="lab-val">{phase(day)}</span></div>
        </div>
        <label className="lab-slider-lab" htmlFor="lab-day">Mission day</label>
        <input
          id="lab-day"
          className="lab-slider"
          type="range"
          min={0}
          max={MAX}
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
        />
      </div>
      <p className="lab-note">Example data: timeline and distances are illustrative for this demo.</p>
      <style>{`
        .lab-wrap{width:min(720px,100%);margin:8px auto 56px;padding:0 clamp(12px,3vw,20px)}
        .lab-h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin-bottom:20px}
        .lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
        .lab-phone{max-width:360px;margin:0 auto 16px;border-radius:28px;border:2px solid rgba(176,203,188,0.22);padding:12px 8px 16px;background:rgba(20,32,26,0.6)}
        .lab-svg{display:block;width:100%;height:auto;overflow:visible}
        .lab-path{stroke:rgba(176,203,188,0.55);stroke-width:2;stroke-dasharray:7 6}
        .lab-arrived{text-align:center;font-family:var(--serif);font-size:22px;color:var(--sage);margin:0 0 12px}
        .lab-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}
        .lab-label{display:block;font-family:var(--sans);font-weight:500;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--sage);margin-bottom:4px}
        .lab-val{display:block;color:var(--mist);font-size:15px}
        .lab-slider-lab{font-family:var(--sans);font-weight:500;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--sage);display:block;margin-bottom:8px}
        .lab-slider{width:100%;accent-color:var(--sage)}
        .lab-note{margin-top:20px;font-size:14px;color:rgba(232,238,233,0.72)}
        .lab-conf{opacity:0;transform-origin:center}
        @media (prefers-reduced-motion:no-preference){
          .lab-conf{animation:lab-pop .9s ease-out forwards}
          @keyframes lab-pop{0%{opacity:1;transform:scale(0.2)}70%{opacity:1}100%{opacity:.85;transform:translateY(12px) scale(1)}}
        }
        @media (prefers-reduced-motion:reduce){.lab-conf{opacity:.9}}
        @media (max-width:390px){.lab-stats{grid-template-columns:1fr;gap:10px}}
      `}</style>
    </section>
  );
}
