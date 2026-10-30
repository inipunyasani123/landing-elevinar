import { Archivo, Inter } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["600", "700", "800", "900"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const __jsonld = {"@context":"https://schema.org","@type":"WebSite","name":"Elevinar","description":"Webinar yang dijalankan seperti pertunjukan","url":"https://landing-elevinar.pintuweb.id","inLanguage":"id"};

const DESKRIPSI = "Elevinar menjalankan webinar seperti pertunjukan. Pertunjukan #07 \"Presentasi yang Didengar\": empat babak, 300 kursi, satu Sabtu, daring.";

// Tanggal pertunjukan dihitung dari hari ini (lib/acara.js), jadi halaman dibangun ulang tiap jam.
export const revalidate = 3600;

export const metadata = {
  metadataBase: new URL("https://landing-elevinar.pintuweb.id"),
  title: { default: "Elevinar — Presentasi yang Didengar", template: "%s — Elevinar" },
  description: DESKRIPSI,
  applicationName: "Elevinar",
  keywords: ["webinar presentasi", "pelatihan public speaking", "presentasi data", "latihan vokal presentasi", "webinar daring"],
  authors: [{ name: "Elevinar" }],
  creator: "Elevinar",
  publisher: "Elevinar",
  alternates: { canonical: "https://landing-elevinar.pintuweb.id" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://landing-elevinar.pintuweb.id",
    siteName: "Elevinar",
    title: "Elevinar — Presentasi yang Didengar",
    description: DESKRIPSI,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Elevinar — Presentasi yang Didengar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevinar — Presentasi yang Didengar",
    description: DESKRIPSI,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${archivo.variable} ${inter.variable} antialiased`}>
        <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-spot focus:px-4 focus:py-2 focus:text-stage">Lompat ke konten</a>
        <SiteHeader />
        <div id="konten">{children}</div>
        <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        <aside aria-label="Tentang situs demo ini" style={{ display: 'block', margin: 0, padding: '12px 16px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          Situs demo buatan PintuWeb — nama dan isinya rekaan.{' '}
          <a href="https://www.pintuweb.id/kontak?demo=elevinar" style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px', display: 'inline-block', padding: '12px 8px' }}>Buat yang seperti ini →</a>
        </aside>
        </body>
    </html>
  );
}
