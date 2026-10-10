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
  title: "About AshtonBach | Founded by David Wells, Engineering Executive",
  description:
    "AshtonBach is founded by David Wells, an engineering executive with 25+ years building consumer platforms in digital health, ecommerce, and travel, including CVS Health, Zappos, Koddi, and ID90 Travel.",
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
          <span>&copy; 2026 AshtonBach LLC</span>
        </footer>
      </body>
    </html>
  );
}
