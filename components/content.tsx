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

export function Content({
  type,
  number,
  title,
  tags,
  timeToRead,
  date,
  content,
  devTo,
  next,
  previous,
}: Article | Scribble) {
  return (
    <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      <nav>
        {previous && (
          <div className="float-left">
            <Link
              href={previous.slug}
              className="text-sm hover:underline flex items-center"
            >
              &larr; #{previous.number} - {previous.title}
            </Link>
          </div>
        )}
        {next && (
          <div className="float-right">
            <Link
              href={next.slug}
              className="text-sm hover:underline flex items-center"
            >
              #{next.number} - {next.title} &rarr;
            </Link>
          </div>
        )}
        <div className="clear-both"></div>
      </nav>
      <header className="mb-2 lg:mb-4 not-format">
        <Type type={type} to="/blog" number={number} />
        <h1 className="text-5xl font-extrabold tracking-tighter lg:mb-6 lg:text-7xl text-center dark:text-white mx-auto max-w-5xl">
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
        <address className="flex items-center mt-8 mb-6 not-italic max-w-2xl mx-auto">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <Image
              className="mr-4 w-16 h-16 rounded-full"
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
        </address>
      </header>
      <section id="article" className="max-w-3xl mx-auto">
        <Markdown content={content} />
      </section>
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
        <h1 className="text-5xl font-extrabold tracking-tighter lg:mb-6 lg:text-7xl text-center dark:text-white mx-auto max-w-5xl">
          {resume.company ?? resume.name}
        </h1>
      </header>
      <section id="resume" className="max-w-3xl mx-auto">
        <Markdown content={content} />
      </section>
    </article>
  );
}
