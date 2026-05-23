import { designs } from "@/data/designs";
import DesignCard from "@/components/DesignCard";

export const metadata = {
  title: "Bridal Hennaz | HennaVerse",
  description: "Explore our exclusive collection of gorgeous Bridal Mehndi designs.",
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
