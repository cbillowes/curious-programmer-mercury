import { getArticles } from '@/lib/articles';
import { getCoursePages, getCourses } from '@/lib/courses';
import { getScribbles } from '@/lib/scribbles';

export function getContent() {
  const articles = getArticles();
  const scribbles = getScribbles();
  const courses = getCourses();
  const coursePages = getCoursePages();
  return [...articles, ...scribbles, ...courses, ...coursePages];
}
