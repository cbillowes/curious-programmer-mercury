import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getPageMetadata } from '@/lib/utils';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Profile',
    description: 'Your personal profile and settings on Curious Programmer.',
    slug: '/my/profile',
    image: '/blog.webp',
    type: 'website',
  });
}

export default async function MyProfile() {
  return (
    <Page>
      <Container>
        <PageHeading>My Profile</PageHeading>
      </Container>
    </Page>
  );
}
