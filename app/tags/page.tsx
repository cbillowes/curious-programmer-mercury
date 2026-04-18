import { getCategories, getSubCategories, getTagsBySubCategory } from "@/data/tags";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";

import { getPageMetadata } from "@/lib/utils";
import { Container } from "@/components/container";
import { Page } from "@/components/page";
import { PageHeading } from "@/components/page-heading";

export async function generateMetadata() {
  return getPageMetadata({
    title: "Tags",
    description:
      "I write about technical and soft skills. Browse content using the tags associated to the content on my blog.",
    slug: "/tags",
    image: "/hero/tag.webp",
    type: "website",
  });
}

export default async function TagsPage() {
  const categories = getCategories();

  return (
    <Page>
      <Container>
        <PageHeading>Tags</PageHeading>
        <p className="mx-auto mb-4 max-w-3xl text-center text-sm opacity-80">
          I write about a variety of topics related to software development, including technical and
          soft skills. To help you find content that interests you, I use tags to categorize my
          articles. Browse the tags below to discover articles on specific topics.
        </p>
        <div className="mx-auto max-w-sm px-4 py-8 sm:px-32 md:max-w-3xl lg:max-w-5xl xl:px-4">
          <Accordion alwaysOpen={true}>
            {categories.map((category) => (
              <AccordionPanel key={category}>
                <AccordionTitle className="font-bold">{category}</AccordionTitle>
                <AccordionContent>
                  {getSubCategories(category).map((subCategory) => (
                    <div key={subCategory.name} className="mt-4 mb-6">
                      <h3 className="font-semibold">{subCategory.name}</h3>
                      <p className="mb-2 text-sm opacity-80">{subCategory.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {getTagsBySubCategory(subCategory.name).map((tag) => (
                          <a
                            key={tag.tag}
                            href={`/tag/${tag.slug}`}
                            className="flex items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-pink-600"
                          >
                            {tag.tag}
                            <div className="flex size-6 items-center justify-center rounded-full bg-black/60 text-xs">
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
