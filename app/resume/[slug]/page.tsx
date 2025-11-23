import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { ResumeContent } from '@/components/content';
import { getResumeBySlug } from '@/lib/resume';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export default async function ResumePage({ params }: Props) {
  const { slug } = await params;

  const data = getResumeBySlug(slug);
  if (!data) {
    notFound();
  }

  return (
    <Page
      title={data.resume?.company ?? data.resume?.name ?? 'Resume'}
      description={data.resume?.summary ?? ''}
      slug={data.slug}
      image={data.share}
      type="article"
    >
      <Container>
        <ResumeContent {...data} />
      </Container>
    </Page>
  );
}
