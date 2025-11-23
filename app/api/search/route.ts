import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/articles';
import { getScribbles } from '@/lib/scribbles';
import { getCourses } from '@/lib/courses';

function extractKeywords(text: string) {
  const stopWords = new Set([
    'i',
    'the',
    'is',
    'in',
    'and',
    'to',
    'a',
    'of',
    'it',
    'that',
    'on',
    'for',
    'with',
    'as',
    'this',
    'by',
    'an',
    'be',
    'are',
    'at',
    'from',
    'or',
    'but',
    'not',
    'have',
    'has',
    'was',
    'were',
    'they',
    'you',
    'he',
    'she',
    'we',
    'my',
    'your',
    'his',
    'her',
    'its',
    'our',
    'their',
  ]);
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .split(/\W+/)
        .filter((word) => word && !stopWords.has(word)),
    ),
  );
}

function getPathWithDomain(path: string) {
  return path.startsWith('http')
    ? path
    : `https://curiousprogrammer.dev${path}`;
}

export async function GET() {
  const articles = getArticles().map(
    ({ slug, title, abstract, cover, tags, date, content }) => ({
      objectID: slug,
      date,
      title,
      abstract,
      tags,
      slug: getPathWithDomain(slug),
      imageUrl: getPathWithDomain(cover),
      keywords: extractKeywords(content),
      type: 'Article',
    }),
  );
  const scribbles = getScribbles().map(
    ({ slug, title, abstract, cover, tags, date, content }) => ({
      objectID: slug,
      date,
      title,
      abstract,
      tags,
      slug: getPathWithDomain(slug),
      imageUrl: getPathWithDomain(cover),
      keywords: extractKeywords(content),
      type: 'Scribble',
    }),
  );
  const courses = getCourses().map(
    ({ slug, title, abstract, cover, tags, date, content }) => ({
      objectID: slug,
      date,
      title,
      abstract,
      tags,
      slug: getPathWithDomain(slug),
      imageUrl: getPathWithDomain(cover),
      keywords: extractKeywords(content),
      type: 'Course',
    }),
  );
  const coursePages = getCourses()
    .map((course) => {
      return course.pages.map(
        ({ slug, title, abstract, cover, tags, date, content }) => ({
          objectID: slug,
          date,
          title,
          abstract,
          tags,
          slug: getPathWithDomain(slug),
          imageUrl: getPathWithDomain(cover ?? '/blog/default-01.jpg'),
          keywords: extractKeywords(content),
          type: 'Course Page',
        }),
      );
    })
    .flat();
  const data = [...articles, ...scribbles, ...courses, ...coursePages].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );
  return NextResponse.json(data);
}
