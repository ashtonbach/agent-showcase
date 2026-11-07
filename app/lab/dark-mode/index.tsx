"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ab-theme";
const HEADING_ID = "lab-dark-mode-heading";

const themeCss = `
[data-lab="dark-mode"]{width:min(720px,100%);margin:8px auto 56px;padding:0 16px;color:var(--mist,#E8EEE9)}
[data-lab="dark-mode"] h2{font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.2;margin:0 0 20px;text-align:center}
.lab-dm-panel{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;text-align:center}
.lab-dm-copy{margin:0 0 20px;line-height:1.55;font-size:17px}
.lab-dm-btn{font-family:var(--sans);font-weight:500;font-size:15px;line-height:1;padding:12px 22px;border:0;border-radius:999px;cursor:pointer;background:var(--sage,#B0CBBC);color:#14201A}
.lab-dm-btn:focus-visible{outline:2px solid var(--sage,#B0CBBC);outline-offset:3px}
html[data-theme="light"]{background:#E8EEE9;--forest:#E8EEE9;--mist:#14201A;--sage:#2F5A46;--muted:rgba(20,32,26,.72);--header-line:rgba(47,90,70,.28);--line:rgba(47,90,70,.22)}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#DEE5DF 100%)}
html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .nav-list a{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .nav-list a[aria-current="page"]{color:#14201A}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .demo-title{color:#14201A}
html[data-theme="light"] .site-footer{color:#2F5A46;opacity:1}
html[data-theme="light"] .site-disclaimer{color:#2F5A46}
html[data-theme="light"] [data-lab="dark-mode"]{color:#14201A}
html[data-theme="light"] .lab-dm-panel{border-color:rgba(47,90,70,.28)}
html[data-theme="light"] .lab-dm-btn{background:#2F5A46;color:#E8EEE9}
html[data-theme="light"] .lab-dm-btn:focus-visible{outline-color:#2F5A46}
html[data-theme="light"] .footer-mark{opacity:1}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
@media (prefers-reduced-motion:reduce){.lab-dm-btn{transition:none}}
`;

const MARK_FILTER =
  "brightness(0) saturate(100%) invert(15%) sepia(35%) saturate(1800%) hue-rotate(108deg) brightness(0.55)";

function paintLightMark(img: HTMLImageElement) {
  if (!img.dataset.abOrig) {
    img.dataset.abOrig = img.getAttribute("src") || img.src;
  }
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  if (!w || !h) return;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const finish = (source: CanvasImageSource) => {
    ctx.filter = MARK_FILTER;
    ctx.drawImage(source, 0, 0, w, h);
    img.src = canvas.toDataURL("image/png");
  };
  const orig = img.dataset.abOrig;
  if ((img.src === orig || img.getAttribute("src") === orig) && img.complete && img.naturalWidth) {
    finish(img);
    return;
  }
  const probe = new Image();
  probe.onload = () => finish(probe);
  probe.src = orig;
}

function syncBrandMarks(isDark: boolean) {
  document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img").forEach((img) => {
    const run = () => {
      if (isDark) {
        if (img.dataset.abOrig) img.src = img.dataset.abOrig;
        return;
      }
      paintLightMark(img);
    };
    if (img.complete && img.naturalWidth > 0) run();
    else img.addEventListener("load", run, { once: true });
  });
}

function persistTheme(isDark: boolean) {
  const root = document.documentElement;
  root.dataset.theme = isDark ? "dark" : "light";
  try {
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  } catch {
    /* storage may be blocked */
  }
  syncBrandMarks(isDark);
}

export default function DarkModeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let isDark = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light") isDark = false;
      else if (saved === "dark") isDark = true;
    } catch {
      /* ignore */
    }
    setDark(isDark);
    persistTheme(isDark);
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      persistTheme(next);
      return next;
    });
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby={HEADING_ID}>
      <h2 id={HEADING_ID}>Dark mode toggle</h2>
      <div className="lab-dm-panel">
        <p className="lab-dm-copy">
          Switch the whole page between the default forest palette and a light mist theme. Your choice stays in this browser after reload.
        </p>
        <button type="button" className="lab-dm-btn" aria-pressed={dark} onClick={toggle}>
          {dark ? "Switch to light mode" : "Switch to dark mode"}
        </button>
      </div>
      <style>{themeCss}</style>
    </section>
  );
}
