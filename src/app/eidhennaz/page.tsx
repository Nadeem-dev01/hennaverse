import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";

export const metadata = {
  title: "Eid Hennaz | HennaVerse",
  description: "Explore our exclusive collection of gorgeous Eid Mehndi designs.",
  keywords: [
    "eid mehndi design",
    "eid henna patterns",
    "eid ul fitr mehndi",
    "eid ul adha henna",
    "eid mehndi 2025",
    "simple eid mehndi",
    "easy eid henna",
    "eid bridal mehndi",
    "eid mehndi for hands",
    "eid mehndi for kids",
    "eid finger mehndi",
    "eid back hand mehndi",
    "eid full hand mehndi",
    "latest eid mehndi",
    "new eid henna design",
    "eid mehndi images",
    "beautiful eid mehndi",
    "modern eid henna",
    "traditional eid mehndi",
    "arabic eid mehndi",
    "pakistani eid mehndi",
    "indian eid henna",
    "eid mehndi ideas",
    "eid henna inspiration",
    "eid mehndi download",
    "quick eid mehndi",
    "last minute eid henna",
    "festive eid mehndi",
    "eid celebration henna",
    "ramadan mehndi",
    "chand raat mehndi",
    "eid mehndi tutorial",
    "eid henna for beginners",
    "eid mehndi gallery",
    "best eid henna",
    "eid mehndi trends",
    "eid mehndi photos",
    "eid mehndi collection",
    "elegant eid mehndi",
    "eid mehndi patterns free"
  ],
};

export default function EidHennazPage() {
  // Filter designs to only show those categorized as 'Eid'
  const eidDesigns = designs.filter((d) => d.occasion === "Eid" || d.tags?.includes("Eid"));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Eid Hennaz
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Discover breathtaking mehndi designs perfect for Eid celebrations. From intricate traditional motifs to modern styles, our Eid collection will make your festive season truly special.
          </p>
        </div>

        {eidDesigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {eidDesigns.map((design, idx) => (
              <DesignCard key={design.id} design={design} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="font-serif text-2xl text-muted">No Eid designs found.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
