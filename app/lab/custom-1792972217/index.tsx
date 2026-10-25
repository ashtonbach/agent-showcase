"use client";

import { useState, type FormEvent } from "react";

const css = `
.lab-wrap { width: min(720px, 100%); margin: 8px auto 56px; }
.lab-card {
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 16px;
  padding: 24px;
  background: rgba(18, 26, 22, 0.35);
}
.lab-actions { margin-top: 8px; }
.lab-toggle {
  font-family: var(--sans);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #121a16;
  background: var(--sage);
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
}
.lab-toggle:hover { filter: brightness(1.05); }
.lab-toggle:focus-visible {
  outline: 2px solid var(--sage);
  outline-offset: 2px;
}
.lab-form { margin-top: 20px; display: flex; flex-direction: column; gap: 16px; }
.lab-form[hidden] { display: none; }
.lab-field { display: flex; flex-direction: column; gap: 6px; }
.lab-label {
  font-family: var(--sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mist);
}
.lab-input,
.lab-textarea {
  font-family: var(--sans);
  font-size: 1rem;
  color: var(--mist);
  background: #14201a;
  border: 1px solid rgba(176, 203, 188, 0.28);
  border-radius: 8px;
  padding: 10px 12px;
  width: 100%;
  box-sizing: border-box;
}
.lab-textarea { min-height: 120px; resize: vertical; }
.lab-input:focus-visible,
.lab-textarea:focus-visible {
  outline: 2px solid var(--sage);
  outline-offset: 0;
}
.lab-submit {
  align-self: flex-start;
  font-family: var(--sans);
  font-weight: 500;
  font-size: 0.9rem;
  color: #121a16;
  background: var(--sage);
  border: none;
  border-radius: 8px;
  padding: 12px 22px;
  cursor: pointer;
}
.lab-submit:hover { filter: brightness(1.05); }
.lab-thanks {
  margin-top: 20px;
  color: var(--mist);
  font-family: var(--sans);
  line-height: 1.5;
}
@media (prefers-reduced-motion: reduce) {
  .lab-toggle, .lab-submit { transition: none; }
}
`;

export default function Lab() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setFormOpen(false);
  }

  return (
    <section
      data-lab="custom-1792972217"
      aria-labelledby="lab-contact-heading"
      className="lab-wrap"
    >
      <style>{css}</style>
      <h2 id="lab-contact-heading">Ask a question</h2>
      <div className="lab-card">
        {!submitted && (
          <div className="lab-actions">
            <button
              type="button"
              className="lab-toggle"
              aria-expanded={formOpen}
              aria-controls="lab-contact-form"
              onClick={() => setFormOpen((open) => !open)}
            >
              Ask a Question
            </button>
          </div>
        )}
        {submitted ? (
          <p className="lab-thanks" role="status">
            Thank you for your submission. We appreciate you reaching out.
          </p>
        ) : (
          <form
            id="lab-contact-form"
            className="lab-form"
            hidden={!formOpen}
            onSubmit={handleSubmit}
          >
            <div className="lab-field">
              <label className="lab-label" htmlFor="lab-name">Name</label>
              <input
                id="lab-name"
                name="name"
                type="text"
                className="lab-input"
                autoComplete="name"
                required
              />
            </div>
            <div className="lab-field">
              <label className="lab-label" htmlFor="lab-email">Email</label>
              <input
                id="lab-email"
                name="email"
                type="email"
                className="lab-input"
                autoComplete="email"
                required
              />
            </div>
            <div className="lab-field">
              <label className="lab-label" htmlFor="lab-question">Questions</label>
              <textarea
                id="lab-question"
                name="question"
                className="lab-textarea"
                required
              />
            </div>
            <button type="submit" className="lab-submit">
              Submit question
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
