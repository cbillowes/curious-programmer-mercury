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

export default async function ScribblePage({ params }: Props) {
  const { slug } = await params;

  const data = getScribbleBySlug(slug);
  if (!data) notFound();

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
        <ScribbleContent {...data} />
      </Container>
    </Page>
  );
}
