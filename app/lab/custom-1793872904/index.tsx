"use client";

import { useCallback, useEffect, useState } from "react";

const css = `
.lab-1793872904 {
  width: min(720px, 100%);
  margin: 8px auto 56px;
  padding: 24px;
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  color: var(--mist, #f2efe6);
}
.lab-1793872904 h2 {
  margin: 0 0 12px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.2;
  color: var(--mist, #f2efe6);
}
.lab-1793872904 p {
  margin: 0;
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.55;
  color: #e8eee9;
}
.lab-btt {
  position: fixed;
  z-index: 40;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%) translateY(12px);
  opacity: 0;
  pointer-events: none;
  padding: 10px 18px;
  border: 1px solid rgba(176, 203, 188, 0.45);
  border-radius: 999px;
  background: #14201a;
  color: var(--mist, #f2efe6);
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.06em;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  transition: opacity 0.2s ease, transform 0.2s ease, background 0.15s ease;
}
.lab-btt:focus-visible {
  outline: 2px solid var(--sage);
  outline-offset: 3px;
}
.lab-btt:hover {
  background: #121a16;
  border-color: var(--sage);
}
.lab-btt--show {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .lab-btt {
    transition: none;
  }
}
`;

export default function LabSection() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const threshold = 120;
    const sync = () => setShowBtn(window.scrollY > threshold);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  const backToTop = useCallback(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <section
      data-lab="custom-1793872904"
      aria-labelledby="lab-1793872904-title"
    >
      <h2 id="lab-1793872904-title">Back to top</h2>
      <div className="lab-1793872904">
        <p>
          Scroll down the showcase page, then use the small control anchored at
          the bottom to jump back to the header.
        </p>
      </div>
      <button
        type="button"
        className={showBtn ? "lab-btt lab-btt--show" : "lab-btt"}
        onClick={backToTop}
        aria-label="Back to top"
      >
        Back to top
      </button>
      <style>{css}</style>
    </section>
  );
}
