import Lab from "./lab/animated-counter";
import { readDemoName } from "./demo-name";
const demoName = readDemoName();
export default function Page() {
  return (
    <div className="page-stack">
      <h1 className="demo-title">{demoName}</h1>
      <Lab /> {/* lab:slot */}
    </div>
  );
}
