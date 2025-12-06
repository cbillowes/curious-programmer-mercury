import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/articles';
import { getCourses } from '@/lib/courses';
import { getResume } from '@/lib/resume';
import { getScribbles } from '@/lib/scribbles';
import { WEBSITE_URL } from '@/lib/config';

function getImageUrl(image: string | undefined) {
  if (!image) return undefined;
  const url = image.startsWith('http') ? image : `${WEBSITE_URL}${image}`;
  return url.replace(/&/g, '&amp;').replace(/\/hero\//, '/share/');
}

function getSitemapEntry(
  slug: string | null | undefined,
  date: Date | null | undefined,
  image: string | undefined,
) {
  if (!slug) return;
  return {
    url: `${WEBSITE_URL}${slug}`,
    lastModified: date ? new Date(date) : new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
    images: [getImageUrl(image)].filter(Boolean) as string[],
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles: MetadataRoute.Sitemap = getArticles()
    .map((a) => getSitemapEntry(a.slug, a.date, a.cover))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const scribbles: MetadataRoute.Sitemap = getScribbles()
    .map((s) => getSitemapEntry(s.slug, s.date, s.cover))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const courses: MetadataRoute.Sitemap = getCourses()
    .map((c) => getSitemapEntry(c.slug, c.date, c.cover))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const resume: MetadataRoute.Sitemap = getResume()
    .map((r) => getSitemapEntry(r.slug, new Date(), r.share))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...articles,
    ...scribbles,
    ...courses,
    ...resume,
  ];
}
