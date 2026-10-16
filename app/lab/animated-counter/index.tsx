"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { final: string; label: string; target: number };

// Demo figures for the lab slot — not from a published dataset.
const STATS: Stat[] = [
  { final: "12,480", label: "Seedlings raised", target: 12480 },
  { final: "86%", label: "Canopy retained", target: 86 },
  { final: "3.2×", label: "Habitat return", target: 3.2 },
];

const css = `
  .lab-wrap { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
  .lab-title { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.25; margin: 0 0 20px; color: var(--mist, #F2EFE6); }
  .lab-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; text-align: center; }
  .lab-value { display: block; font-family: var(--serif); font-weight: 400; font-size: clamp(28px, 5vw, 40px); color: var(--sage, #B0CBBC); line-height: 1.1; }
  .lab-label { display: block; margin-top: 10px; font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #E8EEE9; }
  .lab-note { margin: 18px 0 0; font-family: var(--sans); font-size: 14px; color: #E8EEE9; letter-spacing: 0; }
  @media (max-width: 640px) { .lab-grid { grid-template-columns: 1fr; } }
`;

function formatToward(final: string, target: number, p: number) {
  if (p >= 1) return final;
  const n = target * p;
  if (final.includes("%")) return `${Math.round(n)}%`;
  if (final.includes("×")) return `${n.toFixed(1)}×`;
  return Math.round(n).toLocaleString("en-US");
}

export default function AnimatedCounter() {
  const root = useRef<HTMLElement | null>(null);
  const [texts, setTexts] = useState(() => STATS.map(() => "0"));
  const started = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    const play = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setTexts(STATS.map((s) => s.final));
        return;
      }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 1200);
        setTexts(STATS.map((s) => formatToward(s.final, s.target, p)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      play();
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        play();
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={root} data-lab="animated-counter" aria-labelledby="lab-ac-title" className="lab-wrap">
      <style>{css}</style>
      <h2 id="lab-ac-title" className="lab-title">Canopy in numbers</h2>
      <div className="lab-grid">
        {STATS.map((s, i) => (
          <article key={s.label} className="lab-card">
            <strong className="lab-value" data-final={s.final}>{texts[i]}</strong>
            <span className="lab-label">{s.label}</span>
          </article>
        ))}
      </div>
      <p className="lab-note">Example data: figures are for this lab demo only.</p>
    </section>
  );
}

