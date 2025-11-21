import { Metadata } from 'next';
import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { getScribbleBySlug } from '@/lib/scribbles';
import { ScribbleContent } from '@/components/content';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { slug } = await params;

  const data = getScribbleBySlug(slug);
  if (data) {
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
}

export default async function ScribblePage({ params }: Props) {
  const { slug } = await params;

  const data = getScribbleBySlug(slug);
  if (!data) notFound();

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
        <ScribbleContent {...data} />
      </Container>
    </Page>
  );
}
