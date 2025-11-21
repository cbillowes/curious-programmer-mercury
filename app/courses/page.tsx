import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { Preview } from '@/components/preview';
import { getCourses } from '@/lib/courses';
import { getMetadata } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Courses | Curious Programmer`;
  const description = 'Explore a range of programming courses.';
  return getMetadata(title, description, '/courses.webp');
}

export default async function CoursesPage() {
  const data = getCourses();
  if (!data) notFound();

  return (
    <Page>
      <Container>
        <PageHeading>Courses</PageHeading>
        <ul>
          {data.map((item, index) => (
            <Preview key={index} index={index} data={item} />
          ))}
        </ul>
      </Container>
    </Page>
  );
}
