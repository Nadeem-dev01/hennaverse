import Image from "next/image";
import { Sparkles, Award } from "lucide-react";

interface AuthorBioProps {
  name: string;
  role?: string;
  bio?: string;
}

export default function AuthorBio({
  name = "Mehndi Design Henna Editorial Team",
  role = "Henna Art & Cultural Specialists",
  bio = "Our dedicated team of professional henna artists, cultural researchers, and beauty enthusiasts curate comprehensive guides, traditional patterns, and modern mehndi trends from around the world.",
}: AuthorBioProps) {
  return (
    <div className="bg-surface/60 border border-border/40 rounded-2xl p-6 my-10 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gold/10 border-2 border-gold/40 flex-shrink-0 flex items-center justify-center">
          <Image
            src="/Logo_Mehndidesign.png"
            alt={name}
            fill
            sizes="64px"
            className="object-cover p-1"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="font-serif text-lg font-bold text-foreground">{name}</h4>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/30">
              <Award size={12} />
              {role}
            </span>
          </div>

          <p className="text-muted text-sm leading-relaxed">{bio}</p>
        </div>
      </div>
    </div>
  );
}
