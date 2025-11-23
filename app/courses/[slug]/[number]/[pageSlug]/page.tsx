import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { CoursePageContent } from '@/components/content';
import { getCoursePageBySlug } from '@/lib/courses';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';

type Props = {
  params: {
    slug: string;
    number: string;
    pageSlug: string;
  };
};

function getPageSlug(slug: string, number: string, pageSlug: string) {
  return `/courses/${slug}/${number.padStart(2, '0')}/${pageSlug}`;
}

export default async function CoursePagePage({ params }: Props) {
  const { slug, number, pageSlug } = await params;
  const data = getCoursePageBySlug(getPageSlug(slug, number, pageSlug));
  if (!data) notFound();

  return (
    <Page
      title={data.title}
      description={data.abstract ?? ''}
      slug={data.slug}
      image={data.cover ?? ''}
      type="article"
    >
      {data.cover && (
        <Hero
          image={data.cover}
          title={data.title}
          credit={data.course?.credit}
          creditLink={data.course?.creditLink}
          creditSource={data.course?.creditSource}
        />
      )}
      <Container>
        <CoursePageContent {...data} />
      </Container>
    </Page>
  );
}
