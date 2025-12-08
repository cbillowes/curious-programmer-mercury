import { allScribbles } from 'content-collections';

export function getScribbles() {
  return allScribbles.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getScribbleBySlug(slug: string) {
  return allScribbles.find((scribble) => scribble.slug.endsWith(slug));
}

export function getScribbleYears() {
  const years = allScribbles.map((scribble) => {
    return new Date(scribble.date).getFullYear();
  });
  return Array.from(new Set(years)).sort((a, b) => b - a);
}

export function getScribblesByYear(year: number) {
  return allScribbles
    .filter((scribble) => scribble.date.getFullYear() === year)
    .sort((a, b) => b.number - a.number);
}

export function getScribblesByYearOrSlug(param: string) {
  const article = getScribbleBySlug(param);
  if (article) {
    return article;
  }
  return getScribblesByYear(parseInt(param, 10));
}
