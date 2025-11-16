import { Metadata } from 'next';
import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { getScribbleBySlug } from '@/lib/scribbles';
import { Content } from '@/components/content';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const data = getScribbleBySlug(slug);

  if (!data) {
    notFound();
  }

  const title = `${data.title} | Curious Programmer`;

  return {
    title,
    openGraph: {
      title,
      images: [data.cover],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      images: [data.cover],
    },
  };
}

export default async function ScribblePage({ params }: Props) {
  const { slug } = await params;

  const data = getScribbleBySlug(slug);
  if (!data) notFound();

  return (
    <Page>
      <Container>
        <Content {...data} />
      </Container>
    </Page>
  );
}
