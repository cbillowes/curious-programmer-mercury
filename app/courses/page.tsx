import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { Preview } from '@/components/preview';
import { getBookmarks } from '@/db/bookmark';
import { getCourses } from '@/lib/courses';
import { getPageMetadata } from '@/lib/utils';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Courses',
    description:
      'Explore a range of courses from Git to GCP to up your game in software engineering.',
    slug: '/courses',
    image: '/hero/courses.webp',
    type: 'website',
  });
}

export default async function CoursesPage() {
  const data = getCourses();
  if (!data) notFound();
  const bookmarks = await getBookmarks();

  return (
    <Page>
      <Container>
        <PageHeading>Courses</PageHeading>
        <ul>
          {data.map((item, index) => (
            <Preview
              key={index}
              index={index}
              data={item}
              bookmarks={bookmarks.map((b) => b.slug)}
            />
          ))}
        </ul>
      </Container>
    </Page>
  );
}
