import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';
import { extractExcerpt, slugify, toHeroImageUrl } from '@/lib/utils';
import readingTime from 'reading-time';

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
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    content: z.string(),
  }),
  transform: async (doc, meta) => {
    const docs = await meta.collection.documents();
    const idx = docs.findIndex((d) => doc._meta.filePath === d._meta.filePath);
    const previous = idx > 0 ? docs[idx - 1] : docs[0];
    const next = idx < docs.length - 1 ? docs[idx + 1] : docs[docs.length - 1];
    const slug = slugify(doc.slug ?? doc.title);
    return {
      ...doc,
      slug: `/blog/${slug}`,
      date: new Date(doc.date),
      timeToRead: Math.ceil(readingTime(doc.content).minutes),
      abstract: doc.abstract ?? extractExcerpt(doc.content),
      cover: toHeroImageUrl('hero', doc.cover),
      type: 'article' as const,
      number: idx + 1,
      previous,
      next,
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
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    content: z.string(),
    credit: z.string().optional(),
    creditSource: z.string().optional(),
    creditLink: z.url().optional(),
    featured: z.boolean().optional(),
  }),
  transform: async (doc, meta) => {
    const docs = await meta.collection.documents();
    const course = doc.index
      ? doc
      : docs.find(
          (d) => d.index === true && `/courses/${d.slug}` === doc.parent,
        );
    const courses = docs
      .filter((d) => d.index === true)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const pages = docs
      .filter((d) => d.parent === `/courses/${course?.slug}`)
      .sort((a, b) => a._meta.filePath.localeCompare(b._meta.filePath));
    const slug = slugify(doc.slug ?? doc.title);
    const modified = doc.modified && new Date(doc.modified);
    const abstract = doc.abstract ?? extractExcerpt(doc.content);
    const cover = toHeroImageUrl('hero', course?.cover);

    const toPage = (idx: number, d: typeof doc | null | undefined) => {
      if (!d) return null;
      const number = (idx + 1).toString().padStart(2, '0');
      const slug = `/courses/${course?.slug}/${number}/${slugify(
        d.slug ?? d.title,
      )}`;
      return {
        ...d,
        slug,
        date: new Date(d.date),
        timeToRead: Math.ceil(readingTime(d.content).minutes),
        abstract: extractExcerpt(d.content, 160),
        cover,
        type: 'page' as const,
        course,
        pages: null,
        number: idx + 1,
      };
    };

    if (doc.index) {
      const idx = courses.findIndex(
        (d) => doc._meta.filePath === d._meta.filePath,
      );
      const previous = idx > 0 ? courses[idx - 1] : courses[0];
      const next =
        idx < courses.length - 1
          ? courses[idx + 1]
          : courses[courses.length - 1];
      const timeToRead = pages
        .map((p) => Math.ceil(readingTime(p.content).minutes))
        .reduce((a, b) => a + b, 0);
      return {
        ...doc,
        slug: `/courses/${slug}`,
        date: new Date(doc.date),
        modified,
        pages: pages.map((p, i) => toPage(i, p)),
        number: idx + 1,
        timeToRead,
        abstract,
        cover,
        type: 'course' as const,
        course: null,
        previous,
        next,
      };
    }
    const idx = pages.findIndex((d) => doc._meta.filePath === d._meta.filePath);
    const previous = idx > 0 ? pages[idx - 1] : null;
    const next = idx < pages.length - 1 ? pages[idx + 1] : null;
    return {
      ...toPage(idx, doc),
      previous: toPage(idx - 1, previous) || null,
      next: toPage(idx + 1, next) || null,
    };
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
      date: doc.resume.start ? new Date(doc.resume.start) : null,
    };
  },
});

const scribbles = defineCollection({
  name: 'scribbles',
  directory: 'data/scribbles',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    devTo: z.string().optional(),
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
    const previous = idx > 0 ? docs[idx - 1] : null;
    const next = idx < docs.length - 1 ? docs[idx + 1] : null;
    const slug = slugify(doc.title);
    return {
      ...doc,
      slug: `/scribbles/${slug}`,
      date: new Date(doc.date),
      timeToRead: Math.ceil(readingTime(doc.content).minutes),
      abstract: extractExcerpt(doc.content, 160),
      cover: toHeroImageUrl('hero', doc.cover),
      type: 'scribble' as const,
      number: idx + 1,
      previous,
      next,
    };
  },
});

export default defineConfig({
  collections: [articles, courses, resume, scribbles],
});
