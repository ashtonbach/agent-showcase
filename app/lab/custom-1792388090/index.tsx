"use client";

import { useEffect, useState } from "react";

const CLOSED = "We're closed December 24 & 25 for Christmas.";

const BANNERS = [
  { art: "🎄", bg: "linear-gradient(90deg,#8b0000 0%,#0d5c2e 50%,#b8860b 100%)" },
  { art: "⭐", bg: "repeating-linear-gradient(45deg,#0d5c2e,#0d5c2e 12px,#8b0000 12px,#8b0000 24px)" },
  { art: "🎁", bg: "linear-gradient(180deg,#b8860b 0%,#8b0000 40%,#0d5c2e 100%)" },
  { art: "❄", bg: "radial-gradient(circle at 20% 50%,#b8860b 0 8px,transparent 9px),radial-gradient(circle at 60% 50%,#8b0000 0 6px,transparent 7px),#0d5c2e" },
];

type Flake = { id: number; left: number; delay: number; dur: number; size: number };

export default function Lab() {
  const [pick, setPick] = useState(0);
  const [flakes, setFlakes] = useState<Flake[]>([]);

  useEffect(() => {
    setPick(Math.floor(Math.random() * BANNERS.length));
    const next: Flake[] = [];
    for (let i = 0; i < 48; i++) {
      next.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        dur: 1.2 + Math.random() * 1.4,
        size: 3 + Math.random() * 5,
      });
    }
    setFlakes(next);
  }, []);

  const b = BANNERS[pick];

  return (
    <section data-lab="custom-1792388090" aria-labelledby="lab-xmas-h">
      <h2 id="lab-xmas-h">Holiday hours</h2>
      <div className="lab-banner-spacer" aria-hidden="true" />
      <div
        className="lab-xmas-banner"
        role="status"
        style={{ background: b.bg }}
      >
        <span className="lab-xmas-art" aria-hidden="true">{b.art}</span>
        <p className="lab-xmas-msg">{CLOSED}</p>
      </div>
      <div className="lab-snow" aria-hidden="true">
        {flakes.map((f) => (
          <span
            key={f.id}
            className="lab-flake"
            style={{
              left: `${f.left}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.dur}s`,
              width: `${f.size}px`,
              height: `${f.size}px`,
            }}
          />
        ))}
      </div>
      <div className="lab-card">
        <p>
          A festive banner stays fixed just under the site header on every visit. Reload to see
          one of four holiday graphics with the same closure message.
        </p>
      </div>
      <style>{`
        [data-lab="custom-1792388090"]{position:relative;width:min(720px,100%);margin:8px auto 56px;color:var(--mist,#F2EFE6)}
        [data-lab="custom-1792388090"] h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px;color:var(--mist)}
        .lab-banner-spacer{height:min(100px,18vw);max-height:100px}
        .lab-xmas-banner{position:fixed;top:var(--header-h,64px);left:0;right:0;z-index:18;display:flex;align-items:center;justify-content:center;gap:12px;max-height:100px;height:min(100px,18vw);padding:8px 16px;box-sizing:border-box;border-bottom:2px solid rgba(184,134,11,.65);box-shadow:0 4px 16px rgba(0,0,0,.35)}
        .lab-xmas-art{font-size:clamp(28px,8vw,48px);line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))}
        .lab-xmas-msg{margin:0;font-family:var(--sans);font-size:clamp(13px,3.4vw,16px);font-weight:500;letter-spacing:.04em;text-align:center;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.55);max-width:min(640px,92vw)}
        .lab-snow{pointer-events:none;position:fixed;inset:0;z-index:10;overflow:hidden}
        .lab-flake{position:absolute;top:-12px;background:rgba(242,239,230,.92);border-radius:50%;animation:lab-fall linear infinite}
        @keyframes lab-fall{to{transform:translateY(110vh)}}
        .lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
        .lab-card p{margin:0;line-height:1.55;color:#E8EEE9}
        @media (prefers-reduced-motion:reduce){.lab-flake{animation:none;opacity:.35}}
      `}</style>
    </section>
  );
}
