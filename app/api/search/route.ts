import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/articles';
import { getScribbles } from '@/lib/scribbles';
import { getCoursePages, getCourses } from '@/lib/courses';

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

function getPathWithDomain(path: string = '/hero/default-01.jpg') {
  const shareImage = path
    .replace('/hero/', '/share/')
    .replace(/\.[^/.]+$/, '.jpg');
  return path.startsWith('http')
    ? shareImage
    : `https://curiousprogrammer.dev${shareImage}`;
}

function getKeywords(content: string = '') {
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
    ({ slug, title, abstract, cover, tags, date, content, number }) => ({
      objectID: slug,
      date,
      title,
      tags,
      abstract,
      slug,
      keywords: getKeywords(content),
      imageUrl: getPathWithDomain(cover),
      number,
    }),
  );
  const scribbles = getScribbles().map(
    ({ slug, title, abstract, cover, tags, date, content, number }) => ({
      objectID: slug,
      date,
      title,
      tags,
      abstract,
      slug,
      keywords: getKeywords(content),
      imageUrl: getPathWithDomain(cover),
      number,
    }),
  );
  const courses = getCourses().map(
    ({ slug, title, abstract, cover, tags, date, content, number }) => ({
      objectID: slug,
      date,
      title,
      tags,
      abstract,
      slug,
      keywords: getKeywords(content),
      imageUrl: getPathWithDomain(cover),
      number,
    }),
  );
  const coursePages = getCoursePages().map(
    ({ slug, title, abstract, cover, tags, date, content, number }) => ({
      objectID: slug,
      date,
      title,
      tags,
      abstract,
      slug,
      keywords: getKeywords(content),
      imageUrl: getPathWithDomain(cover),
      number,
    }),
  );
  const data = [...articles, ...scribbles, ...courses, ...coursePages].sort(
    (a, b) => {
      return a.number - b.number;
    },
  );
  return NextResponse.json(data);
}
