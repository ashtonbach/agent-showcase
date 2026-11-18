"use client";

import { useEffect, useId, useRef, useState } from "react";

const CARDS = [
  {
    title: "Fresh branch",
    body: "Each run ships from a dedicated sc/ branch cut from base so work stays isolated from main until review.",
    icon: 0,
  },
  {
    title: "Allowlist",
    body: "The merge gate permits changes only in named paths; anything else fails before the preview updates.",
    icon: 1,
  },
  {
    title: "Size cap",
    body: "Insertions and deletions across the lab diff are capped at two hundred fifty lines so features stay reviewable.",
    icon: 2,
  },
  {
    title: "No network",
    body: "Client lab code cannot call fetch, sockets, or other banned APIs, keeping the section fully offline in the browser.",
    icon: 3,
  },
  {
    title: "Visual gate",
    body: "SHIP captures layout at twelve eighty and three ninety pixels wide and blocks push when the section scrolls or clips.",
    icon: 4,
  },
  {
    title: "Nightly reset",
    body: "Preview branches and lab slots roll forward on a schedule so each audience sees a clean slate for the next run.",
    icon: 5,
  },
] as const;

function ArtIcon({ index }: { index: number }) {
  const src = `/lab/feature-grid/icon-${index}.svg`;
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img || !ok) return;
    if (img.complete && img.naturalWidth === 0) setOk(false);
  }, [ok]);

  if (!ok) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fg-fallback">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" />
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

export default function FeatureGridLab() {
  const base = useId().replace(/:/g, "");
  const titleId = `${base}-title`;

  return (
    <section data-lab="feature-grid" aria-labelledby={titleId} className="lab-fg">
      <h2 id={titleId}>Six guardrails of the showcase</h2>
      <ul className="lab-fg-grid">
        {CARDS.map((card) => (
          <li key={card.title} className="lab-fg-card">
            <ArtIcon index={card.icon} />
            <h3 className="lab-fg-card-title">{card.title}</h3>
            <p className="lab-fg-card-body">{card.body}</p>
          </li>
        ))}
      </ul>
      <style>{`
        .lab-fg { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
        .lab-fg h2 { margin: 0 0 24px; font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; }
        .lab-fg-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 601px) { .lab-fg-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 901px) { .lab-fg-grid { grid-template-columns: repeat(3, 1fr); } }
        .lab-fg-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
        .lab-fg-card-title { margin: 12px 0 8px; font-family: var(--sans); font-size: 17px; font-weight: 500; color: var(--mist, #f2efe6); }
        .lab-fg-card-body { margin: 0; font-family: var(--sans); font-size: 15px; line-height: 1.5; color: #e8eee9; }
        .lab-fg-fallback { display: inline-flex; color: var(--sage); width: 32px; height: 32px; align-items: center; justify-content: center; background: rgba(176, 203, 188, 0.12); border-radius: 8px; }
        .lab-fg [data-art="image"] { display: block; width: 32px; height: 32px; }
      `}</style>
    </section>
  );
}