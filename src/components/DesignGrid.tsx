"use client";

import Link from "next/link";
import Image from "next/image";
import type { Design } from "@/data/types";
import { ImageOverlayActions } from "./ImageActions";

export default function DesignGrid({ designs }: { designs: Design[] }) {
  if (!designs.length) {
    return <p className="text-muted mt-10 text-center">Designs coming soon. Check back for updates!</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
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
          <ImageOverlayActions
            imageUrl={d.image.src}
            title={d.title}
            description={d.image.alt}
            urlPath={`/designs/${d.slug}`}
          />
        </Link>
      ))}
    </div>
  );
}
