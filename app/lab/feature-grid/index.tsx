"use client";
import { useCallback, useState } from "react";

const ITEMS = [
  { title: "Fresh branch", body: "Every feature starts from a clean branch off main, so changes never collide." },
  { title: "Allowlist", body: "Only the files a feature is allowed to touch can change, keeping each lab contained." },
  { title: "Size cap", body: "Every diff is capped in size, so each feature stays small and easy to review." },
  { title: "No network", body: "Lab code may not fetch, call, or store anything over the network." },
  { title: "Visual gate", body: "A layout check at phone and desktop widths runs before anything ships." },
  { title: "Nightly reset", body: "The showcase resets nightly so every demo starts from the same clean slate." },
] as const;

function InlineMark() {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 8v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function FeatureGridLab() {
  const [broken, setBroken] = useState<Record<number, true>>({});
  const markBroken = useCallback((idx: number) => {
    setBroken((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
  }, []);

  return (
    <section data-lab="feature-grid" aria-labelledby="fg-heading">
      <h2 id="fg-heading">Feature grid</h2>
      <ul className="lab-fglist">
        {ITEMS.map((item, idx) => {
          const useFallback = broken[idx];
          return (
            <li key={item.title} className="lab-fglist-item">
              <div className="lab-fglist-head">
                <span className="lab-fglist-icon" aria-hidden={useFallback ? true : undefined}>
                  {useFallback ? (
                    <span data-art="fallback" className="lab-fglist-fallback">
                      <InlineMark />
                    </span>
                  ) : (
                    <img
                      data-art="image"
                      src={`/lab/feature-grid/icon-${idx}.svg`}
                      width={32}
                      height={32}
                      alt=""
                      onError={() => markBroken(idx)}
                    />
                  )}
                </span>
                <h3 className="lab-fglist-label">{item.title}</h3>
              </div>
              <p className="lab-fglist-copy">{item.body}</p>
            </li>
          );
        })}
      </ul>
      <style>{styles}</style>
    </section>
  );
}

const styles = `
[data-lab="feature-grid"] {
  width: min(960px, 100%);
  margin: 8px auto 56px;
  color: var(--mist, #E8EEE9);
}
[data-lab="feature-grid"] > h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.2;
  margin: 0 0 28px;
  color: #F2EFE6;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(176, 203, 188, 0.22);
}
.lab-fglist {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.lab-fglist-item {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 22px 24px 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-fglist-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.lab-fglist-icon {
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  color: var(--sage);
}
.lab-fglist-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(176, 203, 188, 0.14);
}
.lab-fglist-label {
  margin: 0;
  font-family: var(--serif);
  font-weight: 400;
  font-size: 19px;
  color: #F2EFE6;
}
.lab-fglist-copy {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(242, 239, 230, 0.82);
}
@media (max-width: 900px) {
  .lab-fglist { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 600px) {
  .lab-fglist { grid-template-columns: 1fr; width: min(720px, 100%); }
}
@media (prefers-reduced-motion: reduce) {
  .lab-fglist-item { transition: none; }
}
`;
