import { notFound } from 'next/navigation';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { Link } from '@/components/link';
import { FeaturedBadge } from '@/components/articles';
import { Bookmark } from '@/components/bookmark';
import { Like } from '@/components/like';
import { getBookmarks } from '@/db/bookmarks';
import { getLikes } from '@/db/likes';
import { getScribbles } from '@/lib/scribbles';
import { getPageMetadata } from '@/lib/utils';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Scribbles',
    description:
      'Short snippets of thoughts and musings on programming and technology for software engineering.',
    slug: '/scribbles',
    image: '/hero/scribbles.webp',
    type: 'website',
  });
}

export default async function ScribblesPage() {
  const data = getScribbles();
  if (!data) notFound();
  const bookmarks = await getBookmarks();
  const likes = await getLikes();

  return (
    <div>
      <Page>
        <Container>
          <PageHeading>Scribbles</PageHeading>
          <div className="max-w-5xl mx-auto px-5">
            {data
              .sort((a, b) => b.date.getTime() - a.date.getTime())
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
          {/* <ul>
            {data.map((article, index) => (
              <Preview
                key={index}
                index={index}
                data={article}
                bookmarks={bookmarks.map((b) => b.slug)}
                likes={likes.map((l) => l.slug)}
              />
            ))}
          </ul> */}
        </Container>
      </Page>
    </div>
  );
}
