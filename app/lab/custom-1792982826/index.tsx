"use client";
import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
const css = `
.lab-wrap{width:min(720px,100%);margin:8px auto 56px}
.lab-card{border:1px solid rgba(176,203,188,.28);border-radius:16px;padding:24px;background:rgba(18,26,22,.35)}
.lab-toggle,.lab-submit{font-family:var(--sans);font-weight:500;color:#121a16;background:var(--sage);border:none;border-radius:8px;padding:12px 20px;cursor:pointer}
.lab-toggle{letter-spacing:.16em;text-transform:uppercase;font-size:.75rem}
.lab-toggle:focus-visible,.lab-submit:focus-visible,.lab-input:focus-visible,.lab-textarea:focus-visible{outline:2px solid var(--sage);outline-offset:2px}
.lab-form{margin-top:20px;display:flex;flex-direction:column;gap:16px}
.lab-form[hidden]{display:none}
.lab-field{display:flex;flex-direction:column;gap:6px}
.lab-label{font-family:var(--sans);font-size:.75rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--mist)}
.lab-input,.lab-textarea{font-family:var(--sans);font-size:1rem;color:var(--mist);background:#14201a;border:1px solid rgba(176,203,188,.28);border-radius:8px;padding:10px 12px;width:100%;box-sizing:border-box}
.lab-textarea{min-height:120px;resize:vertical}
.lab-input-error,.lab-textarea-error{border-color:#ff6b6b}
.lab-error{margin:0;color:#ff8a80;font-family:var(--sans);font-size:.8rem;line-height:1.4}
.lab-submit{font-size:.9rem;align-self:flex-start}
.lab-thanks{margin-top:20px;color:var(--mist);font-family:var(--sans);line-height:1.5}
@media (prefers-reduced-motion:reduce){.lab-toggle,.lab-submit{transition:none}}
`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateName(v: string) { return v.trim() ? "" : "Please enter a name."; }
function validateEmail(v: string) {
  const t = v.trim();
  if (!t) return "Please enter an email.";
  return EMAIL_RE.test(t) ? "" : "Please enter a valid email address.";
}
function validateQuestion(v: string) {
  const t = v.trim();
  if (!t) return "Please enter a question.";
  return t.length > 2000 ? "Please keep the question under 2000 characters." : "";
}
type FieldErrors = { name: string; email: string; question: string };
type EvtEl = ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | FocusEvent<HTMLInputElement | HTMLTextAreaElement>;
export default function Lab() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({ name: "", email: "", question: "" });
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  function checkField(field: keyof FieldErrors, e: EvtEl) {
    const value = e.target.value;
    const message = field === "name" ? validateName(value) : field === "email" ? validateEmail(value) : validateQuestion(value);
    setErrors((prev) => ({ ...prev, [field]: message }));
  }
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors: FieldErrors = {
      name: validateName(nameRef.current?.value ?? ""),
      email: validateEmail(emailRef.current?.value ?? ""),
      question: validateQuestion(questionRef.current?.value ?? ""),
    };
    setErrors(nextErrors);
    if (nextErrors.name) return nameRef.current?.focus();
    if (nextErrors.email) return emailRef.current?.focus();
    if (nextErrors.question) return questionRef.current?.focus();
    setSubmitted(true);
    setFormOpen(false);
  }
  return (
    <section data-lab="custom-1792982826" aria-labelledby="lab-contact-heading" className="lab-wrap">
      <style>{css}</style>
      <h2 id="lab-contact-heading">Ask a question</h2>
      <div className="lab-card">
        {!submitted && (
          <button type="button" className="lab-toggle" aria-expanded={formOpen} aria-controls="lab-contact-form" onClick={() => setFormOpen((o) => !o)}>
            Ask a Question
          </button>
        )}
        {submitted ? (
          <p className="lab-thanks" role="status">Thank you for your submission. We appreciate you reaching out.</p>
        ) : (
          <form id="lab-contact-form" className="lab-form" hidden={!formOpen} onSubmit={onSubmit} noValidate>
            <div className="lab-field">
              <label className="lab-label" htmlFor="lab-name">Name</label>
              <input id="lab-name" ref={nameRef} name="name" type="text" autoComplete="name"
                className={errors.name ? "lab-input lab-input-error" : "lab-input"}
                aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "lab-name-error" : undefined}
                onChange={(e) => checkField("name", e)} onBlur={(e) => checkField("name", e)} />
              {errors.name && <p id="lab-name-error" className="lab-error">{errors.name}</p>}
            </div>
            <div className="lab-field">
              <label className="lab-label" htmlFor="lab-email">Email</label>
              <input id="lab-email" ref={emailRef} name="email" type="email" autoComplete="email"
                className={errors.email ? "lab-input lab-input-error" : "lab-input"}
                aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "lab-email-error" : undefined}
                onChange={(e) => checkField("email", e)} onBlur={(e) => checkField("email", e)} />
              {errors.email && <p id="lab-email-error" className="lab-error">{errors.email}</p>}
            </div>
            <div className="lab-field">
              <label className="lab-label" htmlFor="lab-question">Questions</label>
              <textarea id="lab-question" ref={questionRef} name="question"
                className={errors.question ? "lab-textarea lab-textarea-error" : "lab-textarea"}
                aria-invalid={errors.question ? true : undefined} aria-describedby={errors.question ? "lab-question-error" : undefined}
                onChange={(e) => checkField("question", e)} onBlur={(e) => checkField("question", e)} />
              {errors.question && <p id="lab-question-error" className="lab-error">{errors.question}</p>}
            </div>
            <button type="submit" className="lab-submit">Submit question</button>
          </form>
        )}
      </div>
    </section>
  );
}
