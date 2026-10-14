import { readFileSync } from "node:fs";
import { join } from "node:path";
import menu from "./lab/menu.json";
import { FALLBACK_HEADING } from "./fallback-heading";
import en from "../messages/en-US.json";

type Menu = { features: { slug: string; name: string }[] };

// Turns the raw text of app/lab/current.json into the visible demo name.
// Anything unexpected (missing file, bad JSON, non-string or unknown slug) falls back to FALLBACK_HEADING,
// so a broken current.json can never fail `next build`.
export function demoNameFrom(raw: string | null | undefined, m: Menu = menu as Menu): string {
  if (typeof raw !== "string") return FALLBACK_HEADING;
  let slug: unknown;
  try {
    slug = (JSON.parse(raw) as { slug?: unknown } | null)?.slug;
  } catch {
    return FALLBACK_HEADING;
  }
  if (typeof slug !== "string") return FALLBACK_HEADING;
  return m.features.find((f) => f.slug === slug)?.name ?? FALLBACK_HEADING;
}

// Message key for the H1 (messages/en-US.json "demo.<slug>"); "demo.showcase" when current.json names no menu feature.
export function demoKeyFrom(raw: string | null | undefined, m: Menu = menu as Menu): string {
  let slug: unknown = null;
  try { slug = typeof raw === "string" ? (JSON.parse(raw) as { slug?: unknown } | null)?.slug : null; } catch { slug = null; }
  return typeof slug === "string" && m.features.some((f) => f.slug === slug) ? `demo.${slug}` : "demo.showcase";
}

export function readDemoKey(file = join(process.cwd(), "app", "lab", "current.json")): string {
  let raw: string | null = null;
  try { raw = readFileSync(file, "utf8"); } catch { raw = null; }
  return demoKeyFrom(raw);
}

// Visible H1 text: the en-US message for the demo key, else the menu name / fallback.
export function demoTitle(file?: string): string {
  const k = readDemoKey(file), v = (en as Record<string, string>)[k];
  return typeof v === "string" ? v : readDemoName(file);
}

export function readDemoName(file = join(process.cwd(), "app", "lab", "current.json")): string {
  let raw: string | null = null;
  try {
    raw = readFileSync(file, "utf8");
  } catch {
    raw = null;
  }
  return demoNameFrom(raw);
}
