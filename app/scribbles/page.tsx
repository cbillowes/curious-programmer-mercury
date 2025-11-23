import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getScribbles } from '@/lib/scribbles';
import { notFound } from 'next/navigation';

export default async function ScribblesPage() {
  const data = getScribbles();
  if (!data) notFound();

  return (
    <Page
      title="Scribbles"
      description="Short snippets of thoughts and musings on programming and technology."
      slug="/scribbles"
      image="/scribbles.webp"
      type="website"
    >
      <Container>
        <PageHeading>Scribbles</PageHeading>
        <Articles data={data} />
      </Container>
    </Page>
  );
}
