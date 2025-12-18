import { defineCollection, defineConfig } from '@content-collections/core';
import readingTime from 'reading-time';
import { z } from 'zod';
import { extractExcerpt, slugify, toHeroImageUrl } from '@/lib/utils';

const articles = defineCollection({
  name: 'articles',
  directory: 'data/articles',
  include: '**/*.md',
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    cover: z.string().optional(),
    credit: z.string().optional(),
    creditSource: z.string().optional(),
    creditLink: z.url().optional(),
    date: z.string(),
    abstract: z.string().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    content: z.string(),
  }),
  transform: async (doc, meta) => {
    const docs = await meta.collection.documents();
    const idx = docs.findIndex((d) => doc._meta.filePath === d._meta.filePath);
    const previous = idx > 0 ? docs[idx - 1] : docs[docs.length - 1];
    const next = idx < docs.length - 1 ? docs[idx + 1] : docs[0];

    const toSlug = (slug: string) => {
      return `/blog/${slugify(slug)}`;
    };

    return {
      ...doc,
      slug: toSlug(doc.slug ?? doc.title),
      date: new Date(doc.date),
      timeToRead: Math.ceil(readingTime(doc.content).minutes),
      abstract: doc.abstract ?? extractExcerpt(doc.content),
      cover: toHeroImageUrl('hero', doc.cover),
      type: 'article' as const,
      number: idx + 1,
      previous: {
        slug: toSlug(previous.slug ?? previous.title),
        title: previous.title,
        number: idx > 0 ? idx : docs.length,
      },
      next: {
        slug: toSlug(next.slug ?? next.title),
        title: next.title,
        number: idx < docs.length - 1 ? idx + 2 : 1,
      },
    };
  },
});

const courses = defineCollection({
  name: 'courses',
  directory: 'data/courses',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    parent: z.string().optional(),
    index: z.boolean().optional(),
    date: z.string(),
    modified: z.string().optional(),
    abstract: z.string().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    content: z.string(),
    credit: z.string().optional(),
    creditSource: z.string().optional(),
    creditLink: z.url().optional(),
    featured: z.boolean().optional(),
  }),
  transform: async (doc, meta) => {
    const toSlug = (slug: string) => {
      return `/courses/${slugify(slug)}`;
    };

    const docs = await meta.collection.documents();
    const course = doc.index
      ? doc
      : docs.find(
          (d) => d.index === true && `/courses/${d.slug}` === doc.parent,
        );
    const courses = docs
      .filter((d) => d.index === true)
      .sort((a, b) => a._meta.filePath.localeCompare(b._meta.filePath));
    const pages = docs
      .filter((d) => d.parent === toSlug(course?.slug ?? course?.title ?? ''))
      .sort((a, b) => a._meta.filePath.localeCompare(b._meta.filePath));
    const modified = doc.modified && new Date(doc.modified);
    const abstract = doc.abstract ?? extractExcerpt(doc.content);
    const cover = toHeroImageUrl('hero', course?.cover);

    const toPageSlug = (idx: number, slug: string) => {
      const number = (idx + 1).toString().padStart(2, '0');
      return `/courses/${course?.slug}/${number}/${slugify(slug)}`;
    };

    const toPage = (idx: number, page: typeof doc) => {
      const slug = toPageSlug(idx, page.slug ?? page.title);
      const previous = idx > 0 ? pages[idx - 1] : pages[pages.length - 1];
      const next = idx < pages.length - 1 ? pages[idx + 1] : pages[0];
      const previousIdx = idx > 0 ? idx - 1 : pages.length - 1;
      const nextIdx = idx < pages.length - 1 ? idx + 1 : 0;
      return {
        ...page,
        slug,
        date: new Date(page.date),
        timeToRead: Math.ceil(readingTime(page.content).minutes),
        abstract: extractExcerpt(page.content, 160),
        cover,
        type: 'page' as const,
        course: course ?? undefined,
        pages: undefined,
        number: idx + 1,
        previous: {
          slug: toPageSlug(previousIdx, previous.slug ?? previous.title),
          title: previous.title,
          number: previousIdx - 1,
        },
        next: {
          slug: toPageSlug(nextIdx, next.slug ?? next.title),
          title: next.title,
          number: nextIdx + 1,
        },
      };
    };

    if (doc.index) {
      const idx = courses.findIndex(
        (d) => doc._meta.filePath === d._meta.filePath,
      );
      const previous = idx > 0 ? courses[idx - 1] : courses[courses.length - 1];
      const next = idx < courses.length - 1 ? courses[idx + 1] : courses[0];
      const timeToRead = pages
        .map((p) => Math.ceil(readingTime(p.content).minutes))
        .reduce((a, b) => a + b, 0);
      return {
        ...doc,
        slug: toSlug(doc.slug ?? doc.title),
        date: new Date(doc.date),
        modified,
        pages: pages.map((p, i) => toPage(i, p)),
        number: idx + 1,
        timeToRead,
        abstract,
        cover,
        type: 'course' as const,
        course: undefined,
        previous: {
          slug: toSlug(previous.slug ?? previous.title),
          title: previous.title,
          number: idx > 0 ? idx : courses.length,
        },
        next: {
          slug: toSlug(next.slug ?? next.title),
          title: next.title,
          number: idx < courses.length - 1 ? idx + 2 : 1,
        },
      };
    }
    const idx = pages.findIndex((d) => doc._meta.filePath === d._meta.filePath);
    return toPage(idx, doc);
  },
});

