"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ab-theme";
const HEADING_ID = "lab-dark-mode-h2";

let cachedLightMark: string | null = null;

const themeRules = [
  'html[data-theme="light"]{--mist:#14201A;--sage:#2F5A46;--header-line:rgba(47,90,70,.22);--line:rgba(47,90,70,.18)}',
  'html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}',
  'html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9,#dfe8e1)}',
  'html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46}',
  'html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}',
  'html[data-theme="light"] .brand{color:#14201A}',
  'html[data-theme="light"] .skip-link.label{color:#2F5A46}',
  'html[data-theme="light"] .skip-link:focus{background:#14201A;color:#E8EEE9}',
  'html[data-theme="light"] .demo-title,html[data-theme="light"] main.page [data-lab]>h2{color:#14201A!important}',
  'html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}',
  ".lab-dm-h2{font-family:var(--serif);font-weight:400;font-size:30px;margin:0 0 16px;color:var(--mist,#f2efe6)}",
  'html[data-theme="light"] .lab-dm-h2{color:#14201A}',
  ".lab-darkmode-shell{width:min(720px,100%);margin:8px auto 56px}",
  ".lab-darkmode-panel{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}",
  'html[data-theme="light"] .lab-darkmode-panel{background:rgba(255,255,255,.55);border-color:rgba(47,90,70,.28)}',
  ".lab-darkmode-copy{margin:0 0 18px;line-height:1.55;font-size:16px;color:var(--mist,#e8eee9)}",
  'html[data-theme="light"] .lab-darkmode-copy{color:#14201A}',
  ".lab-darkmode-switch{font-family:var(--sans);font-weight:500;font-size:14px;border:0;border-radius:999px;padding:12px 22px;cursor:pointer;background:var(--sage);color:#121a16}",
  'html[data-theme="light"] .lab-darkmode-switch{background:#2F5A46;color:#F2EFE6}',
  ".lab-darkmode-switch:focus-visible{outline:2px solid var(--sage);outline-offset:3px}",
  "@media (prefers-reduced-motion:reduce){.lab-darkmode-switch{transition:none}}",
];
const themeCss = themeRules.join("");

type ThemeChoice = "dark" | "light";

function rasterizeMark(source: string, ready: (png: string) => void) {
  if (cachedLightMark) {
    ready(cachedLightMark);
    return;
  }
  const probe = new Image();
  probe.crossOrigin = "anonymous";
  probe.onload = () => {
    const w = probe.naturalWidth || 48;
    const h = probe.naturalHeight || 35;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.filter =
      "brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)";
    ctx.drawImage(probe, 0, 0, w, h);
    cachedLightMark = canvas.toDataURL("image/png");
    ready(cachedLightMark);
  };
  probe.src = source;
}

function syncLogos(mode: ThemeChoice) {
  const nodes = document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img");
  nodes.forEach((node) => {
    if (!node.dataset.abHomeSrc) {
      node.dataset.abHomeSrc = node.getAttribute("src") ?? "";
    }
    const home = node.dataset.abHomeSrc;
    if (mode === "dark") {
      node.src = home;
      return;
    }
    rasterizeMark(home, (png) => {
      node.src = png;
    });
  });
}

function applyTheme(mode: ThemeChoice) {
  document.documentElement.dataset.theme = mode;
  syncLogos(mode);
}

function readSavedTheme(): ThemeChoice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "dark" || raw === "light") {
      return raw;
    }
  } catch {
    return null;
  }
  return null;
}

export default function DarkModeLab() {
  const [mode, setMode] = useState<ThemeChoice>("dark");
  const isDark = mode === "dark";

  useEffect(() => {
    const initial = readSavedTheme() ?? "dark";
    setMode(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    applyTheme(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore quota / privacy mode */
    }
  }, [mode]);

  const onFlip = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby={HEADING_ID}>
      <style>{themeCss}</style>
      <h2 id={HEADING_ID} className="lab-dm-h2">
        Dark mode toggle
      </h2>
      <div className="lab-darkmode-shell">
        <article className="lab-darkmode-panel">
          <p className="lab-darkmode-copy">
            Switch the whole page between the default forest look and a light mist palette. Your
            choice is saved in this browser for the next visit.
          </p>
          <button
            type="button"
            className="lab-darkmode-switch"
            aria-pressed={isDark}
            onClick={onFlip}
          >
            {isDark ? "Switch to light" : "Switch to dark"}
          </button>
        </article>
      </div>
    </section>
  );
}
