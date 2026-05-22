import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HennaVerse — Discover the Art of Henna",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
