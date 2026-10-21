const MAX_DESCRIPTION_LENGTH = 150;

// Search results cut meta descriptions at roughly 155 characters. Trim longer
// ones at a sentence end when there is one, otherwise at the last whole word.
export function clampDescription(text: string | undefined): string | undefined {
  if (!text || text.length <= MAX_DESCRIPTION_LENGTH) return text;

  const cut = text.slice(0, MAX_DESCRIPTION_LENGTH);
  const sentenceEnd = cut.lastIndexOf(". ");
  if (sentenceEnd > 80) return cut.slice(0, sentenceEnd + 1);

  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]+$/, "")}…`;
}

const MAX_TITLE_LENGTH = 60;
const BRAND_SUFFIX = " | Mehndi Design Henna";

// Search results cut titles at roughly 60 characters. Keep the brand suffix
// only when it fits; otherwise trim the title at a whole word and drop it.
export function clampTitle(text: string): string | { absolute: string } {
  if (text.length + BRAND_SUFFIX.length <= MAX_TITLE_LENGTH) return text;
  if (text.length <= MAX_TITLE_LENGTH) return { absolute: text };
  const cut = text.slice(0, MAX_TITLE_LENGTH);
  return { absolute: cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—|-]+$/, "") };
}
