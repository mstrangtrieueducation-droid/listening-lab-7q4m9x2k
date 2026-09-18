/** Keep decimal points: 3.1 and 31 are different answers. */
export function normalizeAnswer(value: string): string {
  return value.toLowerCase().normalize('NFKC')
    .replace(/[’‘']/g, '')
    .replace(/(^|\s)[−–-](?=\d)/g, '$1minus ')
    .replace(/[‐‑–—-]/g, ' ')
    .replace(/,/g, '')
    .replace(/\.(?!\d)/g, '')
    .replace(/\s+/g, ' ').trim();
}

export function isCorrectAnswer(value: string, answer: string, variants: string[] = []): boolean {
  const normalized = normalizeAnswer(value);
  return normalized.length > 0 && [answer, ...variants].some(candidate => normalizeAnswer(candidate) === normalized);
}
