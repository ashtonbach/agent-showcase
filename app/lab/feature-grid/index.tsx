"use client";

import { useEffect, useId, useRef, useState } from "react";

const CARDS = [
  { title: "Fresh branch", text: "Every run works on a dedicated branch so commits never land on main by mistake.", icon: "icon-0.svg" },
  { title: "Allowlist", text: "The merge gate allows only the lab component, two page lines, and current.json.", icon: "icon-1.svg" },
  { title: "Size cap", text: "Total changed lines across allowed files must stay within the gate budget.", icon: "icon-2.svg" },
  { title: "No network", text: "Lab code cannot use fetch, sockets, or other client network APIs.", icon: "icon-3.svg" },
  { title: "Visual gate", text: "SHIP checks layout width, heading visibility, and contrast before push.", icon: "icon-4.svg" },
  { title: "Nightly reset", text: "The operator rebuilds the demo environment on a schedule for clean reruns.", icon: "icon-5.svg" },
] as const;

function CardIcon({ file }: { file: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok) {
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fg-icon-fb">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M8 16h16M16 8v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <img
      ref={ref}
      data-art="image"
      src={`/lab/feature-grid/${file}`}
      width={32}
      height={32}
      alt=""
      onError={() => setOk(false)}
    />
  );
}

export default function FeatureGridLab() {
  const titleId = `${useId().replace(/:/g, "")}-title`;
  return (
  <section data-lab="feature-grid" aria-labelledby={titleId} className="lab-fg">
    <h2 id={titleId}>Six guardrails of the showcase</h2>
    <ul className="lab-fg-grid">
      {CARDS.map((card) => (
        <li key={card.title} className="lab-fg-card">
          <CardIcon file={card.icon} />
          <h3 className="lab-fg-card-title">{card.title}</h3>
          <p className="lab-fg-card-text">{card.text}</p>
        </li>
      ))}
    </ul>
    <style>{`
      .lab-fg { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #f2efe6); }
      .lab-fg h2 { margin: 0 0 24px; font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; }
      .lab-fg-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
      .lab-fg-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.35); }
      .lab-fg-card-title { margin: 12px 0 8px; font-family: var(--sans); font-size: 17px; font-weight: 500; color: var(--mist, #f2efe6); }
      .lab-fg-card-text { margin: 0; font-family: var(--sans); font-size: 15px; line-height: 1.5; color: #e8eee9; }
      .lab-fg img[data-art="image"] { display: block; width: 32px; height: 32px; }
      .lab-fg-icon-fb { display: inline-flex; width: 32px; height: 32px; align-items: center; justify-content: center; color: var(--sage); background: rgba(176, 203, 188, 0.12); border-radius: 8px; }
      @media (max-width: 900px) { .lab-fg-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 600px) { .lab-fg-grid { grid-template-columns: 1fr; } }
      @media (prefers-reduced-motion: reduce) { .lab-fg-card { transition: none; } }
    `}</style>
  </section>
  );
}
