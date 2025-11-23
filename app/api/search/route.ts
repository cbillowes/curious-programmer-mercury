import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/articles';
import { getScribbles } from '@/lib/scribbles';
import { getCourses } from '@/lib/courses';

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
      content,
      slug: getPathWithDomain(slug),
      imageUrl: getPathWithDomain(cover),
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
      content,
      slug: getPathWithDomain(slug),
      imageUrl: getPathWithDomain(cover),
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
      content,
      slug: getPathWithDomain(slug),
      imageUrl: getPathWithDomain(cover),
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
          content,
          slug: getPathWithDomain(slug),
          imageUrl: getPathWithDomain(cover ?? '/blog/default-01.jpg'),
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
