"use client";
import { useEffect, useRef, useState } from "react";

/* Sources: FAO Global Forest Resources Assessment 2020; World Bank forest land % estimate. */
const STATS = [
  { final: "4.06B", label: "Hectares of forest worldwide" },
  { final: "31%", label: "Share of land covered by forests" },
  { final: "150", label: "Countries reporting forest data" },
];

function parseTarget(final: string): { num: number; prefix: string; suffix: string } {
  const m = final.match(/^([^0-9.-]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!m) return { num: 0, prefix: "", suffix: final };
  return { num: parseFloat(m[2]), prefix: m[1], suffix: m[3] };
}

function formatPartial(n: number, target: string): string {
  const { prefix, suffix } = parseTarget(target);
  const decimals = (target.match(/\.([0-9]+)/)?.[1]?.length) ?? 0;
  const core = decimals ? n.toFixed(decimals) : String(Math.round(n));
  return `${prefix}${core}${suffix}`;
}

function StatBlock({
  final,
  label,
  run,
  instant,
}: {
  final: string;
  label: string;
  run: boolean;
  instant: boolean;
}) {
  const [text, setText] = useState(instant ? final : formatPartial(0, final));

  useEffect(() => {
    if (instant) {
      setText(final);
      return;
    }
    if (!run) return;
    const { num } = parseTarget(final);
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setText(formatPartial(num * eased, final));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setText(final);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, instant, final]);

  return (
    <div className="lab-stat">
      <strong data-final={final}>{text}</strong>
      <span className="lab-stat-label">{label}</span>
    </div>
  );
}

export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const css = `
    [data-lab="animated-counter"] {
      width: min(960px, 100%);
      margin: 8px auto 56px;
      padding: 0 16px;
      box-sizing: border-box;
      color: var(--mist, #F2EFE6);
    }
    [data-lab="animated-counter"] h2 {
      font-family: var(--serif);
      font-weight: 400;
      font-size: 30px;
      margin: 0 0 24px;
      color: var(--mist, #F2EFE6);
    }
    .lab-card {
      border: 1px solid rgba(176, 203, 188, 0.28);
      border-radius: 16px;
      padding: 24px;
      background: rgba(18, 26, 22, 0.35);
    }
    .lab-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    @media (max-width: 640px) {
      .lab-stats { grid-template-columns: 1fr; }
    }
    .lab-stat strong {
      display: block;
      font-family: var(--serif);
      font-size: 2rem;
      font-weight: 400;
      color: var(--sage, #B0CBBC);
      line-height: 1.2;
    }
    .lab-stat-label {
      display: block;
      margin-top: 8px;
      font-family: var(--sans);
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #E8EEE9;
      line-height: 1.4;
    }
    .lab-note {
      margin: 20px 0 0;
      font-size: 0.875rem;
      color: #E8EEE9;
      opacity: 0.85;
    }
  `;

  return (
    <section
      ref={sectionRef}
      data-lab="animated-counter"
      aria-labelledby="animated-counter-title"
    >
      <style>{css}</style>
      <h2 id="animated-counter-title">Forest at a glance</h2>
      <div className="lab-card">
        <div className="lab-stats">
          {STATS.map((s) => (
            <StatBlock
              key={s.final}
              final={s.final}
              label={s.label}
              run={inView}
              instant={reduced}
            />
          ))}
        </div>
      </div>
      <p className="lab-note">
        Figures from FAO Global Forest Resources Assessment 2020 and related
        public summaries.
      </p>
    </section>
  );
}
