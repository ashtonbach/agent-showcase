import { readFileSync } from "node:fs";
import { join } from "node:path";
import menu from "./lab/menu.json";
import { BASE_HEADING } from "./base-heading";

type Menu = { features: { slug: string; name: string }[] };

// Turns the raw text of app/lab/current.json into the visible demo name.
// Anything unexpected (missing file, bad JSON, non-string or unknown slug) falls back to the base heading,
// so a broken current.json can never fail `next build`.
export function demoNameFrom(raw: string | null | undefined, m: Menu = menu as Menu): string {
  if (typeof raw !== "string") return BASE_HEADING;
  let slug: unknown;
  try {
    slug = (JSON.parse(raw) as { slug?: unknown } | null)?.slug;
  } catch {
    return BASE_HEADING;
  }
  if (typeof slug !== "string") return BASE_HEADING;
  return m.features.find((f) => f.slug === slug)?.name ?? BASE_HEADING;
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
