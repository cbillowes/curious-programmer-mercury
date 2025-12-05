import { allCourses } from 'content-collections';

export function getCourses() {
  return allCourses
    .filter((course) => course.index)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getCoursePageBySlug(slug: string) {
  return allCourses.find((c) => c.slug === slug && c.index !== true);
}

export function getCoursePages() {
  return allCourses.filter((page) => page.type === 'page');
}

export function getCoursePagesBySlug(slug: string) {
  return allCourses.filter((page) => page.parent === `/courses/${slug}`);
}

export function getCourseBySlug(slug: string) {
  return getCourses().find((c) => c.slug === `/courses/${slug}`);
}
