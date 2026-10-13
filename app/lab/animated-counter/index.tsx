"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { final: "128", label: "Cities mapped" },
  { final: "46%", label: "Canopy cover" },
  { final: "9.4k", label: "Trail hours" },
];
const css = `
.lab-wrap{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-wrap .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--sage);margin:0 0 8px;font-size:12px}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 24px;color:var(--mist,#E8EEE9)}
.lab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;text-align:center;min-width:0}
.lab-card strong{display:block;font-family:var(--serif);font-weight:400;font-size:clamp(28px,6vw,40px);color:var(--mist,#F2EFE6);line-height:1.15}
.lab-card em{display:block;margin-top:8px;font-style:normal;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:var(--sage)}
@media (max-width:520px){.lab-grid{grid-template-columns:1fr}}
`;
function toward(final: string, p: number) {
  const m = final.match(/([\d.]+)/);
  if (!m || p >= 1) return final;
  const n = parseFloat(m[1]);
  const cur = m[1].includes(".") ? (n * p).toFixed(1) : String(Math.round(n * p));
  return final.replace(m[1], cur);
}

export default function Lab() {
  const root = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      setP(1);
      return;
    }
    const io = new IntersectionObserver((ents) => {
      if (!ents[0]?.isIntersecting) return;
      io.disconnect();
      setOn(true);
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / 1200);
        setP(t);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.2 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={root} data-lab="animated-counter" aria-labelledby="lab-ac-title" className="lab-wrap">
      <style>{css}</style>
      <p className="label">Example data</p>
      <h2 id="lab-ac-title">Growth at a glance</h2>
      <div className="lab-grid">
        {STATS.map((s) => (
          <article key={s.label} className="lab-card">
            <strong data-final={s.final}>{on ? toward(s.final, p) : "0"}</strong>
            <em>{s.label}</em>
          </article>
        ))}
      </div>
    </section>
  );
}
