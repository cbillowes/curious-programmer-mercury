import { notFound } from "next/navigation";
import { getBookmarks } from "@/db/bookmarks";
import { getLikes } from "@/db/likes";

import { getArticles } from "@/lib/articles";
import { getPageMetadata } from "@/lib/utils";
import { FeaturedBadge } from "@/components/articles";
import { Bookmark } from "@/components/bookmark";
import { Container } from "@/components/container";
import { Like } from "@/components/like";
import { Link } from "@/components/link";
import { Page } from "@/components/page";
import { PageHeading } from "@/components/page-heading";

export async function generateMetadata() {
  return getPageMetadata({
    title: "Blog",
    description:
      "Read articles and musings on programming, technology, and software development by Curious Programmer.",
    slug: "/blog",
    image: "/hero/blog.webp",
    type: "website",
  });
}

export default async function BlogPage() {
  const data = getArticles();
  if (!data) notFound();
  const bookmarks = await getBookmarks();
  const likes = await getLikes();

  return (
    <Page>
      <Container>
        <PageHeading>Blog</PageHeading>
        <div className="mx-auto max-w-sm px-5 md:max-w-3xl lg:max-w-5xl">
          {data
            .sort((a, b) => b.number - a.number)
            .map(({ slug, title, number, featured }) => (
              <div
                key={slug}
                className="flex items-center justify-between border-b border-dashed px-4 hover:bg-pink-600 hover:text-white"
              >
                <Link href={slug} className="block w-full py-4">
                  #{number}. {title}
                </Link>
                <div className="flex items-center gap-2">
                  <FeaturedBadge featured={featured} />
                  <Bookmark bookmarks={bookmarks.map((b) => b.slug)} slug={slug} />
                  <Like likes={likes.map((l) => l.slug)} slug={slug} />
                </div>
              </div>
            ))}
        </div>
      </Container>
    </Page>
  );
}
