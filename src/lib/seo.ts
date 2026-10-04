const MAX_DESCRIPTION_LENGTH = 160;

// Search results cut meta descriptions at roughly 160 characters. Trim longer
// ones at a sentence end when there is one, otherwise at the last whole word.
export function clampDescription(text: string | undefined): string | undefined {
  if (!text || text.length <= MAX_DESCRIPTION_LENGTH) return text;

  const cut = text.slice(0, MAX_DESCRIPTION_LENGTH);
  const sentenceEnd = cut.lastIndexOf(". ");
  if (sentenceEnd > 80) return cut.slice(0, sentenceEnd + 1);

  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]+$/, "")}…`;
}
