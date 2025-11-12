import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const articles = defineCollection({
  name: 'articles',
  directory: 'data/articles',
  include: '**/*.md',
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    cover: z.string().optional(),
    creditSource: z.string().optional(),
    creditLink: z.url().optional(),
    date: z.string(),
    abstract: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    content: z.string(),
  }),
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
    modified: z.string(),
    abstract: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    content: z.string(),
  }),
});

const resume = defineCollection({
  name: 'resume',
  directory: 'data/resume',
  include: '**/*.md',
  schema: z.object({
    slug: z.string(),
    share: z.string(),
    resume: z.object({
      logo: z.string().optional(),
      category: z.string().optional(),
      company: z.string().optional(),
      jobTitle: z.string().optional(),
      type: z.string().optional(),
      arrangement: z.string().optional(),
      location: z.string().optional(),
      start: z.string(),
      end: z.string().optional(),
      os: z.string().optional(),
      tech: z.array(z.string()).optional(),
      summary: z.string().optional(),
    }),
    content: z.string(),
  }),
});

const scribbles = defineCollection({
  name: 'scribbles',
  directory: 'data/scribbles',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    devTo: z.string().optional(),
    date: z.string(),
    cover: z.string(),
    credit: z.string().optional(),
    creditLink: z.string().optional(),
    tags: z.array(z.string()).optional(),
    content: z.string(),
  }),
});

export default defineConfig({
  collections: [articles, courses, resume, scribbles],
});
