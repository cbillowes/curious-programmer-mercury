'use client';

import { Article, Scribble, Course } from '@/.content-collections/generated';
import Image from 'next/image';
import { Markdown } from '@/components/markdown';
import { Metadata } from '@/components/metadata';
import { Link } from '@/components/link';
import { Tags } from '@/components/tags';
import { RiArticleLine } from 'react-icons/ri';
import { MdOutlineSchool } from 'react-icons/md';
import { TbScribble } from 'react-icons/tb';
import { cn, toProperCase } from '@/lib/utils';
import { ShareWidget } from '@/components/share';
import { Comments } from '@/components/comments';
import { Alert, Tooltip } from 'flowbite-react';
import { Bookmark } from '@/components/bookmark';
import { Like } from '@/components/like';
import { FaUser } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { CurrentServerUser } from '@stackframe/stack';

type IconProps = {
  icon: string;
  [key: string]: string;
};

const Icon = ({ icon, ...rest }: IconProps) => {
  switch (icon) {
    case 'article':
      return <RiArticleLine {...rest} />;
    case 'course':
      return <MdOutlineSchool {...rest} />;
    case 'scribble':
      return <TbScribble {...rest} />;
    default:
      return <></>;
  }
};

type TypeProps = {
  type?: string;
  to: string;
  number?: number;
  inline?: boolean;
};

