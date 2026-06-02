import Link from "next/link";
import Image from "next/image";
import type { Design } from "@/data/types";

export default function RelatedDesigns({ designs }: { designs: Design[] }) {
  if (!designs.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-serif text-gold mb-6">Related Designs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {designs.map((d) => (
          <Link
            key={d.slug}
            href={`/designs/${d.slug}`}
            className="group relative aspect-square rounded-xl overflow-hidden border border-border hover:border-gold/50 transition-colors"
          >
            <Image
              src={d.image.src}
              alt={d.image.alt}
              width={d.image.width}
              height={d.image.height}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium truncate">
                {d.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
