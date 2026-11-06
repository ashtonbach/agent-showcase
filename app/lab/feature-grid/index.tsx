"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CARDS = [
  {
    title: "Fresh branch",
    body: "Each run checks out a dedicated showcase branch so the coder never commits on main.",
    file: "icon-0.svg",
  },
  {
    title: "Allowlist",
    body: "The gate allows changes only in the lab slot, the page import line, and current.json.",
    file: "icon-1.svg",
  },
  {
    title: "Size cap",
    body: "Total diff size is capped at two hundred fifty changed lines across allowed files.",
    file: "icon-2.svg",
  },
  {
    title: "No network",
    body: "Lab components must not call fetch, WebSockets, or other client network APIs.",
    file: "icon-3.svg",
  },
  {
    title: "Visual gate",
    body: "SHIP runs layout checks at mobile and desktop widths before the build gate passes.",
    file: "icon-4.svg",
  },
  {
    title: "Nightly reset",
    body: "Preview environments reset on a schedule so demos always start from a known baseline.",
    file: "icon-5.svg",
  },
] as const;

const css = `
.lab-fg { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-fg h2 {
  font-family: var(--serif); font-weight: 400; font-size: 30px;
  color: var(--mist, #f2efe6); margin: 0 0 24px;
}
.lab-fg-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
  list-style: none; padding: 0; margin: 0;
}
.lab-fg-card {
  border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px;
  background: rgba(18, 26, 22, 0.45);
}
.lab-fg-icon { display: block; margin-bottom: 12px; color: var(--sage); }
.lab-fg-card h3 {
  font-family: var(--sans); font-size: 17px; font-weight: 500;
  color: var(--mist, #f2efe6); margin: 0 0 8px;
}
.lab-fg-card p {
  margin: 0; font-family: var(--sans); font-size: 15px; line-height: 1.55; color: #e8eee9;
}
.lab-fg-fb {
  display: inline-flex; width: 32px; height: 32px; align-items: center; justify-content: center;
  background: rgba(176, 203, 188, 0.12); border-radius: 8px;
}
@media (max-width: 900px) { .lab-fg-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .lab-fg-grid { grid-template-columns: 1fr; } }
`;

function IconSlot({ file, label }: { file: string; label: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [ok, setOk] = useState(true);
  const fail = useCallback(() => setOk(false), []);
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setOk(false);
  }, []);
  const src = `/lab/feature-grid/${file}`;
  if (!ok) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fg-icon lab-fg-fb">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <img
      ref={ref}
      className="lab-fg-icon"
      data-art="image"
      src={src}
      width={32}
      height={32}
      alt={label}
      onError={fail}
    />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-heading">
      <style>{css}</style>
      <h2 id="lab-fg-heading">Six guardrails of the showcase</h2>
      <ul className="lab-fg-grid">
        {CARDS.map((c) => (
          <li key={c.title} className="lab-fg-card">
            <IconSlot file={c.file} label={c.title} />
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
