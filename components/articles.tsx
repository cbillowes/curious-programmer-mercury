"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Article, Course, Scribble } from "@/.content-collections/generated";
import { Tooltip } from "flowbite-react";
import { FaArrowRight, FaStar } from "react-icons/fa6";

import { getCoursePageBySlug } from "@/lib/courses";
import { Bookmark } from "@/components/bookmark";
import { ImageContainer } from "@/components/image-container";
import { Like } from "@/components/like";
import { Link } from "@/components/link";
import { Metadata } from "@/components/metadata";
import { Ribbon } from "@/components/ribbon";
import { Thumbnail } from "@/components/thumbnail";
import { Type } from "@/components/type";

export function Articles({
  data,
  bookmarks,
  likes,
  filterOnBookmarkChange,
  filterOnLikeChange,
  showType,
  empty,
}: {
  data: Article[] | Scribble[] | Course[];
  bookmarks: string[];
  likes: string[];
  filterOnBookmarkChange?: boolean;
  filterOnLikeChange?: boolean;
  showType?: boolean;
  empty?: React.ReactNode;
}) {
  const [content, setContent] = useState(data);

  if (content.length === 0) {
    return empty ?? <p>No content was found.</p>;
  }

  const handleContentChange = (added: boolean, slug: string) => {
    if (!added) {
      setContent((prev) => prev.filter((content) => content.slug !== slug) as typeof prev);
    }
  };

  return (
    <div className="mx-auto mt-6 grid max-w-sm grid-cols-1 gap-4 md:max-w-3xl md:grid-cols-2 lg:max-w-5xl xl:grid-cols-3">
      {content.filter(c => c).map((c) => {
        const {
          slug,
          title,
          date,
          number,
          timeToRead,
          cover,
          abstract,
          type,
          credit,
          creditLink,
          creditSource,
          featured,
        } = c;
        if (!slug) return null;

        let courseTitle = "";
        if (type === "page" && c.parent) {
          courseTitle = getCoursePageBySlug(slug)?.course?.title ?? "";
        }
        return (
          <article
            key={slug}
            className="relative mx-auto w-full rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-800"
          >
            <Ribbon>#{number}</Ribbon>
            <NextLink href={slug ?? "#"}>
              {showType && (
                <div className="absolute top-3 left-3 z-10">
                  <Type type={type} showType={false} className="scale-75" />
                </div>
              )}
              {cover && (
                <Thumbnail
                  width={320}
                  height={200}
                  src={cover}
                  alt={title ?? "Hero image"}
                  credit={credit}
                  creditLink={creditLink}
                  creditSource={creditSource}
                  featured={featured}
                  className="rounded-t-lg"
                />
              )}
            </NextLink>
            <div className="p-4">
              <h3 className="mt-2 mb-4 text-xl font-bold tracking-tighter text-gray-900 lg:text-2xl dark:text-white">
                <Link href={slug}>{title}</Link>
              </h3>
              {courseTitle && <h4 className="my-2 font-bold">{courseTitle}</h4>}
              <div className="flex items-center space-x-3">
                <ImageContainer
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white"
                  src="/headshot.webp"
                  alt="Clarice Bouwer"
                  priority={true}
                  fill={false}
                />
                <div className="font-medium text-black dark:text-white">
                  <div>Clarice Bouwer</div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <Metadata date={date} timeToRead={timeToRead} type="article" />
                  </div>
                </div>
              </div>
              <p className="mb-3 text-gray-500 dark:text-gray-400">
                {abstract.length > 160 ? abstract.slice(0, 157) + "..." : abstract}
              </p>
              <div className="flex items-center justify-start gap-2">
                <Bookmark
                  bookmarks={bookmarks}
                  slug={slug}
                  onChange={(added) => filterOnBookmarkChange && handleContentChange(added, slug)}
                />
                <Like
                  likes={likes}
                  slug={slug}
                  onChange={(added) => filterOnLikeChange && handleContentChange(added, slug)}
                />
                <Link
                  role="button"
                  title={title}
                  href={slug}
                  className="inline-flex items-center gap-2 font-medium text-pink-600 hover:text-pink-800 hover:no-underline dark:text-pink-500 hover:dark:text-pink-600"
                >
                  Read more
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function FeaturedBadge({ featured }: { featured?: boolean | null }) {
  if (!featured) return null;
  return (
    <Tooltip content="Featured Article">
      <FaStar className="text-yellow-400" />
    </Tooltip>
  );
}
