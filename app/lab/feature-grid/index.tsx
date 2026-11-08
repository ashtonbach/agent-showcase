"use client";

import { useEffect, useRef, useState } from "react";

const CARDS = [
  { title: "Fresh branch", text: "Each showcase run builds on a dedicated branch cut from a clean base." },
  { title: "Allowlist", text: "Agents may touch only the lab slot, current.json, and the page import." },
  { title: "Size cap", text: "The merge gate rejects diffs larger than two hundred fifty changed lines." },
  { title: "No network", text: "Lab components cannot call fetch, sockets, or other runtime network APIs." },
  { title: "Visual gate", text: "SHIP checks layout at mobile and desktop widths before code can merge." },
  { title: "Nightly reset", text: "Demo branches roll back so the next audience sees a fresh starting point." },
] as const;

function SlotIcon({ i }: { i: number }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  const src = `/lab/feature-grid/icon-${i}.svg`;

  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setOk(false);
  }, []);

  if (!ok) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fg-fb">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  return (
    <img
      ref={ref}
      data-art="image"
      src={src}
      width={32}
      height={32}
      alt=""
      onError={() => setOk(false)}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section className="lab-fg" data-lab="feature-grid" aria-labelledby="lab-fg-title">
      <style>{`
        .lab-fg { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
        .lab-fg h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 24px; color: var(--mist, #F2EFE6); }
        .lab-fg-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 601px) { .lab-fg-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 901px) { .lab-fg-grid { grid-template-columns: repeat(3, 1fr); } }
        .lab-fg-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; }
        .lab-fg-icon { display: block; margin-bottom: 12px; color: var(--sage, #B0CBBC); }
        .lab-fg-icon img { display: block; width: 32px; height: 32px; }
        .lab-fg-fb { display: block; width: 32px; height: 32px; }
        .lab-fg-card h3 { margin: 0 0 8px; font-family: var(--sans); font-size: 1rem; font-weight: 500; color: var(--mist, #F2EFE6); }
        .lab-fg-card p { margin: 0; font-size: 0.95rem; line-height: 1.45; color: var(--mist, #E8EEE9); opacity: 0.92; }
        @media (prefers-reduced-motion: reduce) { .lab-fg * { animation: none !important; transition: none !important; } }
      `}</style>
      <h2 id="lab-fg-title">Six guardrails of the showcase</h2>
      <ul className="lab-fg-grid">
        {CARDS.map((c, i) => (
          <li key={c.title} className="lab-fg-card">
            <span className="lab-fg-icon">
              <SlotIcon i={i} />
            </span>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
