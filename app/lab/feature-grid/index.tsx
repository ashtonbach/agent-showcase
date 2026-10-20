"use client";
import { useCallback, useState } from "react";

const ITEMS = [
  { title: "Fresh branch", text: "Every run starts from a clean branch so demos do not inherit stale code." },
  { title: "Allowlist", text: "Only approved files and APIs may change, keeping reviews focused and safe." },
  { title: "Size cap", text: "A line budget forces small, readable diffs that reviewers can scan quickly." },
  { title: "No network", text: "Client code cannot call the network, so features stay self-contained on the page." },
  { title: "Visual gate", text: "Layout checks at phone and desktop widths catch overflow before merge." },
  { title: "Nightly reset", text: "Environments reset on a schedule so the next showcase begins from a known baseline." },
];

function iconSrc(i: number) {
  return `/lab/feature-grid/icon-${i}.svg`;
}

export default function FeatureGrid() {
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const onErr = useCallback((i: number) => {
    setBroken((b) => ({ ...b, [i]: true }));
  }, []);

  const css = `
.lab-feature-grid { width: min(960px, 100%); margin: 8px auto 56px; color: var(--mist, #E8EEE9); }
.lab-feature-grid h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.15; margin: 0 0 24px; color: var(--mist, #F2EFE6); }
.lab-feature-grid ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 900px) { .lab-feature-grid ul { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .lab-feature-grid ul { grid-template-columns: 1fr; } }
.lab-feature-grid li { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; background: rgba(18,26,22,0.35); }
.lab-feature-grid .lab-card-head { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 10px; }
.lab-feature-grid .lab-card-head img { flex-shrink: 0; display: block; }
.lab-feature-grid .lab-card-head h3 { margin: 0; font-family: var(--serif); font-weight: 400; font-size: 1.15rem; color: var(--mist, #F2EFE6); }
.lab-feature-grid .lab-card-head h3 span { color: var(--sage, #B0CBBC); }
.lab-feature-grid p { margin: 0; font-size: 0.95rem; line-height: 1.5; color: var(--mist, #E8EEE9); opacity: 0.92; }
.lab-feature-grid [data-art="fallback"] { width: 32px; height: 32px; border-radius: 8px; background: rgba(176,203,188,0.2); display: inline-flex; align-items: center; justify-content: center; }
.lab-feature-grid [data-art="fallback"] svg { width: 20px; height: 20px; stroke: var(--sage, #B0CBBC); fill: none; stroke-width: 1.5; }
@media (prefers-reduced-motion: reduce) { .lab-feature-grid * { transition: none !important; } }
`;

  return (
    <section data-lab="feature-grid" aria-labelledby="lab-feature-grid-title" className="lab-feature-grid">
      <style>{css}</style>
      <h2 id="lab-feature-grid-title">Six guardrails of the showcase</h2>
      <ul>
        {ITEMS.map((item, i) => (
          <li key={item.title}>
            <div className="lab-card-head">
              {broken[i] ? (
                <span data-art="fallback" aria-hidden="true">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M12 4v16" /></svg>
                </span>
              ) : (
                <img
                  data-art="image"
                  src={iconSrc(i)}
                  width={32}
                  height={32}
                  alt=""
                  onError={() => onErr(i)}
                />
              )}
              <h3>{item.title}</h3>
            </div>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
