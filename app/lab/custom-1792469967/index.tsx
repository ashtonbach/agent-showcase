"use client";
import { useEffect, useState, type CSSProperties } from "react";

const VARIATIONS = [
  { emoji: "🎄", accent: "lab-v0" },
  { emoji: "⭐", accent: "lab-v1" },
  { emoji: "🎁", accent: "lab-v2" },
  { emoji: "❄️", accent: "lab-v3" },
];

const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px;padding-top:108px}
.lab-banner{position:fixed;left:0;right:0;top:var(--header-h,64px);z-index:18;max-height:100px;display:flex;align-items:center;justify-content:center;padding:10px 16px;box-sizing:border-box;border-bottom:2px solid rgba(212,175,55,.55);pointer-events:none}
.lab-v0{background:linear-gradient(90deg,#8b1a1a,#1a5c2e 50%,#8b6914)}
.lab-v1{background:linear-gradient(135deg,#6d1212,#2d6b3a 40%,#c9a227 80%)}
.lab-v2{background:repeating-linear-gradient(45deg,#7a1515,#7a1515 12px,#1e4d28 12px,#1e4d28 24px,#b8860b 24px,#b8860b 36px)}
.lab-v3{background:linear-gradient(180deg,#9b2222,#246b38);border-top:3px solid #d4af37}
.lab-banner-inner{display:flex;align-items:center;gap:12px;max-width:960px;color:#fffef5;text-align:center;font-family:var(--sans);font-size:clamp(14px,2.8vw,17px);line-height:1.35;text-shadow:0 1px 2px rgba(0,0,0,.35)}
.lab-banner-art{font-size:clamp(28px,6vw,40px);line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.25))}
.lab-banner strong{color:#f5e6a8;font-weight:500}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;color:var(--mist)}
.lab-card p{margin-top:12px;color:var(--muted)}
.lab-h2{font-family:var(--serif);font-weight:400;font-size:30px;color:var(--mist);margin-bottom:16px}
.lab-snow{position:fixed;inset:0;z-index:12;pointer-events:none;overflow:hidden}
.lab-flake{position:absolute;top:-8%;color:rgba(255,255,255,.85);font-size:var(--fs,14px);animation:lab-snow-fall var(--dur,12s) linear infinite;animation-delay:var(--del,0s);opacity:var(--op,.7)}
@keyframes lab-snow-fall{to{transform:translateY(110vh) translateX(20px)}}
@media (prefers-reduced-motion:reduce){.lab-flake{animation:none;opacity:.35}}
@media (max-width:600px){.lab-wrap{padding-top:96px}.lab-banner{padding:8px 12px}}
`;

export default function Lab() {
  const [variant, setVariant] = useState(0);
  const [flakes, setFlakes] = useState<{ l: number; fs: number; dur: number; del: number; op: number }[]>([]);

  useEffect(() => {
    setVariant(Math.floor(Math.random() * 4));
    setFlakes(
      Array.from({ length: 28 }, () => ({
        l: Math.random() * 100,
        fs: 10 + Math.random() * 14,
        dur: 8 + Math.random() * 10,
        del: Math.random() * 8,
        op: 0.45 + Math.random() * 0.45,
      }))
    );
  }, []);

  const v = VARIATIONS[variant];
  return (
    <section data-lab="custom-1792469967" aria-labelledby="lab-holiday-h2" className="lab-wrap">
      <h2 id="lab-holiday-h2" className="lab-h2">Holiday hours</h2>
      <div className={`lab-banner ${v.accent}`} aria-live="polite">
        <div className="lab-banner-inner">
          <span className="lab-banner-art" aria-hidden="true">{v.emoji}</span>
          <p>
            We&apos;re <strong>closed Dec 24 &amp; 25</strong> for Christmas. Happy holidays from AshtonBach.
          </p>
        </div>
      </div>
      <div className="lab-snow" aria-hidden="true">
        {flakes.map((f, i) => (
          <span
            key={i}
            className="lab-flake"
            style={
              {
                left: `${f.l}%`,
                "--fs": `${f.fs}px`,
                "--dur": `${f.dur}s`,
                "--del": `${f.del}s`,
                "--op": f.op,
              } as CSSProperties
            }
          >
            ❄
          </span>
        ))}
      </div>
      <div className="lab-card">
        <p>
          A festive banner stays fixed just under the site header while you browse. Refresh to see another
          of four banner styles with a different holiday graphic.
        </p>
        <p>Gentle snowfall covers the full page and respects reduced-motion settings.</p>
      </div>
      <style>{css}</style>
    </section>
  );
}
