"use client";

import { useCallback, useEffect, useState } from "react";

const NOTIFY_KEY = "lab-custom-1792661970-notify";
// Target: 2026-12-01 09:00 America/Chicago (CST, UTC−6) → 2026-12-01T15:00:00.000Z
const TARGET_MS = Date.UTC(2026, 11, 1, 15, 0, 0);

function pad2(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function diffParts(ms: number) {
  const t = Math.max(0, ms);
  const s = Math.floor(t / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds, live: t <= 0 };
}

export default function Lab() {
  const [parts, setParts] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, live: false });
  const [notified, setNotified] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem(NOTIFY_KEY) === "1") setNotified(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const tick = () => setParts(diffParts(TARGET_MS - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [mounted]);

  const onNotify = useCallback(() => {
    setNotified(true);
    try {
      localStorage.setItem(NOTIFY_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const tiles = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Minutes", value: parts.minutes },
    { label: "Seconds", value: parts.seconds },
  ];

  return (
    <section data-lab="custom-1792661970" aria-labelledby="lab-countdown-title" className="lab-wrap">
      <style>{`
        .lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; color: var(--mist, #F2EFE6); }
        .lab-wrap h2 { font-family: var(--serif); font-weight: 400; font-size: 30px; margin: 0 0 20px; }
        .lab-card {
          border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px;
          background: rgba(18, 26, 22, 0.35);
        }
        .lab-live {
          display: none; margin-bottom: 16px; padding: 12px 16px; border-radius: 12px;
          background: linear-gradient(90deg, #c9a227, #e8c547); color: #121A16;
          font-family: var(--sans); font-weight: 600; letter-spacing: 0.04em; text-align: center;
        }
        .lab-live.lab-live--on { display: block; }
        .lab-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        @media (max-width: 520px) { .lab-grid { grid-template-columns: repeat(2, 1fr); } }
        .lab-tile {
          border-radius: 12px; padding: 16px 8px; text-align: center;
          background: linear-gradient(145deg, #1a2e24 0%, #2d5a45 55%, #3d7a5c 100%);
        }
        .lab-num { font-family: var(--serif); font-size: clamp(28px, 6vw, 40px); color: #fff; line-height: 1.1; }
        .lab-unit {
          margin-top: 6px; font-family: var(--sans); font-size: 11px; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase; color: #E8EEE9; opacity: 0.85;
        }
        .lab-actions { margin-top: 22px; text-align: center; }
        .lab-btn {
          font-family: var(--sans); font-size: 14px; font-weight: 600; letter-spacing: 0.06em;
          padding: 12px 22px; border-radius: 999px; border: none; cursor: pointer;
          background: var(--sage, #6b9f7a); color: #121A16;
        }
        .lab-btn:disabled { opacity: 0.72; cursor: default; }
        .lab-btn:focus-visible { outline: 2px solid var(--sage); outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { .lab-live { transition: none; } }
      `}</style>
      <h2 id="lab-countdown-title">Countdown to launch</h2>
      <div className="lab-card">
        <div className={`lab-live${parts.live ? " lab-live--on" : ""}`} role="status">
          We&apos;re live!
        </div>
        <div className="lab-grid" aria-live="polite">
          {tiles.map((t) => (
            <div key={t.label} className="lab-tile">
              <div className="lab-num">{pad2(t.value)}</div>
              <div className="lab-unit">{t.label}</div>
            </div>
          ))}
        </div>
        <div className="lab-actions">
          <button type="button" className="lab-btn" onClick={onNotify} disabled={notified}>
            {notified ? "You're set" : "Notify me"}
          </button>
        </div>
      </div>
    </section>
  );
}
