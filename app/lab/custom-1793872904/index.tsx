"use client";

const css = `
.lab-shell {
  width: min(720px, 100%);
  margin: 8px auto 80px;
}
.lab-shell h2 {
  margin: 0 0 16px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.2;
  color: var(--mist, #f2efe6);
}
.lab-card {
  padding: 24px;
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  color: var(--mist, #f2efe6);
}
.lab-card p {
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
  transform: translateX(-50%);
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
  transition: background 0.15s ease, border-color 0.15s ease;
}
.lab-btt:focus-visible {
  outline: 2px solid var(--sage);
  outline-offset: 3px;
}
.lab-btt:hover {
  background: #121a16;
  border-color: var(--sage);
}
@media (prefers-reduced-motion: reduce) {
  .lab-btt {
    transition: none;
  }
}
`;

export default function LabSection() {
  const backToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      data-lab="custom-1793872904"
      aria-labelledby="lab-1793872904-title"
    >
      <div className="lab-shell">
        <h2 id="lab-1793872904-title">Back to top</h2>
        <div className="lab-card">
          <p>
            A small control stays anchored at the bottom of the viewport; tap it
            to return to the top of the page.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="lab-btt"
        onClick={backToTop}
        aria-label="Back to top"
      >
        Back to top
      </button>
      <style>{css}</style>
    </section>
  );
}
