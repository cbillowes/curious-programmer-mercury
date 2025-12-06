import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { getArticlesByYearOrSlug } from '@/lib/articles';
import { Preview } from '@/components/preview';
import { PageHeading } from '@/components/page-heading';
import { ArticleContent } from '@/components/content';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';
import { getPageMetadata } from '@/lib/utils';
import { getBookmarks } from '@/db/bookmark';
import { getLikes } from '@/db/likes';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = getArticlesByYearOrSlug(slug);
  if (data) {
    if (Array.isArray(data)) {
      return getPageMetadata({
        title: `Articles from ${slug}`,
        description: `Scan through a mixture of technical and soft skill articles written in ${slug} for software engineering.`,
        slug: `/blog/${slug}`,
        image: '/blog.webp',
        type: 'website',
      });
    }
    return getPageMetadata({
      title: data.title,
      description: data.abstract ?? '',
      slug: data.slug,
      image: data.cover,
      date: data.date,
      type: 'article',
    });
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const data = getArticlesByYearOrSlug(slug);
  const bookmarks = await getBookmarks();
  const likes = await getLikes();

  if (!Array.isArray(data)) {
    if (data) {
      return (
        <Page>
          <Hero
            image={data.cover}
            title={data.title}
            credit={data.credit}
            creditLink={data.creditLink}
            creditSource={data.creditSource}
          />
          <Container>
            <ArticleContent
              article={data}
              bookmarks={bookmarks.map((b) => b.slug)}
              likes={likes.map((l) => l.slug)}
            />
          </Container>
        </Page>
      );
    } else {
      notFound();
    }
  }

  if (data.length === 0) {
    notFound();
  }

  return (
    <Page>
      <Container>
        <PageHeading>{slug} Articles</PageHeading>
        <ul>
          {data.map((article, index) => (
            <Preview
              key={index}
              index={index}
              data={article}
              bookmarks={bookmarks.map((b) => b.slug)}
            />
          ))}
        </ul>
      </Container>
    </Page>
  );
}
