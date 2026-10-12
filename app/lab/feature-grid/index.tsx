"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const CARDS = [
  { t: "Fresh branch", d: "Every run starts from the base version.", i: <path {...P} d="M6 3v12M18 9a3 3 0 1 0 0-.01M6 21a3 3 0 1 0 0-.01M18 12c0 4-6 3-12 6" /> },
  { t: "Allowlist", d: "Only one folder may change.", i: <path {...P} d="M4 12l5 5L20 6" /> },
  { t: "Size cap", d: "At most 150 changed lines.", i: <path {...P} d="M4 20V10M10 20V4M16 20v-7M22 20H2" /> },
  { t: "No network", d: "Banned calls block the merge.", i: <path {...P} d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM5.6 5.6l12.8 12.8" /> },
  { t: "Visual gate", d: "Screenshots must match the reference.", i: <path {...P} d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /> },
  { t: "Nightly reset", d: "Back to base at 3 AM CT.", i: <path {...P} d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /> },
];
const css = `
.lab-grid { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-grid h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 6px 0 20px; }
.lab-grid ul { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; list-style: none; }
.lab-grid li { padding: 22px; border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; }
.lab-grid [data-art] { display: block; width: 32px; height: 32px; color: var(--sage); }
.lab-grid [data-art] svg { width: 32px; height: 32px; }
.lab-grid h3 { font: 500 17px var(--sans); margin: 12px 0 4px; }
.lab-grid p { opacity: 0.85; font-size: 15px; }
@media (max-width: 900px) { .lab-grid ul { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .lab-grid ul { grid-template-columns: 1fr; } }
`;

// Artwork slot: Naomi Sato commits the image at a fixed path; a quiet fallback shows if it is missing or fails to load.
function Art({ src, w, h, alt, children }: { src: string; w: number; h: number; alt: string; children: ReactNode }) {
  const r = useRef<HTMLImageElement>(null);
  const [ok, setOk] = useState(true);
  useEffect(() => { const i = r.current; if (i && i.complete && i.naturalWidth === 0) setOk(false); }, [src]);
  return ok ? <img ref={r} data-art="image" src={src} width={w} height={h} alt={alt} onError={() => setOk(false)} /> : <span data-art="fallback" aria-hidden="true">{children}</span>;
}

export default function FeatureGrid() {
  return (
    <section data-lab="feature-grid" className="lab-grid" aria-labelledby="lab-grid-title">
      <style>{css}</style>
      <p className="label">Guardrails</p>
      <h2 id="lab-grid-title">Built in from the start</h2>
      <ul>
        {CARDS.map((c, k) => (
          <li key={c.t}>
            <Art src={`/lab/feature-grid/icon-${k}.svg`} w={32} h={32} alt="">
              <svg viewBox="0 0 24 24" aria-hidden="true">{c.i}</svg>
            </Art>
            <h3>{c.t}</h3>
            <p>{c.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
