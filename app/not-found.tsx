import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getBookmarks } from '@/db/bookmark';
import { getArticles } from '@/lib/articles';
import { getPageMetadata } from '@/lib/utils';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Not Found',
    description:
      'The page you are looking for could not be found. Explore featured articles instead.',
    slug: '/404',
    image: '/home.webp',
    type: 'website',
  });
}

export default async function NotFoundPage() {
  const bookmarks = await getBookmarks();
  return (
    <Page>
      <Container>
        <PageHeading>Whoopsie!</PageHeading>
        <p className="text-center text-lg">
          Cannot find what you are looking for.
        </p>
        {
          <Articles
            bookmarks={bookmarks}
            data={getArticles()
              .filter((a) => a.featured)
              .sort((a, b) => b.number - a.number)
              .slice(0, 9)}
          />
        }
      </Container>
    </Page>
  );
}
