import TryOnClient from "./TryOnClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Mehndi Try-On Tool | See Henna on Your Hand",
  description:
    "Upload a photo of your hand and try on 100+ beautiful mehndi designs instantly. Adjust, rotate, and preview henna art on your own skin tone before booking an artist.",
  keywords: [
    "virtual mehndi try on",
    "henna try on tool",
    "mehndi on hand preview",
    "henna design preview",
    "upload hand photo mehndi",
    "try mehndi online",
    "virtual henna app",
    "mehndi design tester",
    "henna overlay tool",
    "mehndi placement tool",
    "see henna on your hand",
    "mehndi visualizer",
    "henna design simulator",
    "try on henna designs",
    "virtual mehndi application",
    "mehndi preview tool",
    "henna on hand tool",
    "mehndi design overlay",
    "henna try on online",
    "mehndi simulator free",
    "virtual henna preview",
    "hand mehndi preview",
    "mehndi design viewer",
    "henna art preview",
    "try mehndi designs free",
    "virtual bridal mehndi",
    "try arabic henna online",
    "mehndi placement preview",
    "henna design tryout",
    "mehndi on palm preview",
    "henna visualizer tool",
    "mehndi augmented reality",
    "henna ar tool",
    "mehndi design fit",
    "henna on skin preview",
    "mehndi overlay online",
    "virtual mehndi free",
    "henna try before apply",
    "mehndi design test",
    "interactive henna tool"
  ],
  alternates: {
    canonical: "https://www.mehndidesignhenna.com/try-on",
  },
  openGraph: {
    title: "Virtual Mehndi Try-On Tool | HennaVerse",
    description:
      "Try on mehndi designs virtually! Upload your hand photo and preview 100+ stunning henna patterns instantly.",
    url: "https://www.mehndidesignhenna.com/try-on",
    type: "website",
  },
};

export default function TryOnPage() {
  return <TryOnClient />;
}
