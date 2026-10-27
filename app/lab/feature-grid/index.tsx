"use client";
import { useState } from "react";

const GUARDRAILS = [
  {
    title: "Fresh branch",
    body: "Every showcase feature ships from its own branch off main so demos never step on each other.",
  },
  {
    title: "Allowlist",
    body: "Only the lab files on the allowlist may change, which keeps each feature isolated and reviewable.",
  },
  {
    title: "Size cap",
    body: "Diffs stay under a line budget so reviewers can read the whole feature in one pass.",
  },
  {
    title: "No network",
    body: "Lab components cannot fetch, beacon, or open sockets—everything renders from static props.",
  },
  {
    title: "Visual gate",
    body: "Layout checks at 1280px and 390px run before merge so cards stay centered without horizontal scroll.",
  },
  {
    title: "Nightly reset",
    body: "The showcase environment resets on a schedule so the next run starts from the same baseline.",
  },
] as const;

const fallbackIcon = (
  <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden="true">
    <rect x="6" y="6" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 16h10" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function FeatureGrid() {
  const [broken, setBroken] = useState<Record<number, true>>({});

  const markBroken = (index: number) => {
    setBroken((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
  };

  return (
    <section data-lab="feature-grid" aria-labelledby="lab-feature-grid-title">
      <h2 id="lab-feature-grid-title">Feature grid</h2>
      <ul className="lab-fg-list">
        {GUARDRAILS.map((item, index) => (
          <li key={item.title} className="lab-fg-item">
            <div className="lab-fg-head">
              <span className="lab-fg-icon">
                {broken[index] ? (
                  <span data-art="fallback" aria-hidden="true" className="lab-fg-fallback">
                    {fallbackIcon}
                  </span>
                ) : (
                  <img
                    data-art="image"
                    src={`/lab/feature-grid/icon-${index}.svg`}
                    width={32}
                    height={32}
                    alt=""
                    onError={() => markBroken(index)}
                  />
                )}
              </span>
              <h3 className="lab-fg-title">{item.title}</h3>
            </div>
            <p className="lab-fg-copy">{item.body}</p>
          </li>
        ))}
      </ul>
      <style>{`
[data-lab="feature-grid"] {
  max-width: min(960px, 100%);
  margin: 8px auto 56px;
  color: var(--mist, #e8eee9);
}
[data-lab="feature-grid"] h2 {
  margin: 0 0 20px;
  font: 400 30px/1.25 var(--serif);
  color: var(--mist, #f2efe6);
}
.lab-fg-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.lab-fg-item {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
}
.lab-fg-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.lab-fg-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  color: var(--sage);
}
.lab-fg-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(176, 203, 188, 0.15);
}
.lab-fg-title {
  margin: 0;
  font: 400 19px/1.2 var(--serif);
  color: var(--mist, #f2efe6);
}
.lab-fg-copy {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(232, 238, 233, 0.9);
}
@media (max-width: 900px) {
  .lab-fg-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 600px) {
  .lab-fg-list {
    grid-template-columns: 1fr;
    max-width: min(720px, 100%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .lab-fg-item {
    transition: none;
  }
}
`}</style>
    </section>
  );
}
