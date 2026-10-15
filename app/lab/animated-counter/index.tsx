"use client";

import { useEffect, useRef, useState } from "react";

/* Demo figures only — shown as Example data under the stats. */
const STATS = [
  { final: "240", label: "Commits" },
  { final: "18", label: "Reviews" },
  { final: "6", label: "Releases" },
];

const css = `
.lab-stats { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
.lab-stats h2 { font-family: var(--serif, Georgia, serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; }
.lab-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 640px) { .lab-grid { grid-template-columns: repeat(3, 1fr); } }
.lab-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; text-align: center; }
.lab-card strong { display: block; font-family: var(--serif, Georgia, serif); font-weight: 400; font-size: 40px; color: var(--mist, #F2EFE6); }
.lab-card span { display: block; margin-top: 8px; font-family: var(--sans, system-ui, sans-serif); font-weight: 500; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage, #B0CBBC); }
.lab-note { margin: 16px 0 0; font-size: 14px; letter-spacing: 0; color: #E8EEE9; }
`;

function useCount(final: string, active: boolean) {
  const [text, setText] = useState("0");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(final);
      return;
    }
    if (!active) {
      setText("0");
      return;
    }
    const target = Number(final.replace(/\D/g, "")) || 0;
    const t0 = performance.now();
    let id = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1200);
      setText(p >= 1 ? final : String(Math.round(target * p)));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [final, active]);
  return text;
}

function Stat({ final, label, active }: { final: string; label: string; active: boolean }) {
  const text = useCount(final, active);
  return (
    <div className="lab-card">
      <strong data-final={final}>{text}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function AnimatedCounter() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} data-lab="animated-counter" aria-labelledby="lab-stats-title" className="lab-stats">
      <h2 id="lab-stats-title">By the numbers</h2>
      <style>{css}</style>
      <div className="lab-grid">
        {STATS.map((s) => (
          <Stat key={s.label} final={s.final} label={s.label} active={active} />
        ))}
      </div>
      <p className="lab-note">Example data: figures for this lab demo only.</p>
    </section>
  );
}
