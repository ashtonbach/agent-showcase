export default function Page() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", gap: "1rem" }}>
      <h1 className="page-title" style={{ whiteSpace: "nowrap" }}>Hello, Playwright World!</h1>
      <img src="/worlds/playwright.png" alt="Playwright world" />
    </div>
  );
}
