import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "AshtonBach | Agent Showcase",
  description: "A live demo of AI agents shipping a change end to end.",
  robots: { index: true, follow: true },
  icons: { icon: "/ab-mark.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <a className="skip-link label" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="site-header-inner">
            <a className="brand" href="/" aria-label="AshtonBach home">
              <img
                className="brand-mark"
                src="/ab-mark.svg"
                alt=""
                width={28}
                height={20}
              />
              <span className="brand-word">AshtonBach</span>
            </a>
            <nav aria-label="Main">
              <ul className="nav-list label">
                <li>
                  <a href="https://ashtonbach.com/about">About</a>
                </li>
                <li>
                  <a href="mailto:info@ashtonbach.com">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main id="main" className="page">
          {children}
        </main>
        <footer className="site-footer">
          <p className="site-disclaimer">
            Features and content for this demo were created by AI.
          </p>
          <span>&copy; 2026 AshtonBach LLC</span>
        </footer>
      </body>
    </html>
  );
}
