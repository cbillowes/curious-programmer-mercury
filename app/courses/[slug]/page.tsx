import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { CourseContent } from '@/components/content';
import { getCourseBySlug } from '@/lib/courses';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';
import { getPageMetadata } from '@/lib/utils';
import { getBookmarks } from '@/db/bookmark';
import { getLikes } from '@/db/likes';
import { stackServerApp } from '@/stack/server';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = getCourseBySlug(slug);
  if (data) {
    return getPageMetadata({
      title: data.title,
      description: data.abstract ?? '',
      slug: data.slug,
      image: data.cover,
      type: 'article',
    });
  }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;

  const data = getCourseBySlug(slug);
  if (!data) notFound();
  const bookmarks = await getBookmarks();
  const likes = await getLikes();
  const user = await stackServerApp.getUser();

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
        <CourseContent
          course={data}
          bookmarks={bookmarks.map((b) => b.slug)}
          likes={likes.map((l) => l.slug)}
          isAuthenticated={user !== null}
        />
      </Container>
    </Page>
  );
}
