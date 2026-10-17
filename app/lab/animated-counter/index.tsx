"use client";

import { useEffect, useRef, useState } from "react";

/* Example figures for the lab slot; not sourced measurements. */
const STATS = [
  { final: "2,847", value: 2847, label: "Trees planted" },
  { final: "96%", value: 96, label: "Native species" },
  { final: "12", value: 12, label: "Forest acres" },
];

const css = `
.lab-stats{width:min(960px,100%);margin:8px auto 56px;color:var(--mist);padding:0 16px;box-sizing:border-box}
.lab-stats h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 24px;color:#F2EFE6}
.lab-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media (max-width:640px){.lab-grid{grid-template-columns:1fr}}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;text-align:center}
.lab-card strong{display:block;font-family:var(--serif);font-size:36px;font-weight:400;color:var(--sage)}
.lab-label{display:block;margin-top:8px;font-family:var(--sans);font-weight:500;letter-spacing:0.16em;text-transform:uppercase;font-size:12px;color:#E8EEE9}
.lab-note{margin:16px 0 0;font-size:14px;color:#E8EEE9}
`;

function formatStep(n: number, final: string) {
  if (final.endsWith("%")) return `${n}%`;
  if (final.includes(",")) return n.toLocaleString("en-US");
  return String(n);
}

export default function AnimatedCounter() {
  const root = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  const [shown, setShown] = useState(["0", "0", "0"]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(STATS.map((s) => s.final));
      return;
    }
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!on) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1200);
      setShown(
        STATS.map((s) => (p >= 1 ? s.final : formatStep(Math.round(s.value * p), s.final)))
      );
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  return (
    <section ref={root} data-lab="animated-counter" aria-labelledby="lab-counter-title" className="lab-stats">
      <h2 id="lab-counter-title">Forest in numbers</h2>
      <style>{css}</style>
      <div className="lab-grid">
        {STATS.map((s, i) => (
          <div className="lab-card" key={s.label}>
            <strong data-final={s.final}>{shown[i]}</strong>
            <span className="lab-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="lab-note">Example data: figures are illustrative for this lab demo.</p>
    </section>
  );
}

