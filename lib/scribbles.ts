import { allScribbles } from 'content-collections';
import { slugify } from './slugify';

export function getScribbles() {
  return allScribbles
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((scribble, i) => {
      const slug = slugify(scribble.title);
      return {
        ...scribble,
        slug: `/scribbles/${slug}`,
        number: i + 1,
      };
    });
}
