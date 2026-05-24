import TryOnClient from "./TryOnClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Mehndi Try-On Tool | See Henna on Your Hand",
  description:
    "Upload a photo of your hand and try on 100+ beautiful mehndi designs instantly. Adjust, rotate, and preview henna art on your own skin tone before booking an artist.",
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
