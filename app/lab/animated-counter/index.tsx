"use client";

import { useEffect, useRef, useState } from "react";

// Example data — labelled on the page; not sourced figures.
const STATS = [
  { final: "128", num: 128, label: "Commits shipped" },
  { final: "36", num: 36, label: "Checks passing" },
  { final: "12", num: 12, label: "Demos in the lab" },
];
const css = `
.lab-ac{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
.lab-ac h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px;color:var(--mist,#F2EFE6)}
.lab-note{font-family:var(--sans);font-size:13px;color:#E8EEE9;margin:0 0 20px;opacity:.85}
.lab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;list-style:none;padding:0;margin:0}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;text-align:center;min-width:0}
.lab-card strong{display:block;font-family:var(--serif);font-weight:400;font-size:clamp(28px,6vw,40px);color:var(--sage,#B0CBBC);line-height:1.1}
.lab-stat{display:block;margin-top:10px;font-family:var(--sans);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:#E8EEE9}
@media (max-width:520px){.lab-grid{grid-template-columns:1fr}}
`;
function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(mq.matches);
    const fn = () => setR(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return r;
}

function Stat({
  final, num, label, play, reduced,
}: {
  final: string; num: number; label: string; play: boolean; reduced: boolean;
}) {
  const [text, setText] = useState(reduced ? final : "0");
  useEffect(() => {
    if (reduced || !play) {
      setText(reduced ? final : play ? final : "0");
      return;
    }
    let id = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1200);
      const e = 1 - (1 - p) ** 3;
      setText(p >= 1 ? final : String(Math.round(num * e)));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [play, reduced, final, num]);
  return (
    <li className="lab-card">
      <strong data-final={final}>{text}</strong>
      <span className="lab-stat">{label}</span>
    </li>
  );
}
export default function AnimatedCounter() {
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);
  const reduced = useReduced();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setPlay(true); },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} data-lab="animated-counter" aria-labelledby="lab-ac-title" className="lab-ac">
      <style>{css}</style>
      <p className="label">By the numbers</p>
      <h2 id="lab-ac-title">Shipped in this lab</h2>
      <p className="lab-note">Example data</p>
      <ul className="lab-grid">
        {STATS.map((s) => (
          <Stat key={s.final} {...s} play={play} reduced={reduced} />
        ))}
      </ul>
    </section>
  );
}
