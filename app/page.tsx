export default function Page() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", gap: "1rem" }}>
      <h1 className="page-title" style={{ whiteSpace: "nowrap" }}>Hello, GitHub World!</h1>
      <img className="world-image" src="/worlds/github.png" alt="GitHub world" width={480} height={270} style={{ width: 480, maxWidth: "90vw", height: "auto", margin: 0, borderRadius: 12 }} />
    </div>
  );
}
