import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { t, BASE_LOCALE } from "./i18n";
import { withBase } from "./base-path";

// Self-hosted (latin, variable-weight woff2 from Google Fonts, OFL): the build no longer fetches fonts.googleapis.com, which made a CI
// "Build site" fail once on a bad font response ("next/font/google queries have exactly one entry") while Vercel built the same commit.
const cormorant = localFont({
  src: [{ path: "./fonts/cormorant-garamond-latin-var.woff2", weight: "400 600", style: "normal" }],
  display: "swap",
  variable: "--font-cormorant",
  fallback: ["Georgia", "serif"],
});

const jost = localFont({
  src: [{ path: "./fonts/jost-latin-var.woff2", weight: "400 500", style: "normal" }],
  display: "swap",
  variable: "--font-jost",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "AshtonBach | Agent Showcase",
  description: "A live demo of AI agents shipping a change end to end.",
  robots: { index: true, follow: true },
  icons: { icon: withBase("/ab-mark.svg") },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={BASE_LOCALE} className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <style>{`.site-header .brand .brand-mark{width:48px;height:auto}.site-footer .footer-mark{display:inline-flex;align-items:center;justify-content:center;align-self:center;padding:6px;opacity:.85;border:0;text-decoration:none}.site-footer .footer-mark:hover{opacity:1}.site-footer .footer-mark:focus-visible{outline:2px solid currentColor;outline-offset:2px}.footer-mark-img{display:block;width:22px;height:auto}@media (max-width:640px){.site-header .brand .brand-mark{width:34px}.footer-mark-img{width:18px}}`}</style>
        <a className="skip-link label" href="#main" data-i18n="skip">
          {t("skip", "Skip to content")}
        </a>
        <header className="site-header">
          <div className="site-header-inner">
            <a className="brand" href={withBase("/")} aria-label="AshtonBach home">
              <img
                className="brand-mark"
                src={withBase("/ab-mark.svg")}
                alt=""
                width={48}
                height={35}
              />
            </a>
            <nav aria-label="Main">
              <ul className="nav-list label">
                <li>
                  <a href="https://agents.ashtonbach.com/" data-i18n="nav.live">{t("nav.live", "Production workflow")}</a>
                </li>
                <li>
                  <a href="mailto:info@ashtonbach.com" data-i18n="nav.contact">{t("nav.contact", "Contact")}</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main id="main" className="page">
          {children}
        </main>
        <footer className="site-footer">
          <p className="site-disclaimer" data-i18n="footer.disclaimer">
            {t("footer.disclaimer", "Features and content for this demo were created by AI.")}
          </p>
          <a className="footer-mark" href="https://ashtonbach.com" aria-label="AshtonBach">
            <img className="footer-mark-img" src={withBase("/ab-mark.svg")} alt="" width={22} height={16} />
          </a>
        </footer>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var h=document.querySelector('.site-header');if(!h)return;function u(){h.classList.toggle('is-scrolled',window.scrollY>8)}u();addEventListener('scroll',u,{passive:true})})();",
          }}
        />
      </body>
    </html>
  );
}
