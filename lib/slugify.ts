export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[',\.]+/gi, '')
    .replace(/[^a-z0-9]+/gi, '-');
}
