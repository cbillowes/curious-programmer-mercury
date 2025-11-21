import Image from 'next/image';
import { Article } from '@/lib/articles';
import { Ribbon } from '@/components/ribbon';
import { Link } from '@/components/link';
import { Thumbnail } from '@/components/thumbnail';
import { Metadata } from '@/components/metadata';
import { FaArrowRight } from 'react-icons/fa6';
import { Scribble } from '@/lib/scribbles';
import { Course } from '@/lib/courses';

export function Articles({
  data,
}: {
  data: Article[] | Scribble[] | Course[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mt-6">
      {data.map(
        ({
          slug,
          title,
          date,
          number,
          timeToRead,
          cover,
          abstract,
          credit,
          creditLink,
          creditSource,
        }) => (
          <article
            key={slug}
            className="relative p-4 mx-auto w-full bg-white rounded-lg shadow-md border border-gray-200 dark:border-gray-800 dark:bg-gray-800"
          >
            <Ribbon>#{number}</Ribbon>
            <Link href={slug}>
              {cover && (
                <Thumbnail
                  src={cover}
                  alt={title}
                  width={600}
                  height={150}
                  credit={credit}
                  creditLink={creditLink}
                  creditSource={creditSource}
                />
              )}
            </Link>
            <h3 className="mt-2 mb-2 text-xl font-bold tracking-tighter text-gray-900 lg:text-2xl dark:text-white">
              <Link href={slug}>{title}</Link>
            </h3>
            <div className="flex items-center mb-3 space-x-3">
              <Image
                className="w-8 h-8 rounded-full"
                src="/headshot.webp"
                alt="Clarice Bouwer"
                width={32}
                height={32}
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
            <p className="mb-3 text-gray-500 dark:text-gray-400">{abstract}</p>
            <Link
              href={slug}
              className="inline-flex gap-2 items-center font-medium text-pink-600 hover:text-pink-800 dark:text-pink-500 hover:dark:text-pink-600 hover:no-underline"
            >
              Read more
              <FaArrowRight />
            </Link>
          </article>
        ),
      )}
    </div>
  );
}
