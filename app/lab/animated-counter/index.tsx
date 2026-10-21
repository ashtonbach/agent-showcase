"use client";
import { useEffect, useRef, useState } from "react";

/* FAO Global Forest Resources Assessment 2020; World Bank forest land %. */
const STATS = [
  { final: "4.06B", label: "Hectares of forest worldwide" },
  { final: "31%", label: "Share of land covered by forests" },
  { final: "150", label: "Countries reporting forest data" },
];

function parts(final: string) {
  const m = final.match(/^([^0-9.-]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  return m ? { n: +m[2], pre: m[1], suf: m[3] } : { n: 0, pre: "", suf: final };
}
function fmt(n: number, final: string) {
  const { pre, suf } = parts(final);
  const d = final.match(/\.([0-9]+)/)?.[1]?.length ?? 0;
  return pre + (d ? n.toFixed(d) : String(Math.round(n))) + suf;
}

function Stat({ final, label, go, still }: { final: string; label: string; go: boolean; still: boolean }) {
  const [v, setV] = useState(still ? final : fmt(0, final));
  useEffect(() => {
    if (still) { setV(final); return; }
    if (!go) return;
    const { n } = parts(final);
    const t0 = performance.now();
    let id = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1200);
      setV(p < 1 ? fmt(n * (1 - (1 - p) ** 3), final) : final);
      if (p < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [go, still, final]);
  return (
    <div className="lab-stat">
      <strong data-final={final}>{v}</strong>
      <span className="lab-stat-label">{label}</span>
    </div>
  );
}

export default function AnimatedCounter() {
  const ref = useRef<HTMLElement>(null);
  const [go, setGo] = useState(false);
  const [still, setStill] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setStill(mq.matches);
    set(); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setGo(true), { threshold: 0.25 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const css = `[data-lab="animated-counter"]{width:min(960px,100%);margin:8px auto 56px;padding:0 16px;box-sizing:border-box;color:var(--mist,#F2EFE6)}
[data-lab="animated-counter"] h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 24px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
.lab-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media(max-width:640px){.lab-stats{grid-template-columns:1fr}}
.lab-stat strong{display:block;font-family:var(--serif);font-size:2rem;font-weight:400;color:var(--sage,#B0CBBC);line-height:1.2}
.lab-stat-label{display:block;margin-top:8px;font-family:var(--sans);font-size:.7rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#E8EEE9;line-height:1.4}
.lab-note{margin:20px 0 0;font-size:.875rem;color:#E8EEE9;opacity:.85}`;
  return (
    <section ref={ref} data-lab="animated-counter" aria-labelledby="animated-counter-title">
      <style>{css}</style>
      <h2 id="animated-counter-title">Forest at a glance</h2>
      <div className="lab-card">
        <div className="lab-stats">
          {STATS.map((s) => <Stat key={s.final} {...s} go={go} still={still} />)}
        </div>
      </div>
      <p className="lab-note">Figures from FAO Global Forest Resources Assessment 2020 and related public summaries.</p>
    </section>
  );
}
