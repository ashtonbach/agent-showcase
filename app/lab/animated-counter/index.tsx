"use client";
import { useEffect, useRef, useState } from "react";

type Stat = { final: string; label: string };
const STATS: Stat[] = [
  { final: "1,284", label: "Native trees" },
  { final: "96%", label: "Canopy cover" },
  { final: "42", label: "Marked trails" },
];

const css = `
.lab-stats{width:min(960px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box;color:#F2EFE6}
.lab-stats h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 20px;color:#F2EFE6}
.lab-grid{display:grid;grid-template-columns:1fr;gap:16px}
@media (min-width:640px){.lab-grid{grid-template-columns:repeat(3,1fr)}}
.lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;text-align:center;background:transparent}
.lab-card strong{display:block;font-family:var(--serif);font-weight:400;font-size:42px;line-height:1.1;color:#F2EFE6}
.lab-label{display:block;margin-top:10px;font-family:var(--sans);font-weight:500;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#C5D7CC}
.lab-note{margin:18px 0 0;font-family:var(--sans);font-size:14px;line-height:1.45;color:#E8EEE9}
`;

function parseStat(final: string) {
  const m = final.match(/^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
  const n = m ? Number(m[2].replace(/,/g, "")) : 0;
  const decimals = m && m[2].includes(".") ? m[2].split(".")[1].length : 0;
  const commas = Boolean(m && m[2].includes(","));
  const prefix = m ? m[1] : "";
  const suffix = m ? m[3] : "";
  return {
    n,
    fmt(v: number, done: boolean) {
      if (done) return final;
      let core = decimals ? v.toFixed(decimals) : String(Math.round(v));
      if (commas) core = core.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return prefix + core + suffix;
    },
  };
}

export default function AnimatedCounter() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(() =>
    STATS.map((s) => parseStat(s.final).fmt(0, false))
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(STATS.map((s) => s.final));
      return;
    }
    const el = root.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const parsed = STATS.map((s) => parseStat(s.final));
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / 1200);
          const e = 1 - (1 - t) ** 3;
          setShown(parsed.map((p) => p.fmt(p.n * e, t >= 1)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
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
      ref={root}
      className="lab-stats"
      data-lab="animated-counter"
      aria-labelledby="lab-counter-title"
    >
      <style>{css}</style>
      <h2 id="lab-counter-title">A season in the grove</h2>
      <div className="lab-grid">
        {STATS.map((s, i) => (
          <article className="lab-card" key={s.label}>
            <strong data-final={s.final}>{shown[i]}</strong>
            <span className="lab-label">{s.label}</span>
          </article>
        ))}
      </div>
      <p className="lab-note">Example data: grove figures shown for layout only.</p>
    </section>
  );
}
