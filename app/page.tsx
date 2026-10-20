import Lab from "./lab/faq-accordion";
import Extra from "./lab/custom-1792476731";
import { readDemoKey, demoTitle } from "./demo-name";
const demoKey = readDemoKey();
const demoName = demoTitle();
export default function Page() {
  return (
    <div className="page-stack">
      <Extra />
      <h1 className="demo-title" data-i18n={demoKey}>{demoName}</h1>
      <Lab /> {/* lab:slot */}
    </div>
  );
}
