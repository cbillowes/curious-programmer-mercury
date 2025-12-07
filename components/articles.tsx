'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { Tooltip } from 'flowbite-react';
import { Article, Course, Scribble } from '@/.content-collections/generated';
import { Ribbon } from '@/components/ribbon';
import { Link } from '@/components/link';
import { Thumbnail } from '@/components/thumbnail';
import { Metadata } from '@/components/metadata';
import { Bookmark } from '@/components/bookmark';
import { Type } from '@/components/type';
import { Like } from '@/components/like';
import { ImageContainer } from '@/components/image-container';
import { getCoursePageBySlug } from '@/lib/courses';
import { FaArrowRight, FaStar } from 'react-icons/fa6';

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
      setContent(
        (prev) =>
          prev.filter((content) => content.slug !== slug) as typeof prev,
      );
    }
  };

  return (
    <div className="max-w-5xl px-5 mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mt-6">
      {content.map((c) => {
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

        let courseTitle = '';
        if (type === 'page' && c.parent) {
          courseTitle = getCoursePageBySlug(slug)?.course?.title ?? '';
        }
        return (
          <article
            key={slug}
            className="relative mx-auto w-full bg-white rounded-lg shadow-md border border-gray-200 dark:border-gray-800 dark:bg-gray-800"
          >
            <Ribbon>#{number}</Ribbon>
            <NextLink href={slug ?? '#'}>
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
                  alt={title ?? 'Hero image'}
                  credit={credit}
                  creditLink={creditLink}
                  creditSource={creditSource}
                  featured={featured}
                  className="rounded-t-lg"
                />
              )}
            </NextLink>
            <div className="p-4">
              <h3 className="mt-2 mb-2 text-xl font-bold tracking-tighter text-gray-900 lg:text-2xl dark:text-white">
                <Link href={slug}>{title}</Link>
              </h3>
              {courseTitle && <h4 className="my-2 font-bold">{courseTitle}</h4>}
              <div className="flex items-center mb-3 space-x-3">
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
                    <Metadata
                      date={date}
                      timeToRead={timeToRead}
                      type="article"
                    />
                  </div>
                </div>
              </div>
              <p className="mb-3 text-gray-500 dark:text-gray-400">
                {abstract}
              </p>
              <div className="flex gap-2 items-center justify-start">
                <Bookmark
                  bookmarks={bookmarks}
                  slug={slug}
                  onChange={(added) =>
                    filterOnBookmarkChange && handleContentChange(added, slug)
                  }
                />
                <Like
                  likes={likes}
                  slug={slug}
                  onChange={(added) =>
                    filterOnLikeChange && handleContentChange(added, slug)
                  }
                />
                <Link
                  title={title}
                  href={slug}
                  className="inline-flex gap-2 items-center font-medium text-pink-600 hover:text-pink-800 dark:text-pink-500 hover:dark:text-pink-600 hover:no-underline"
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
