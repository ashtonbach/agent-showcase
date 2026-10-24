import Lab from "./lab/custom-1792808608";
import { readDemoKey, demoTitle } from "./demo-name";
const demoKey = readDemoKey();
const demoName = demoTitle();
export default function Page() {
  return (
    <div className="page-stack">
      <h1 className="demo-title" data-i18n={demoKey}>{demoName}</h1>
      <Lab /> {/* lab:slot */}
    </div>
  );
}
