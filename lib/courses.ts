import { allCourses } from 'content-collections';
import { slugify } from '@/lib/utils';

export function getCourses() {
  return allCourses
    .filter((course) => course.index)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((course, i) => {
      const slug = `/courses/${slugify(course.slug ?? course.title)}`;
      return {
        ...course,
        slug,
        number: i + 1,
        pages: allCourses
          .filter((c) => c.parent === slug)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
          .map((c) => {
            const page = c._meta.fileName.substring(0, 2);
            const slug = slugify(c.title);
            return {
              ...c,
              slug: `/courses/${course.slug}/${page}/${slug}`,
            };
          }),
      };
    });
}
