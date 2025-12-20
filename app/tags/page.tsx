import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from 'flowbite-react';
import { Container } from '@/components/container';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getCategories, getSubCategories, getTagsBySubCategory } from '@/data/tags';
import { getTags } from '@/lib/tags';
import { getPageMetadata } from '@/lib/utils';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Tags',
    description:
      'I write about technical and soft skills. Browse content using the tags associated to the content on my blog.',
    slug: '/tags',
    image: '/hero/tag.webp',
    type: 'website',
  });
}

export default async function TagsPage() {
  const tags = getTags();
  const categories = getCategories();

  return (
    <Page>
      <Container>
        <PageHeading>Tags</PageHeading>
        <div className="px-4 sm:px-32 max-w-sm md:max-w-3xl lg:max-w-5xl xl:px-4 py-8 mx-auto">
          <Accordion alwaysOpen={true}>
            {categories.map((category) => (
              <AccordionPanel key={category}>
                <AccordionTitle>{category}</AccordionTitle>
                <AccordionContent>
                  {getSubCategories(category).map((subCategory) => (
                    <div key={subCategory.name} className="mb-6 mt-4">
                      <h3 className="font-semibold">{subCategory.name}</h3>
                      <p className="text-sm opacity-80 mb-2">
                        {subCategory.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {getTagsBySubCategory(subCategory.name).map((tag) => (
                          <a
                            key={tag.tag}
                            href={`/tag/${tag.slug}`}
                            className="bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-pink-600 px-2 py-1 transition-colors flex items-center gap-1"
                          >
                            {tag.tag}
                            <div className="bg-black/60 rounded-full size-6 text-xs flex items-center justify-center">
                              {tag.count}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionPanel>
            ))}
          </Accordion>
        </div>
      </Container>
    </Page>
  );
}
