export default function Page() {
  return (
    <>
      <h1 className="page-title">Hello, Sentry World!</h1>
      <img className="world-image" src="/worlds/sentry.png" alt="Sentry world illustration by Naomi Sato" width={1024} height={576} style={{ display: "block", maxWidth: "100%", height: "auto", margin: "2rem auto 0", borderRadius: 12 }} />
    </>
  );
}
