import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { PageHeading } from '@/components/page-heading';

export default async function ArticleListingPage() {
  return (
    <Page>
      <Container>
        <PageHeading>Articles</PageHeading>
      </Container>
    </Page>
  );
}
