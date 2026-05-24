import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arabic Mehndi Designs 2025 | Beautiful Arabic Henna Patterns",
  description:
    "Explore stunning Arabic mehndi designs featuring bold florals, vines, and geometric patterns. Perfect for weddings, Eid, and celebrations.",
  keywords: [
    "arabic mehndi design",
    "arabic henna patterns",
    "arabic mehndi 2025",
    "khaleeji henna",
    "gulf henna designs",
    "arabic bridal mehndi",
    "simple arabic mehndi",
    "arabic mehndi for hands",
    "bold henna patterns",
    "flowing vine henna",
    "arabic floral mehndi",
    "arabic mehndi for eid",
    "easy arabic henna",
    "arabic mehndi tutorial",
    "latest arabic mehndi",
    "new arabic henna design",
    "arabic mehndi images",
    "arabic henna photos",
    "beautiful arabic mehndi",
    "modern arabic henna",
    "traditional arabic mehndi",
    "arabic finger mehndi",
    "arabic back hand mehndi",
    "arabic full hand mehndi",
    "dubai henna designs",
    "saudi mehndi patterns",
    "levantine henna",
    "arabic mehndi with shading",
    "arabic trail mehndi",
    "arabic minimal mehndi",
    "arabic mehndi for wedding",
    "arabic henna for beginners",
    "arabic floral henna patterns",
    "arabic geometric mehndi",
    "bold arabic henna",
    "arabic mehndi ideas",
    "arabic henna inspiration",
    "arabic palm mehndi",
    "latest khaleeji henna",
    "arabic mehndi download free"
  ],
  alternates: {
    canonical: "https://www.mehndidesignhenna.com/arabic-mehndi",
  },
  openGraph: {
    title: "Arabic Mehndi Designs 2025",
    description:
      "Stunning Arabic mehndi designs with bold florals, flowing vines, and intricate patterns.",
    url: "https://www.mehndidesignhenna.com/arabic-mehndi",
    type: "website",
  },
};

export default function ArabicMehndiPage() {
  const arabicDesigns = designs.filter(
    (d) =>
      d.style?.toLowerCase().includes("arabic") ||
      d.country?.toLowerCase().includes("arabia") ||
      d.tags?.some((t) => t.toLowerCase().includes("arabic"))
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
            Arabic Mehndi Designs
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Discover the bold beauty of Arabic mehndi — known for its flowing
            florals, rich vines, and striking geometric patterns that leave
            maximum skin visible. Perfect for weddings, Eid, and every festive
            occasion.
          </p>
          <div className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        </div>

        {/* Info Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["Bold Florals", "Flowing Vines", "Geometric", "Wedding", "Eid", "Festive"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Grid */}
        {arabicDesigns.length > 0 ? (
          <>
            <p className="text-center text-muted text-sm mb-8">
              Showing {arabicDesigns.length} Arabic mehndi designs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {arabicDesigns.map((design, idx) => (
                <DesignCard key={design.id} design={design} index={idx} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🌿</p>
            <h3 className="font-serif text-2xl text-muted mb-2">
              No Arabic designs found
            </h3>
            <p className="text-muted text-sm">Check back soon for new additions.</p>
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-20 max-w-3xl mx-auto prose prose-invert">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            About Arabic Mehndi Designs
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Arabic mehndi is one of the most popular henna styles worldwide. Originating from
            the Middle East, it features large, bold floral and leaf motifs with flowing vines
            that gracefully travel across the hand and arm. Unlike traditional Indian mehndi,
            Arabic designs leave more skin visible, creating a striking contrast.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            These designs are especially popular for weddings, Eid celebrations, and festive
            occasions. They are easier to apply than dense Indian styles, making them ideal
            for beginners and professionals alike.
          </p>
          <p className="text-muted leading-relaxed">
            Whether you prefer a minimalist single-flower design or an elaborate full-hand
            Arabic pattern, our collection has something for every taste and occasion.
          </p>
        </section>
      </div>
    </div>
  );
}
