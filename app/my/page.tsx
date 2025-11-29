import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getBookmarks } from '@/db/bookmark';
import { getArticles } from '@/lib/articles';
import { getPageMetadata } from '@/lib/utils';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Dashboard',
    description:
      'The home to all your preferences and settings on Curious Programmer.',
    slug: '/my',
    image: '/blog.webp',
    type: 'website',
  });
}

export default async function MyPage() {
  const allArticles = getArticles();
  const bookmarks = await getBookmarks();
  const articles = allArticles.filter((article) =>
    bookmarks.some((bookmark) => bookmark.slug === article.slug),
  );
  return (
    <Page>
      <Container>
        <PageHeading>Dashboard</PageHeading>
        <Articles
          data={articles}
          bookmarks={bookmarks}
          filterOnChange={true}
          empty={<div>You have no bookmarks yet.</div>}
        />
      </Container>
    </Page>
  );
}
