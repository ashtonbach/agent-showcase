import { BASE_HEADING } from "./base-heading";
import menu from "./lab/menu.json";
import current from "./lab/current.json";
// Visible demo name: looked up from the approved menu by the slug the kit writes. Never an id; falls back to the base heading.
const demoName = menu.features.find((f) => f.slug === current.slug)?.name ?? BASE_HEADING;
export default function Page() {
  return (
    <div className="page-stack">
      <h1 className="demo-title">{demoName}</h1>
      <img className="world-image" src="/worlds/cursor.png" alt="Cursor world" width={480} height={270} style={{ width: 480, maxWidth: "90vw", height: "auto", margin: 0, borderRadius: 12 }} />
      {/* lab:slot */}
    </div>
  );
}
