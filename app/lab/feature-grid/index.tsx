"use client";

import { useState, useCallback } from "react";

const ITEMS = [
  {
    title: "Fresh branch",
    text: "Each showcase run starts from a clean branch so every feature is built in isolation.",
    icon: "/lab/feature-grid/icon-0.svg",
  },
  {
    title: "Allowlist",
    text: "Only approved files and APIs may change, keeping demos safe and reviewable.",
    icon: "/lab/feature-grid/icon-1.svg",
  },
  {
    title: "Size cap",
    text: "A tight line budget forces small, focused components instead of sprawling diffs.",
    icon: "/lab/feature-grid/icon-2.svg",
  },
  {
    title: "No network",
    text: "Client code cannot call the network, so what you see is entirely local.",
    icon: "/lab/feature-grid/icon-3.svg",
  },
  {
    title: "Visual gate",
    text: "Automated layout and contrast checks run before any push leaves the machine.",
    icon: "/lab/feature-grid/icon-4.svg",
  },
  {
    title: "Nightly reset",
    text: "Preview environments reset on a schedule so stale state never lingers.",
    icon: "/lab/feature-grid/icon-5.svg",
  },
] as const;

function FallbackIcon() {
  return (
    <span className="lab-icon-fallback" data-art="fallback" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

function CardIcon({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);

  if (failed) {
    return <FallbackIcon />;
  }

  return (
    <img
      data-art="image"
      src={src}
      width={32}
      height={32}
      alt={alt}
      onError={onError}
    />
  );
}

export default function FeatureGrid() {
  const css = `
    [data-lab="feature-grid"] {
      width: min(960px, 100%);
      margin: 8px auto 56px;
      color: var(--mist, #E8EEE9);
    }
    [data-lab="feature-grid"] h2 {
      font-family: var(--serif);
      font-weight: 400;
      font-size: 30px;
      line-height: 1.15;
      margin: 0 0 24px;
      color: var(--mist, #F2EFE6);
    }
    .lab-grid {
      list-style: none;
      margin: 0;
      padding: 0;
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
      background: rgba(18, 26, 22, 0.35);
    }
    .lab-card-icon {
      display: block;
      margin-bottom: 12px;
      color: var(--sage, #B0CBBC);
    }
    .lab-card-icon img {
      display: block;
      width: 32px;
      height: 32px;
    }
    .lab-icon-fallback {
      display: inline-flex;
      width: 32px;
      height: 32px;
      align-items: center;
      justify-content: center;
      background: rgba(176, 203, 188, 0.12);
      border-radius: 6px;
      color: var(--sage, #B0CBBC);
    }
    .lab-card h3 {
      margin: 0 0 8px;
      font-family: var(--serif);
      font-weight: 400;
      font-size: 1.125rem;
      color: var(--mist, #F2EFE6);
    }
    .lab-card p {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.5;
      color: var(--mist, #E8EEE9);
      opacity: 0.92;
    }
    @media (prefers-reduced-motion: reduce) {
      .lab-card { transition: none; }
    }
  `;

  return (
    <section data-lab="feature-grid" aria-labelledby="feature-grid-title">
      <style>{css}</style>
      <h2 id="feature-grid-title">Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {ITEMS.map((item) => (
          <li key={item.title} className="lab-card">
            <span className="lab-card-icon">
              <CardIcon src={item.icon} alt="" />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
