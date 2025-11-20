import { allScribbles } from 'content-collections';
import { extractExcerpt, slugify } from '@/lib/utils';
import readingTime from 'reading-time';

export interface Scribble {
  type: 'scribble';
  slug: string;
  number: number;
  title: string;
  date: Date;
  cover: string;
  content: string;
  devTo?: string;
  credit?: string;
  creditLink?: string;
  tags?: string[];
  abstract?: string;
  timeToRead: number;
  _meta: {
    filePath: string;
    fileName: string;
    directory: string;
    path: string;
    extension: string;
  };
  next?: Scribble;
  previous?: Scribble;
}

export function getScribbles() {
  return allScribbles
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((scribble, i) => {
      const slug = slugify(scribble.title);
      return {
        ...scribble,
        slug: `/scribbles/${slug}`,
        date: new Date(scribble.date),
        timeToRead: Math.ceil(readingTime(scribble.content).minutes),
        abstract: extractExcerpt(scribble.content, 160),
        cover: scribble.cover
          ? scribble.cover.startsWith('http')
            ? scribble.cover
            : `/blog/${scribble.cover}`
          : '/blog/default-05.jpg',
        number: i + 1,
        type: 'scribble' as const,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function getNextScribble(currentSlug: string): Scribble | undefined {
  const scribbles = getScribbles();
  const index = scribbles.findIndex((scribble) =>
    scribble.slug.endsWith(currentSlug),
  );
  if (index >= 0 && index < scribbles.length - 1) {
    return scribbles[index + 1];
  }
  return undefined;
}

function getPreviousScribble(currentSlug: string): Scribble | undefined {
  const scribbles = getScribbles();
  const index = scribbles.findIndex((scribble) =>
    scribble.slug.endsWith(currentSlug),
  );
  if (index > 0) {
    return scribbles[index - 1];
  }
  return undefined;
}

export function getScribbleBySlug(slug: string): Scribble | undefined {
  const scribble = getScribbles().find((scribble) =>
    scribble.slug.endsWith(slug),
  );
  if (!scribble) {
    return undefined;
  }
  return {
    ...scribble,
    next: getNextScribble(slug),
    previous: getPreviousScribble(slug),
  };
}
