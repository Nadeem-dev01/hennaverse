import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";

export const metadata = {
  title: "Bridal Hennaz | HennaVerse",
  description: "Explore our exclusive collection of gorgeous Bridal Mehndi designs.",
  keywords: [
    "bridal mehndi design",
    "bridal henna patterns",
    "wedding mehndi",
    "dulhan mehndi design",
    "bridal henna 2025",
    "bridal full hand mehndi",
    "bridal back hand mehndi",
    "bridal finger mehndi",
    "bridal arm mehndi",
    "bridal leg mehndi",
    "bridal foot mehndi",
    "Indian bridal mehndi",
    "Pakistani bridal mehndi",
    "Arabic bridal henna",
    "modern bridal mehndi",
    "traditional bridal henna",
    "minimalist bridal mehndi",
    "heavy bridal mehndi",
    "bridal mehndi ideas",
    "bridal henna inspiration",
    "latest bridal mehndi",
    "new bridal henna design",
    "bridal mehndi images",
    "beautiful bridal mehndi",
    "elegant bridal henna",
    "royal bridal mehndi",
    "bridal mehndi download",
    "bride groom mehndi",
    "engagement mehndi",
    "mehendi night designs",
    "bridal mehndi tutorial",
    "bridal henna artist",
    "bridal mehndi planning",
    "bridal mehndi aftercare",
    "darkest bridal stain",
    "bridal mehndi gallery",
    "best bridal henna",
    "simple bridal mehndi",
    "bridal henna for wedding day",
    "bridal mehndi photos"
  ],
};

export default function BridalHennazPage() {
  // Filter designs to only show those categorized as 'Bridal'
  const bridalDesigns = designs.filter((d) => d.style === "Bridal" || d.tags?.includes("Bridal"));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Bridal Hennaz
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Discover breathtaking bridal mehndi designs. Whether you prefer traditional patterns or modern minimalist art, our bridal collection has everything to make your special day unforgettable.
          </p>
        </div>

        {bridalDesigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bridalDesigns.map((design, idx) => (
              <DesignCard key={design.id} design={design} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="font-serif text-2xl text-muted">No Bridal designs found.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
