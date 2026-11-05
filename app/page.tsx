import Lab from "./lab/custom-1793865725";
export default function Page() {
  return (
    <div className="page-stack">
      <h1 className="demo-title">Hello, React World!</h1>
      <img src="/worlds/react.png" alt="React world" />
      <Lab /> {/* lab:slot */}
    </div>
  );
}
