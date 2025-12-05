import { allScribbles } from 'content-collections';

export function getScribbles() {
  return allScribbles.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getScribbleBySlug(slug: string) {
  return allScribbles.find((scribble) => scribble.slug.endsWith(slug));
}
