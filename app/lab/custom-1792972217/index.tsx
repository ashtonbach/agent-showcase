"use client";
import { useRef, useState, type FormEvent } from "react";
import { BASE_PATH } from "../../base-path";
import { FIELDS, QUESTION_MAX, validateAll, validateField, type Errors, type Field, type Values } from "./validate";
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
.lab-input[aria-invalid="true"],.lab-textarea[aria-invalid="true"]{border-color:var(--danger);box-shadow:0 0 0 1px var(--danger)}
.lab-error{font-family:var(--sans);font-size:.85rem;line-height:1.4;color:var(--danger);margin:0}
.lab-count{font-family:var(--sans);font-size:.75rem;color:var(--muted);align-self:flex-end}
.lab-count[data-over="true"]{color:var(--danger)}
.lab-thanks{margin-top:20px;color:var(--mist);font-family:var(--sans);line-height:1.5}
@media (prefers-reduced-motion:reduce){.lab-toggle,.lab-submit{transition:none}}
`;
export default function Lab() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<Values>({ name: "", email: "", question: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [sending, setSending] = useState(false);
  const refs = { name: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null), question: useRef<HTMLTextAreaElement>(null) };
  const recheck = (f: Field, v: string) => setErrors((e) => ({ ...e, [f]: validateField(f, v) }));
  const onChange = (f: Field, v: string) => { setValues((s) => ({ ...s, [f]: v })); if (touched[f]) recheck(f, v); };
  const onBlur = (f: Field) => { setTouched((t) => ({ ...t, [f]: true })); recheck(f, values[f]); };
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    setTouched({ name: true, email: true, question: true });
    const first = FIELDS.find((f) => found[f]);
    if (first) { refs[first].current?.focus(); return; }
    setSending(true);
    try {
      const res = await fetch(`${BASE_PATH}/lab/custom-1792972217/submit`, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), question: values.question.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setSubmitted(true); setFormOpen(false); return; }
      const server: Errors = (data && data.errors) || {};
      setErrors(server);
      const f = FIELDS.find((k) => server[k]);
      if (f) refs[f].current?.focus();
    } finally { setSending(false); }
  }
  const aria = (f: Field) => ({ "aria-invalid": errors[f] ? ("true" as const) : undefined, "aria-describedby": [errors[f] ? `lab-${f}-error` : "", f === "question" ? "lab-question-count" : ""].filter(Boolean).join(" ") || undefined });
  const err = (f: Field) => errors[f] ? <p id={`lab-${f}-error`} className="lab-error">{errors[f]}</p> : null;
  const qLen = values.question.trim().length;
  return (
    <section data-lab="custom-1792972217" aria-labelledby="lab-contact-heading" className="lab-wrap">
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
          <form id="lab-contact-form" className="lab-form" hidden={!formOpen} onSubmit={onSubmit} noValidate method="post" action={`${BASE_PATH}/lab/custom-1792972217/submit`}>
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
            <button type="submit" className="lab-submit" disabled={sending}>Submit question</button>
          </form>
        )}
      </div>
    </section>
  );
}
