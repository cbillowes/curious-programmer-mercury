import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getBookmarks } from '@/db/bookmarks';
import { getLikes } from '@/db/likes';
import { getArticles } from '@/lib/articles';
import { getPageMetadata } from '@/lib/utils';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Not Found',
    description:
      'The page you are looking for could not be found. Explore featured articles instead.',
    slug: '/404',
    image: '/hero/home.png',
    type: 'website',
  });
}

export default async function NotFoundPage() {
  const bookmarks = await getBookmarks();
  const likes = await getLikes();
  return (
    <Page>
      <Container>
        <PageHeading>Whoopsie!</PageHeading>
        <p className="text-center text-lg">
          Cannot find what you are looking for.
        </p>
        {
          <Articles
            bookmarks={bookmarks.map((b) => b.slug)}
            likes={likes.map((l) => l.slug)}
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
