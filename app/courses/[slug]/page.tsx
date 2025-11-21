import { Metadata } from 'next';
import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { CourseContent } from '@/components/content';
import { getCourseBySlug } from '@/lib/courses';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';
import { getMetadata } from '@/lib/utils';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { slug } = await params;

  const data = getCourseBySlug(slug);
  if (data) {
    const title = `${data.title} | Curious Programmer`;
    const description = data.abstract ?? '';
    return getMetadata(title, description, data.cover ?? '');
  }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;

  const data = getCourseBySlug(slug);
  if (!data) notFound();

  return (
    <Page>
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
