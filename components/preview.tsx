import { Badge } from 'flowbite-react';
import { Article, Scribble, Course } from '@/.content-collections/generated';
import { Link } from '@/components/link';
import { Metadata } from '@/components/metadata';
import { Ribbon } from '@/components/ribbon';
import { Thumbnail } from '@/components/thumbnail';
import { Bookmark } from '@/components/bookmark';
import { Type } from '@/components/type';
import { ImageContainer } from '@/components/image-container';
import { cn, slugifyTag } from '@/lib/utils';

export function Preview({
  index,
  data,
  bookmarks,
}: {
  index: number;
  data: Article | Scribble | Course;
  bookmarks: string[];
}) {
  const isEven = index % 2 === 0;
  const { title, slug, date, abstract, tags, number, timeToRead, cover, type } =
    data;
  return (
    <section
      key={index}
      className={cn(
        'relative mx-auto max-w-full md:w-6/12 xl:w-screen md:mt-12 xl:mb-16 p-5 flex justify-center flex-col-reverse',
        isEven ? 'xl:flex-row-reverse' : 'xl:flex-row',
      )}
    >
      <div
        className={cn(
          `dark:border-gray-600 border-gray-300 border-none xl:border-dashed xl:w-1/2 xl:mx-8`,
          isEven
            ? 'xl:text-left xl:border-l xl:pl-8'
            : 'xl:text-right xl:border-r xl:pr-8',
        )}
      >
        <Type
          type={type}
          className={cn(
            'hidden xl:inline-block',
            isEven
              ? 'xl:text-left xl:items-start'
              : 'xl:text-right xl:items-end',
          )}
        />
        <h2
          className={cn(
            'text-2xl mt-8 xl:mt-0 md:text-4xl font-bold tracking-tighter',
            'hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r ',
            type === 'scribble' && 'hover:to-green-600 hover:from-blue-600',
            type === 'article' && 'hover:to-blue-600 hover:from-pink-600',
            type === 'course' && 'hover:to-red-600 hover:from-violet-600',
          )}
        >
          <Link href={slug} title={title}>
            {title}
          </Link>
        </h2>
        <div className="leading-loose mb-4">
          <div
            className={cn(
              'flex items-center mb-3 space-x-2',
              isEven ? 'xl:justify-start' : 'xl:flex-row-reverse',
            )}
          >
            <ImageContainer
              width={32}
              height={32}
              className={cn(
                'rounded-full border-2 border-white',
                isEven ? 'xl:mr-2' : 'xl:ml-4',
              )}
              src="/headshot.webp"
              alt="Clarice Bouwer"
              priority={true}
              fill={true}
            />
            <div className="font-medium dark:text-white">
              <div>Clarice Bouwer</div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <Metadata date={date} timeToRead={timeToRead} type={type} />
              </div>
            </div>
          </div>
          <p
            className={cn(
              'mt-2 text-xl font-light',
              isEven ? 'xl:text-left' : 'xl:text-right',
            )}
          >
            {abstract}
          </p>
        </div>
        <div
          className={`flex items-center flex-wrap gap-2 ${
            isEven ? 'xl:flex-row' : 'xl:flex-row-reverse'
          }`}
        >
          {slug && <Bookmark bookmarks={bookmarks} slug={slug} />}
          <Link
            className={cn(
              'bg-pink-600 text-white rounded py-1 px-3 transform shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-300',
              isEven ? 'xl:mr-2' : 'xl:ml-4',
            )}
            href={slug}
            title={title}
          >
            Read more
          </Link>
          <div
            className={cn(
              'flex flex-wrap gap-2 w-full mt-3',
              isEven ? 'xl:justify-start' : 'xl:justify-end',
            )}
          >
            {tags?.map((tag) => (
              <Link key={tag} href={slugifyTag(tag)}>
                <Badge
                  key={tag}
                  className="px-2 py-1 text-sm font-medium rounded-sm"
                >
                  # {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        className={cn(
          'w-full text-left xl:w-1/2 relative',
          isEven ? 'xl:text-right' : 'xl:text-left',
        )}
      >
        <Ribbon>#{number}</Ribbon>
        <div className={cn(isEven ? 'xl:justify-end' : 'xl:justify-start')}>
          <Thumbnail
            width={575}
            height={350}
            src={cover ?? 'default-01.png'}
            alt={title ?? 'Hero image'}
            className="w-full rounded-lg"
            credit={data.credit}
            creditLink={data.creditLink}
            creditSource={data.creditSource}
            featured={data.featured}
          />
        </div>
      </div>
    </section>
  );
}
