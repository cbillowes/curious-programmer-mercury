import { Metadata } from 'next';
import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { CoursePageContent } from '@/components/content';
import { getCoursePageBySlug } from '@/lib/courses';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';
import { getMetadata } from '@/lib/utils';

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

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { slug, number, pageSlug } = await params;
  const data = getCoursePageBySlug(getPageSlug(slug, number, pageSlug));
  if (data) {
    const title = `${data.title} | Curious Programmer`;
    const description = data.abstract ?? '';
    return getMetadata(title, description, data.cover ?? '');
  }
}

export default async function CoursePagePage({ params }: Props) {
  const { slug, number, pageSlug } = await params;
  const data = getCoursePageBySlug(getPageSlug(slug, number, pageSlug));
  if (!data) notFound();

  return (
    <Page>
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
