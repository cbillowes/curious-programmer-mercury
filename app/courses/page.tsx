import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { Preview } from '@/components/preview';
import { getCourses } from '@/lib/courses';
import { notFound } from 'next/navigation';

export default async function CoursesPage() {
  const data = getCourses();
  if (!data) notFound();

  return (
    <Page
      title="Courses"
      description="Explore a range of courses relevant to software engineering."
      slug="/courses"
      image="/courses.webp"
      type="website"
    >
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
