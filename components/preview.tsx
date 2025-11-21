import Image from 'next/image';
import { Link } from '@/components/link';
import { Metadata } from '@/components/metadata';
import { Ribbon } from '@/components/ribbon';
import { TbScribble } from 'react-icons/tb';
import { TbBook } from 'react-icons/tb';
import { TbSchool } from 'react-icons/tb';
import { cn, slugifyTag } from '@/lib/utils';
import { Badge } from 'flowbite-react';
import _ from 'lodash';
import { Thumbnail } from './thumbnail';
import { Article } from '@/lib/articles';
import { Scribble } from '@/lib/scribbles';
import { Course } from '@/lib/courses';

export function Preview({
  index,
  data,
}: {
  index: number;
  data: Article | Scribble | Course;
}) {
  const isEven = index % 2 === 0;
  const { title, slug, date, abstract, tags, number, timeToRead, cover, type } =
    data;
  return (
    <section
      key={index}
      className={cn(
        'relative mx-auto max-w-full md:w-6/12 xl:w-screen md:mt-12 md:mb-16 p-5 flex justify-center flex-col-reverse',
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
        <div
          className={cn(
            `uppercase mb-6 text-center mt-5 xl:mt-0 flex flex-col items-center`,
            isEven
              ? 'xl:text-left xl:items-start'
              : 'xl:text-right xl:items-end',
          )}
        >
          <span
            className={cn(
              'flex items-center justify-center w-12 h-12 rounded-full text-4xl -start-3 ring-8 mb-4 text-white',
              type === 'scribble' && 'bg-blue-500 ring-blue-300',
              type === 'article' && 'bg-pink-500 ring-pink-300',
              type === 'course' && 'bg-violet-500 ring-violet-300',
            )}
          >
            {type === 'scribble' && (
              <Link href="/scribbles">
                <TbScribble />
              </Link>
            )}
            {type === 'article' && (
              <Link href="/blog">
                <TbBook />
              </Link>
            )}
            {type === 'course' && (
              <Link href="/courses">
                <TbSchool />
              </Link>
            )}
          </span>
          {type}
        </div>
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
            <Image
              className={cn(
                'w-8 h-8 rounded-full',
                isEven ? 'xl:mr-2' : 'xl:ml-4',
              )}
              src="/headshot.webp"
              alt="Clarice Bouwer"
              width={60}
              height={60}
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
          className={`flex items-center flex-wrap ${
            isEven ? 'xl:flex-row' : 'xl:flex-row-reverse'
          }`}
        >
          <Link
            className={cn(
              'bg-pink-600 text-white rounded py-1 px-3 transform shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-300',
              isEven ? 'xl:mr-2' : 'xl:ml-4',
            )}
            href={slug}
            title={slug}
          >
            Read more
          </Link>
          <div
            className={cn(
              'flex flex-wrap gap-2 w-full mt-3',
              isEven ? 'justify-start' : 'justify-end',
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
          'xl:w-1/2 relative',
          isEven ? 'xl:text-right' : 'xl:text-left',
        )}
      >
        <Ribbon>#{number}</Ribbon>
        <div className={cn(isEven ? 'xl:justify-end' : 'xl:justify-start')}>
          <Thumbnail
            src={cover}
            alt={title}
            width={800}
            height={600}
            className="h-80"
            credit={data.credit}
            creditLink={data.creditLink}
            creditSource={data.creditSource}
          />
        </div>
      </div>
    </section>
  );
}
