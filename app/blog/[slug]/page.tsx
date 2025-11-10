import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { allArticles } from '@/.content-collections/generated';

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  return (
    <Page>
      <Container>{slug}</Container>
    </Page>
  );
}
