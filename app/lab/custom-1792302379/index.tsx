"use client";

import { useEffect, useState } from "react";

const VARIANTS = [
  { label: "Crimson pine", cls: "lab-ban-crimson" },
  { label: "Holly stripe", cls: "lab-ban-holly" },
  { label: "Evergreen glow", cls: "lab-ban-evergreen" },
  { label: "Candy ribbon", cls: "lab-ban-candy" },
];

const DEFAULT = VARIANTS[0];

const css = `
.lab-wrap{position:relative;width:min(720px,100%);margin:8px auto 56px}
.lab-card{padding:24px;border:1px solid rgba(176,203,188,0.28);border-radius:16px;background:rgba(18,26,22,0.55)}
.lab-card p{margin:0 0 12px;color:var(--mist);line-height:1.55}
.lab-card p:last-child{margin-bottom:0}
.lab-role{font-family:var(--sans);font-weight:500;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--sage);margin-bottom:8px}
.lab-xmas{position:fixed;top:var(--header-h,64px);left:0;right:0;z-index:19;display:flex;align-items:center;justify-content:center;max-height:100px;width:100%;padding:10px 16px;box-sizing:border-box;border-bottom:1px solid rgba(176,203,188,0.35)}
.lab-xmas-txt{margin:0;font-family:var(--serif);font-size:clamp(18px,4vw,26px);font-weight:400;color:#F2EFE6;text-shadow:0 1px 3px rgba(0,0,0,0.45)}
.lab-ban-crimson{background:linear-gradient(90deg,rgba(139,30,45,0.82),rgba(34,68,48,0.78))}
.lab-ban-holly{background:repeating-linear-gradient(90deg,rgba(160,32,40,0.75) 0 14px,rgba(22,58,38,0.75) 14px 28px)}
.lab-ban-evergreen{background:radial-gradient(circle at 20% 50%,rgba(90,160,110,0.55),rgba(18,42,32,0.82))}
.lab-ban-candy{background:repeating-linear-gradient(135deg,rgba(200,48,56,0.78) 0 12px,rgba(242,239,230,0.72) 12px 24px)}
.lab-snow{pointer-events:none;position:fixed;inset:0;z-index:18;overflow:hidden}
.lab-flake{position:absolute;top:-8px;width:6px;height:6px;border-radius:50%;background:rgba(242,239,230,0.75);animation:lab-fall linear infinite}
@keyframes lab-fall{to{transform:translateY(110vh)}}
@media (prefers-reduced-motion:reduce){.lab-flake{animation:none;opacity:0.35}}
@media (max-width:640px){.lab-xmas{top:56px}}
`;

const FLAKES = [
  { left: "6%", delay: "0s", dur: "14s" },
  { left: "18%", delay: "2s", dur: "18s" },
  { left: "31%", delay: "4s", dur: "16s" },
  { left: "44%", delay: "1s", dur: "20s" },
  { left: "57%", delay: "3s", dur: "15s" },
  { left: "70%", delay: "5s", dur: "17s" },
  { left: "83%", delay: "2.5s", dur: "19s" },
  { left: "92%", delay: "0.5s", dur: "13s" },
];

export default function Lab() {
  const [variant, setVariant] = useState(DEFAULT);

  useEffect(() => {
    const i = Math.floor(Math.random() * VARIANTS.length);
    setVariant(VARIANTS[i]);
  }, []);

  return (
    <section
      data-lab="custom-1792302379"
      aria-labelledby="lab-your-request-title"
    >
      <style>{css}</style>
      <h2 id="lab-your-request-title">Your request</h2>
      <div
        className={`lab-xmas ${variant.cls}`}
        role="region"
        aria-label={`Christmas banner: ${variant.label}`}
      >
        <p className="lab-xmas-txt">{variant.label}</p>
      </div>
      <div className="lab-snow" aria-hidden="true">
        {FLAKES.map((f, n) => (
          <span
            key={n}
            className="lab-flake"
            style={{ left: f.left, animationDelay: f.delay, animationDuration: f.dur }}
          />
        ))}
      </div>
      <div className="lab-wrap">
        <div className="lab-card">
          <p className="lab-role">Showcase page</p>
          <p>
            The AshtonBach header, demo title, and footer stay as they are. A
            fixed holiday banner sits directly under the header (reload to see
            another style).
          </p>
          <p>
            Gentle snow drifts over the forest-mist background without blocking
            clicks on the page.
          </p>
        </div>
      </div>
    </section>
  );
}
