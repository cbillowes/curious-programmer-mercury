import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getBookmarks } from '@/db/bookmark';
import { getScribbles } from '@/lib/scribbles';
import { getPageMetadata } from '@/lib/utils';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Scribbles',
    description:
      'Short snippets of thoughts and musings on programming and technology for software engineering.',
    slug: '/scribbles',
    image: '/scribbles.webp',
    type: 'website',
  });
}

export default async function ScribblesPage() {
  const data = getScribbles();
  if (!data) notFound();
  const bookmarks = await getBookmarks();

  return (
    <div>
      <Page>
        <Container>
          <PageHeading>Scribbles</PageHeading>
          <Articles data={data} bookmarks={bookmarks} />
        </Container>
      </Page>
    </div>
  );
}
