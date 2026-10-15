"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { final: "128", label: "Visitors" },
  { final: "46", label: "Species" },
  { final: "12", label: "Trails" },
];

const css = `
.lab-wrap{width:min(960px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box;color:var(--mist,#F2EFE6)}
.lab-wrap h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;text-align:center;background:rgba(20,32,26,0.35)}
.lab-card strong{display:block;font-family:var(--serif);font-weight:400;font-size:40px;color:var(--sage,#B0CBBC);line-height:1.1}
.lab-card span{display:block;margin-top:8px;font-family:var(--sans);font-weight:500;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#E8EEE9}
.lab-note{margin:20px 0 0;font-family:var(--sans);font-size:14px;color:#E8EEE9}
@media(max-width:640px){.lab-grid{grid-template-columns:1fr}}
`;

function ease(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function Lab() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(["0", "0", "0"]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(STATS.map((s) => s.final));
      return;
    }
    const node = root.current;
    if (!node) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1200);
          setShown(
            STATS.map((s) =>
              p >= 1 ? s.final : String(Math.round(Number(s.final) * ease(p)))
            )
          );
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={root}
      className="lab-wrap"
      data-lab="animated-counter"
      aria-labelledby="lab-counter-title"
    >
      <style>{css}</style>
      <h2 id="lab-counter-title">A season in the grove</h2>
      <div className="lab-grid">
        {STATS.map((s, i) => (
          <article className="lab-card" key={s.label}>
            <strong data-final={s.final}>{shown[i]}</strong>
            <span>{s.label}</span>
          </article>
        ))}
      </div>
      <p className="lab-note">Example data: figures for this lab demo only.</p>
    </section>
  );
}
