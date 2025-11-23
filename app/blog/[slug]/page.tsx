import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { getArticlesByYearOrSlug } from '@/lib/articles';
import { Preview } from '@/components/preview';
import { PageHeading } from '@/components/page-heading';
import { ArticleContent } from '@/components/content';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';

type Props = {
  params: {
    slug: string;
  };
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const data = getArticlesByYearOrSlug(slug);

  if (!Array.isArray(data)) {
    if (data) {
      return (
        <Page
          title={data.title}
          description={data.abstract ?? ''}
          slug={data.slug}
          image={data.cover}
          type="article"
        >
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
    <Page
      title={`Articles from ${slug}`}
      description={`Scan through the list of articles written in ${slug}.`}
      slug={`/blog/${slug}`}
      image="/blog.webp"
      type="website"
    >
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
