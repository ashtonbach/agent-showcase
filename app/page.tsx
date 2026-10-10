export default function Page() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", gap: "2rem" }}>
      <h1 className="page-title" style={{ whiteSpace: "nowrap" }}>Hello, Sentry World!</h1>
      <img className="world-image" src="/worlds/sentry.png" alt="Sentry world illustration by Naomi Sato" width={1024} height={576} style={{ display: "block", maxWidth: "100%", height: "auto", borderRadius: 12 }} />
    </div>
  );
}
