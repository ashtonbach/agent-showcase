"use client";
import { useEffect, useRef, useState } from "react";
const ICONS = ["🎄", "⭐", "🎁", "❄️"];
const STATS = [
  { label: "Projects shipped", value: 128 },
  { label: "Happy clients", value: 42 },
  { label: "Cups of coffee", value: 903 },
];
const css = `
.lab-xmas-banner{position:fixed;top:var(--header-h);left:0;right:0;z-index:19;max-height:100px;display:flex;align-items:center;justify-content:center;gap:12px;padding:10px 20px;box-sizing:border-box;background:linear-gradient(90deg,#8b1a1a,#1a5c34 50%,#b8860b);border-bottom:2px solid rgba(242,239,230,.25);color:#f2efe6;font-family:var(--sans);font-size:clamp(13px,2.8vw,16px);font-weight:500;text-align:center;line-height:1.35}
.lab-xmas-graphic{font-size:clamp(28px,6vw,40px);line-height:1;flex-shrink:0}
.lab-xmas-msg{max-width:52rem;margin:0}
body:has([data-lab="custom-1792300265"]) .page-stack{padding-top:min(100px,18vw)}
.lab-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px}
.lab-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:0}
@media(max-width:640px){.lab-stats{grid-template-columns:1fr}}
.lab-stat{text-align:center}
.lab-stat-label{font-family:var(--sans);font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:rgba(232,238,233,.75);margin:0 0 8px}
.lab-stat-num{font-family:var(--serif);font-size:clamp(28px,5vw,36px);color:var(--mist);margin:0}
.lab-note{margin:24px 0 0;font-size:14px;color:rgba(232,238,233,.7);text-align:center}`;
export default function Lab() {
  const [icon, setIcon] = useState(ICONS[0]);
  const [counts, setCounts] = useState(() => STATS.map(() => 0));
  const root = useRef<HTMLElement>(null);
  const done = useRef(false);
  useEffect(() => {
    setIcon(ICONS[Math.floor(Math.random() * ICONS.length)]);
  }, []);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts(STATS.map((s) => s.value));
      return;
    }
    const obs = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting || done.current) return;
      done.current = true;
      const t0 = performance.now();
      const run = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        const ease = 1 - (1 - p) ** 3;
        setCounts(STATS.map((s) => Math.round(s.value * ease)));
        if (p < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={root} data-lab="custom-1792300265" aria-labelledby="lab-custom-h2">
      <style>{css}</style>
      <h2 id="lab-custom-h2">Animated counter</h2>
      <div className="lab-xmas-banner" role="region" aria-label="Christmas holiday notice">
        <span className="lab-xmas-graphic" aria-hidden="true">{icon}</span>
        <p className="lab-xmas-msg">We&apos;re closed Dec 24 &amp; 25 for Christmas. Wishing you a warm, festive season!</p>
      </div>
      <div className="lab-wrap">
        <div className="lab-card">
          <div className="lab-stats">
            {STATS.map((s, i) => (
              <div className="lab-stat" key={s.label}>
                <p className="lab-stat-label">{s.label}</p>
                <p className="lab-stat-num">{counts[i]}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="lab-note">Example data: stat values are illustrative for this demo.</p>
      </div>
    </section>
  );
}
