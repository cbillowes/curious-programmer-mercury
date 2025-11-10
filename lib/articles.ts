import { allArticles } from 'content-collections';
import { slugify } from './slugify';
import readingTime from 'reading-time';

export function getArticles() {
  return allArticles
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((article, i) => {
      const slug = slugify(article.slug ?? article.title);
      return {
        ...article,
        slug: `/blog/${slug}`,
        date: new Date(article.date),
        number: i + 1,
        timeToRead: Math.ceil(readingTime(article.content).minutes),
      };
    });
}

export function getArticlesByYear(year: number) {
  return getArticles()
    .filter((article) => article.date.getFullYear() === year)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getArticleSlug(slug: string) {
  return getArticles().find((article) => article.slug.endsWith(slug));
}

export function getArticlesByYearOrSlug(param: string) {
  const article = getArticleSlug(param);
  if (article) {
    return article;
  }
  return getArticlesByYear(parseInt(param, 10));
}
