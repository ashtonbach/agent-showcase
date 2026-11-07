"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { icon: "icon-0.svg", title: "Fresh branch", text: "Each run works on a dedicated branch so changes stay isolated until review." },
  { icon: "icon-1.svg", title: "Allowlist", text: "Only approved imports and APIs are allowed so agents cannot reach the network." },
  { icon: "icon-2.svg", title: "Size cap", text: "The gate limits diff size so features stay small and reviewable." },
  { icon: "icon-3.svg", title: "No network", text: "Runtime fetches and sockets are blocked to keep the demo predictable." },
  { icon: "icon-4.svg", title: "Visual gate", text: "Layout checks at mobile and desktop widths must pass before ship." },
  { icon: "icon-5.svg", title: "Nightly reset", text: "The showcase environment resets on a schedule so every run starts clean." },
] as const;

function FallbackGlyph() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="6" stroke="#B0CBBC" strokeOpacity="0.5" />
      <path d="M11 16h10M16 11v10" stroke="#B0CBBC" strokeOpacity="0.6" strokeWidth="1.5" />
    </svg>
  );
}

function SlotIcon({ file, title }: { file: string; title: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setOk(false);
  }, []);

  if (!ok) {
    return (
      <span className="lab-icon-fallback" data-art="fallback" aria-hidden="true">
        <FallbackGlyph />
      </span>
    );
  }

  return (
    <img
      ref={imgRef}
      className="lab-icon"
      data-art="image"
      src={`/lab/feature-grid/${file}`}
      width={32}
      height={32}
      alt=""
      onError={() => setOk(false)}
    />
  );
}

export default function FeatureGrid() {
  const headingId = "lab-feature-grid-title";

  return (
    <section className="lab-feature-grid" data-lab="feature-grid" aria-labelledby={headingId}>
      <h2 id={headingId} className="lab-title">
        Six guardrails of the showcase
      </h2>
      <ul className="lab-grid">
        {ITEMS.map((item) => (
          <li key={item.title} className="lab-card">
            <SlotIcon file={item.icon} title={item.title} />
            <h3 className="lab-card-title">{item.title}</h3>
            <p className="lab-card-text">{item.text}</p>
          </li>
        ))}
      </ul>
      <style>{`
        .lab-feature-grid { color: var(--mist, #f2efe6); }
        .lab-title {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          line-height: 1.2;
          margin: 0 0 24px;
          text-align: center;
        }
        .lab-grid {
          list-style: none;
          margin: 8px auto 56px;
          padding: 0;
          width: min(960px, 100%);
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 601px) {
          .lab-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 901px) {
          .lab-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
        }
        .lab-icon, .lab-icon-fallback {
          display: block;
          width: 32px;
          height: 32px;
          margin-bottom: 12px;
        }
        .lab-card-title {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 1.125rem;
          margin: 0 0 8px;
          color: var(--mist, #e8eee9);
        }
        .lab-card-text {
          font-family: var(--sans);
          font-size: 0.9375rem;
          line-height: 1.5;
          margin: 0;
          color: var(--mist, #e8eee9);
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-feature-grid * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
