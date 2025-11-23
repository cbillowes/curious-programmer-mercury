import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getScribbles } from '@/lib/scribbles';
import { getMetadata } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Scribbles | Curious Programmer`;
  const description =
    'Short snippets of thoughts and musings on programming and technology.';
  return getMetadata(title, description, '/scribbles.webp');
}

export default async function ScribblesPage() {
  const data = getScribbles();
  if (!data) notFound();

  return (
    <Page slug="/scribbles">
      <Container>
        <PageHeading>Scribbles</PageHeading>
        <Articles data={data} />
      </Container>
    </Page>
  );
}
