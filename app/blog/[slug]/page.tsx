import { Metadata } from 'next';
import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { getArticlesByYearOrSlug } from '@/lib/articles';
import { Preview } from '@/components/preview';
import { PageHeading } from '@/components/page-heading';
import { ArticleContent } from '@/components/content';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';
import { getMetadata } from '@/lib/utils';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { slug } = await params;

  const data = getArticlesByYearOrSlug(slug);

  if (data) {
    if (Array.isArray(data)) {
      return {
        title: `Articles from ${slug} | Curious Programmer`,
        description: `A list of articles from the year ${slug}.`,
      };
    }

    const title = `${data.title} | Curious Programmer`;
    const description = data.abstract ?? '';
    return getMetadata(title, description, data.cover);
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const data = getArticlesByYearOrSlug(slug);

  if (!Array.isArray(data)) {
    if (data) {
      return (
        <Page slug={data.slug}>
          <Hero
            image={data.cover}
            title={data.title}
            credit={data.credit}
            creditLink={data.creditLink}
            creditSource={data.creditSource}
          />
          <Container>
            <ArticleContent {...data} />
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
    <Page slug={`/blog/${slug}`}>
      <Container>
        <PageHeading>{slug} Articles</PageHeading>
        <ul>
          {data.map((article, index) => (
            <Preview key={index} index={index} data={article} />
          ))}
        </ul>
      </Container>
    </Page>
  );
}
