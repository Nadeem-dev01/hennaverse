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
  metadataBase: new URL("https://www.mehndidesignhenna.com"),
  title: {
    default: "HennaVerse — Discover the Art of Henna",
    template: "%s | HennaVerse",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
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
  openGraph: {
    title: "HennaVerse — Discover the Art of Henna",
    description: "Explore 100+ stunning mehndi designs from around the world.",
    url: "https://www.mehndidesignhenna.com",
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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1JDYJ0QPC4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1JDYJ0QPC4');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8920350773715513"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "HennaVerse",
              alternateName: "Mehndi Design Henna",
              url: "https://www.mehndidesignhenna.com",
              description: "Explore stunning mehndi designs from India, Pakistan, Arabia, Morocco and beyond. Tutorials, cultural guides, and inspiration for every occasion.",
              publisher: {
                "@type": "Organization",
                name: "HennaVerse",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.mehndidesignhenna.com/icon.png"
                }
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.mehndidesignhenna.com/gallery?q={search_term_string}",
                "query-input": "required name=search_term_string"
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
