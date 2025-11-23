import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/articles';
import { getScribbles } from '@/lib/scribbles';
import { getCourses } from '@/lib/courses';

const stopWords = new Set([
  'the',
  'and',
  'that',
  'have',
  'for',
  'not',
  'with',
  'you',
  'this',
  'but',
  'from',
  'they',
  'his',
  'she',
  'which',
  'will',
  'there',
  'their',
  'what',
  'about',
  'when',
  'your',
  'it',
  "it's",
]);

function getPathWithDomain(path: string) {
  return path.startsWith('http')
    ? path
    : `https://curiousprogrammer.dev${path}`;
}

function getKeywords(content: string) {
  const normalized = content.toLowerCase().replace(/[^a-z0-9\']/g, ' ');
  const words = normalized.split(/ /g).filter((word) => word.length > 3);
  const wordCount: Record<string, number> = {};
  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  const keywords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);
  return keywords.filter((word) => !stopWords.has(word));
}

export async function GET() {
  const articles = getArticles().map(
    ({ slug, title, abstract, cover, tags, date, content }) => ({
      objectID: slug,
      date,
      title,
      tags,
      abstract,
      keywords: getKeywords(content),
      slug: getPathWithDomain(slug),
      imageUrl: getPathWithDomain(cover),
    }),
  );
  const scribbles = getScribbles().map(
    ({ slug, title, abstract, cover, tags, date, content }) => ({
      objectID: slug,
      date,
      title,
      tags,
      abstract,
      keywords: getKeywords(content),
      slug: getPathWithDomain(slug),
      imageUrl: getPathWithDomain(cover),
    }),
  );
  const courses = getCourses().map(
    ({ slug, title, abstract, cover, tags, date, content }) => ({
      objectID: slug,
      date,
      title,
      tags,
      abstract,
      keywords: getKeywords(content),
      slug: getPathWithDomain(slug),
      imageUrl: getPathWithDomain(cover),
    }),
  );
  const coursePages = getCourses()
    .map((course) => {
      return course.pages.map(
        ({ slug, title, abstract, cover, tags, date, content }) => ({
          objectID: slug,
          date,
          title,
          tags,
          abstract,
          keywords: getKeywords(content),
          slug: getPathWithDomain(slug),
          imageUrl: getPathWithDomain(cover ?? '/blog/default-01.jpg'),
        }),
      );
    })
    .flat();
  const data = [...articles, ...scribbles, ...courses, ...coursePages].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );
  return NextResponse.json(data);
}
