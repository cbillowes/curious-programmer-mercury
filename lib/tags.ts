import {
  allArticles,
  allCourses,
  allScribbles,
} from '@/.content-collections/generated';
import { slugify } from './utils';
import { getArticles } from './articles';
import { getScribbles } from './scribbles';
import { getCourses } from './courses';

export function getTags() {
  const articles = allArticles.map((article) => article.tags || []);
  const scribbles = allScribbles.map((scribble) => scribble.tags || []);
  const courses = allCourses.map((course) => course.tags || []);
  const tags = [...articles, ...scribbles, ...courses].flat();
  const uniqueTags = Array.from(new Set(tags));
  uniqueTags.sort((a, b) => a.localeCompare(b));
  return uniqueTags
    .map((tag) => {
      return {
        tag,
        count: tags.filter((t) => t === tag).length,
        slug: slugify(tag),
      };
    })
    .sort((a, b) => b.count - a.count);
}

export function prettifyTag(tag: string) {
  return getTags().find((t) => t.slug === tag)?.tag;
}

export function getByTag(tag: string) {
  const tagName = prettifyTag(tag) ?? '';
  const articles = getArticles().filter((article) =>
    article.tags?.includes(tagName),
  );
  const scribbles = getScribbles().filter((scribble) =>
    scribble.tags?.includes(tagName),
  );
  const courses = getCourses().filter((course) =>
    course.tags?.includes(tagName),
  );
  const combined = [...articles, ...scribbles, ...courses];
  return combined.sort((a, b) => {
    return b.number - a.number;
  });
}
