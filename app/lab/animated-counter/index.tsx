"use client";

import { useEffect, useRef, useState } from "react";

// Example data: lab stand-ins, not field measurements.
const STATS = [
  { final: "312", label: "Hectares mapped" },
  { final: "48", label: "Mist days" },
  { final: "96%", label: "Canopy held" },
];

const css = `
.lab-ac{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6);box-sizing:border-box;padding:0 8px}
.lab-ac .label{font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:12px;color:var(--sage);margin:0 0 8px}
.lab-ac h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px;color:var(--mist,#F2EFE6)}
.lab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px 12px;text-align:center;box-sizing:border-box;min-width:0}
.lab-card strong{display:block;font-family:var(--serif);font-weight:400;font-size:clamp(22px,5vw,36px);color:var(--mist,#F2EFE6)}
.lab-card span{display:block;margin-top:8px;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:var(--sage)}
@media (max-width:420px){.lab-grid{gap:8px}.lab-card{padding:16px 6px}}
`;

function digits(text: string) {
  const m = text.match(/[\d.]+/);
  return m ? Number(m[0]) : 0;
}

function Stat({
  final,
  label,
  play,
  reduce,
}: {
  final: string;
  label: string;
  play: boolean;
  reduce: boolean;
}) {
  const [shown, setShown] = useState(reduce ? final : "0");
  useEffect(() => {
    if (reduce) {
      setShown(final);
      return;
    }
    if (!play) return;
    const target = digits(final);
    const t0 = performance.now();
    let id = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 1200);
      const eased = 1 - (1 - p) ** 3;
      if (p >= 1) {
        setShown(final);
        return;
      }
      setShown(String(Math.round(target * eased)));
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [final, play, reduce]);
  return (
    <article className="lab-card">
      <strong data-final={final}>{shown}</strong>
      <span>{label}</span>
    </article>
  );
}

export default function Lab() {
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setPlay(true);
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);
  return (
    <section
      ref={ref}
      data-lab="animated-counter"
      aria-labelledby="lab-ac-h2"
      className="lab-ac"
    >
      <style>{css}</style>
      <p className="label">Example data · Forest Mist stand</p>
      <h2 id="lab-ac-h2">A quiet count of the grove</h2>
      <div className="lab-grid">
        {STATS.map((s) => (
          <Stat key={s.label} final={s.final} label={s.label} play={play} reduce={reduce} />
        ))}
      </div>
    </section>
  );
}
