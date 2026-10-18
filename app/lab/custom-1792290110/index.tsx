"use client";
import { useState, useEffect, useCallback } from "react";

const ART = "/lab/custom-1792290110/holiday-banner.svg";

const VARIANTS = [
  {
    key: "snow",
    title: "Winter welcome",
    lead: "Warm wishes from our team this holiday season.",
    decor: "❄",
  },
  {
    key: "lights",
    title: "Twinkle & cheer",
    lead: "Thank you for being part of our year.",
    decor: "✦",
  },
  {
    key: "pine",
    title: "Under the pines",
    lead: "We hope your holidays are peaceful and bright.",
    decor: "🌲",
  },
  {
    key: "ribbon",
    title: "Season's greetings",
    lead: "Celebrating together, even when we pause to rest.",
    decor: "🎀",
  },
] as const;

export default function Lab() {
  const [variant, setVariant] = useState(0);
  const v = VARIANTS[variant];
  const [artOk, setArtOk] = useState(true);

  useEffect(() => {
    setVariant(Math.floor(Math.random() * VARIANTS.length));
  }, []);

  const onArtError = useCallback(() => setArtOk(false), []);

  useEffect(() => {
    const img = new Image();
    img.src = ART;
    img.onload = () => {
      if (img.naturalWidth === 0) setArtOk(false);
    };
    img.onerror = () => setArtOk(false);
  }, []);

  return (
    <section
      data-lab="custom-1792290110"
      aria-labelledby="lab-xmas-title"
      className="lab-wrap"
    >
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        .lab-banner { border: 1px solid rgba(176,203,188,0.28); border-radius: 16px; padding: 24px; overflow: hidden; }
        .lab-banner h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.2; margin: 0 0 12px; color: var(--mist, #F2EFE6); }
        .lab-inner { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
        .lab-copy { flex: 1 1 220px; min-width: 0; }
        .lab-lead { margin: 0 0 14px; color: #E8EEE9; line-height: 1.5; }
        .lab-closed { margin: 0; line-height: 1.55; color: #E8EEE9; }
        .lab-closed strong { color: var(--mist, #F2EFE6); font-weight: 600; }
        .lab-dates { color: var(--sage); font-weight: 600; }
        .lab-art { flex: 0 0 auto; width: min(200px, 42vw); }
        .lab-art img { display: block; width: 100%; height: auto; border-radius: 12px; }
        .lab-art-fallback { display: block; width: 100%; aspect-ratio: 5/3; border-radius: 12px; background: rgba(176,203,188,0.15); border: 1px dashed rgba(176,203,188,0.35); }
        .lab-snow .lab-banner { background: linear-gradient(135deg, rgba(176,203,188,0.14), rgba(18,26,22,0.6)); }
        .lab-lights .lab-banner { background: linear-gradient(120deg, rgba(176,203,188,0.2), rgba(20,32,26,0.55)); box-shadow: inset 0 0 0 1px rgba(176,203,188,0.08); }
        .lab-pine .lab-banner { background: linear-gradient(160deg, rgba(18,26,22,0.85), rgba(176,203,188,0.12)); }
        .lab-ribbon .lab-banner { background: linear-gradient(90deg, rgba(176,203,188,0.16), rgba(18,26,22,0.7)); }
        .lab-deco { font-size: 28px; line-height: 1; margin-bottom: 8px; opacity: 0.9; }
        @media (prefers-reduced-motion: no-preference) {
          .lab-lights .lab-deco { animation: lab-twinkle 2.4s ease-in-out infinite; }
        }
        @keyframes lab-twinkle { 0%, 100% { opacity: 0.75; } 50% { opacity: 1; } }
        @media (max-width: 420px) { .lab-inner { flex-direction: column; align-items: stretch; } }
      `}</style>
      <div className={`lab-banner lab-${v.key}`}>
        <h2 id="lab-xmas-title">{v.title}</h2>
        <div className="lab-inner">
          <div className="lab-copy">
            <p className="lab-deco" aria-hidden="true">{v.decor}</p>
            <p className="lab-lead">{v.lead}</p>
            <p className="lab-closed">
              <strong>Closed for Christmas:</strong> We will be closed on{" "}
              <span className="lab-dates">December 24</span> and{" "}
              <span className="lab-dates">December 25</span> to celebrate with
              our families. We reopen December 26.
            </p>
          </div>
          <div className="lab-art">
            {artOk ? (
              <img
                data-art="image"
                src={ART}
                width={200}
                height={120}
                alt="Festive holiday illustration"
                onError={onArtError}
              />
            ) : (
              <span data-art="fallback" className="lab-art-fallback" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