const Type = ({ type, to, number, inline }: TypeProps) => {
  if (!type) return null;
  const title = toProperCase(type);
  return (
    <div
      className={cn(
        'opacity-70 whitespace-nowrap',
        inline ? 'text-left capitalize' : 'text-center my-3 uppercase',
      )}
    >
      <Link href={to}>
        <Icon
          icon={type}
          className={cn(
            'inline-block mr-2 text-4xl rounded',
            inline ? 'text-sm' : 'p-2',
          )}
          alt={title}
          title={title}
        />
        {type}
      </Link>
      {number && <>&nbsp;&middot; #{number}</>}
    </div>
  );
};

function StickyHeader({
  number,
  title,
  type,
}: {
  number: number;
  title: string;
  type: string;
}) {
  return (
    <header className="print:hidden max-w-3xl mx-auto sticky top-17 left-0 right-0 z-50 bg-gray-50 dark:bg-gray-900 outline-3 outline-gray-50 dark:outline-gray-900">
      <div className="flex items-center gap-2 py-2">
        <Type type={type} to="/blog" number={number} inline={true} />
        <h1 className="text-sm font-extrabold tracking-tighter dark:text-white">
          {title}
        </h1>
      </div>
    </header>
  );
}

type NavigationItemProps = {
  title: string;
  slug?: string;
  number?: number;
};

function Navigation({
  previous,
  next,
}: {
  previous?: NavigationItemProps | null;
  next?: NavigationItemProps | null;
}) {
  if (!previous && !next) return;
  return (
    <nav className="max-w-3xl mx-auto print:hidden">
      {previous && previous.slug && (
        <div className="md:float-left flex w-full md:w-1/2 justify-center md:justify-start text-center md:text-left">
          <Tooltip content={previous.title} placement="bottom">
            <Link
              href={previous.slug}
              className="text-sm hover:underline flex items-center justify-center w-full gap-2"
            >
              <span className="w-64 overflow-hidden whitespace-nowrap text-ellipsis">
                &larr; #{previous.number} - {previous.title}
              </span>
            </Link>
          </Tooltip>
        </div>
      )}
      {next && next.slug && (
        <div className="md:float-right flex w-full md:w-1/2 justify-center md:justify-end">
          <Tooltip content={next.title} placement="bottom">
            <Link
              href={next.slug}
              className="text-sm hover:underline flex items-center truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-96 pt-2 md:pt-0 gap-2"
            >
              <span className="w-64 overflow-hidden whitespace-nowrap text-ellipsis text-center md:text-right">
                #{next.number} - {next.title}
              </span>{' '}
              <span>&rarr;</span>
            </Link>
          </Tooltip>
        </div>
      )}
      <div className="clear-both"></div>
    </nav>
  );
}

function Author() {
  return (
    <aside className="max-w-3xl mx-auto flex items-center mt-8 mb-6 not-italic">
      <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
        <Image
          className="mr-4 w-16 h-16 rounded-full border-4 border-white"
          src="/headshot.webp"
          alt="Clarice Bouwer"
          width={80}
          height={80}
        />
        <div>
          <a
            href="/about"
            rel="author"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Clarice Bouwer
          </a>
          <p className="font-medium tracking-tight text-base text-gray-500 dark:text-gray-400">
            Senior Software Engineer
          </p>
        </div>
      </div>
    </aside>
  );
}

export function ArticleContent({
  article,
  bookmarks,
  likes,
}: {
  article: Article;
  bookmarks: string[];
  likes: string[];
}) {
  const {
    type,
    slug,
    number,
    title,
    tags,
    timeToRead,
    date,
    content,
    next,
    previous,
  } = article;
  return (
    <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      <Navigation previous={previous} next={next} />
      <header className="mb-2 lg:mb-4 not-format">
        <Type type={type} to="/blog" number={number} />
        <h1 className="text-5xl font-extrabold tracking-tighter lg:mb-6 lg:text-7xl text-center dark:text-white mx-auto max-w-5xl print:text-black">
          {title}
        </h1>
        <div className="text-center">
          <Metadata timeToRead={timeToRead} date={date} type={type} />
        </div>
        <div className="flex justify-center items-center gap-2 mt-2">
          <Bookmark bookmarks={bookmarks} slug={slug} />
          <Like likes={likes} slug={slug} />
        </div>
        <div className="text-center">
          {tags && <Tags tags={tags} redirect={true} isButton={true} />}
        </div>
        <Author />
      </header>
      <StickyHeader number={number} title={title} type={type} />
      <section id="article" className="max-w-3xl mx-auto mb-8">
        <Markdown content={content} />
      </section>
      <ShareWidget title={title} url={slug} />
      <Navigation previous={previous} next={next} />
      <Comments />
    </article>
  );
}

export function ResumeContent({
  resume,
  content,
}: {
  resume: {
    name?: string;
    description?: string;
    start?: string;
    logo?: string;
    category?: string;
    company?: string;
    jobTitle?: string;
    type?: string;
    arrangement?: string;
    location?: string;
    end?: string;
    os?: string;
    tech?: string[];
    summary?: string;
  };
  content: string;
}) {
  return (
    <article id="article">
      <header className="mb-2 lg:mb-4 not-format">
        {resume.logo && (
          <Image
            src={`/logos/${resume.logo}`}
            alt={resume.company ?? (resume.name || 'Logo')}
            width={100}
            height={100}
            className="mx-auto mb-4 rounded-md"
          />
        )}
        <h1 className="text-5xl font-extrabold tracking-tighter lg:mb-6 lg:text-7xl text-center dark:text-white mx-auto max-w-5xl print:text-black">
          {resume.company ?? resume.name}
        </h1>
      </header>
      <section id="resume" className="max-w-3xl mx-auto mb-8">
        <Markdown content={content} />
      </section>
    </article>
  );
}

export function ScribbleContent({
  scribble,
  bookmarks,
  likes,
}: {
  scribble: Scribble;
  bookmarks: string[];
  likes: string[];
}) {
  const {
    type,
    slug,
    number,
    title,
    tags,
    timeToRead,
    date,
    content,
    devTo,
    next,
    previous,
  } = scribble;
  return (
    <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      <Navigation previous={previous} next={next} />
      <header className="mb-2 lg:mb-4 not-format">
        <Type type={type} to="/scribbles" number={number} />
        <h1 className="text-5xl font-extrabold tracking-tighter lg:mb-6 lg:text-7xl text-center dark:text-white mx-auto max-w-5xl print:text-black">
          {title}
        </h1>
        <div className="text-center">
          <Metadata
            timeToRead={timeToRead}
            date={date}
            type={type}
            link={devTo}
          />
        </div>
        <div className="flex justify-center items-center gap-2 mt-2">
          <Bookmark bookmarks={bookmarks} slug={slug} />
          <Like likes={likes} slug={slug} />
        </div>
        <div className="text-center">
          {tags && <Tags tags={tags} redirect={true} isButton={true} />}
        </div>
        <Author />
      </header>
      <StickyHeader number={number} title={title} type={type} />
      <section id="article" className="max-w-3xl mx-auto mb-8">
        <Markdown content={content} />
      </section>
      <ShareWidget title={title} url={slug} />
      <Navigation previous={previous} next={next} />
      <Comments />
    </article>
  );
}

export function CourseContent({
  course,
  bookmarks,
  likes,
  isAuthenticated,
}: {
  course: Course;
  bookmarks: string[];
  likes: string[];
  isAuthenticated: boolean;
}) {
  const {
    type,
    slug,
    number,
    title,
    tags,
    timeToRead,
    date,
    modified,
    content,
    pages,
    next,
    previous,
  } = course;
  const router = useRouter();
  return (
    <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      <Navigation previous={previous} next={next} />
      <header className="mb-2 lg:mb-4 not-format">
        <Type type={type} to="/blog" number={number} />
        <h1 className="text-5xl font-extrabold tracking-tighter lg:mb-6 lg:text-7xl text-center dark:text-white mx-auto max-w-5xl print:text-black">
          {title}
        </h1>
        <div className="text-center">
          <Metadata
            timeToRead={timeToRead}
            date={date}
            type={type}
            modified={modified ? new Date(modified) : undefined}
          />
        </div>
        {slug && (
          <div className="flex justify-center items-center gap-2 mt-2">
            <Bookmark bookmarks={bookmarks} slug={slug} />
            <Like likes={likes} slug={slug} />
          </div>
        )}
        <div className="text-center">
          {tags && <Tags tags={tags} redirect={true} isButton={true} />}
        </div>
        <Author />
      </header>
      {number && title && type && (
        <StickyHeader number={number} title={title} type={type} />
      )}
      <section id="article" className="max-w-3xl mx-auto mb-8">
        {content && <Markdown content={content} />}
        <nav>
          <h2>Pages</h2>
          {!isAuthenticated && (
            <Alert
              color="red"
              className="w-full border"
              additionalContent={
                <div className="flex items-center gap-2">
                  <button
                    className="bg-black text-white px-4 py-1 rounded-md hover:bg-pink-500 cursor-pointer"
                    onClick={() => {
                      const returnTo = encodeURIComponent(
                        `/courses/${course.slug}`,
                      );
                      router.push(
                        `/handler/sign-in?after_auth_return_to=${returnTo}`,
                      );
                    }}
                  >
                    Sign in
                  </button>
                  or
                  <button
                    className="bg-black text-white px-4 py-1 rounded-md hover:bg-pink-500 cursor-pointer"
                    onClick={() => {
                      const returnTo = encodeURIComponent(
                        `/courses/${course.slug}`,
                      );
                      router.push(
                        `/handler/sign-up?after_auth_return_to=${returnTo}`,
                      );
                    }}
                  >
                    Sign up
                  </button>
                  for free access.
                </div>
              }
            >
              <div className="flex items-center justify-start gap-2">
                <FaUser className="size-4" />
                You need to be signed in to view the course material.
              </div>
            </Alert>
          )}
          {pages?.map(
            (page, index) =>
              page && (
                <div
                  key={index}
                  className="hover:bg-pink-600 flex items-center justify-between border-b border-dashed py-4"
                >
                  <Link
                    href={page.slug}
                    className="block w-full text-black! dark:text-white! hover:text-white! font-normal! px-4"
                  >
                    {'number' in page && page.number}. {page.title}
                  </Link>
                  <Bookmark bookmarks={bookmarks} slug={slug} />
                </div>
              ),
          )}
        </nav>
      </section>
      {title && slug && <ShareWidget title={title} url={slug} />}
      <Navigation previous={previous} next={next} />
      <Comments />
    </article>
  );
}

export function CoursePageContent({
  coursePages: coursePage,
  bookmarks,
  likes,
}: {
  coursePages: Course;
  bookmarks: string[];
  likes: string[];
}) {
  const {
    type,
    slug,
    number,
    title,
    tags,
    timeToRead,
    date,
    modified,
    content,
    next,
    previous,
    course,
  } = coursePage;
  return (
    <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      <Navigation previous={previous} next={next} />
      <header className="mb-2 lg:mb-4 not-format">
        <Type type={type} to="/blog" number={number} />
        <h1 className="text-5xl font-extrabold tracking-tighter lg:mb-6 lg:text-7xl text-center dark:text-white mx-auto max-w-5xl print:text-black">
          {title}
        </h1>
        <div className="text-center">
          {course && (
            <Link href={`/courses/${course.slug}`} className="mb-2 block">
              {course.title}
            </Link>
          )}
          <Metadata
            timeToRead={timeToRead}
            date={date}
            type={type}
            modified={modified ? new Date(modified) : undefined}
          />
        </div>
        {slug && (
          <div className="flex justify-center items-center gap-2 mt-2">
            <Bookmark bookmarks={bookmarks} slug={slug} />
            <Like likes={likes} slug={slug} />
          </div>
        )}
        <div className="text-center">
          {tags && <Tags tags={tags} redirect={true} isButton={true} />}
        </div>

        <Author />
      </header>
      {number && title && type && (
        <StickyHeader number={number} title={title} type={type} />
      )}
      <section id="article" className="max-w-3xl mx-auto mb-8">
        {content && <Markdown content={content} />}
      </section>
      {title && slug && <ShareWidget title={title} url={slug} />}
      <Navigation previous={previous} next={next} />
      <Comments />
    </article>
  );
}
