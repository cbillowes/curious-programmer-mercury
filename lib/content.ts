import { getArticles } from './articles';
import { getCourses } from './courses';
import { getScribbles } from './scribbles';

export function getContent() {
  const articles = getArticles();
  const scribbles = getScribbles();
  const courses = getCourses();
  const coursePages = courses.flatMap((course) => course.pages);
  return [...articles, ...scribbles, ...courses, ...coursePages];
}
