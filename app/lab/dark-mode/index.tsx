"use client";

import { useCallback, useEffect, useState } from "react";

const themeKey = "ab-theme";
const titleId = "lab-dark-mode-title";
let pngCache: string | null = null;

const rules = [
  'html[data-theme="light"]{--mist:#14201A;--sage:#2F5A46;--header-line:rgba(47,90,70,.22);--line:rgba(47,90,70,.18)}',
  'html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}',
  'html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9,#dfe8e1)}',
  'html[data-theme="light"] .demo-title{color:#14201A}',
  'html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46}',
  'html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}',
  'html[data-theme="light"] .brand{color:#14201A}',
  'html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}',
  ".lab-wrap{width:min(720px,100%);margin:8px auto 56px}",
  ".lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}",
  'html[data-theme="light"] .lab-card{background:rgba(255,255,255,.55);border-color:rgba(47,90,70,.28)}',
  ".lab-lead{margin:0 0 18px;line-height:1.55;font-size:16px;color:var(--muted)}",
  'html[data-theme="light"] .lab-lead{color:#14201A}',
  ".lab-toggle{font-family:var(--sans);font-weight:500;font-size:14px;border:0;border-radius:999px;padding:12px 22px;cursor:pointer;background:var(--sage);color:#121a16}",
  'html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#F2EFE6}',
  ".lab-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}",
  "@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}",
];
const cssText = rules.join("");

type Mode = "dark" | "light";

function makeLightMark(source: string, ready: (png: string) => void) {
  if (pngCache) {
    ready(pngCache);
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
    if (!ctx) return;
    ctx.filter =
      "brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)";
    ctx.drawImage(probe, 0, 0, w, h);
    pngCache = canvas.toDataURL("image/png");
    ready(pngCache);
  };
  probe.src = source;
}

function refreshMarks(mode: Mode) {
  document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img").forEach((node) => {
    if (!node.dataset.abSrc) node.dataset.abSrc = node.getAttribute("src") ?? "";
    const home = node.dataset.abSrc;
    if (mode === "dark") {
      node.src = home;
      return;
    }
    makeLightMark(home, (png) => {
      node.src = png;
    });
  });
}

function pushTheme(mode: Mode) {
  document.documentElement.dataset.theme = mode;
  refreshMarks(mode);
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let mode: Mode = "dark";
    try {
      const raw = localStorage.getItem(themeKey);
      if (raw === "dark" || raw === "light") mode = raw;
    } catch {
      /* storage blocked */
    }
    setDark(mode === "dark");
    pushTheme(mode);
  }, []);

  const onToggle = useCallback(() => {
    setDark((wasDark) => {
      const mode: Mode = wasDark ? "light" : "dark";
      pushTheme(mode);
      try {
        localStorage.setItem(themeKey, mode);
      } catch {
        /* storage blocked */
      }
      return !wasDark;
    });
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby={titleId}>
      <style>{cssText}</style>
      <h2 id={titleId}>Dark mode toggle</h2>
      <div className="lab-wrap">
        <div className="lab-card">
          <p className="lab-lead">
            This control sets html data-theme for the full page, recolors chrome and marks, and writes ab-theme to localStorage so reload keeps your choice.
          </p>
          <button type="button" className="lab-toggle" aria-pressed={dark} onClick={onToggle}>
            {dark ? "Switch to light theme" : "Switch to dark theme"}
          </button>
        </div>
      </div>
    </section>
  );
}
