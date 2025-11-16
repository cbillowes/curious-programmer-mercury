import { allArticles } from 'content-collections';
import readingTime from 'reading-time';
import { extractExcerpt, slugify } from '@/lib/utils';

export interface Article {
  type: 'article';
  slug: string;
  date: Date;
  number: number;
  timeToRead: number;
  title: string;
  cover?: string;
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
  next?: Article;
  previous?: Article;
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
        cover: cover
          ? cover.startsWith('http')
            ? cover
            : `/blog/${cover}`
          : '/blog/default-05.jpg',
        type: 'article' as const,
      };
    });
}

export function getArticlesByYear(year: number): Article[] {
  return getArticles()
    .filter((article) => article.date.getFullYear() === year)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

function getNextArticle(currentSlug: string): Article | undefined {
  const articles = getArticles();
  const index = articles.findIndex((article) =>
    article.slug.endsWith(currentSlug),
  );
  if (index >= 0 && index < articles.length - 1) {
    return articles[index + 1];
  }
  return undefined;
}

function getPreviousArticle(currentSlug: string): Article | undefined {
  const articles = getArticles();
  const index = articles.findIndex((article) =>
    article.slug.endsWith(currentSlug),
  );
  if (index > 0) {
    return articles[index - 1];
  }
  return undefined;
}

export function getArticleSlug(slug: string): Article | undefined {
  const article = getArticles().find((article) => article.slug.endsWith(slug));
  if (!article) {
    return undefined;
  }
  return {
    ...article,
    next: getNextArticle(slug),
    previous: getPreviousArticle(slug),
  };
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
