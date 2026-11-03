"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "ab-theme";
const markLight =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 35"><path fill="#2F5A46" d="M24 2 4 33h40L24 2Zm0 9 11 18H13L24 11Z"/></svg>',
  );
const css = `
html[data-theme="light"]{background:#E8EEE9;color:#14201A}
html[data-theme="light"] body{color:#14201A}
html[data-theme="light"] body::before{background:linear-gradient(180deg,#E8EEE9 0%,#dde5df 100%)}
html[data-theme="light"] .demo-title,html[data-theme="light"] .brand{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .site-footer{color:#2F5A46}
html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible{color:#14201A}
html[data-theme="light"] .site-disclaimer{color:#14201A}
html[data-theme="light"] .site-footer,html[data-theme="light"] .footer-mark,html[data-theme="light"] .site-disclaimer{opacity:1}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97)}
.lab-dm{width:min(720px,100%);margin:8px auto 56px;padding:0 16px;color:var(--mist,#F2EFE6)}
html[data-theme="light"] .lab-dm{color:#14201A}
.lab-dm-panel{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between}
html[data-theme="light"] .lab-dm-panel{border-color:rgba(47,90,70,.28)}
.lab-dm-text{margin:0;max-width:26rem;line-height:1.55;font-family:var(--sans);font-size:1rem}
.lab-dm-toggle{font-family:var(--sans);font-size:15px;font-weight:500;padding:12px 22px;border:0;border-radius:999px;cursor:pointer;background:var(--sage,#B0CBBC);color:#121A16}
html[data-theme="light"] .lab-dm-toggle{background:#2F5A46;color:#E8EEE9}
.lab-dm-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
html[data-theme="light"] .lab-dm-toggle:focus-visible{outline-color:#2F5A46}
@media (prefers-reduced-motion:reduce){.lab-dm-toggle{transition:none}}
`;

export default function DarkModeToggle() {
  const h2 = "dm-heading";
  const [dark, setDark] = useState(true);

  const apply = useCallback((nextDark: boolean) => {
    const el = document.documentElement;
    if (nextDark) delete el.dataset.theme;
    else el.dataset.theme = "light";
    document.querySelectorAll<HTMLImageElement>("img.brand-mark, img.footer-mark-img").forEach((img) => {
      if (!img.dataset.abHome) img.dataset.abHome = img.getAttribute("src") || "";
      img.src = nextDark ? img.dataset.abHome : markLight;
    });
    try {
      localStorage.setItem(KEY, nextDark ? "dark" : "light");
    } catch {
      /* private mode */
    }
  }, []);

  useEffect(() => {
    let pick = "dark";
    try {
      const v = localStorage.getItem(KEY);
      if (v === "light" || v === "dark") pick = v;
    } catch {
      pick = "dark";
    }
    const isDark = pick !== "light";
    setDark(isDark);
    apply(isDark);
  }, [apply]);

  return (
    <section data-lab="dark-mode" aria-labelledby={h2}>
      <h2 id={h2}>Dark mode toggle</h2>
      <div className="lab-dm">
        <div className="lab-dm-panel">
          <p className="lab-dm-text">
            One control flips the entire page between the default forest palette and a light mist theme. The choice stays in localStorage under ab-theme.
          </p>
          <button
            type="button"
            className="lab-dm-toggle"
            aria-pressed={dark}
            onClick={() => setDark((was) => {
              const next = !was;
              apply(next);
              return next;
            })}
          >
            {dark ? "Switch to light" : "Switch to dark"}
          </button>
        </div>
      </div>
      <style>{css}</style>
    </section>
  );
}
