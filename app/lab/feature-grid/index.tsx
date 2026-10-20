"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { title: "Fresh branch", text: "Every showcase run ships from a new branch cut from base.", icon: "icon-0.svg" },
  { title: "Allowlist", text: "Only the lab slot, page import, and current slug may change.", icon: "icon-1.svg" },
  { title: "Size cap", text: "The gate rejects diffs larger than one hundred fifty changed lines.", icon: "icon-2.svg" },
  { title: "No network", text: "Feature code cannot use fetch, sockets, or other outbound calls.", icon: "icon-3.svg" },
  { title: "Visual gate", text: "Layout, contrast, and scroll are checked at mobile and desktop widths.", icon: "icon-4.svg" },
  { title: "Nightly reset", text: "A scheduled job clears the lab and returns the site to base.", icon: "icon-5.svg" },
];

function IconSlot({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-icon-fb">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 16h10M16 11v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}

const css = `
.lab-fg { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-fg h2#feature-grid-title { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 24px; color: var(--mist); }
.lab-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 900px) { .lab-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .lab-grid { grid-template-columns: 1fr; } }
.lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
.lab-card-head { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 10px; }
.lab-icon-fb { color: var(--sage); display: flex; flex-shrink: 0; }
.lab-card h3 { margin: 0; font-family: var(--serif); font-weight: 400; font-size: 1.15rem; color: #F2EFE6; }
.lab-card p { margin: 0; font-size: 0.95rem; line-height: 1.5; color: var(--mist); }
@media (prefers-reduced-motion: reduce) { .lab-card { transition: none; } }
`;

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="feature-grid-title" className="lab-fg">
      <style>{css}</style>
      <h2 id="feature-grid-title">Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {ITEMS.map((item) => (
          <li key={item.title} className="lab-card">
            <div className="lab-card-head">
              <IconSlot src={`/lab/feature-grid/${item.icon}`} alt="" />
              <h3>{item.title}</h3>
            </div>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
