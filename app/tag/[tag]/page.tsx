import { Metadata } from 'next';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getByTag, prettifyTag } from '@/lib/tags';
import { Preview } from '@/components/preview';
import { getMetadata } from '@/lib/utils';

type Props = {
  params: {
    tag: string;
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { tag } = await params;

  const title = `${prettifyTag(tag)} | Curious Programmer`;
  const description = `Content tagged with ${prettifyTag(tag)}.`;
  return getMetadata(title, description, `/tag.webp`);
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const data = getByTag(tag);
  return (
    <Page slug={tag}>
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
