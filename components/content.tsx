import Image from 'next/image';
import { Markdown } from '@/components/markdown';
import { Metadata } from '@/components/metadata';
import { Link } from '@/components/link';
import { Tags } from '@/components/tags';
import { RiArticleLine } from 'react-icons/ri';
import { MdOutlineSchool } from 'react-icons/md';
import { TbScribble } from 'react-icons/tb';
import { cn, toProperCase } from '@/lib/utils';
import { Article } from '@/lib/articles';
import { Scribble } from '@/lib/scribbles';
import { Course, CoursePage } from '@/lib/courses';
import { ShareWidget } from '@/components/share';
import { Comments } from '@/components/comments';
import { Tooltip } from 'flowbite-react';

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
  type: string;
  to: string;
  number?: number;
  inline?: boolean;
};

const Type = ({ type, to, number, inline }: TypeProps) => {
  const title = toProperCase(type);
  return (
    <div
      className={cn(
        'opacity-70',
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

function Navigation({
  previous,
  next,
}: {
  previous?: Article | Scribble | Course | CoursePage;
  next?: Article | Scribble | Course | CoursePage;
}) {
  return (
    <nav className="max-w-3xl mx-auto print:hidden">
      {previous && (
        <div className="md:float-left flex w-full justify-center md:justify-start">
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
      {next && (
        <div className="md:float-right flex w-full justify-center md:justify-end">
          <Tooltip content={next.title} placement="bottom">
            <Link
              href={next.slug}
              className="text-sm hover:underline flex items-center truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-96 pt-2 md:pt-0 gap-2"
            >
              <span className="w-64 overflow-hidden whitespace-nowrap text-ellipsis">
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
    <aside className="flex items-center mt-8 mb-6 not-italic max-w-2xl mx-auto">
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
}: Article) {
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
}: Scribble) {
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
            link={devTo}
          />
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
}: Course) {
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
            modified={modified}
          />
        </div>
        <div className="text-center">
          {tags && <Tags tags={tags} redirect={true} isButton={true} />}
        </div>

        <Author />
      </header>
      <StickyHeader number={number} title={title} type={type} />
      <section id="article" className="max-w-3xl mx-auto mb-8">
        <Markdown content={content} />
        <nav>
          <h2>Pages</h2>
          {pages.map((page, index) => (
            <div key={index} className="hover:bg-pink-600">
              <Link
                href={page.slug}
                className="border-b border-dashed py-4 block text-black! dark:text-white! hover:text-white! font-normal! px-4"
              >
                {page.number}. {page.title}
              </Link>
            </div>
          ))}
        </nav>
      </section>
      <ShareWidget title={title} url={slug} />
      <Navigation previous={previous} next={next} />
      <Comments />
    </article>
  );
}

export function CoursePageContent({
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
}: CoursePage) {
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
            <Link href={course.slug} className="mb-2 block">
              {course.title}
            </Link>
          )}
          <Metadata
            timeToRead={timeToRead}
            date={date}
            type={type}
            modified={modified}
          />
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
