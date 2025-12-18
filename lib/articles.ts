import { allArticles } from 'content-collections';

export function getArticles() {
  return allArticles.sort((a, b) => b.number - a.number);
}

export function getArticlesByYear(year: number) {
  return allArticles
    .filter((article) => article.date.getFullYear() === year)
    .sort((a, b) => b.number - a.number);
}

export function getArticleSlug(slug: string) {
  return allArticles.find((article) => article.slug.endsWith(slug));
}

export function getArticlesByYearOrSlug(param: string) {
  const article = getArticleSlug(param);
  if (article) {
    return article;
  }
  return getArticlesByYear(parseInt(param, 10));
}
