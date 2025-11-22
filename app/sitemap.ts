import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/articles';
import { getCourses } from '@/lib/courses';
import { getResume } from '@/lib/resume';
import { getScribbles } from '@/lib/scribbles';
import { WEBSITE_URL } from '@/lib/config';

function getImageUrl(image: string | undefined) {
  if (!image) return undefined;
  const url = image.startsWith('http') ? image : `${WEBSITE_URL}${image}`;
  return url.replace(/&/g, '&amp;');
}

function getSitemapEntry(slug: string, date: Date, image: string | undefined) {
  return {
    url: `${WEBSITE_URL}${slug}`,
    lastModified: new Date(date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
    images: [getImageUrl(image)].filter(Boolean) as string[],
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = getArticles();
  const scribbles = getScribbles();
  const courses = getCourses();
  const resume = getResume();

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) =>
    getSitemapEntry(a.slug, a.date, a.cover),
  );
  const scribbleEntries: MetadataRoute.Sitemap = scribbles.map((s) =>
    getSitemapEntry(s.slug, s.date, s.cover),
  );
  const courseEntries: MetadataRoute.Sitemap = courses.map((c) =>
    getSitemapEntry(c.slug, c.date, c.cover),
  );
  const resumeEntries: MetadataRoute.Sitemap = resume.map((r) =>
    getSitemapEntry(r.slug, new Date(), r.share),
  );

  return [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...articleEntries,
    ...scribbleEntries,
    ...courseEntries,
    ...resumeEntries,
  ];
}
