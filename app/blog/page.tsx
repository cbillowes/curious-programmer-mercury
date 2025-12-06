import { Bookmark } from '@/components/bookmark';
import { Container } from '@/components/container';
import { Like } from '@/components/like';
import { Link } from '@/components/link';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getBookmarks } from '@/db/bookmark';
import { getLikes } from '@/db/likes';
import { getArticles } from '@/lib/articles';
import { getPageMetadata } from '@/lib/utils';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Blog',
    description:
      'Read articles and musings on programming, technology, and software development by Curious Programmer.',
    slug: '/blog',
    image: '/blog/blog.webp',
    type: 'website',
  });
}

export default async function BlogPage() {
  const data = getArticles();
  if (!data) notFound();
  const bookmarks = await getBookmarks();
  const likes = await getLikes();

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
                className="border-b border-dashed flex justify-between items-center hover:bg-pink-600 hover:text-white"
              >
                <Link href={slug} className="py-4 block w-full">
                  #{number}. {title}
                </Link>
                <div className="flex gap-2">
                  <Bookmark
                    bookmarks={bookmarks.map((b) => b.slug)}
                    slug={slug}
                  />
                  <Like likes={likes.map((l) => l.slug)} slug={slug} />
                </div>
              </div>
            ))}
        </div>
      </Container>
    </Page>
  );
}
