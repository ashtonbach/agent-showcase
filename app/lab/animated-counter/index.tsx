"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* Example figures for layout demo — not sourced from live metrics. */
const STATS = [
  { final: "24", label: "Workshops" },
  { final: "180", label: "Participants" },
  { final: "96%", label: "Satisfaction" },
];

type Parsed = { pre: string; num: number; suf: string; dec: number; grouped: boolean };

function parseFinal(final: string): Parsed {
  const m = final.match(/^([^0-9\-]*)([\d,.\s]+)(.*)$/);
  if (!m) return { pre: "", num: 0, suf: final, dec: 0, grouped: false };
  const raw = m[2].replace(/,/g, "").replace(/\s/g, "");
  const dec = (raw.split(".")[1] || "").length;
  return { pre: m[1], num: parseFloat(raw) || 0, suf: m[3], dec, grouped: m[2].includes(",") };
}

function formatNum(n: number, p: Parsed): string {
  let s = p.dec ? n.toFixed(p.dec) : String(Math.round(n));
  if (p.grouped) {
    const [a, b] = s.split(".");
    s = Number(a).toLocaleString("en-US") + (b ? `.${b}` : "");
  }
  return `${p.pre}${s}${p.suf}`;
}

function Stat({ final, label, run }: { final: string; label: string; run: boolean }) {
  const parsed = parseFinal(final);
  const [text, setText] = useState("0");
  const reducedRef = useRef(false);

  useLayoutEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) setText(final);
  }, [final]);

  useEffect(() => {
    if (reducedRef.current) return;
    if (!run) {
      setText(formatNum(0, parsed));
      return;
    }
    const t0 = performance.now();
    const dur = 1200;
    let id = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const eased = 1 - (1 - t) ** 3;
      if (t >= 1) setText(final);
      else setText(formatNum(parsed.num * eased, parsed));
      if (t < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [run, final]);

  return (
    <div className="lab-ac-stat">
      <strong data-final={final}>{text}</strong>
      <span className="lab-ac-label">{label}</span>
    </div>
  );
}

export default function AnimatedCounter() {
  const root = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setRun(true);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} data-lab="animated-counter" aria-labelledby="ac-h2">
      <h2 id="ac-h2">Impact at a glance</h2>
      <div className="lab-ac-card">
        <div className="lab-ac-grid">
          {STATS.map((s) => (
            <Stat key={s.label} final={s.final} label={s.label} run={run} />
          ))}
        </div>
      </div>
      <p className="lab-ac-note">Example data</p>
      <style>{`
[data-lab="animated-counter"]{width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}
[data-lab="animated-counter"]>h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.15;margin:0 0 20px;color:#F2EFE6}
.lab-ac-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
.lab-ac-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;text-align:center}
@media(max-width:520px){.lab-ac-grid{grid-template-columns:1fr;gap:16px}}
.lab-ac-stat strong{display:block;font-family:var(--serif);font-weight:400;font-size:clamp(1.75rem,5vw,2.5rem);color:#F2EFE6;line-height:1.1;margin-bottom:8px}
.lab-ac-label{font-family:var(--sans);font-weight:500;font-size:0.72rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--sage,#B0CBBC)}
.lab-ac-note{margin:16px 0 0;font-size:0.9rem;color:var(--mist,#E8EEE9)}
@media(prefers-reduced-motion:reduce){.lab-ac-stat strong{transition:none}}
`}</style>
    </section>
  );
}
