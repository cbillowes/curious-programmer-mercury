import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { getScribblesByYearOrSlug } from '@/lib/scribbles';
import { ScribbleContent } from '@/components/content';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';
import { getPageMetadata } from '@/lib/utils';
import { getBookmarks } from '@/db/bookmarks';
import { getLikes } from '@/db/likes';
import { PageHeading } from '@/components/page-heading';
import { Preview } from '@/components/preview';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = getScribblesByYearOrSlug(slug);
  if (data) {
    if (Array.isArray(data)) {
      return getPageMetadata({
        title: `Scribbles from ${slug}`,
        description: `Explore a collection of informal writings and musings penned in ${slug} by Curious Programmer.`,
        slug: `/scribbles/${slug}`,
        image: '/scribbles.webp',
        type: 'website',
      });
    }

    return getPageMetadata({
      title: data.title,
      description: data.abstract ?? '',
      slug: data.slug,
      image: data.cover!,
      date: data.date,
      type: 'article',
    });
  }
}

export default async function ScribblePage({ params }: Props) {
  const { slug } = await params;

  const data = getScribblesByYearOrSlug(slug);
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
            <ScribbleContent
              scribble={data}
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
        <PageHeading>{slug} Scribbles</PageHeading>
        <ul>
          {data.map((article, index) => (
            <Preview
              key={index}
              index={index}
              data={article}
              bookmarks={bookmarks.map((b) => b.slug)}
              likes={likes.map((l) => l.slug)}
            />
          ))}
        </ul>
      </Container>
    </Page>
  );
}
