"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { final: "1,240", label: "Hours logged" },
  { final: "86%", label: "On-time rate" },
  { final: "42", label: "Releases" },
];

const css = `
.lab-wrap{width:min(960px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box;color:var(--mist,#F2EFE6)}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;list-style:none;margin:0;padding:0}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;text-align:center}
.lab-card strong{display:block;font-family:var(--serif);font-weight:400;font-size:40px;line-height:1.1;color:var(--sage,#B0CBBC)}
.lab-label{display:block;margin-top:10px;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:#E8EEE9}
.lab-note{margin:16px 0 0;font-family:var(--sans);font-size:14px;color:#E8EEE9}
@media (max-width:640px){.lab-grid{grid-template-columns:1fr}}
`;

function targetOf(text: string) {
  return Number(text.replace(/[^\d.]/g, "")) || 0;
}

export default function AnimatedCounter() {
  const rootRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(["0", "0", "0"]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(STATS.map((s) => s.final));
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const goals = STATS.map((s) => targetOf(s.final));
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1200);
        if (t >= 1) {
          setShown(STATS.map((s) => s.final));
          return;
        }
        setShown(goals.map((n) => String(Math.round(n * t))));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      data-lab="animated-counter"
      aria-labelledby="lab-ac-title"
      className="lab-wrap"
    >
      <h2 id="lab-ac-title">Work in motion</h2>
      <style>{css}</style>
      <ul className="lab-grid">
        {STATS.map((s, i) => (
          <li key={s.label} className="lab-card">
            <strong data-final={s.final}>{shown[i]}</strong>
            <span className="lab-label">{s.label}</span>
          </li>
        ))}
      </ul>
      <p className="lab-note">Example data: sample figures for this lab demo.</p>
    </section>
  );
}
