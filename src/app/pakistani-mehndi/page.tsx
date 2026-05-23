import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pakistani Mehndi Designs 2025 | Elegant Henna Patterns",
  description:
    "Explore elegant Pakistani mehndi designs featuring fine-line floral patterns, intricate motifs, and beautiful bridal henna art. Perfect for weddings and celebrations.",
  alternates: {
    canonical: "https://www.mehndidesignhenna.com/pakistani-mehndi",
  },
  openGraph: {
    title: "Pakistani Mehndi Designs 2025",
    description:
      "Elegant Pakistani mehndi with fine-line florals, intricate motifs and stunning bridal henna.",
    url: "https://www.mehndidesignhenna.com/pakistani-mehndi",
    type: "website",
  },
};

export default function PakistaniMehndiPage() {
  const pakistaniDesigns = designs.filter(
    (d) =>
      d.country?.toLowerCase().includes("pakistan") ||
      d.style?.toLowerCase().includes("pakistani") ||
      d.tags?.some((t) => t.toLowerCase().includes("pakistani"))
  );

  const displayDesigns =
    pakistaniDesigns.length > 0
      ? pakistaniDesigns
      : designs
          .filter((d) =>
            ["Tikki", "Floral", "Fine Line"].some((s) =>
              d.style?.toLowerCase().includes(s.toLowerCase())
            )
          )
          .slice(0, 28);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-3 opacity-80">
            Collection
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-5">
            Pakistani Mehndi Designs
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Pakistani mehndi is celebrated for its elegance and fine-line artistry. Blending
            Indian and Arabic influences, these designs feature delicate florals, intricate
            nets, and bold tikki patterns — a timeless choice for brides and festive occasions.
          </p>
          <div className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["Fine Line", "Tikki", "Floral", "Bridal", "Wedding", "Eid", "Elegant"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {displayDesigns.length > 0 ? (
          <>
            <p className="text-center text-muted text-sm mb-8">
              Showing {displayDesigns.length} Pakistani mehndi designs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayDesigns.map((design, idx) => (
                <DesignCard key={design.id} design={design} index={idx} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🌺</p>
            <h3 className="font-serif text-2xl text-muted mb-2">No Pakistani designs found</h3>
            <p className="text-muted text-sm">Check back soon for new additions.</p>
          </div>
        )}

        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            About Pakistani Mehndi Designs
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Pakistani mehndi is a beautiful fusion that combines the intricate density of
            Indian styles with the bold elegance of Arabic patterns. The result is a
            distinctive look characterised by fine-line florals, detailed net backgrounds,
            and prominent tikki (circular) focal points.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            These designs are especially popular for Pakistani and South Asian weddings,
            Eid celebrations, and cultural festivals. The mehndi ceremony (Rasm-e-Mehndi)
            is one of the most joyous pre-wedding events, where intricate henna patterns
            are applied to the bride and female guests.
          </p>
          <p className="text-muted leading-relaxed">
            From traditional full-hand bridal designs to simple Eid patterns, our Pakistani
            mehndi collection offers something beautiful for every occasion and skill level.
          </p>
        </section>
      </div>
    </div>
  );
}
