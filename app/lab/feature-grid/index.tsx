"use client";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { t: "Fresh branch", p: "Each run starts on a new branch from origin/base with an empty lab slot." },
  { t: "Allowlist", p: "Only this feature file, two lines of the home page, and current.json may change." },
  { t: "Size cap", p: "The allowed diff stays under a tight line budget, excluding artwork added in parallel." },
  { t: "No network", p: "The feature cannot fetch, open sockets, or read env; imports come only from react." },
  { t: "Visual gate", p: "Layout checks at desktop and phone widths reject sideways scroll and clipped type." },
  { t: "Nightly reset", p: "The lab is cleared overnight so the next run does not inherit the last demo." },
];

const css = `.lab-fg{width:min(960px,100%);margin:8px auto 56px;padding:0 12px;box-sizing:border-box;color:var(--mist,#F2EFE6)}.lab-fg *,.lab-fg *::before,.lab-fg *::after{box-sizing:border-box}.lab-fg h2{font-family:var(--serif,Georgia,serif);font-weight:400;font-size:30px;line-height:1.25;margin:0 0 20px;color:var(--mist,#F2EFE6)}.lab-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr;gap:16px}@media (min-width:601px){.lab-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:901px){.lab-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;min-width:0}.lab-fb{display:inline-flex;width:32px;height:32px;align-items:center;justify-content:center;border-radius:8px;background:#121A16;color:#F2EFE6}.lab-t{font-family:var(--sans,system-ui,sans-serif);font-weight:500;font-size:11px;letter-spacing:.16em;text-transform:uppercase;margin:12px 0 8px;color:var(--sage,#B0CBBC)}.lab-p{margin:0;font-size:15px;line-height:1.45;color:#E8EEE9}.lab-card img{display:block}@media (prefers-reduced-motion:reduce){.lab-fg *{animation:none!important;transition:none!important}}`;

function Art({ i }: { i: number }) {
  const ref = useRef<HTMLImageElement>(null);
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok)
    return (
      <span data-art="fallback" aria-hidden="true" className="lab-fb">
        <svg width={32} height={32} viewBox="0 0 32 32">
          <path d={["M8 24V12l8-6 8 6v12", "M7 9h18v14H7z", "M8 16h16M16 8v16", "M8 16a8 8 0 1016 0 8 8 0 00-16 0", "M8 22l8-12 8 12", "M16 8v16"][i]} fill="none" stroke="#F2EFE6" strokeWidth="2.5" />
        </svg>
      </span>
    );
  return (
    <img ref={ref} data-art="image" src={`/lab/feature-grid/icon-${i}.svg`} width={32} height={32} alt="" onError={() => setOk(false)} />
  );
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" aria-labelledby="lab-fg-h" className="lab-fg">
      <h2 id="lab-fg-h">Six guardrails</h2>
      <ul className="lab-grid">
        {ITEMS.map((item, i) => (
          <li key={item.t} className="lab-card">
            <Art i={i} />
            <h3 className="lab-t">{item.t}</h3>
            <p className="lab-p">{item.p}</p>
          </li>
        ))}
      </ul>
      <style>{css}</style>
    </section>
  );
}
