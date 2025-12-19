import { notFound } from 'next/navigation';
import { FeaturedBadge } from '@/components/articles';
import { Bookmark } from '@/components/bookmark';
import { Container } from '@/components/container';
import { Like } from '@/components/like';
import { Link } from '@/components/link';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getArticles } from '@/lib/articles';
import { getPageMetadata } from '@/lib/utils';
import { getBookmarks } from '@/db/bookmarks';
import { getLikes } from '@/db/likes';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Blog',
    description:
      'Read articles and musings on programming, technology, and software development by Curious Programmer.',
    slug: '/blog',
    image: '/hero/blog.webp',
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
        <div className="max-w-sm md:max-w-3xl lg:max-w-5xl mx-auto px-5">
          {data
            .sort((a, b) => b.number - a.number)
            .map(({ slug, title, number, featured }) => (
              <div
                key={slug}
                className="px-4 border-b border-dashed flex justify-between items-center hover:bg-pink-600 hover:text-white"
              >
                <Link href={slug} className="py-4 block w-full">
                  #{number}. {title}
                </Link>
                <div className="flex items-center gap-2">
                  <FeaturedBadge featured={featured} />
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
