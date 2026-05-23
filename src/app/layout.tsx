import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hennaverse.com"),
  title: {
    default: "HennaVerse — Discover the Art of Henna",
    template: "%s | HennaVerse",
  },
  description:
    "Explore 100+ stunning mehndi designs from around the world. Discover traditional and modern henna patterns, tutorials, cultural guides, and inspiration for every occasion.",
  keywords: [
    "henna",
    "mehndi",
    "henna designs",
    "mehndi patterns",
    "bridal mehndi",
    "Arabic henna",
    "Indian mehndi",
    "henna art",
    "henna tutorial",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HennaVerse — Discover the Art of Henna",
    description: "Explore 100+ stunning mehndi designs from around the world.",
    url: "https://hennaverse.com",
    siteName: "HennaVerse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HennaVerse — Discover the Art of Henna",
    description: "Explore 100+ stunning mehndi designs from around the world.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "HennaVerse",
              url: "https://hennaverse.com",
              description: "Explore 100+ stunning mehndi designs from around the world.",
              publisher: {
                "@type": "Organization",
                name: "HennaVerse",
                logo: {
                  "@type": "ImageObject",
                  url: "https://hennaverse.com/icon.png"
                }
              }
            })
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
