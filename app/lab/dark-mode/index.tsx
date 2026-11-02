"use client";

import { useCallback, useEffect, useState } from "react";

const themeStorageKey = "ab-theme";
const titleId = "lab-dark-mode-title";
let lightPngCache: string | null = null;

const chromeLight = [
  'html[data-theme="light"]{--mist:#14201A;--sage:#2F5A46;--header-line:rgba(47,90,70,.22);--line:rgba(47,90,70,.18)}',
  'html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}',
  'html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9,#dfe8e1)}',
  'html[data-theme="light"] .demo-title{color:#14201A}',
  'html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46}',
  'html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}',
  'html[data-theme="light"] .brand{color:#14201A}',
  'html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}',
];
const sectionSkin = [
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
const stylesBlock = [...chromeLight, ...sectionSkin].join("");

type ThemeMode = "dark" | "light";

function buildLightMark(src: string, done: (png: string) => void) {
  if (lightPngCache) {
    done(lightPngCache);
    return;
  }
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const width = img.naturalWidth || 48;
    const height = img.naturalHeight || 35;
    const surface = document.createElement("canvas");
    surface.width = width;
    surface.height = height;
    const brush = surface.getContext("2d");
    if (!brush) return;
    brush.filter =
      "brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)";
    brush.drawImage(img, 0, 0, width, height);
    lightPngCache = surface.toDataURL("image/png");
    done(lightPngCache);
  };
  img.src = src;
}

function paintHeaderMarks(mode: ThemeMode) {
  const marks = document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img");
  for (const mark of marks) {
    if (!mark.dataset.abOrigSrc) mark.dataset.abOrigSrc = mark.getAttribute("src") ?? "";
    const original = mark.dataset.abOrigSrc;
    if (mode === "dark") {
      mark.src = original;
      continue;
    }
    buildLightMark(original, (png) => {
      mark.src = png;
    });
  }
}

function commitTheme(mode: ThemeMode) {
  document.documentElement.dataset.theme = mode;
  paintHeaderMarks(mode);
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let mode: ThemeMode = "dark";
    try {
      const saved = localStorage.getItem(themeStorageKey);
      if (saved === "dark" || saved === "light") mode = saved;
    } catch {
      /* storage blocked */
    }
    setDark(mode === "dark");
    commitTheme(mode);
  }, []);

  const handleToggle = useCallback(() => {
    setDark((wasDark) => {
      const mode: ThemeMode = wasDark ? "light" : "dark";
      commitTheme(mode);
      try {
        localStorage.setItem(themeStorageKey, mode);
      } catch {
        /* storage blocked */
      }
      return !wasDark;
    });
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby={titleId}>
      <style>{stylesBlock}</style>
      <h2 id={titleId}>Dark mode toggle</h2>
      <div className="lab-wrap">
        <div className="lab-card" role="group" aria-label="Theme preference">
          <p className="lab-lead">
            Use this pill to flip the entire AshtonBach shell—header, footer, wordmark, and body—between forest dark and mist light. We store the pick as ab-theme.
          </p>
          <button type="button" className="lab-toggle" aria-pressed={dark} onClick={handleToggle}>
            {dark ? "Switch to light theme" : "Switch to dark theme"}
          </button>
        </div>
      </div>
    </section>
  );
}
