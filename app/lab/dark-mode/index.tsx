"use client";

import { useCallback, useEffect, useState } from "react";

const TITLE = "lab-dark-mode-title";
let lightMarkPng: string | null = null;

const css = [
  'html[data-theme="light"]{--mist:#14201A;--sage:#2F5A46;--header-line:rgba(47,90,70,.22);--line:rgba(47,90,70,.18)}',
  'html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}',
  'html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dfe8e1 100%)}',
  'html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46}',
  'html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}',
  'html[data-theme="light"] .brand{color:#14201A}',
  'html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}',
  ".lab-wrap{width:min(720px,100%);margin:8px auto 56px}",
  ".lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.32)}",
  'html[data-theme="light"] .lab-card{background:rgba(255,255,255,.52);border-color:rgba(47,90,70,.28)}',
  ".lab-lead{margin:0 0 20px;line-height:1.55;max-width:52ch;color:var(--muted)}",
  'html[data-theme="light"] .lab-lead{color:rgba(20,32,26,.82)}',
  ".lab-toggle{border:0;border-radius:999px;padding:12px 22px;font:500 15px/1 var(--sans);cursor:pointer;background:var(--sage);color:#14201A}",
  'html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#F2EFE6}',
  ".lab-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}",
  "@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}",
].join("");

type Mode = "dark" | "light";

function paintMark(src: string, done: (url: string) => void) {
  if (lightMarkPng) return done(lightMarkPng);
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const w = img.naturalWidth || 48;
    const h = img.naturalHeight || 35;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const g = c.getContext("2d");
    if (!g) return;
    g.filter = "brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)";
    g.drawImage(img, 0, 0, w, h);
    lightMarkPng = c.toDataURL("image/png");
    done(lightMarkPng);
  };
  img.src = src;
}

function refreshMarks(mode: Mode) {
  document.querySelectorAll<HTMLImageElement>(".brand-mark,.footer-mark-img").forEach((el) => {
    if (!el.dataset.abSrc) el.dataset.abSrc = el.getAttribute("src") ?? "";
    const home = el.dataset.abSrc;
    if (mode === "dark") el.src = home;
    else paintMark(home, (png) => { el.src = png; });
  });
}

function setMode(mode: Mode) {
  document.documentElement.dataset.theme = mode;
  refreshMarks(mode);
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let mode: Mode = "dark";
    try {
      const saved = localStorage.getItem("ab-theme");
      if (saved === "light" || saved === "dark") mode = saved;
    } catch { /* private mode */ }
    setDark(mode === "dark");
    setMode(mode);
  }, []);

  const flip = useCallback(() => {
    setDark((was) => {
      const mode: Mode = was ? "light" : "dark";
      setMode(mode);
      try { localStorage.setItem("ab-theme", mode); } catch { /* noop */ }
      return !was;
    });
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby={TITLE}>
      <style>{css}</style>
      <h2 id={TITLE}>Dark mode toggle</h2>
      <div className="lab-wrap">
        <div className="lab-card">
          <p className="lab-lead">
            Toggle the full page between the forest default and a light mist palette. The choice stays in this browser after reload.
          </p>
          <button type="button" className="lab-toggle" aria-pressed={dark} onClick={flip}>
            {dark ? "Switch to light theme" : "Switch to dark theme"}
          </button>
        </div>
      </div>
    </section>
  );
}
