import { redirect } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  return redirect(`/courses/${slug}`);
}
