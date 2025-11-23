import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { CourseContent } from '@/components/content';
import { getCourseBySlug } from '@/lib/courses';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';

type Props = {
  params: {
    slug: string;
  };
};

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;

  const data = getCourseBySlug(slug);
  if (!data) notFound();

  return (
    <Page
      title={data.title}
      description={data.abstract ?? ''}
      slug={data.slug}
      image={data.cover}
      type="article"
    >
      <Hero
        image={data.cover}
        title={data.title}
        credit={data.credit}
        creditLink={data.creditLink}
        creditSource={data.creditSource}
      />
      <Container>
        <CourseContent {...data} />
      </Container>
    </Page>
  );
}
