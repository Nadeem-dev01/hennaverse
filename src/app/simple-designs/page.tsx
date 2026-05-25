import type { Metadata } from "next";
import DesignCard from "@/components/DesignCard";
import { simpleDesigns } from "@/data/simpleDesigns";

export const metadata: Metadata = {
  title: "Simple & Easy Mehndi Designs: Quick, Minimalist Henna Patterns | HennaVerse",
  description:
    "Browse over 100+ simple, easy, and quick mehndi designs for beginners. Perfect minimalist henna patterns for hands and feet that anyone can apply at home.",
  keywords: [
    "simple mehndi design",
    "easy mehndi designs",
    "quick henna patterns",
    "minimalist mehndi",
    "mehndi for beginners",
    "simple henna",
    "easy mehndi",
    "basic mehndi design",
    "simple back hand mehndi",
    "simple front hand mehndi"
  ],
  alternates: {
    canonical: "/simple-designs",
  },
  openGraph: {
    title: "100+ Simple & Easy Mehndi Designs | HennaVerse",
    description: "Browse 100+ easy, minimalist, and quick mehndi designs perfect for beginners to try at home.",
    type: "website",
    url: "https://www.mehndidesignhenna.com/simple-designs",
    images: [
      {
        url: "/images/simple-designs/simple-design-001.jpg",
        width: 1200,
        height: 630,
        alt: "Simple Mehndi Designs",
      },
    ],
  },
};

export default function SimpleDesignsPage() {
  return (
    <div className="bg-sand-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-terracotta-900 text-sand-50 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-bg.png')] bg-repeat"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-gold-400">
            Simple Mehndi Designs
          </h1>
          <p className="text-lg md:text-xl text-sand-200 mb-8 max-w-2xl mx-auto">
            A curated collection of over 100 easy, quick, and beautiful minimalist henna patterns perfectly suited for beginners and those who prefer an elegant, understated look.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {simpleDesigns.map((design) => (
            <DesignCard
              key={design.id}
              design={design as any}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
