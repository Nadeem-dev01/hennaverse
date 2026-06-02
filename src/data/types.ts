export interface DesignImage {
  src: string;
  srcAvif?: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  creditUrl?: string;
  license: "Unsplash" | "Pexels" | "Pixabay" | "CC-BY-SA" | "AI-Generated" | "Unknown";
  licenseUrl?: string;
  sourceId?: string;
  phash?: string;
}

export interface DesignFAQ {
  q: string;
  a: string;
}

export interface Design {
  id: string;
  slug: string;
  title: string;
  descriptionParagraphs: string[];
  category: string;
  categories: string[];
  region?: string;
  occasion?: string;
  bodyPart?: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  tags: string[];
  image: DesignImage;
  relatedIds: string[];
  faq: DesignFAQ[];
}
