import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getByTag, prettifyTag } from '@/lib/tags';
import { Preview } from '@/components/preview';

type Props = {
  params: {
    tag: string;
  };
};

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const data = getByTag(tag);
  const description = `Delve into the world of ${prettifyTag(
    tag,
  )} with curated articles and insights.`;
  return (
    <Page
      title={prettifyTag(tag) ?? "Tag"}
      description={description}
      slug={tag}
      image="/tag.webp"
      type="website"
    >
      <Container>
        <PageHeading>{prettifyTag(tag)}</PageHeading>
        <ul>
          {data.map((item, index) => (
            <Preview key={index} index={index} data={item} />
          ))}
        </ul>
      </Container>
    </Page>
  );
}
