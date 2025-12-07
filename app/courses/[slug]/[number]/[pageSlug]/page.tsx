import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { CoursePageContent } from '@/components/content';
import { getCourseBySlug, getCoursePageBySlug } from '@/lib/courses';
import { notFound, redirect } from 'next/navigation';
import { Hero } from '@/components/hero';
import { getPageMetadata } from '@/lib/utils';
import { getBookmarks } from '@/db/bookmarks';
import { getLikes } from '@/db/likes';
import { headers } from 'next/headers';
import { stackServerApp } from '@/stack/server';

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
  // Hide page behind authentication
  const headersList = await headers();
  const urlString = headersList.get('x-url');
  const user = await stackServerApp.getUser();
  if (!user) {
    const currentPath = urlString ? new URL(urlString).pathname : '/';
    const encodedPath = encodeURIComponent(currentPath);
    const returnUrl = `${stackServerApp.urls.signIn}?after_auth_return_to=${encodedPath}`;
    return redirect(returnUrl);
  }

  const { slug, number, pageSlug } = await params;
  const data = getCoursePageBySlug(getPageSlug(slug, number, pageSlug));
  if (!data) notFound();
  const course = getCourseBySlug(slug);
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
          coursePage={data}
          course={course!}
          bookmarks={bookmarks.map((b) => b.slug)}
          likes={likes.map((l) => l.slug)}
        />
      </Container>
    </Page>
  );
}
