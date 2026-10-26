"use client";
import { useState } from "react";

type Guardrail = {
  title: string;
  text: string;
};

const GUARDRAILS: Guardrail[] = [
  { title: "Fresh branch", text: "Every feature starts from a clean branch off main, so changes never collide." },
  { title: "Allowlist", text: "Only the files a feature is allowed to touch can change, keeping each lab contained." },
  { title: "Size cap", text: "Every diff is capped in size, so each feature stays small and easy to review." },
  { title: "No network", text: "Lab code may not fetch, call, or store anything over the network." },
  { title: "Visual gate", text: "A layout check at phone and desktop widths runs before anything ships." },
  { title: "Nightly reset", text: "The showcase resets nightly so every demo starts from the same clean slate." },
];

function FallbackIcon() {
  return (
    <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M11 16h10M16 11v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Lab() {
  const [artOk, setArtOk] = useState<boolean[]>(() => GUARDRAILS.map(() => true));

  return (
    <section data-lab="feature-grid" aria-labelledby="feature-grid-h2">
      <h2 id="feature-grid-h2">Feature grid</h2>
      <ul className="lab-fg-grid">
        {GUARDRAILS.map((g, i) => (
          <li className="lab-fg-card" key={g.title}>
            <span className="lab-fg-icon-wrap">
              {artOk[i] ? (
                <img
                  data-art="image"
                  src={`/lab/feature-grid/icon-${i}.svg`}
                  width={32}
                  height={32}
                  alt=""
                  onError={() =>
                    setArtOk((prev) => prev.map((v, idx) => (idx === i ? false : v)))
                  }
                />
              ) : (
                <span data-art="fallback" aria-hidden="true" className="lab-fg-fallback">
                  <FallbackIcon />
                </span>
              )}
            </span>
            <h3 className="lab-fg-title">{g.title}</h3>
            <p className="lab-fg-text">{g.text}</p>
          </li>
        ))}
      </ul>
      <style>{css}</style>
    </section>
  );
}

const css = `
[data-lab="feature-grid"] { max-width: min(960px, 100%); margin: 8px auto 56px; color: #E8EEE9; }
.lab-fg-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.lab-fg-card { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: transparent; display: flex; flex-direction: column; gap: 10px; }
.lab-fg-icon-wrap { display: inline-flex; width: 32px; height: 32px; color: var(--sage); }
.lab-fg-fallback { display: inline-flex; width: 32px; height: 32px; color: var(--sage); background: rgba(176,203,188,0.16); border-radius: 8px; align-items: center; justify-content: center; }
.lab-fg-title { font-family: var(--serif); font-weight: 400; font-size: 20px; margin: 0; color: #F2EFE6; }
.lab-fg-text { font-size: 14px; line-height: 1.5; margin: 0; color: rgba(232,238,233,0.85); }
@media (max-width: 900px) {
  .lab-fg-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .lab-fg-grid { grid-template-columns: 1fr; }
}
`;
