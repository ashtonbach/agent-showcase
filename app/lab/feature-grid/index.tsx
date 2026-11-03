"use client";
import { useCallback, type SyntheticEvent } from "react";

const CARDS = [
  { t: "Fresh branch", s: "Each showcase run codes on an isolated git branch.", i: "icon-0.svg" },
  { t: "Allowlist", s: "Only approved paths and APIs may change during a run.", i: "icon-1.svg" },
  { t: "Size cap", s: "Total diffs must stay within a strict line budget.", i: "icon-2.svg" },
  { t: "No network", s: "Lab components cannot fetch or call external services.", i: "icon-3.svg" },
  { t: "Visual gate", s: "Layout and contrast checks run before merge.", i: "icon-4.svg" },
  { t: "Nightly reset", s: "Demo environments reset on a nightly schedule.", i: "icon-5.svg" },
] as const;

function ArtFallback() {
  return (
    <span data-art="fallback" aria-hidden="true" className="lab-fb" hidden>
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="rgba(176,203,188,0.22)" />
      </svg>
    </span>
  );
}

export default function FeatureGrid() {
  const swap = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.hidden = true;
    const n = e.currentTarget.nextElementSibling;
    if (n instanceof HTMLElement) n.hidden = false;
  }, []);

  return (
    <section data-lab="feature-grid" aria-labelledby="fg-title">
      <h2 id="fg-title">Six guardrails of the showcase</h2>
      <ul className="lab-grid">
        {CARDS.map((c) => (
          <li key={c.t} className="lab-card">
            <div className="lab-ico">
              <img data-art="image" src={`/lab/feature-grid/${c.i}`} width={32} height={32} alt="" onError={swap} />
              <ArtFallback />
            </div>
            <h3 className="lab-card-title">{c.t}</h3>
            <p className="lab-card-copy">{c.s}</p>
          </li>
        ))}
      </ul>
      <style>{`
        [data-lab="feature-grid"] .lab-grid{list-style:none;margin:8px auto 56px;padding:0;width:min(960px,100%);display:grid;gap:16px;grid-template-columns:1fr}
        @media(min-width:601px){[data-lab="feature-grid"] .lab-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:901px){[data-lab="feature-grid"] .lab-grid{grid-template-columns:repeat(3,1fr)}}
        [data-lab="feature-grid"] .lab-card{border:1px solid rgba(176,203,188,0.28);border-radius:16px;padding:24px;background:rgba(18,26,22,0.35)}
        [data-lab="feature-grid"] .lab-ico{margin-bottom:12px}
        [data-lab="feature-grid"] .lab-fb[hidden]{display:none}
        [data-lab="feature-grid"] img[hidden]{display:none}
        [data-lab="feature-grid"] .lab-card-title{margin:0 0 8px;font-family:var(--serif);font-weight:400;font-size:1.15rem;color:var(--mist)}
        [data-lab="feature-grid"] .lab-card-copy{margin:0;color:var(--mist);line-height:1.5;font-size:0.95rem}
        @media(prefers-reduced-motion:reduce){[data-lab="feature-grid"] *{animation:none!important;transition:none!important}}
      `}</style>
    </section>
  );
}
