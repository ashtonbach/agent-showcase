import Lab from "./lab/tabs";
import { BASE_HEADING } from "./base-heading";
import menu from "./lab/menu.json";
import { readFileSync } from "node:fs";
import { join } from "node:path";
// Visible demo name: looked up from the approved menu by the slug the kit writes. Never an id; falls back to the base heading.
// A missing or malformed current.json falls back instead of failing the build.
function currentSlug(): string | null {
  try {
    const slug = JSON.parse(readFileSync(join(process.cwd(), "app/lab/current.json"), "utf8"))?.slug;
    return typeof slug === "string" && slug.trim() ? slug : null;
  } catch {
    return null;
  }
}
const slug = currentSlug();
const demoName = (slug && menu.features.find((f) => f.slug === slug)?.name) || BASE_HEADING;
export default function Page() {
  return (
    <div className="page-stack">
      <h1 className="demo-title">{demoName}</h1>
      <img className="world-image" src="/worlds/cursor.png" alt="Cursor world" width={480} height={270} style={{ width: 480, maxWidth: "90vw", height: "auto", margin: 0, borderRadius: 12 }} />
      <Lab /> {/* lab:slot */}
    </div>
  );
}
