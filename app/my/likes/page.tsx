import { Article, Course, Scribble } from '@/.content-collections/generated';
import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Link } from '@/components/link';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { Type } from '@/components/type';
import { getBookmarks } from '@/db/bookmark';
import { getLikes } from '@/db/likes';
import { getContent } from '@/lib/content';
import { getPageMetadata } from '@/lib/utils';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'My Bookmarks',
    description:
      'The home to all your preferences and settings on Curious Programmer.',
    slug: '/my/bookmarks',
    image: '/hero/blog.webp',
    type: 'website',
  });
}

const sections = [
  {
    type: 'article' as const,
    href: '/blog',
    title: 'Blog',
    description: 'Read articles on programming, technology, and more.',
  },
  {
    type: 'scribble' as const,
    href: '/scribbles',
    title: 'Scribbles',
    description: 'Short thoughts and musings on various topics.',
  },
  {
    type: 'course' as const,
    href: '/courses',
    title: 'Courses',
    description: 'Learn new skills with our curated courses.',
  },
];

function EmptyContents() {
  return (
    <div>
      <p className="text-center mb-4">
        Your likes are empty. Would you like to explore some content?
      </p>
    </div>
  );
}

export default async function MyBookmarksPage() {
  const allContent = getContent();
  const bookmarks = await getBookmarks();
  const likes = await getLikes();
  const content = likes.map((like) => {
    return allContent.find((content) => content.slug === like.slug);
  }) as Article[] | Scribble[] | Course[];

  return (
    <Page>
      <Container>
        <PageHeading>My Likes</PageHeading>
        <Articles
          data={content}
          bookmarks={bookmarks.map((b) => b.slug)}
          likes={likes.map((b) => b.slug)}
          filterOnLikeChange={true}
          showType={true}
          empty={<EmptyContents />}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 flex gap-4"
            >
              <Type type={section.type} showType={false} />
              <div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {section.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Page>
  );
}
