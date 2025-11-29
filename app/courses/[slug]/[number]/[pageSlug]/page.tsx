import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { CoursePageContent } from '@/components/content';
import { getCoursePageBySlug } from '@/lib/courses';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';
import { getPageMetadata } from '@/lib/utils';
import { getBookmarks } from '@/db/bookmark';
import { getLikes } from '@/db/likes';

function getPageSlug(slug: string, number: string, pageSlug: string) {
  return `/courses/${slug}/${number.padStart(2, '0')}/${pageSlug}`;
}

type Props = {
  params: {
    slug: string;
    number: string;
    pageSlug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { slug, number, pageSlug } = await params;
  const data = getCoursePageBySlug(getPageSlug(slug, number, pageSlug));
  if (data) {
    return getPageMetadata({
      title: data.title,
      description: data.abstract ?? '',
      slug: data.slug,
      image: data.cover ?? '',
      date: data.date,
      type: 'article',
    });
  }
}

export default async function CoursePagePage({ params }: Props) {
  const { slug, number, pageSlug } = await params;
  const data = getCoursePageBySlug(getPageSlug(slug, number, pageSlug));
  if (!data) notFound();
  const bookmarks = await getBookmarks();
  const likes = await getLikes();

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
        <CoursePageContent
          coursePages={data}
          bookmarks={bookmarks.map((b) => b.slug)}
          likes={likes.map((l) => l.slug)}
        />
      </Container>
    </Page>
  );
}
