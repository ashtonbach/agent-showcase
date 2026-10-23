"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { final: "2,400", label: "Hours automated" },
  { final: "18", label: "Weekly releases" },
  { final: "99.9%", label: "Build success" },
];

function parseFinal(text: string) {
  const m = text.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return { value: 0, suffix: text, decimals: 0 };
  const raw = m[1].replace(/,/g, "");
  const decimals = m[1].includes(".") ? (m[1].split(".")[1]?.length ?? 0) : 0;
  return { value: parseFloat(raw), suffix: m[2], decimals };
}

function formatMid(n: number, decimals: number, suffix: string) {
  const body =
    decimals > 0
      ? n.toFixed(decimals)
      : Math.round(n).toLocaleString("en-US");
  return `${body}${suffix}`;
}

const css = `
.lab-ac { width: min(720px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
.lab-ac-card {
  border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-ac-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center; }
@media (max-width: 520px) { .lab-ac-grid { grid-template-columns: 1fr; gap: 28px; } }
.lab-ac-val {
  display: block; font-family: var(--serif); font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 400; color: var(--mist); line-height: 1.1; margin-bottom: 8px;
}
.lab-ac-label {
  font-family: var(--sans); font-size: 0.7rem; font-weight: 500;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage);
}
.lab-ac-note { margin: 24px 0 0; font-size: 0.875rem; color: rgba(232, 238, 233, 0.72); }
`;

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(() => STATS.map(() => "0"));

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(STATS.map((s) => s.final));
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const parsed = STATS.map((s) => parseFinal(s.final));
      const t0 = performance.now();
      const duration = 1200;
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        const ease = 1 - (1 - t) ** 3;
        if (t >= 1) {
          setDisplay(STATS.map((s) => s.final));
          return;
        }
        setDisplay(
          parsed.map((p, i) =>
            formatMid(p.value * ease, p.decimals, p.suffix)
          )
        );
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-lab="animated-counter"
      aria-labelledby="lab-ac-title"
      className="lab-ac"
    >
      <style>{css}</style>
      <h2 id="lab-ac-title">Impact at a glance</h2>
      <div className="lab-ac-card">
        <div className="lab-ac-grid">
          {STATS.map((s, i) => (
            <div key={s.label}>
              <strong className="lab-ac-val" data-final={s.final}>
                {display[i]}
              </strong>
              <span className="lab-ac-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="lab-ac-note">Example data: illustrative figures for this demo.</p>
    </section>
  );
}
