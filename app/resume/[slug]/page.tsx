import { Metadata } from 'next';
import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { ResumeContent } from '@/components/content';
import { getResumeBySlug } from '@/lib/resume';
import { notFound } from 'next/navigation';
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

  const data = getResumeBySlug(slug);
  const { resume } = data || {};

  if (data) {
    const title = `${resume?.company ?? resume?.name} | Curious Programmer`;
    const description = resume?.summary ?? '';
    return getMetadata(title, description, data.share);
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
