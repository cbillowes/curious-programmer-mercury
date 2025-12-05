import { allCourses } from 'content-collections';

export function getCourses() {
  return allCourses
    .filter((course) => course.index)
    .sort((a, b) => {
      if (a.date && b.date) {
        if (a?.date > b?.date) return -1;
        if (a?.date < b?.date) return 1;
        return 0;
      }
      return -1;
    });
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
