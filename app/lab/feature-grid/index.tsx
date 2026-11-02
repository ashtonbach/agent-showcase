"use client";

import { useCallback, useState } from "react";

const GUARDS = [
  {
    title: "Fresh branch",
    body: "Each run ships from a dedicated sc/ branch cut from base so work stays isolated until review.",
    src: "/lab/feature-grid/icon-0.svg",
  },
  {
    title: "Allowlist",
    body: "The gate permits changes only in the lab slot, the page import line, and current.json—nothing else.",
    src: "/lab/feature-grid/icon-1.svg",
  },
  {
    title: "Size cap",
    body: "Total diff size is capped so agents keep features small and reviewable in one pass.",
    src: "/lab/feature-grid/icon-2.svg",
  },
  {
    title: "No network",
    body: "Lab components must not call fetch, WebSockets, or other client network APIs during the run.",
    src: "/lab/feature-grid/icon-3.svg",
  },
  {
    title: "Visual gate",
    body: "SHIP verifies layout at desktop and mobile widths before the branch can merge.",
    src: "/lab/feature-grid/icon-4.svg",
  },
  {
    title: "Nightly reset",
    body: "Preview environments reset on a schedule so each demo starts from a clean baseline.",
    src: "/lab/feature-grid/icon-5.svg",
  },
];

function GuardIcon({ src }: { src: string }) {
  const [broken, setBroken] = useState(false);
  const onError = useCallback(() => setBroken(true), []);
  if (broken) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fb">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="rgba(176,203,188,0.15)" />
          <path d="M10 16h12" stroke="#B0CBBC" strokeWidth="1.5" />
        </svg>
      </span>
    );
  }
  return (
    <img
      data-art="image"
      src={src}
      width={32}
      height={32}
      alt=""
      onError={onError}
    />
  );
}

export default function FeatureGrid() {
  const titleId = "feature-grid-title";
  return (
    <section data-lab="feature-grid" aria-labelledby={titleId}>
      <h2 id={titleId}>Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {GUARDS.map((g) => (
          <li key={g.title} className="lab-card">
            <GuardIcon src={g.src} />
            <h3 className="lab-card-title">{g.title}</h3>
            <p className="lab-card-body">{g.body}</p>
          </li>
        ))}
      </ul>
      <style>{`
        [data-lab="feature-grid"] { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
        [data-lab="feature-grid"] > h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 24px; color: var(--mist, #F2EFE6); }
        [data-lab="feature-grid"] .lab-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 601px) { [data-lab="feature-grid"] .lab-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 901px) { [data-lab="feature-grid"] .lab-grid { grid-template-columns: repeat(3, 1fr); } }
        [data-lab="feature-grid"] .lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
        [data-lab="feature-grid"] .lab-card-title { margin: 12px 0 8px; font-family: var(--serif); font-weight: 400; font-size: 1.125rem; color: var(--mist, #F2EFE6); }
        [data-lab="feature-grid"] .lab-card-body { margin: 0; font-size: 0.95rem; line-height: 1.55; }
        [data-lab="feature-grid"] img[data-art="image"] { display: block; width: 32px; height: 32px; }
        [data-lab="feature-grid"] .lab-fb { display: block; width: 32px; height: 32px; }
        @media (prefers-reduced-motion: reduce) { [data-lab="feature-grid"] * { transition: none !important; animation: none !important; } }
      `}</style>
    </section>
  );
}
