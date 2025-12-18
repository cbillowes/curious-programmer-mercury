import { redirect } from 'next/navigation';

type Props = {
  params: {
    slug: string;
    number: string;
    pageSlug: string;
  };
};

export default async function CoursePagePage({ params }: Props) {
  const { slug, number, pageSlug } = await params;
  return redirect(
    `/courses/${slug}/${number}/${pageSlug}`,
  );
}
