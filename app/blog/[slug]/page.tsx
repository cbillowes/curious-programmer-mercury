import { Metadata } from 'next';
import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { getArticlesByYearOrSlug } from '@/lib/articles';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const data = getArticlesByYearOrSlug(slug);

  if (!data) {
    return {
      title: 'Article Not Found | Curious Programmer',
      description: 'The article you are looking for does not exist.',
    };
  }

  if (Array.isArray(data)) {
    return {
      title: `Articles from ${slug} | Curious Programmer`,
      description: `A list of articles from the year ${slug}.`,
    };
  }

  const title = `${data.title} | Curious Programmer`;

  return {
    title,
    description: data.abstract,
    openGraph: {
      title,
      description: data.abstract,
      images: [data.cover],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: data.abstract,
      images: [data.cover],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const data = getArticlesByYearOrSlug(slug);

  if (!Array.isArray(data)) {
    if (data) {
      return (
        <Page>
          <Container>
            <h1>{data.title}</h1>
            <p>{data.date.toDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </Container>
        </Page>
      );
    } else {
      return (
        <Page>
          <Container>
            <h1>Article Not Found</h1>
            <p>The article you are looking for does not exist.</p>
          </Container>
        </Page>
      );
    }
  }

  return (
    <Page>
      <Container>
        <ul>
          {data.map((article) => (
            <li key={article.slug}>
              <a href={article.slug}>{article.title}</a> -{' '}
              {article.date.toDateString()}
            </li>
          ))}
        </ul>
      </Container>
    </Page>
  );
}
