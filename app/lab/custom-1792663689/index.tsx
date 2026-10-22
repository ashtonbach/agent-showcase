"use client";
import { useEffect, useState } from "react";

// NASA: minimum Earth–Mars distance ≈ 33.9 million miles
const DISTANCE_MI = 33900000;
const DISTANCE_LABEL = "33,900,000";

const PATH = "M 72 168 Q 200 52 328 168";

export default function Lab() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimate(!mq.matches);
  }, []);

  return (
    <section data-lab="custom-1792663689" aria-labelledby="lab-mars-title">
      <style>{`
        .lab-mars-wrap { width: min(720px, 100%); margin: 8px auto 56px; padding: 0 16px; }
        .lab-mars-card {
          border: 1px solid rgba(176, 203, 188, 0.28);
          border-radius: 16px;
          padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        .lab-mars-title {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 30px;
          color: var(--mist);
          margin: 0 0 20px;
        }
        .lab-mars-scene {
          position: relative;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 24px;
        }
        .lab-mars-svg { display: block; width: 100%; height: auto; }
        .lab-mars-sun { fill: #e8c547; filter: drop-shadow(0 0 12px rgba(232, 197, 71, 0.45)); }
        .lab-mars-orbit { fill: none; stroke: rgba(176, 203, 188, 0.45); stroke-width: 2; stroke-dasharray: 6 8; }
        .lab-mars-body { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; fill: var(--sage); }
        .lab-mars-rocket {
          position: absolute;
          left: 0;
          top: 0;
          width: 28px;
          height: 28px;
          font-size: 22px;
          line-height: 1;
          offset-path: path("${PATH}");
          offset-distance: 0%;
          offset-rotate: auto;
          pointer-events: none;
        }
        .lab-mars-rocket.lab-mars-go {
          animation: lab-mars-ride 5s ease-in-out infinite alternate;
        }
        @keyframes lab-mars-ride {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
        .lab-mars-stat {
          margin-top: 20px;
          text-align: center;
          color: #f2efe6;
        }
        .lab-mars-stat-label {
          display: block;
          font-family: var(--sans);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--sage);
          margin-bottom: 4px;
        }
        .lab-mars-stat-value { font-family: var(--serif); font-size: 26px; color: var(--mist); }
        .lab-mars-note { margin-top: 16px; font-size: 14px; color: var(--muted); text-align: center; }
        @media (max-width: 480px) {
          .lab-mars-scene { margin-bottom: 20px; }
          .lab-mars-stat { margin-top: 44px; }
          .lab-mars-rocket { font-size: 18px; width: 22px; height: 22px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-mars-rocket.lab-mars-go { animation: none; offset-distance: 0%; }
        }
      `}</style>
      <div className="lab-mars-wrap">
        <div className="lab-mars-card">
          <h2 id="lab-mars-title" className="lab-mars-title">Trip to Mars</h2>
          <div className="lab-mars-scene">
            <svg className="lab-mars-svg" viewBox="0 0 400 200" role="img" aria-label="Earth and Mars connected by a curved flight path past a larger Sun">
              <circle className="lab-mars-sun" cx="200" cy="44" r="48" />
              <path className="lab-mars-orbit" d={PATH} />
              <circle cx="72" cy="168" r="14" fill="#6b9bd1" />
              <text className="lab-mars-body" x="72" y="192" textAnchor="middle">Earth</text>
              <circle cx="328" cy="168" r="11" fill="#c46c4a" />
              <text className="lab-mars-body" x="328" y="192" textAnchor="middle">Mars</text>
            </svg>
            <span
              className={`lab-mars-rocket${animate ? " lab-mars-go" : ""}`}
              role="img"
              aria-label="Rocket traveling toward Mars"
            >
              🚀
            </span>
          </div>
          <p className="lab-mars-stat">
            <span className="lab-mars-stat-label">Minimum distance</span>
            <span className="lab-mars-stat-value">{DISTANCE_LABEL} mi</span>
          </p>
          <p className="lab-mars-note">Distance source: NASA minimum Earth–Mars separation ({DISTANCE_LABEL} miles).</p>
        </div>
      </div>
    </section>
  );
}
