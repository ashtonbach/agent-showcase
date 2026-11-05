"use client";

import { useCallback, useState, type FormEvent } from "react";

const css = `
[data-lab="custom-1793864978"] { max-width: min(720px, 100%); margin: 8px auto 56px; padding: 0 16px; box-sizing: border-box; }
[data-lab="custom-1793864978"] .lab-card { border: 1px solid rgba(176, 203, 188, 0.28); border-radius: 16px; padding: 24px; background: rgba(18, 26, 22, 0.45); }
[data-lab="custom-1793864978"] .lab-lead { margin: 0 0 20px; color: var(--mist, #E8EEE9); line-height: 1.55; font-size: 1rem; }
[data-lab="custom-1793864978"] .lab-form { display: flex; flex-wrap: wrap; gap: 12px; align-items: stretch; }
[data-lab="custom-1793864978"] .lab-field { flex: 1 1 200px; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
[data-lab="custom-1793864978"] .lab-label { font-family: var(--sans); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 0.72rem; color: var(--sage, #B0CBBC); }
[data-lab="custom-1793864978"] .lab-input { width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 10px; border: 1px solid rgba(176, 203, 188, 0.35); background: #14201A; color: var(--mist, #F2EFE6); font-size: 1rem; }
[data-lab="custom-1793864978"] .lab-input:focus { outline: 2px solid var(--sage, #B0CBBC); outline-offset: 2px; }
[data-lab="custom-1793864978"] .lab-btn { flex: 0 0 auto; align-self: flex-end; padding: 12px 22px; border-radius: 10px; border: none; background: var(--sage, #B0CBBC); color: #121A16; font-family: var(--sans); font-weight: 500; letter-spacing: 0.06em; cursor: pointer; font-size: 0.95rem; }
[data-lab="custom-1793864978"] .lab-btn:hover { filter: brightness(1.05); }
[data-lab="custom-1793864978"] .lab-msg { margin: 14px 0 0; font-size: 0.95rem; line-height: 1.45; }
[data-lab="custom-1793864978"] .lab-msg--ok { color: var(--mist, #E8EEE9); }
[data-lab="custom-1793864978"] .lab-msg--err { color: #f0c4bc; }
@media (prefers-reduced-motion: reduce) { [data-lab="custom-1793864978"] .lab-btn { transition: none; } }
`;

export default function Lab() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "invalid">("idle");

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setStatus("invalid");
        return;
      }
      setStatus("done");
    },
    [email]
  );

  return (
    <section data-lab="custom-1793864978" aria-labelledby="custom-1793864978-title">
      <style>{css}</style>
      <h2 id="custom-1793864978-title">Newsletter signup</h2>
      <div className="lab-card">
        <p className="lab-lead">
          Get occasional updates about new showcase runs and features. No spam — unsubscribe anytime from any email we send.
        </p>
        {status === "done" ? (
          <p className="lab-msg lab-msg--ok" role="status">
            Thanks — you&apos;re on the list. We&apos;ll only write when there&apos;s something worth sharing.
          </p>
        ) : (
          <form className="lab-form" onSubmit={onSubmit} noValidate>
            <div className="lab-field">
              <label className="lab-label" htmlFor="custom-1793864978-email">
                Email
              </label>
              <input
                id="custom-1793864978-email"
                className="lab-input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                  if (status === "invalid") setStatus("idle");
                }}
                aria-invalid={status === "invalid"}
                aria-describedby={status === "invalid" ? "custom-1793864978-err" : undefined}
              />
            </div>
            <button type="submit" className="lab-btn">
              Sign up
            </button>
            {status === "invalid" ? (
              <p id="custom-1793864978-err" className="lab-msg lab-msg--err" role="alert">
                Enter a valid email address to join.
              </p>
            ) : null}
          </form>
        )}
      </div>
    </section>
  );
}
