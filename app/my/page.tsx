import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getPageMetadata } from '@/lib/utils';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Dashboard',
    description:
      'The home to all your preferences and settings on Curious Programmer.',
    slug: '/my',
    image: '/blog.webp',
    type: 'website',
  });
}

export default async function MyPage() {
  return (
    <Page>
      <Container>
        <PageHeading>Dashboard</PageHeading>
      </Container>
    </Page>
  );
}
