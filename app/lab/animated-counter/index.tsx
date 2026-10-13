"use client";

import { useEffect, useRef, useState } from "react";

/* FAO Global Forest Resources Assessment 2020 */
const STATS = [
  { final: "31%", label: "Land in forest" },
  { final: "662", label: "Gt carbon stored" },
  { final: "10M", label: "Hectares lost / yr" },
];

const css = `
  .lab-wrap{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
  .lab-wrap .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;color:var(--sage);margin:0 0 8px}
  .lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 24px;color:var(--mist,#F2EFE6)}
  .lab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
  .lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;text-align:center}
  .lab-card strong{display:block;font-family:var(--serif);font-weight:400;font-size:40px;line-height:1.1;color:var(--mist,#F2EFE6)}
  .lab-card span{display:block;margin-top:10px;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:var(--sage)}
  @media (max-width:640px){.lab-grid{grid-template-columns:1fr}}
`;

function seed(text: string) {
  const n = parseInt(text, 10);
  return text.replace(String(n), "0");
}

export default function AnimatedCounter() {
  const root = useRef<HTMLElement>(null);
  const [vals, setVals] = useState(() => STATS.map((s) => seed(s.final)));

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVals(STATS.map((s) => s.final));
      return;
    }
    const node = root.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / 1200);
        const ease = 1 - (1 - t) ** 3;
        setVals(
          STATS.map((s) => {
            const n = parseInt(s.final, 10);
            if (t >= 1) return s.final;
            return s.final.replace(String(n), String(Math.round(n * ease)));
          })
        );
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.25 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} data-lab="animated-counter" aria-labelledby="lab-ac-title" className="lab-wrap">
      <style>{css}</style>
      <p className="label">Forest facts</p>
      <h2 id="lab-ac-title">A living measure of the woods</h2>
      <div className="lab-grid">
        {STATS.map((s, i) => (
          <article className="lab-card" key={s.final}>
            <strong data-final={s.final}>{vals[i]}</strong>
            <span>{s.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
