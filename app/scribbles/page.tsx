import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getScribbles } from '@/lib/scribbles';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Scribbles | Curious Programmer`;
  return {
    title,
    openGraph: {
      title,
    },
    twitter: {
      card: 'summary_large_image',
      title,
    },
  };
}

export default async function ScribblesPage() {
  const data = getScribbles();
  if (!data) notFound();

  return (
    <Page>
      <Container>
        <PageHeading>Scribbles</PageHeading>
        <Articles articles={data} />
      </Container>
    </Page>
  );
}
