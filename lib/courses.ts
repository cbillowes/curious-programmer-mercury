import { allCourses } from 'content-collections';
import { slugify } from '@/lib/utils';
import readingTime from 'reading-time';

type CourseMeta = {
  title: string;
  date: string;
  modified?: string;
  content: string;
  slug?: string;
  parent?: string;
  index?: boolean;
  abstract?: string;
  tags?: string[];
  cover?: string;
  credit?: string;
  creditSource?: string;
  creditLink?: string;
  _meta: {
    filePath: string;
    fileName: string;
    directory: string;
    path: string;
    extension: string;
  };
};

export type CoursePage = {
  type: 'page';
  slug: string;
  title: string;
  date: Date;
  number: number;
  cover?: string;
  modified?: Date;
  content: string;
  parent?: string;
  index?: boolean;
  abstract?: string;
  tags?: string[];
  timeToRead?: number;
  credit?: string;
  creditSource?: string;
  creditLink?: string;
  next?: CoursePage;
  previous?: CoursePage;
  course?: Course;
};

export type Course = {
  type: 'course';
  slug: string;
  number: number;
  pages: CoursePage[];
  title: string;
  date: Date;
  modified?: Date;
  cover: string;
  content: string;
  parent?: string;
  index?: boolean;
  abstract?: string;
  tags?: string[];
  timeToRead?: number;
  credit?: string;
  creditSource?: string;
  creditLink?: string;
  next?: Course;
  previous?: Course;
};

function toCourse(data: CourseMeta, i: number): Course {
  const slug = `/courses/${data.slug ?? slugify(data.title)}`;
  const pages = getCoursePages(slug);
  const timeToRead = pages
    .reduce((previousValue, currentValue) => {
      return previousValue + (currentValue.timeToRead ?? 0);
    }, 0)
    .toString();
  return {
    ...data,
    slug,
    number: i + 1,
    type: 'course' as const,
    pages,
    date: new Date(data.date),
    modified:
      data.modified && data.modified.trim() !== ''
        ? new Date(data.modified)
        : undefined,
    timeToRead: Math.ceil(readingTime(timeToRead).minutes),
    cover: `/blog/${data.cover ?? 'default-06.jpg'}`,
  };
}

function toCoursePage(page: CourseMeta, index: number): CoursePage {
  const slug = getCoursePageSlug(page, index);
  return {
    ...page,
    slug,
    number: index + 1,
    type: 'page' as const,
    date: new Date(page.date),
    modified: page.modified ? new Date(page.modified) : undefined,
    timeToRead: Math.ceil(readingTime(page.content).minutes),
    cover: `/blog/${page.cover ?? 'default-06.jpg'}`,
  };
}

function getCourseSlug(slug: string): string {
  return slug.split('/').slice(0, 3).join('/');
}

function getCoursePageSlug(data: CourseMeta, index: number) {
  const number = (index + 1).toString().padStart(2, '0');
  return `${data.parent}/${number}/${slugify(data.title)}`;
}

function getNextCourse(slug: string): Course | undefined {
  const courses = allCourses
    .filter((c) => c.index === true)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const index = courses.findIndex((c) => c.slug === slug.split('/').pop());
  if (index >= 0 && index < courses?.length - 1) {
    return toCourse(courses[index + 1], index + 1);
  }
  return undefined;
}

function getPreviousCourse(slug: string): Course | undefined {
  const courses = allCourses
    .filter((c) => c.index === true)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const index = courses.findIndex((c) => c.slug === slug.split('/').pop());
  if (index > 0) {
    return toCourse(courses[index - 1], index - 1);
  }
  return undefined;
}

function getNextCoursePage(
  courseSlug: string,
  pageSlug: string,
): CoursePage | undefined {
  const pages = allCourses
    .filter((c) => c.parent === courseSlug)
    .map((p, i) => toCoursePage(p, i))
    .sort((a, b) => a.number - b.number);
  const index = pages.findIndex((p) => p.slug === pageSlug);
  if (index >= 0 && index < pages?.length - 1) {
    return pages[index + 1];
  }
  return undefined;
}

function getPreviousCoursePage(
  courseSlug: string,
  pageSlug: string,
): CoursePage | undefined {
  const pages = allCourses
    .filter((c) => c.parent === courseSlug)
    .map((p, i) => toCoursePage(p, i))
    .sort((a, b) => a.number - b.number);
  const index = pages.findIndex((p) => p.slug === pageSlug);
  if (index > 0) {
    return pages[index - 1];
  }
  return undefined;
}

export function getCoursePageBySlug(slug: string): CoursePage | undefined {
  const courseSlug = getCourseSlug(slug);
  const pages = allCourses
    .filter((page) => page.parent === courseSlug)
    .map((p, i) => {
      const page = toCoursePage(p, i);
      const course = getCourseBySlug(courseSlug.split('/').pop() ?? '');
      return {
        ...page,
        cover: course?.cover,
        next: getNextCoursePage(courseSlug, page.slug),
        previous: getPreviousCoursePage(courseSlug, page.slug),
        course,
      };
    });
  return pages.find((p) => p.slug === slug);
}

export function getCourses(): Course[] {
  return allCourses
    .filter((course) => course.index)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((c, i) => {
      const course = toCourse(c, i);
      return {
        ...course,
        pages: getCoursePages(course.slug),
        next: getNextCourse(course.slug),
        previous: getPreviousCourse(course.slug),
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getCoursePages(slug: string): CoursePage[] {
  return allCourses
    .filter((c) => c.parent === slug)
    .map((p, i) => toCoursePage(p, i))
    .sort((a, b) => a.number - b.number);
}

export function getCourseBySlug(slug: string): Course | undefined {
  const courseSlug = `/courses/${slug}`;
  return getCourses().find((c) => c.slug === courseSlug);
}
