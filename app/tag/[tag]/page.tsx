import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { Preview } from '@/components/preview';
import { getByTag, prettifyTag } from '@/lib/tags';
import { getPageMetadata } from '@/lib/utils';
import { getBookmarks } from '@/db/bookmarks';
import { getLikes } from '@/db/likes';

type Props = {
  params: {
    tag: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  const description = `Delve into the world of ${prettifyTag(
    tag,
  )} with curated articles and insights.`;
  return getPageMetadata({
    title: prettifyTag(tag) ?? 'Tag',
    description,
    slug: `/tag/${tag}`,
    image: '/hero/tag.webp',
    type: 'website',
  });
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const data = getByTag(tag);
  const bookmarks = await getBookmarks();
  const likes = await getLikes();

  return (
    <Page>
      <Container>
        <PageHeading>{prettifyTag(tag)}</PageHeading>
        <ul>
          {data.map((item, index) => (
            <Preview
              key={index}
              index={index}
              data={item}
              bookmarks={bookmarks.map((b) => b.slug)}
              likes={likes.map((l) => l.slug)}
            />
          ))}
        </ul>
      </Container>
    </Page>
  );
}