const resume = defineCollection({
  name: 'resume',
  directory: 'data/resume',
  include: '**/*.md',
  schema: z.object({
    slug: z.string(),
    share: z.string(),
    featured: z.boolean().optional(),
    resume: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      logo: z.string().optional(),
      category: z.string().optional(),
      company: z.string().optional(),
      jobTitle: z.string().optional(),
      type: z.string().optional(),
      arrangement: z.string().optional(),
      location: z.string().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
      os: z.string().optional(),
      tech: z.array(z.string()).optional(),
      summary: z.string().optional(),
    }),
    content: z.string(),
  }),
  transform: async (doc, meta) => {
    return {
      ...doc,
      slug: `/resume/${doc.slug}`,
      share: doc.share && `/logos/${doc.share}`,
      date: doc.resume.start ? new Date(doc.resume.start) : undefined,
    };
  },
});

const scribbles = defineCollection({
  name: 'scribbles',
  directory: 'data/scribbles',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    devTo: z.string().optional(),
    abstract: z.string().optional(),
    date: z.string(),
    cover: z.string().optional(),
    credit: z.string().optional(),
    creditLink: z.url().optional(),
    creditSource: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    content: z.string(),
  }),
  transform: async (doc, meta) => {
    const docs = await meta.collection.documents();
    const idx = docs.findIndex((d) => doc._meta.filePath === d._meta.filePath);
    const previous = idx > 0 ? docs[idx - 1] : docs[docs.length - 1];
    const next = idx < docs.length - 1 ? docs[idx + 1] : docs[0];
    const toSlug = (slug: string) => {
      return `/scribbles/${slugify(slug)}`;
    };
    return {
      ...doc,
      slug: toSlug(doc.slug ?? doc.title),
      date: new Date(doc.date),
      timeToRead: Math.ceil(readingTime(doc.content).minutes),
      abstract: doc.abstract ?? extractExcerpt(doc.content, 160),
      cover: toHeroImageUrl('hero', doc.cover),
      type: 'scribble' as const,
      number: idx + 1,
      previous: {
        slug: toSlug(previous.slug ?? previous.title),
        title: previous.title,
        number: idx > 0 ? idx : docs.length,
      },
      next: {
        slug: toSlug(next.slug ?? next.title),
        title: next.title,
        number: idx < docs.length - 1 ? idx + 2 : 1,
      },
    };
  },
});

export default defineConfig({
  collections: [articles, courses, resume, scribbles],
});
