import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { ResumeContent } from '@/components/content';
import { getResumeBySlug } from '@/lib/resume';
import { notFound } from 'next/navigation';
import { getPageMetadata } from '@/lib/utils';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = getResumeBySlug(slug);
  if (data) {
    return getPageMetadata({
      title: data.resume?.company ?? data.resume?.name ?? 'Resume',
      description: data.resume?.summary ?? '',
      slug: data.slug,
      image: data.share,
      type: 'article',
    });
  }
}

export default async function ResumePage({ params }: Props) {
  const { slug } = await params;

  const data = getResumeBySlug(slug);
  if (!data) {
    notFound();
  }

  return (
    <Page>
      <Container>
        <ResumeContent {...data} />
      </Container>
    </Page>
  );
}
