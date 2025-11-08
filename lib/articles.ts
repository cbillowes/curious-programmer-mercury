import { allArticles } from 'content-collections';
import { slugify } from './slugify';

export function getArticles() {
  return allArticles
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((article, i) => {
      const slug = slugify(article.slug ?? article.title);
      return {
        ...article,
        slug: `/blog/${slug}`,
        number: i + 1,
      };
    });
}
