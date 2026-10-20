"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const FB = (d: string) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d={d} stroke="#121A16" strokeWidth="1.5" />
  </svg>
);

const DATA: [string, string, ReactNode][] = [
  ["Fresh branch", "Every feature is built on a new branch cut from base.", FB("M8 24V12l8-6 8 6v12")],
  ["Allowlist", "Only named paths and APIs may change in a run.", FB("M7 11h18v14H7zM12 16l3 3 6-7")],
  ["Size cap", "The gate enforces a maximum number of changed lines.", FB("M9 22h14M11 16h10M13 10h6")],
  ["No network", "Lab code cannot fetch, beacon, or open live sockets.", FB("M16 7a9 9 0 109 9M10 10l12 12")],
  ["Visual gate", "Layout, contrast, and scroll are checked before ship.", FB("M6 8h20v16H6zM6 14h20")],
  ["Nightly reset", "The showcase workspace is restored on a fixed schedule.", FB("M16 8v8l5 3M16 7a9 9 0 110 18")],
];

function SlotIcon({ i, fb }: { i: number; fb: ReactNode }) {
  const ref = useRef<HTMLImageElement>(null);
  const [ok, setOk] = useState(false);
  const src = `/lab/feature-grid/icon-${i}.svg`;
  const mark = () => {
    const el = ref.current;
    if (el && el.naturalWidth > 0) setOk(true);
  };
  useEffect(() => {
    mark();
  }, []);
  return (
    <div className="lab-ico">
      {!ok && (
        <span className="lab-icon lab-icon-fb lab-ico-top" data-art="fallback" aria-hidden="true">{fb}</span>
      )}
      <img
        ref={ref}
        className="lab-icon"
        data-art="image"
        src={src}
        width={32}
        height={32}
        alt=""
        onLoad={mark}
        onError={() => setOk(false)}
      />
    </div>
  );
}

const css = `.lab-fg{width:min(960px,100%);margin:8px auto 56px;color:var(--mist,#E8EEE9)}.lab-fg h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.15;margin:0 0 24px;color:#F2EFE6}.lab-grid{list-style:none;margin:0;padding:0;display:grid;gap:16px;grid-template-columns:1fr}@media(min-width:601px){.lab-grid{grid-template-columns:repeat(2,1fr)}}@media(min-width:901px){.lab-grid{grid-template-columns:repeat(3,1fr)}}.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}.lab-card h3{margin:12px 0 8px;font-family:var(--serif);font-weight:400;font-size:1.15rem;color:#F2EFE6}.lab-card p{margin:0;font-size:.95rem;line-height:1.5;opacity:.92}.lab-icon{display:block;width:32px;height:32px}.lab-icon-fb{display:flex;align-items:center;justify-content:center;background:var(--sage,#B0CBBC);border-radius:8px}.lab-ico-top{position:absolute;inset:0;z-index:1}.lab-ico{position:relative;width:32px;height:32px;background:var(--sage,#B0CBBC);border-radius:8px;overflow:hidden}@media(prefers-reduced-motion:reduce){.lab-card{transition:none}}`;

export default function FeatureGrid() {
  return (
    <section className="lab-fg" data-lab="feature-grid" aria-labelledby="lab-fg-title">
      <h2 id="lab-fg-title">Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {DATA.map(([title, body, fb], i) => (
          <li key={title} className="lab-card">
            <SlotIcon i={i} fb={fb} />
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ul>
      <style>{css}</style>
    </section>
  );
}
