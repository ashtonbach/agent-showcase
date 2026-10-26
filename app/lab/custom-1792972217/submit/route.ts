import { validateAll, FIELDS, type Field } from "../validate";

// POST /showcase/lab/custom-1792972217/submit
// JSON (from the form's script) gets JSON back; a plain form post (no JS) gets a short HTML page.
// Nothing is stored: the demo form only confirms receipt, as before.
export async function POST(req: Request) {
  const type = req.headers.get("content-type") || "";
  const isJson = type.includes("application/json");
  let input: Partial<Record<Field, unknown>> = {};
  try {
    if (isJson) {
      const body = await req.json();
      if (body && typeof body === "object") input = body as Record<string, unknown>;
    } else {
      const fd = await req.formData();
      for (const f of FIELDS) input[f] = fd.get(f) ?? "";
    }
  } catch {
    input = {};
  }
  const errors = validateAll(input);
  const ok = Object.keys(errors).length === 0;
  if (isJson) return Response.json(ok ? { ok: true } : { ok: false, errors }, { status: ok ? 200 : 400 });
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const list = FIELDS.filter((f) => errors[f]).map((f) => `<li>${esc(errors[f]!)}</li>`).join("");
  const html = ok
    ? `<!doctype html><meta charset="utf-8"><title>Question received</title><p>Thank you for your submission. We appreciate you reaching out.</p><p><a href="/showcase">Back to the showcase</a></p>`
    : `<!doctype html><meta charset="utf-8"><title>Please fix your question</title><p>Your question was not sent:</p><ul>${list}</ul><p><a href="/showcase">Back to the form</a></p>`;
  return new Response(html, { status: ok ? 200 : 400, headers: { "content-type": "text/html; charset=utf-8" } });
}
