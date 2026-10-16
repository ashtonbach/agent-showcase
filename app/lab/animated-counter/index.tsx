"use client";

import { useEffect, useRef, useState } from "react";

// FAO FRA 2020 (31% land, 4.06B ha); Cazzolla Gatti et al., PNAS 2022 (tree species)
const STATS = [
  { final: "31%", label: "Land under forest" },
  { final: "73,000", label: "Known tree species" },
  { final: "4.06B", label: "Hectares of forest" },
];

const css = `
.lab-stats{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-stats h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 24px;text-align:center}
.lab-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;text-align:center}
.lab-card strong{display:block;font-family:var(--serif);font-weight:400;font-size:36px;color:var(--sage)}
.lab-card span{display:block;margin-top:8px;font-family:var(--sans);font-weight:500;font-size:12px;letter-spacing:0.16em;text-transform:uppercase}
@media (max-width:720px){.lab-grid{grid-template-columns:1fr}}
`;

function target(final: string) {
  return parseFloat(final.replace(/,/g, "")) || 0;
}
function tickText(n: number, final: string) {
  if (final.includes(".")) return n.toFixed(2);
  if (final.includes(",")) return Math.round(n).toLocaleString("en-US");
  return String(Math.round(n));
}

export default function AnimatedCounter() {
  const root = useRef<HTMLElement>(null);
  const [vals, setVals] = useState(["0", "0", "0"]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVals(STATS.map((s) => s.final));
      return;
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return;
      started = true;
      io.disconnect();
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / 1200);
        const ease = 1 - (1 - p) ** 3;
        if (p >= 1) {
          setVals(STATS.map((s) => s.final));
          return;
        }
        setVals(STATS.map((s) => tickText(target(s.final) * ease, s.final)));
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.2 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={root} className="lab-stats" data-lab="animated-counter" aria-labelledby="lab-ac-title">
      <style>{css}</style>
      <h2 id="lab-ac-title">Forest cover at a glance</h2>
      <div className="lab-grid">
        {STATS.map((s, i) => (
          <article key={s.label} className="lab-card">
            <strong data-final={s.final}>{vals[i]}</strong>
            <span>{s.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

