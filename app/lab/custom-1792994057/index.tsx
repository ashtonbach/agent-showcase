"use client";
import { useRef, useState, type FormEvent } from "react";
const QUESTION_MAX = 2000;
type Field = "name" | "email" | "question";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
const FIELDS: Field[] = ["name", "email", "question"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateField(field: Field, raw: string): string | undefined {
  const v = raw.trim();
  if (field === "name") return v ? undefined : "Please enter your name.";
  if (field === "email") {
    if (!v) return "Please enter your email.";
    return EMAIL_RE.test(v) ? undefined : "Please enter a valid email address.";
  }
  if (!v) return "Please enter your question.";
  return v.length > QUESTION_MAX ? `Please keep your question under ${QUESTION_MAX} characters.` : undefined;
}
function validateAll(values: Values): Errors {
  const errors: Errors = {};
  for (const f of FIELDS) {
    const e = validateField(f, values[f]);
    if (e) errors[f] = e;
  }
  return errors;
}
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
.lab-submit{font-size:.9rem;align-self:flex-start}
.lab-input[aria-invalid="true"],.lab-textarea[aria-invalid="true"]{border-color:#e07a7a;box-shadow:0 0 0 1px #e07a7a}
.lab-error:empty{display:none}
.lab-error{font-family:var(--sans);font-size:.8rem;line-height:1.35;color:#e07a7a;margin:0}
.lab-count{font-family:var(--sans);font-size:.75rem;color:var(--muted);align-self:flex-end}
.lab-count[data-over="true"]{color:#e07a7a}
.lab-thanks{margin-top:20px;color:var(--mist);font-family:var(--sans);line-height:1.5}
@media (prefers-reduced-motion:reduce){.lab-toggle,.lab-submit{transition:none}}
`;
export default function Lab() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<Values>({ name: "", email: "", question: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const refs = { name: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null), question: useRef<HTMLTextAreaElement>(null) };
  const recheck = (f: Field, v: string) => setErrors((e) => ({ ...e, [f]: validateField(f, v) }));
  const onChange = (f: Field, v: string) => {
    setValues((s) => ({ ...s, [f]: v }));
    if (touched[f]) recheck(f, v);
  };
  const onBlur = (f: Field) => {
    const trimmed = values[f].trim();
    setValues((s) => ({ ...s, [f]: trimmed }));
    setTouched((t) => ({ ...t, [f]: true }));
    recheck(f, trimmed);
  };
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed: Values = { name: values.name.trim(), email: values.email.trim(), question: values.question.trim() };
    setValues(trimmed);
    const found = validateAll(trimmed);
    setErrors(found);
    setTouched({ name: true, email: true, question: true });
    const first = FIELDS.find((f) => found[f]);
    if (first) {
      queueMicrotask(() => refs[first].current?.focus());
      return;
    }
    setSubmitted(true);
    setFormOpen(false);
  }
  const invalid = (f: Field) => Boolean(touched[f] && errors[f]);
  const aria = (f: Field) => ({
    "aria-invalid": invalid(f) ? ("true" as const) : undefined,
    "aria-describedby": [invalid(f) ? `lab-${f}-error` : "", f === "question" ? "lab-question-count" : ""].filter(Boolean).join(" ") || undefined,
  });
  const err = (f: Field) =>
    invalid(f) ? (
      <p id={`lab-${f}-error`} className="lab-error" role="alert">
        {errors[f]}
      </p>
    ) : null;
  const qLen = values.question.trim().length;
  return (
    <section data-lab="custom-1792994057" aria-labelledby="lab-contact-heading" className="lab-wrap">
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
              <input id="lab-name" name="name" type="text" className="lab-input" autoComplete="name" required ref={refs.name} value={values.name} onChange={(e) => onChange("name", e.target.value)} onBlur={() => onBlur("name")} {...aria("name")} />
              {err("name")}
            </div>
            <div className="lab-field">
              <label className="lab-label" htmlFor="lab-email">Email</label>
              <input id="lab-email" name="email" type="email" className="lab-input" autoComplete="email" required ref={refs.email} value={values.email} onChange={(e) => onChange("email", e.target.value)} onBlur={() => onBlur("email")} {...aria("email")} />
              {err("email")}
            </div>
            <div className="lab-field">
              <label className="lab-label" htmlFor="lab-question">Questions</label>
              <textarea id="lab-question" name="question" className="lab-textarea" required ref={refs.question} value={values.question} onChange={(e) => onChange("question", e.target.value)} onBlur={() => onBlur("question")} {...aria("question")} />
              {err("question")}
              <span id="lab-question-count" className="lab-count" data-over={qLen > QUESTION_MAX ? "true" : undefined}>{qLen} / {QUESTION_MAX}</span>
            </div>
            <button type="submit" className="lab-submit">Submit question</button>
          </form>
        )}
      </div>
    </section>
  );
}
