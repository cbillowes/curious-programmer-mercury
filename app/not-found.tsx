import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getArticles } from '@/lib/articles';

export default async function NotFoundPage() {
  return (
    <Page>
      <Container>
        <PageHeading>Whoopsie!</PageHeading>
        <p className="text-center text-lg">
          Cannot find what you are looking for.
        </p>
        {
          <Articles
            articles={getArticles()
              .filter((a) => a.featured)
              .sort((a, b) => b.number - a.number)
              .slice(0, 9)}
          />
        }
      </Container>
    </Page>
  );
}
