import { allArticles } from 'content-collections';
import readingTime from 'reading-time';
import { extractExcerpt } from '@/lib/utils';
// TODO: move slugify to lib/utils.ts
import { slugify } from '@/lib/slugify';

export interface Article {
  type: 'article';
  slug: string;
  date: Date;
  number: number;
  timeToRead: number;
  title: string;
  cover: string;
  content: string;
  creditSource?: string | undefined;
  creditLink?: string | undefined;
  abstract?: string | undefined;
  tags?: string[] | undefined;
  featured?: boolean | undefined;
  _meta: {
    filePath: string;
    fileName: string;
    directory: string;
    path: string;
    extension: string;
  };
}

export function getArticles() {
  return allArticles
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((article, i) => {
      const { date, content, abstract, cover } = article;
      const slug = slugify(article.slug ?? article.title);
      return {
        ...article,
        slug: `/blog/${slug}`,
        date: new Date(date),
        number: i + 1,
        timeToRead: Math.ceil(readingTime(content).minutes),
        abstract: abstract ?? extractExcerpt(content),
        cover: cover.startsWith('http') ? cover : `/blog/${cover}`,
        type: 'article' as const,
      };
    });
}

export function getArticlesByYear(year: number): Article[] {
  return getArticles()
    .filter((article) => article.date.getFullYear() === year)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getArticleSlug(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug.endsWith(slug));
}

export function getArticlesByYearOrSlug(
  param: string,
): Article[] | Article | undefined {
  const article = getArticleSlug(param);
  if (article) {
    return article;
  }
  return getArticlesByYear(parseInt(param, 10));
}
