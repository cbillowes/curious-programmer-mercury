import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getCourses } from '@/lib/courses';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Courses | Curious Programmer`;
  return {
    title,
    openGraph: {
      title,
    },
    twitter: {
      card: 'summary_large_image',
      title,
    },
  };
}

export default async function CoursesPage() {
  const data = getCourses();
  if (!data) notFound();

  return (
    <Page>
      <Container>
        <PageHeading>Courses</PageHeading>
        <Articles data={data} />
      </Container>
    </Page>
  );
}
