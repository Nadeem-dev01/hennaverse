import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mandala Mehndi Designs 2025 | Circular Henna Art Patterns",
  description:
    "Browse our stunning collection of Mandala mehndi designs. Intricate circular patterns inspired by sacred geometry — perfect for weddings, festivals, and spiritual occasions.",
  keywords: [
    "mandala mehndi design",
    "mandala henna patterns",
    "circular mehndi design",
    "sacred geometry henna",
    "mandala bridal mehndi",
    "mandala mehndi 2025",
    "round mehndi design",
    "symmetrical henna pattern",
    "mandala palm mehndi",
    "mandala back hand mehndi",
    "easy mandala mehndi",
    "simple mandala henna",
    "intricate mandala mehndi",
    "mandala mehndi tutorial",
    "latest mandala mehndi",
    "new mandala henna design",
    "mandala mehndi images",
    "beautiful mandala mehndi",
    "modern mandala henna",
    "traditional mandala mehndi",
    "mandala finger mehndi",
    "mandala full hand mehndi",
    "spiritual mehndi design",
    "zen mehndi pattern",
    "mandala mehndi for wedding",
    "mandala henna for eid",
    "mandala mehndi ideas",
    "mandala henna inspiration",
    "mandala mehndi download",
    "concentric circle mehndi",
    "petal mehndi design",
    "geometric mandala henna",
    "floral mandala mehndi",
    "mandala mehndi for beginners",
    "expert mandala henna",
    "mandala wrist mehndi",
    "mandala mehndi art",
    "mandala henna tattoo",
    "mandala mehndi step by step",
    "mandala mehndi free"
  ],
  alternates: {
    canonical: "https://www.mehndidesignhenna.com/mandala-mehndi",
  },
  openGraph: {
    title: "Mandala Mehndi Designs 2025",
    description:
      "Intricate Mandala henna designs with sacred geometry, circular patterns and detailed artistry.",
    url: "https://www.mehndidesignhenna.com/mandala-mehndi",
    type: "website",
  },
};

export default function MandalaMehndiPage() {
  const mandalaDesigns = designs.filter(
    (d) =>
      d.style?.toLowerCase().includes("mandala") ||
      d.title?.toLowerCase().includes("mandala") ||
      d.tags?.some((t) => t.toLowerCase().includes("mandala"))
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Header */}
        <div className="mb-16 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-3 opacity-80">
            Collection
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-5">
            Mandala Mehndi Designs
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Mandala mehndi designs are a mesmerizing art form rooted in sacred
            geometry. These intricate circular patterns radiate outward with
            stunning symmetry — a perfect blend of spirituality and beauty for
            weddings, festivals, and celebrations.
          </p>
          <div className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        </div>

        {/* Info Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["Circular", "Sacred Geometry", "Symmetrical", "Bridal", "Festival", "Spiritual"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Grid */}
        {mandalaDesigns.length > 0 ? (
          <>
            <p className="text-center text-muted text-sm mb-8">
              Showing {mandalaDesigns.length} Mandala mehndi designs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mandalaDesigns.map((design, idx) => (
                <DesignCard key={design.id} design={design} index={idx} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔮</p>
            <h3 className="font-serif text-2xl text-muted mb-2">
              No Mandala designs found
            </h3>
            <p className="text-muted text-sm">Check back soon for new additions.</p>
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            About Mandala Mehndi Designs
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Mandala mehndi draws inspiration from the ancient Sanskrit word "mandala," meaning
            circle. These designs feature concentric circles, petals, dots, and geometric
            shapes that radiate from a central point, creating a hypnotic sense of balance
            and harmony.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            Often placed on the palm center, wrist, or back of the hand, Mandala mehndi
            carries deep spiritual significance in Hindu and Buddhist traditions. Today, it
            has become a globally celebrated art form loved for its intricate beauty.
          </p>
          <p className="text-muted leading-relaxed">
            Our Mandala mehndi collection ranges from simple geometric patterns for beginners
            to elaborate expert-level designs for bridal occasions and festivals.
          </p>
        </section>
      </div>
    </div>
  );
}
