"use client";

import { useEffect, useState } from "react";

const CLOSED = "We're closed Dec 24–25 for Christmas.";
const VARIATIONS = [
  { id: 0, art: "🎄✨", cls: "lab-v0" },
  { id: 1, art: "", cls: "lab-v1" },
  { id: 2, art: "⭐🎁⭐", cls: "lab-v2" },
  { id: 3, art: "🎅", cls: "lab-v3" },
];

const css = `
.lab-x{position:relative;width:min(720px,100%);margin:8px auto 56px;padding-top:96px;color:var(--mist,#F2EFE6);box-sizing:border-box}
.lab-x h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 16px}
.lab-x p{margin:0;font:400 15px/1.55 var(--sans);color:#E8EEE9}
.lab-ban{position:fixed;left:0;right:0;top:var(--header-h,64px);z-index:40;max-height:100px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:12px;padding:10px 16px;text-align:center;font:500 14px/1.35 var(--sans);color:#F2EFE6;border-bottom:1px solid rgba(212,175,55,.45);box-shadow:0 4px 20px rgba(0,0,0,.35)}
.lab-ban.lab-v0{background:linear-gradient(90deg,#8B0000 0%,#0B5D2E 50%,#8B6914 100%)}
.lab-ban.lab-v1{background:linear-gradient(90deg,#8B0000,#0B5D2E)}
.lab-ban.lab-v1 .lab-cane{width:32px;height:32px;border-radius:6px;background:repeating-linear-gradient(45deg,#8B0000,#8B0000 5px,#F2EFE6 5px,#F2EFE6 10px);border:2px solid #D4AF37;flex:0 0 auto}
.lab-ban.lab-v2{background:linear-gradient(180deg,#0B5D2E,#145A32 60%,#8B6914);letter-spacing:.04em}
.lab-ban.lab-v3{background:linear-gradient(90deg,#8B6914,#0B5D2E,#8B0000);font-size:16px}
.lab-gfx{font-size:28px;line-height:1;flex:0 0 auto}
.lab-snow{pointer-events:none;position:fixed;inset:0;z-index:30;overflow:hidden}
.lab-flake{position:absolute;top:-12px;color:#F2EFE6;opacity:.85;text-shadow:0 0 4px rgba(255,255,255,.4);animation:lab-fall linear infinite}
@keyframes lab-fall{to{transform:translateY(110vh)}}
@media (prefers-reduced-motion:reduce){.lab-flake{animation:none;opacity:.35}}
@media (max-width:640px){.lab-x{padding-top:88px}.lab-ban{font-size:13px;padding:8px 12px}}
`;

type Flake = { id: number; left: number; size: number; dur: number; delay: number };

export default function HolidayRequest() {
  const [variant, setVariant] = useState(0);
  const [flakes, setFlakes] = useState<Flake[]>([]);

  useEffect(() => {
    setVariant(Math.floor(Math.random() * 4));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const n = 48;
    const next: Flake[] = [];
    for (let i = 0; i < n; i += 1) {
      next.push({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 10,
        dur: 8 + Math.random() * 14,
        delay: Math.random() * 8,
      });
    }
    setFlakes(next);
  }, []);

  const v = VARIATIONS[variant] ?? VARIATIONS[0];

  return (
    <section className="lab-x" data-lab="custom-1792472522" aria-labelledby="lab-holiday-title">
      <h2 id="lab-holiday-title">Holiday notice</h2>
      <style>{css}</style>
      <div className={`lab-ban ${v.cls}`} role="status" aria-live="polite">
        {v.id === 1 ? <span className="lab-cane" aria-hidden="true" /> : null}
        {v.art ? <span className="lab-gfx" aria-hidden="true">{v.art}</span> : null}
        <span>{CLOSED}</span>
      </div>
      <div className="lab-snow" aria-hidden="true">
        {flakes.map((f) => (
          <span
            key={f.id}
            className="lab-flake"
            style={{
              left: `${f.left}%`,
              fontSize: `${f.size}px`,
              animationDuration: `${f.dur}s`,
              animationDelay: `${f.delay}s`,
            }}
          >
            ❄
          </span>
        ))}
      </div>
      <p>The banner stays fixed under the site header so the FAQ below stays easy to read.</p>
    </section>
  );
}
