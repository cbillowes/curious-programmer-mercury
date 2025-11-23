import { Container } from '@/components/container';
import { Link } from '@/components/link';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getArticles } from '@/lib/articles';
import { notFound } from 'next/navigation';

export default async function BlogPage() {
  const data = getArticles();
  if (!data) notFound();

  return (
    <Page
      title="Blog"
      description="Read articles and musings on programming, technology, and software development by Curious Programmer."
      slug="/blog"
      image="/blog.webp"
      type="website"
    >
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
