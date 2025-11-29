import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Link } from '@/components/link';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getBookmarks } from '@/db/bookmark';
import { getArticles } from '@/lib/articles';
import { getPageMetadata } from '@/lib/utils';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'My Bookmarks',
    description:
      'The home to all your preferences and settings on Curious Programmer.',
    slug: '/my/bookmarks',
    image: '/blog.webp',
    type: 'website',
  });
}

const sections = [
  {
    type: 'article',
    href: '/blog',
    title: 'Blog',
    description: 'Read articles on programming, technology, and more.',
  },
  {
    type: 'scribbles',
    href: '/scribbles',
    title: 'Scribbles',
    description: 'Short thoughts and musings on various topics.',
  },
  {
    type: 'course',
    href: '/courses',
    title: 'Courses',
    description: 'Learn new skills with our curated courses.',
  },
];

function EmptyContents() {
  return (
    <div>
      <p className="text-center mb-4">
        Your bookmarks are empty. Would you like to explore some content?
      </p>
      <div className="flex gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {section.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function MyBookmarksPage() {
  const allArticles = getArticles();
  const bookmarks = await getBookmarks();
  const articles = allArticles.filter((article) =>
    bookmarks.some((bookmark) => bookmark.slug === article.slug),
  );
  return (
    <Page>
      <Container>
        <PageHeading>Bookmarks</PageHeading>
        <Articles
          data={articles}
          bookmarks={bookmarks}
          filterOnChange={true}
          empty={<EmptyContents />}
        />
      </Container>
    </Page>
  );
}
