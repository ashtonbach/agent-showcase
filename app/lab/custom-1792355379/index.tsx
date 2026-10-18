"use client";
import { useEffect, useState } from "react";

const CLOSED = "We're closed Dec 24–25 for Christmas.";

const css = `
main.page .page-stack { padding-top: 84px; }
.lab-ban {
  position: fixed; top: var(--header-h); left: 0; right: 0; z-index: 18;
  max-height: 100px; display: flex; align-items: center; justify-content: center;
  padding: 10px 16px; text-align: center; font-family: var(--sans); font-weight: 500;
  font-size: 15px; letter-spacing: 0.04em; line-height: 1.35; box-sizing: border-box;
}
.lab-ban--0 {
  background: repeating-linear-gradient(105deg, #8b1a1a 0 18px, #1a5c32 18px 36px, #c9a227 36px 54px);
  color: #fff8e7;
}
.lab-msg { padding: 6px 14px; border-radius: 8px; background: rgba(20,32,26,.82); }
.lab-ban--1 { background: #6b0f0f; color: #f5e6a8; border-bottom: 3px solid #1a5c32; gap: 10px; }
.lab-ban--2 {
  background: linear-gradient(90deg, #1a5c32, #0d3d22); color: #f5e6a8;
  border-bottom: 4px double #c9a227; gap: 10px;
}
.lab-ban--3 {
  background: linear-gradient(180deg, #5c1212 0%, #3d0a0a 100%); color: #f5e6a8;
  border-bottom: 3px solid #c9a227; gap: 10px;
}
.lab-gfx { width: 22px; height: 22px; flex-shrink: 0; border-radius: 50%; }
.lab-ban--0 .lab-gfx { background: radial-gradient(circle at 30% 30%, #f5e6a8, #c9a227 70%); border: 2px solid #1a5c32; }
.lab-ban--1 .lab-gfx:nth-of-type(1) { background: #c41e3a; box-shadow: -28px 0 0 #1a5c32, 28px 0 0 #c9a227; width: 14px; height: 14px; }
.lab-ban--2 .lab-gfx {
  width: 0; height: 0; border: none; background: none;
  border-left: 6px solid transparent; border-right: 6px solid transparent;
  border-bottom: 10px solid #e8c547;
}
.lab-ban--3 .lab-gfx {
  background: conic-gradient(#c9a227 0 25%, #1a5c32 25% 50%, #8b1a1a 50% 75%, #c9a227 75%);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  border-radius: 0;
}
.lab-snow {
  position: fixed; inset: 0; z-index: 12; pointer-events: none; overflow: hidden;
}
.lab-flake {
  position: absolute; top: -12px; width: 6px; height: 6px; border-radius: 50%;
  background: rgba(242,239,230,.85); box-shadow: 0 0 6px rgba(255,255,255,.35);
  animation: lab-fall linear infinite;
}
@keyframes lab-fall { to { transform: translateY(110vh); } }
.lab-flake:nth-child(1){left:4%;animation-duration:9s;animation-delay:0s}
.lab-flake:nth-child(2){left:12%;animation-duration:11s;animation-delay:1s;width:4px;height:4px}
.lab-flake:nth-child(3){left:22%;animation-duration:8s;animation-delay:2s}
.lab-flake:nth-child(4){left:31%;animation-duration:12s;animation-delay:.5s}
.lab-flake:nth-child(5){left:40%;animation-duration:10s;animation-delay:3s;width:5px;height:5px}
.lab-flake:nth-child(6){left:48%;animation-duration:9s;animation-delay:1.5s}
.lab-flake:nth-child(7){left:55%;animation-duration:13s;animation-delay:0s}
.lab-flake:nth-child(8){left:63%;animation-duration:8s;animation-delay:2.5s;width:4px;height:4px}
.lab-flake:nth-child(9){left:70%;animation-duration:11s;animation-delay:4s}
.lab-flake:nth-child(10){left:78%;animation-duration:9s;animation-delay:1s}
.lab-flake:nth-child(11){left:86%;animation-duration:12s;animation-delay:3.5s}
.lab-flake:nth-child(12){left:93%;animation-duration:10s;animation-delay:.8s;width:5px;height:5px}
.lab-flake:nth-child(13){left:18%;animation-duration:14s;animation-delay:5s;width:3px;height:3px}
.lab-flake:nth-child(14){left:58%;animation-duration:7s;animation-delay:2s;width:4px;height:4px}
.lab-flake:nth-child(15){left:82%;animation-duration:11s;animation-delay:6s}
@media (prefers-reduced-motion: reduce) { .lab-flake { display: none; } }
.lab-card {
  max-width: min(720px, 100%); margin: 8px auto 56px; padding: 24px;
  border: 1px solid rgba(176,203,188,.28); border-radius: 16px;
}
.lab-card p { margin: 0 0 12px; color: var(--mist); line-height: 1.55; }
.lab-card p:last-child { margin-bottom: 0; }
.lab-kicker { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; color: var(--sage); }
`;

const FLAKES = 15;

export default function Lab() {
  const [variant, setVariant] = useState(0);
  useEffect(() => {
    setVariant(Math.floor(Math.random() * 4));
  }, []);

  const banner =
    variant === 0 ? (
      <div className="lab-ban lab-ban--0" role="status">
        <span className="lab-gfx" aria-hidden="true" /><span className="lab-msg">{CLOSED}</span><span className="lab-gfx" aria-hidden="true" />
      </div>
    ) : variant === 1 ? (
      <div className="lab-ban lab-ban--1" role="status">
        <span className="lab-gfx" aria-hidden="true" /><span className="lab-msg">{CLOSED}</span>
      </div>
    ) : variant === 2 ? (
      <div className="lab-ban lab-ban--2" role="status">
        <span className="lab-gfx" aria-hidden="true" /><span className="lab-msg">{CLOSED}</span><span className="lab-gfx" aria-hidden="true" />
      </div>
    ) : (
      <div className="lab-ban lab-ban--3" role="status">
        <span className="lab-gfx" aria-hidden="true" /><span className="lab-msg">{CLOSED}</span><span className="lab-gfx" aria-hidden="true" />
      </div>
    );

  return (
    <section data-lab="custom-1792355379" aria-labelledby="lab-yr-h2">
      <h2 id="lab-yr-h2">Holiday closure banner</h2>
      {banner}
      <div className="lab-snow" aria-hidden="true">
        {Array.from({ length: FLAKES }, (_, i) => (
          <span key={i} className="lab-flake" />
        ))}
      </div>
      <div className="lab-card">
        <p className="lab-kicker">On this page</p>
        <p>
          A fixed red, green, and gold banner sits just under the site header (up to 100px tall) with our
          Christmas closure message. Each reload picks one of four festive styles (stripes, lights, stars, or gold).
        </p>
        <p>Light snow falls across the full viewport from the top; extra top padding keeps the banner from covering the heading.</p>
      </div>
      <style>{css}</style>
    </section>
  );
}
