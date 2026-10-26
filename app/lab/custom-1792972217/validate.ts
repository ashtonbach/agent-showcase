// Validation rules for the client-only Ask a Question form.
export const QUESTION_MAX = 2000;
export type Field = "name" | "email" | "question";
export type Values = Record<Field, string>;
export type Errors = Partial<Record<Field, string>>;
export const FIELDS: Field[] = ["name", "email", "question"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(field: Field, raw: unknown): string | undefined {
  const v = typeof raw === "string" ? raw.trim() : "";
  if (field === "name") return v ? undefined : "Please enter your name.";
  if (field === "email") {
    if (!v) return "Please enter your email.";
    return EMAIL_RE.test(v) ? undefined : "Please enter a valid email address.";
  }
  if (!v) return "Please enter your question.";
  return v.length > QUESTION_MAX ? `Please keep your question under ${QUESTION_MAX} characters.` : undefined;
}

export function validateAll(values: Partial<Record<Field, unknown>>): Errors {
  const errors: Errors = {};
  for (const f of FIELDS) { const e = validateField(f, values[f]); if (e) errors[f] = e; }
  return errors;
}
