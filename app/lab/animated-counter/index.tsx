"use client";

import { useEffect, useRef, useState } from "react";

// Example figures for this lab demo — labeled in the section footer.
const STATS = [
  { final: "2,400", label: "Trees counted" },
  { final: "18", label: "Years of records" },
  { final: "96%", label: "Canopy cover" },
] as const;

const DURATION_MS = 1200;

const css = `
  .lab-stats { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); box-sizing: border-box; padding: 0 8px; }
  .lab-stats h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; color: var(--mist, #F2EFE6); }
  .lab-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; text-align: center; min-width: 0; }
  .lab-card strong { display: block; font-family: var(--serif); font-weight: 400; font-size: 36px; color: var(--sage, #B0CBBC); line-height: 1.15; overflow-wrap: anywhere; }
  .lab-card span { display: block; margin-top: 10px; font-family: var(--sans); font-weight: 500; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #E8EEE9; }
  .lab-note { margin: 16px 0 0; font-family: var(--sans); font-size: 14px; color: #E8EEE9; }
  @media (max-width: 520px) { .lab-grid { grid-template-columns: 1fr; } .lab-stats h2 { font-size: 26px; } .lab-card strong { font-size: 32px; } }
`;

function parseFinal(text: string) {
  const m = text.match(/^([\d,]+)(.*)$/);
  const n = m ? Number(m[1].replace(/,/g, "")) : 0;
  return { n, rest: m ? m[2] : "", commas: text.includes(",") };
}

function formatCount(n: number, commas: boolean, rest: string) {
  const body = commas ? Math.round(n).toLocaleString("en-US") : String(Math.round(n));
  return `${body}${rest}`;
}

export default function AnimatedCounter() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return STATS.map((s) => s.final);
    }
    return STATS.map(() => "0");
  });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const finals = STATS.map((s) => s.final);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(finals);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const parsed = STATS.map((s) => parseFinal(s.final));
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        const ease = 1 - (1 - t) * (1 - t);
        if (t >= 1) {
          setShown(finals);
          return;
        }
        setShown(parsed.map((p) => formatCount(p.n * ease, p.commas, p.rest)));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} className="lab-stats" data-lab="animated-counter" aria-labelledby="lab-stats-title">
      <style>{css}</style>
      <h2 id="lab-stats-title">Standout figures</h2>
      <div className="lab-grid">
        {STATS.map((s, i) => (
          <article className="lab-card" key={s.label}>
            <strong data-final={s.final}>{shown[i]}</strong>
            <span>{s.label}</span>
          </article>
        ))}
      </div>
      <p className="lab-note">Example data: demo figures for this lab, not live metrics.</p>
    </section>
  );
}
