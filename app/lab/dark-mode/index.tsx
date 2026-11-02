"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "ab-theme";
const H2 = "lab-dark-mode-title";
let mintMark: string | undefined;

const sheet = [
  'html[data-theme="light"]{--mist:#14201A;--sage:#2F5A46;--header-line:rgba(47,90,70,.22);--line:rgba(47,90,70,.18)}',
  'html[data-theme="light"],html[data-theme="light"] body{background:#E8EEE9;color:#14201A}',
  'html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9,#dfe8e1)}',
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
].join("");

type Pick = "dark" | "light";

function mintLogoSrc(from: string, cb: (data: string) => void) {
  if (mintMark) return cb(mintMark);
  const tag = new Image();
  tag.crossOrigin = "anonymous";
  tag.onload = () => {
    const sideW = tag.naturalWidth || 48;
    const sideH = tag.naturalHeight || 35;
    const pad = document.createElement("canvas");
    pad.width = sideW;
    pad.height = sideH;
    const ink = pad.getContext("2d");
    if (!ink) return;
    ink.filter =
      "brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)";
    ink.drawImage(tag, 0, 0, sideW, sideH);
    mintMark = pad.toDataURL("image/png");
    cb(mintMark);
  };
  tag.src = from;
}

function brandMarks(next: Pick) {
  const imgs = document.querySelectorAll<HTMLImageElement>(".brand-mark, .footer-mark-img");
  imgs.forEach((img) => {
    const slot = "abOrig";
    if (!img.dataset[slot]) img.dataset[slot] = img.getAttribute("src") ?? "";
    const base = img.dataset[slot]!;
    img.src = next === "dark" ? base : "";
    if (next === "light") mintLogoSrc(base, (png) => { img.src = png; });
  });
}

function paintPage(next: Pick) {
  document.documentElement.dataset.theme = next;
  brandMarks(next);
}

function loadPick(): Pick {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    return "dark";
  }
  return "dark";
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const start = loadPick();
    setDark(start === "dark");
    paintPage(start);
  }, []);

  const toggle = useCallback(() => {
    setDark((on) => {
      const next: Pick = on ? "light" : "dark";
      paintPage(next);
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* ignore */
      }
      return !on;
    });
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby={H2}>
      <style>{sheet}</style>
      <h2 id={H2}>Dark mode toggle</h2>
      <div className="lab-wrap">
        <div className="lab-card">
          <p className="lab-lead">
            One control flips the entire site between forest dark (default) and mist light, including header, footer, and logos. Reload keeps your pick.
          </p>
          <button type="button" className="lab-toggle" aria-pressed={dark} onClick={toggle}>
            {dark ? "Switch to light theme" : "Switch to dark theme"}
          </button>
        </div>
      </div>
    </section>
  );
}
