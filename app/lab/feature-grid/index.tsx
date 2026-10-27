"use client";

import { useState, useCallback } from "react";

const ITEMS = [
  {
    title: "Fresh branch",
    body: "Each showcase feature ships from its own short-lived branch cut from base.",
    src: "/lab/feature-grid/icon-0.svg",
  },
  {
    title: "Allowlist",
    body: "The merge gate only allows changes in the lab slot and a fixed file list.",
    src: "/lab/feature-grid/icon-1.svg",
  },
  {
    title: "Size cap",
    body: "Every submission must stay within a strict line budget on the diff.",
    src: "/lab/feature-grid/icon-2.svg",
  },
  {
    title: "No network",
    body: "Banned runtime APIs block fetch, sockets, and other outbound calls in the lab.",
    src: "/lab/feature-grid/icon-3.svg",
  },
  {
    title: "Visual gate",
    body: "Layout self-check runs at 1280px and 390px before the automated gate.",
    src: "/lab/feature-grid/icon-4.svg",
  },
  {
    title: "Nightly reset",
    body: "Showcase workspaces reset on a schedule so the next run starts clean.",
    src: "/lab/feature-grid/icon-5.svg",
  },
] as const;

const css = `
.lab-fg-wrap { width: min(960px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
.lab-fg-title { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; color: var(--mist, #F2EFE6); margin: 0 0 28px; }
.lab-fg-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 900px) { .lab-fg-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) {
  .lab-fg-grid { grid-template-columns: 1fr; }
  .lab-fg-wrap { width: min(720px, 100%); }
}
.lab-fg-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; }
.lab-fg-card h3 { margin: 12px 0 8px; font-family: var(--serif); font-weight: 400; font-size: 1.125rem; color: var(--mist, #F2EFE6); }
.lab-fg-card p { margin: 0; font-size: 0.9375rem; line-height: 1.5; color: #E8EEE9; }
.lab-fg-icon { width: 32px; height: 32px; display: block; }
.lab-fg-fallback { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; background: rgba(176,203,188,0.15); border-radius: 6px; color: var(--sage); }
@media (prefers-reduced-motion: reduce) { .lab-fg-card { transition: none; } }
`;

function IconSlot({ src }: { src: string }) {
  const [bad, setBad] = useState(false);
  const onErr = useCallback(() => setBad(true), []);
  if (bad) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fg-fallback">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <line x1="4" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="1.5" />
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
      className="lab-fg-icon"
      onError={onErr}
    />
  );
}

export default function FeatureGrid() {
  const headingId = "lab-feature-grid-title";
  return (
    <section data-lab="feature-grid" aria-labelledby={headingId}>
      <style>{css}</style>
      <div className="lab-fg-wrap">
        <h2 id={headingId} className="lab-fg-title">Six guardrails of the showcase</h2>
        <ul className="lab-fg-grid">
          {ITEMS.map((item) => (
            <li key={item.title} className="lab-fg-card">
              <IconSlot src={item.src} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
