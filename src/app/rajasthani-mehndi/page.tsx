import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rajasthani Mehndi Designs 2025 | Traditional Indian Henna Art",
  description:
    "Explore rich Rajasthani mehndi designs filled with peacocks, elephants, intricate motifs and traditional Indian patterns. Ideal for weddings and festivals.",
  keywords: [
    "rajasthani mehndi design",
    "rajasthani henna patterns",
    "rajasthani bridal mehndi",
    "rajasthani mehndi 2025",
    "peacock mehndi design",
    "elephant mehndi pattern",
    "rajasthani wedding henna",
    "marwari mehndi",
    "rajasthani mehndi for hands",
    "traditional rajasthani mehndi",
    "dense mehndi coverage",
    "rajasthani mehndi for wedding",
    "royal mehndi design",
    "rajasthani mehndi tutorial",
    "latest rajasthani mehndi",
    "new rajasthani henna design",
    "rajasthani mehndi images",
    "beautiful rajasthani mehndi",
    "modern rajasthani henna",
    "rajasthani finger mehndi",
    "rajasthani back hand mehndi",
    "rajasthani full hand mehndi",
    "jaipur mehndi designs",
    "rajasthani dulhan mehndi",
    "rajasthani jaal mehndi",
    "rajasthani mirror work mehndi",
    "rajasthani geometric mehndi",
    "rajasthani mehndi with figures",
    "rajasthani trail mehndi",
    "intricate rajasthani mehndi",
    "rajasthani henna for beginners",
    "rajasthani floral henna",
    "rajasthani elegant mehndi",
    "rajput mehndi design",
    "rajasthani mehndi ideas",
    "rajasthani henna inspiration",
    "rajasthani palm mehndi",
    "latest rajasthani henna",
    "rajasthani mehndi download",
    "rajasthani mehndi full arm"
  ],
  alternates: {
    canonical: "https://www.mehndidesignhenna.com/rajasthani-mehndi",
  },
  openGraph: {
    title: "Rajasthani Mehndi Designs 2025",
    description:
      "Rich Rajasthani mehndi with peacocks, elephants and traditional Indian patterns.",
    url: "https://www.mehndidesignhenna.com/rajasthani-mehndi",
    type: "website",
  },
};

export default function RajasthaniMehndiPage() {
  const rajasthaniDesigns = designs.filter(
    (d) =>
      d.style?.toLowerCase().includes("rajasthani") ||
      d.country?.toLowerCase().includes("rajasthan") ||
      d.tags?.some((t) => t.toLowerCase().includes("rajasthani")) ||
      d.description?.toLowerCase().includes("rajasthani")
  );

  // Fallback: show Indian traditional designs if no rajasthani-tagged ones
  const displayDesigns =
    rajasthaniDesigns.length > 0
      ? rajasthaniDesigns
      : designs.filter(
          (d) =>
            d.country?.toLowerCase().includes("india") &&
            (d.style?.toLowerCase().includes("traditional") ||
              d.tags?.some((t) => ["traditional", "intricate", "peacock"].includes(t.toLowerCase())))
        ).slice(0, 24);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-3 opacity-80">
            Collection
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-5">
            Rajasthani Mehndi Designs
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Experience the royal grandeur of Rajasthani mehndi — India's most celebrated
            henna tradition. Known for dense coverage, peacock motifs, elephant patterns,
            and rich storytelling, these designs are the crown jewel of bridal mehndi art.
          </p>
          <div className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["Peacock Motifs", "Elephant Patterns", "Dense Coverage", "Bridal", "Royal", "Traditional"].map((tag) => (
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
              Showing {displayDesigns.length} Rajasthani mehndi designs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayDesigns.map((design, idx) => (
                <DesignCard key={design.id} design={design} index={idx} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🦚</p>
            <h3 className="font-serif text-2xl text-muted mb-2">No Rajasthani designs found</h3>
            <p className="text-muted text-sm">Check back soon for new additions.</p>
          </div>
        )}

        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            About Rajasthani Mehndi Designs
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Rajasthani mehndi originates from the royal state of Rajasthan in India. It is
            distinguished by its incredibly dense, full-coverage patterns that tell stories
            through intricate motifs — peacocks symbolising beauty, elephants representing
            prosperity, and the iconic bride-and-groom hidden within the design.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            These designs typically cover the entire hand and extend up the forearm, making
            them a perfect choice for brides who want maximum impact. The deep reddish-brown
            stain of Rajasthani henna is considered auspicious and a sign of the groom's love.
          </p>
          <p className="text-muted leading-relaxed">
            From simple traditional patterns to elaborate royal bridal suites, our Rajasthani
            collection captures the timeless grandeur of this ancient art form.
          </p>
        </section>
      </div>
    </div>
  );
}
