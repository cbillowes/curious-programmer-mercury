import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getTags } from '@/lib/tags';

export default async function TagsPage() {
  const tags = getTags();
  return (
    <Page
      title="Tags"
      description="I write about technical and soft skills. Browse content using the tags associated to the content on my blog."
      slug="/tags"
      image="/tag.webp"
      type="website"
    >
      <Container>
        <PageHeading>Tags</PageHeading>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          {tags.map((tag) => (
            <div key={tag.tag} className="mb-1">
              <a
                href={`/tag/${tag.slug}`}
                className="bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-pink-600 px-2 py-1 transition-colors flex items-center gap-1"
              >
                {tag.tag}
                <div className="bg-black/60 rounded-full size-6 text-xs flex items-center justify-center">
                  {tag.count}
                </div>
              </a>
            </div>
          ))}
        </div>
      </Container>
    </Page>
  );
}
