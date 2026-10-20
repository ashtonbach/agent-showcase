"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const ITEMS = [
  {
    title: "Fresh branch",
    body: "Every feature is built on a new branch cut from base.",
    icon: 0,
    fb: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 24V12l8-6 8 6v12" stroke="#121A16" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Allowlist",
    body: "Only named paths and APIs may change in a run.",
    icon: 1,
    fb: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="7" y="11" width="18" height="14" rx="2" stroke="#121A16" strokeWidth="1.5" />
        <path d="M12 16l3 3 6-7" stroke="#121A16" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Size cap",
    body: "The gate enforces a maximum number of changed lines.",
    icon: 2,
    fb: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M9 22h14M11 16h10M13 10h6" stroke="#121A16" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "No network",
    body: "Lab code cannot fetch, beacon, or open live sockets.",
    icon: 3,
    fb: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="9" stroke="#121A16" strokeWidth="1.5" />
        <path d="M10 10l12 12" stroke="#121A16" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Visual gate",
    body: "Layout, contrast, and scroll are checked before ship.",
    icon: 4,
    fb: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="20" height="16" rx="2" stroke="#121A16" strokeWidth="1.5" />
        <path d="M6 14h20" stroke="#121A16" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Nightly reset",
    body: "The showcase workspace is restored on a fixed schedule.",
    icon: 5,
    fb: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 8v8l5 3" stroke="#121A16" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="9" stroke="#121A16" strokeWidth="1.5" />
      </svg>
    ),
  },
] as const;

function SlotIcon({ index, fallback }: { index: number; fallback: ReactNode }) {
  const ref = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [bad, setBad] = useState(false);
  const fail = useCallback(() => setBad(true), []);
  const onLoad = useCallback(() => {
    const el = ref.current;
    if (el && el.naturalWidth > 0) setReady(true);
    else setBad(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete) onLoad();
  }, [onLoad]);

  if (ready && !bad) {
    return (
      <img
        ref={ref}
        className="lab-icon"
        data-art="image"
        src={`/lab/feature-grid/icon-${index}.svg`}
        width={32}
        height={32}
        alt=""
        onError={fail}
        onLoad={onLoad}
      />
    );
  }

  return (
    <>
      <span className="lab-icon lab-icon-fb" data-art="fallback" aria-hidden="true">
        {fallback}
      </span>
      {!bad && (
        <img
          ref={ref}
          className="lab-icon-pend"
          data-art="image"
          src={`/lab/feature-grid/icon-${index}.svg`}
          width={32}
          height={32}
          alt=""
          onError={fail}
          onLoad={onLoad}
        />
      )}
    </>
  );
}

const css = `
.lab-fg { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
.lab-fg h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 24px; color: #F2EFE6; }
.lab-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 601px) { .lab-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 901px) { .lab-grid { grid-template-columns: repeat(3, 1fr); } }
.lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
.lab-card h3 { margin: 12px 0 8px; font-family: var(--serif); font-weight: 400; font-size: 1.15rem; color: #F2EFE6; }
.lab-card p { margin: 0; font-size: 0.95rem; line-height: 1.5; color: var(--mist, #E8EEE9); opacity: 0.92; }
.lab-icon { display: block; width: 32px; height: 32px; }
.lab-icon-fb { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: var(--sage, #B0CBBC); border-radius: 8px; }
.lab-icon-pend { position: absolute; width: 1px; height: 1px; opacity: 0; overflow: hidden; clip: rect(0, 0, 0, 0); }
@media (prefers-reduced-motion: reduce) { .lab-card { transition: none; } }
`;

export default function FeatureGrid() {
  return (
    <section className="lab-fg" data-lab="feature-grid" aria-labelledby="lab-fg-title">
      <h2 id="lab-fg-title">Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {ITEMS.map((item) => (
          <li key={item.title} className="lab-card">
            <SlotIcon index={item.icon} fallback={item.fb} />
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
      <style>{css}</style>
    </section>
  );
}
