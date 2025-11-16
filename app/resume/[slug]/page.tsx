import { Metadata } from 'next';
import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { Preview } from '@/components/preview';
import { PageHeading } from '@/components/page-heading';
import { Content, ResumeContent } from '@/components/content';
import { getResumeBySlug } from '@/lib/resume';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const data = getResumeBySlug(slug);
  const { resume } = data || {};

  if (!data) {
    return {
      title: 'Resume Item Not Found | Curious Programmer',
      description: 'The article you are looking for does not exist.',
    };
  }

  const title = `${resume?.company ?? resume?.name} | Curious Programmer`;

  return {
    title,
    description: resume?.summary,
    openGraph: {
      title,
      description: resume?.summary,
      images: [data.share],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: resume?.summary,
      images: [data.share],
    },
  };
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
