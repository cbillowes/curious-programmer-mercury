import { Bookmark } from '@/components/bookmark';
import { Container } from '@/components/container';
import { Link } from '@/components/link';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getBookmarks } from '@/db/bookmark';
import { getArticles } from '@/lib/articles';
import { getPageMetadata } from '@/lib/utils';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Blog',
    description:
      'Read articles and musings on programming, technology, and software development by Curious Programmer.',
    slug: '/blog',
    image: '/blog.webp',
    type: 'website',
  });
}

export default async function BlogPage() {
  const data = getArticles();
  if (!data) notFound();
  const bookmarks = await getBookmarks();

  return (
    <Page>
      <Container>
        <PageHeading>Blog</PageHeading>
        <div className="max-w-3xl mx-auto">
          {data
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map(({ slug, title, number }) => (
              <div
                key={slug}
                className="border-b border-dashed flex justify-between items-center"
              >
                <Link
                  href={slug}
                  className="py-4 block w-full hover:bg-pink-600 hover:text-white"
                >
                  #{number}. {title}
                </Link>
                <Bookmark
                  bookmarks={bookmarks.map((b) => b.slug)}
                  slug={slug}
                />
              </div>
            ))}
        </div>
      </Container>
    </Page>
  );
}
