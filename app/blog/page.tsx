import { Articles } from '@/components/articles';
import { Container } from '@/components/container';
import { Link } from '@/components/link';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getArticles } from '@/lib/articles';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Blog | Curious Programmer`;
  return {
    title,
    openGraph: {
      title,
    },
    twitter: {
      card: 'summary_large_image',
      title,
    },
  };
}

export default async function BlogPage() {
  const data = getArticles();
  if (!data) notFound();

  return (
    <Page>
      <Container>
        <PageHeading>Blog</PageHeading>
        <div className="max-w-3xl mx-auto">
          {data
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map(({ slug, title, number }) => (
              <div key={slug} className="border-b border-dashed">
                <Link
                  href={slug}
                  className="py-4 block w-full hover:bg-pink-600 hover:text-white"
                >
                  #{number}. {title}
                </Link>
              </div>
            ))}
        </div>
      </Container>
    </Page>
  );
}
