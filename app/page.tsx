import Lab from "./lab/tabs";
import { readDemoName } from "./demo-name";
// Visible demo name: looked up from the approved menu by the slug the kit writes. Never an id; falls back to the base heading.
const demoName = readDemoName();
export default function Page() {
  return (
    <div className="page-stack">
      <h1 className="demo-title">{demoName}</h1>
      <img className="world-image" src="/worlds/cursor.png" alt="Cursor world" width={480} height={270} style={{ width: 480, maxWidth: "90vw", height: "auto", margin: 0, borderRadius: 12 }} />
      <Lab /> {/* lab:slot */}
    </div>
  );
}
