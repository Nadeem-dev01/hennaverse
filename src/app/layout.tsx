import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ThirdPartyScripts from "@/components/ThirdPartyScripts";

export const viewport: Viewport = {
  themeColor: "#7c3ady",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
    default: "Mehndi Design Henna — 5000+ Easy Mehndi Designs & Henna Patterns",
    template: "%s | Mehndi Design Henna",
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
    "Mehndi Design Henna: 5000+ easy mehndi designs, mehndi patterns for hands, simple arabic mehndi, bridal henna, and eid patterns. Free henna kits, cones & artist guides.",
  keywords: [
    "mehndi design henna",
    "mehndi henna",
    "easy mehndi designs",
    "mehndi patterns for hands",
    "simple mehndi designs for hands",
    "henna tattoo near me",
    "henna artist near me",
    "easy arabic mehndi design",
    "back hand mehndi design",
    "eid henna patterns",
    "bridal mehndi designs",
    "henna cones",
    "henna kit",
    "henna stencils",
  ],
  openGraph: {
    title: "Mehndi Design Henna — 5000+ Easy Mehndi Designs & Henna Patterns",
    description: "5000+ easy mehndi designs, mehndi patterns for hands, and henna tattoo ideas for every occasion.",
    url: "https://www.mehndidesignhenna.com",
    siteName: "Mehndi Design Henna",
    locale: "en_US",
    type: "website",
    images: [{ url: "/Logo_Mehndidesign.png", width: 800, height: 255, alt: "Mehndi Design Henna" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehndi Design Henna — 5000+ Easy Mehndi Designs & Henna Patterns",
    description: "5000+ easy mehndi designs, mehndi patterns for hands, and henna tattoo ideas for every occasion.",
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        {/* Funding Choices (Google consent banner) — 72.5 KiB third-party hit */}
        <link rel="preconnect" href="https://fundingchoicesmessages.google.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fundingchoicesmessages.google.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <ThirdPartyScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.mehndidesignhenna.com/#organization",
                  name: "Mehndi Design Henna",
                  url: "https://www.mehndidesignhenna.com",
                  logo: {
                    "@type": "ImageObject",
                    "@id": "https://www.mehndidesignhenna.com/#logo",
                    url: "https://www.mehndidesignhenna.com/icon.png",
                    width: 512,
                    height: 512,
                  },
                  description: "5000+ easy mehndi designs and henna patterns from India, Pakistan, Arabia, Morocco and beyond.",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.mehndidesignhenna.com/#website",
                  name: "Mehndi Design Henna",
                  alternateName: "MehndiDesignHenna",
                  url: "https://www.mehndidesignhenna.com",
                  description: "5000+ easy mehndi designs from India, Pakistan, Arabia, Morocco and beyond. Tutorials, cultural guides, and henna inspiration for every occasion.",
                  publisher: { "@id": "https://www.mehndidesignhenna.com/#organization" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://www.mehndidesignhenna.com/gallery?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
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
