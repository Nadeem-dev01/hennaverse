interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  // Use "h1" when this heading is the page title.
  as?: "h1" | "h2";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <Heading className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
        {title}
      </Heading>
      {subtitle && (
        <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div
        className={`mt-6 flex items-center gap-3 ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
      >
        <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
        <span className="h-2 w-2 rotate-45 bg-gold" />
        <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
      </div>
    </div>
  );
}
