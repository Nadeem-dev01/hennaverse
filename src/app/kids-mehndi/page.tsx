import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kids Mehndi Designs 2025 | Cute Simple Henna for Children",
  description:
    "Adorable and simple mehndi designs for kids! Easy cartoon characters, flowers, stars and fun patterns that children love. Safe and quick to apply.",
  alternates: {
    canonical: "https://www.mehndidesignhenna.com/kids-mehndi",
  },
  openGraph: {
    title: "Kids Mehndi Designs 2025",
    description:
      "Cute and simple mehndi designs for kids — flowers, stars, butterflies and fun cartoon patterns.",
    url: "https://www.mehndidesignhenna.com/kids-mehndi",
    type: "website",
  },
};

export default function KidsMehndiPage() {
  const kidsDesigns = designs.filter(
    (d) =>
      d.style?.toLowerCase().includes("kids") ||
      d.occasion?.toLowerCase().includes("kids") ||
      d.tags?.some((t) => ["kids", "children", "simple", "easy", "cute"].includes(t.toLowerCase())) ||
      d.difficulty === "Easy"
  ).slice(0, 32);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-3 opacity-80">
            Collection
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-5">
            Kids Mehndi Designs
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Make every little one feel special with our adorable kids mehndi designs!
            Simple, cute, and quick to apply — featuring flowers, stars, butterflies,
            and fun patterns that children absolutely love at Eid, weddings, and festivals.
          </p>
          <div className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["Simple", "Cute", "Flowers", "Stars", "Butterflies", "Quick Apply", "Eid", "Festival"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {kidsDesigns.length > 0 ? (
          <>
            <p className="text-center text-muted text-sm mb-8">
              Showing {kidsDesigns.length} easy mehndi designs for kids
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {kidsDesigns.map((design, idx) => (
                <DesignCard key={design.id} design={design} index={idx} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🌸</p>
            <h3 className="font-serif text-2xl text-muted mb-2">No kids designs found</h3>
            <p className="text-muted text-sm">Check back soon for new additions.</p>
          </div>
        )}

        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            About Kids Mehndi Designs
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Kids mehndi designs are specially crafted to be fun, simple, and quick — because
            little ones can't sit still for long! These designs feature playful elements like
            flowers, hearts, stars, butterflies, and cartoon characters that make children
            feel like little royals at any celebration.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            They are perfect for Eid, Diwali, weddings, and birthday parties. The simple
            linework means they dry quickly and are gentle enough for children's sensitive skin.
          </p>
          <p className="text-muted leading-relaxed">
            Always use natural, chemical-free henna for children. Avoid black henna as it
            may contain harmful additives. Natural brown henna is the safest choice for kids.
          </p>
        </section>
      </div>
    </div>
  );
}
