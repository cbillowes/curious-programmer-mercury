'use client';

import { ReactNode, useState } from 'react';
import { Button } from 'flowbite-react';
import { Resume } from '@/.content-collections/generated';
import { ImageContainer } from '@/components/image-container';
import { Link } from '@/components/link';
import { getResume } from '@/lib/resume';
import { cn } from '@/lib/utils';
import {
  FaCode,
  FaGraduationCap,
  FaMicrophone,
  FaPaperclip,
  FaRegComment,
} from 'react-icons/fa';
import { FaApple, FaLinux, FaPrint, FaWindows } from 'react-icons/fa6';

const defaultCategory = 'Career';

const categoryConfig = [
  {
    key: 'All',
    title: 'All',
    button: cn(
      'text-indigo-100 dark:text-indigo-100',
      'bg-indigo-500 dark:bg-indigo-600',
      'ring-indigo-200/50 dark:ring-indigo-800/50',
      'focus:ring-indigo-200/50 focus:dark:ring-indigo-900/50',
    ),
    hover: cn(
      'hover:text-indigo-100 dark:hover:text-indigo-100',
      'hover:bg-indigo-600 dark:hover:bg-indigo-600',
      'hover:ring-indigo-100/50 hover:dark:ring-indigo-700/50',
      'hover:focus:ring-indigo-200/50 hover:focus:dark:ring-indigo-700/50',
    ),
  },
  {
    key: 'Education',
    title: 'Qualifications',
    button: cn(
      'text-pink-100 dark:text-pink-100',
      'bg-pink-500 dark:bg-pink-600',
      'ring-pink-200/50 dark:ring-pink-800/50',
      'focus:ring-pink-200/50 focus:dark:ring-pink-900/50',
    ),
    hover: cn(
      'hover:text-pink-100 dark:hover:text-pink-100',
      'hover:bg-pink-600 dark:hover:bg-pink-600',
      'hover:ring-pink-100/50 hover:dark:ring-pink-700/50',
      'hover:focus:ring-pink-200/50 hover:focus:dark:ring-pink-700/50',
    ),
    heading: 'text-pink-500',
  },
  {
    key: 'Career',
    title: 'Career',
    button: cn(
      'text-orange-100 dark:text-orange-100',
      'bg-orange-500 dark:bg-orange-600',
      'ring-orange-200/50 dark:ring-orange-800/50',
      'focus:ring-orange-200/50 focus:dark:ring-orange-900/50',
    ),
    hover: cn(
      'hover:text-orange-100 dark:hover:text-orange-100',
      'hover:bg-orange-600 dark:hover:bg-orange-600',
      'hover:ring-orange-100/50 hover:dark:ring-orange-700/50',
      'hover:focus:ring-orange-200/50 hover:focus:dark:ring-orange-700/50',
    ),
    heading: 'text-orange-500',
  },
  {
    key: 'Testimonial',
    title: 'Testimonials',
    button: cn(
      'text-green-100 dark:text-green-100',
      'bg-green-500 dark:bg-green-600',
      'ring-green-200/50 dark:ring-green-800/50',
      'focus:ring-green-200/50 focus:dark:ring-green-900/50',
    ),
    hover: cn(
      'hover:text-green-100 dark:hover:text-green-100',
      'hover:bg-green-600 dark:hover:bg-green-600',
      'hover:ring-green-100/50 hover:dark:ring-green-700/50',
      'hover:focus:ring-green-200/50 hover:focus:dark:ring-green-700/50',
    ),
    heading: 'text-green-500',
  },
  {
    key: 'Podcast',
    title: 'Podcasts',
    button: cn(
      'text-blue-100 dark:text-blue-100',
      'bg-blue-500 dark:bg-blue-600',
      'ring-blue-200/50 dark:ring-blue-800/50',
      'focus:ring-blue-200/50 focus:dark:ring-blue-900/50',
    ),
    hover: cn(
      'hover:text-blue-100 dark:hover:text-blue-100',
      'hover:bg-blue-600 dark:hover:bg-blue-600',
      'hover:ring-blue-100/50 hover:dark:ring-blue-700/50',
      'hover:focus:ring-blue-200/50 hover:focus:dark:ring-blue-700/50',
    ),
    heading: 'text-blue-500',
  },
  {
    key: 'Talk',
    title: 'Talks',
    button: cn(
      'text-teal-100 dark:text-teal-100',
      'bg-teal-500 dark:bg-teal-600',
      'ring-teal-200/50 dark:ring-teal-600/50',
      'focus:ring-teal-200/50 focus:dark:ring-teal-900/50',
    ),
    hover: cn(
      'hover:text-teal-100 dark:hover:text-teal-100',
      'hover:bg-teal-600 dark:hover:bg-teal-600',
      'hover:ring-teal-100/50 hover:dark:ring-teal-700/50',
      'hover:focus:ring-teal-200/50 hover:focus:dark:ring-teal-700/50',
    ),
    heading: 'text-teal-500',
  },
  {
    key: 'Project',
    title: 'Projects',
    button: cn(
      'text-purple-100 dark:text-purple-100',
      'bg-purple-500 dark:bg-purple-600',
      'ring-purple-200/50 dark:ring-purple-600/50',
      'focus:ring-purple-200/50 focus:dark:ring-purple-900/50',
    ),
    hover: cn(
      'hover:text-purple-100 dark:hover:text-purple-100',
      'hover:bg-purple-600 dark:hover:bg-purple-600',
      'hover:ring-purple-100/50 hover:dark:ring-purple-700/50',
      'hover:focus:ring-purple-200/50 hover:focus:dark:ring-purple-700/50',
    ),
    heading: 'text-purple-500',
  },
  {
    key: 'Publication',
    title: 'Publications',
    button: cn(
      'text-yellow-900 dark:text-yellow-900',
      'bg-yellow-200  dark:bg-yellow-300',
      'ring-yellow-200/50 dark:ring-yellow-800/50',
      'focus:ring-yellow-200/50 focus:dark:ring-yellow-900/50',
    ),
    hover: cn(
      'hover:text-yellow-900 dark:hover:text-yellow-900',
      'hover:bg-yellow-200 dark:hover:bg-yellow-300',
      'hover:ring-yellow-100/50 hover:dark:ring-yellow-800/50',
      'hover:focus:ring-yellow-200/50 hover:focus:dark:ring-yellow-800/50',
    ),
    heading: 'text-yellow-300',
  },
];

function ResumeIcon({
  category,
  className = '',
}: {
  category: string;
  className?: string;
}) {
  return (
    <>
      {category === 'Education' && (
        <FaGraduationCap className={className} title={category} />
      )}
      {category === 'Career' && (
        <FaCode className={className} title={category} />
      )}
      {category === 'Podcast' && (
        <FaMicrophone className={className} title={category} />
      )}
      {category === 'Publication' && (
        <FaPaperclip className={className} title={category} />
      )}
      {category === 'Testimonial' && (
        <FaRegComment className={className} title={category} />
      )}
      {category === 'Talk' && (
        <FaMicrophone className={className} title={category} />
      )}
      {category === 'Project' && (
        <FaCode className={className} title={category} />
      )}
    </>
  );
}

function timeSince(duration: number) {
  let result = '';

  const yearInMillis = 60 * 60 * 24 * 365 * 1000;
  const years = Math.floor(duration / yearInMillis);
  if (years > 0) {
    result += `${years} year${years > 1 ? 's' : ''}`;
    duration -= years * yearInMillis;
  }

  const monthInMillis = 60 * 60 * 24 * 30 * 1000;
  const months = Math.floor(duration / monthInMillis);
  if (months > 0) {
    result += `${result ? ' & ' : ''}${months} month${months > 1 ? 's' : ''}`;
    duration -= months * monthInMillis;
  }

  return result;
}

function getTimestamp(date: string) {
  return new Date(date).getTime();
}

function format(date: string | undefined) {
  if (!date) return 'present';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function DisplayDates({
  className,
  start,
  end,
  category,
}: {
  className?: string;
  start?: string;
  end?: string;
  category: string;
}) {
  if (!start) return null;
  const classNames = cn(className, 'print:text-xs print:text-left');
  const startTimestamp = getTimestamp(start);
  const endTimestamp = end
    ? getTimestamp(end)
    : getTimestamp(new Date().toDateString());
  if (startTimestamp === endTimestamp) {
    return <span className={className}>{format(start)}</span>;
  }
  if (['Podcast', 'Talk', 'Publication', 'Testimonial'].includes(category)) {
    return (
      <span className={classNames}>
        {format(start)} &middot; {timeSince(endTimestamp - startTimestamp)} ago
      </span>
    );
  }
  return (
    <span className={classNames}>
      <span>
        {format(start)} to {format(end)}
      </span>
      <br />
      <span>{timeSince(endTimestamp - startTimestamp)}</span>
    </span>
  );
}

function getCategoryConfig(category: string) {
  return (
    categoryConfig.find((c) => c.key === category) ??
    categoryConfig.find((c) => c.key === defaultCategory)!
  );
}

function getCategoryConfigByTitle(title: string) {
  return (
    categoryConfig.find((c) => c.title === title) ??
    categoryConfig.find((c) => c.key === defaultCategory)!
  );
}

function PillarButton({
  current,
  children,
  onClick,
}: {
  current: string;
  children: ReactNode;
  onClick: (category: string) => void;
}) {
  const config = getCategoryConfigByTitle(children?.toString() ?? '');
  const isActive = current === config.key;
  return (
    <Button
      title={`Filter by ${children}`}
      className={cn(
        'transition-colors duration-200 ease-in-out',
        'cursor-pointer m-1 ring-5 hover:ring-5 focus:ring-5 ring-gray-200/50 dark:ring-gray-700/50',
        'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100',
        isActive && config?.button,
        config?.hover,
      )}
      onClick={() => onClick(config.key)}
    >
      {children}
    </Button>
  );
}

function filterItemsByCategory(category: string) {
  return getResume().filter((item) => item.resume.category === category);
}

function Section({
  heading,
  items,
  className,
}: {
  heading: string;
  items: Resume[];
  className: string;
}) {
  return (
    <section className={cn('my-8 print:my-4', className)}>
      <h2 className="text-center border-b border-gray-400 dark:border-gray-700 pb-4 uppercase font-bold print:pb-2">
        {heading}
      </h2>
      {items.map((node, index) => {
        const { slug } = node;
        const {
          name,
          description,
          company,
          jobTitle,
          location,
          start,
          end,
          type,
          arrangement,
          summary,
          tech,
          logo,
          os,
        } = node.resume;
        const currentCategory = node.resume.category ?? 'Career';
        const config = getCategoryConfig(currentCategory);
        return (
          <section
            key={index}
            className="relative w-full md:mt-10 md:mb-3 pr-5 flex justify-center flex-col-reverse xl:flex-row"
          >
            <div className="border-color-3 border-none xl:border-dashed xl:w-2/3 xl:mr-8 xl:text-right xl:border-r xl:pr-8">
              <div
                className={cn(
                  `mb-2 rounded-full size-8 float-right p-2 ${config.button} print:hidden`,
                )}
              >
                <ResumeIcon category={currentCategory} />
              </div>
              <div className="clear-right"></div>
              {company && (
                <h3 className="text-xl mt-2 xl:mt-0 md:text-2xl font-semibold font-alt-sans">
                  <ResumeIcon
                    category={currentCategory}
                    className={`text-4xl rounded-full p-2 mr-1 ${config.button} inline xl:hidden print:hidden`}
                  />
                  <Link
                    href={slug}
                    title={`${jobTitle} at ${company}`}
                    className="font-bold"
                  >
                    <span className={config.heading}>
                      {jobTitle}
                      <span className="hidden print:inline"> @ </span>
                    </span>
                    <br className="print:hidden" />
                    <span>{company}</span>
                  </Link>
                </h3>
              )}
              {name && (
                <>
                  <h3
                    className={`text-lg mt-2 xl:mt-0 md:text-2xl font-bold font-alt-sans ${config.heading}`}
                  >
                    <ResumeIcon
                      category={currentCategory}
                      className={`text-4xl rounded-full p-2 mr-1 ${config.button} inline xl:hidden print:hidden`}
                    />
                    <Link href={slug} title={name}>
                      {name}
                    </Link>
                  </h3>
                  <h3 className="font-black font-alt-sans">{jobTitle}</h3>
                </>
              )}
              <div className="leading-loose mb-4">
                <div className="flex flex-col space-x-2 space-y-0 justify-end">
                  <>
                    <DisplayDates
                      start={start}
                      end={end}
                      category={currentCategory}
                      className="opacity-80 text-right"
                    />
                    {(location || type || arrangement) && (
                      <div className="opacity-80 flex items-center justify-end print:text-xs print:justify-start">
                        {location} &middot; {type} &middot; {arrangement}{' '}
                        &middot;{' '}
                        <span className="pl-1 text-neutral">
                          {os === 'windows' && <FaWindows />}
                          {os === 'macOS' && <FaApple />}
                          {os === 'linux' && <FaLinux />}
                        </span>
                      </div>
                    )}
                  </>
                </div>
                {currentCategory === 'testimonial' && (
                  <>
                    <h4 className="font-bold">{description}</h4>
                  </>
                )}
                <div className="hidden print:block text-xs text-gray-600">
                  {tech &&
                    tech.map((t, i) => (
                      <span key={t}>
                        <span className="text-neutral">{t}</span>
                        {i < tech.length - 1 && <> &middot; </>}
                      </span>
                    ))}
                </div>
                <p className="mt-2 xl:text-right">{summary}</p>
              </div>
              <div className="flex items-center flex-wrap xl:flex-row-reverse print:hidden">
                <Link
                  className={cn(
                    'rounded py-1 px-3 transform shadow-md hover:bg-blue-600 hover:text-blue-200',
                    config.button,
                  )}
                  href={slug}
                  title={`Read more about my time at ${company}`}
                >
                  Read more
                </Link>
              </div>
            </div>
            <div className="hidden xl:flex xl:w-1/3 relative items-start justify-center xl:justify-start xl:text-right print:hidden">
              <div className="text-center">
                {logo && (
                  <ImageContainer
                    width={128}
                    height={128}
                    src={`/logos/${logo}`}
                    alt={company ?? name ?? 'Logo'}
                    className={
                      currentCategory === 'testimonial' ? 'rounded-full' : ''
                    }
                    containerClassName={`bg-white rounded-lg px-3 py-2 flex items-center justify-center ${
                      currentCategory === 'testimonial' ? 'rounded-full' : ''
                    }`}
                    priority={true}
                    fill={false}
                  />
                )}
                <div className="w-full xl:w-48 pr-3 pt-3 text-sm text-left leading-loose print:hidden">
                  {tech &&
                    tech.map((t, i) => (
                      <span key={t}>
                        <span className="text-neutral">{t}</span>
                        {i < tech.length - 1 && <> &middot; </>}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </section>
  );
}

export function Timeline() {
  const [category, setCategory] = useState(defaultCategory);
  const config = getCategoryConfig(category);
  return (
    <div>
      <div className="pt-8 text-center mx-auto leading-loose print:hidden flex justify-center items-center gap-2 flex-wrap">
        <PillarButton current={category} onClick={setCategory}>
          All
        </PillarButton>
        <PillarButton current={category} onClick={setCategory}>
          Career
        </PillarButton>
        <PillarButton current={category} onClick={setCategory}>
          Qualifications
        </PillarButton>
        <PillarButton current={category} onClick={setCategory}>
          Testimonials
        </PillarButton>
        <PillarButton current={category} onClick={setCategory}>
          Podcasts
        </PillarButton>
        <PillarButton current={category} onClick={setCategory}>
          Talks
        </PillarButton>
        <PillarButton current={category} onClick={setCategory}>
          Projects
        </PillarButton>
        <PillarButton current={category} onClick={setCategory}>
          Publications
        </PillarButton>
        <Button
          title="Print Resume"
          className={cn(
            'cursor-pointer',
            'ring-5 hover:ring-5 focus:ring-5 ring-gray-200/50 dark:ring-white/20',
          )}
          onClick={() => window.print()}
        >
          <FaPrint className="inline" />
        </Button>
      </div>
      {category === 'All' && (
        <>
          <Section
            className="print:block"
            heading="Career"
            items={filterItemsByCategory('Career')}
          />
          <Section
            className="print:block"
            heading="Qualifications"
            items={filterItemsByCategory('Education')}
          />
          <Section
            className="print:hidden"
            heading="Projects"
            items={filterItemsByCategory('Project')}
          />
          <Section
            className="print:hidden"
            heading="Podcasts"
            items={filterItemsByCategory('Podcast')}
          />
          <Section
            className="print:hidden"
            heading="Talks"
            items={filterItemsByCategory('Talk')}
          />
          <Section
            className="print:hidden"
            heading="Publications"
            items={filterItemsByCategory('Publication')}
          />
          <Section
            className="print:hidden"
            heading="Testimonials"
            items={filterItemsByCategory('Testimonial')}
          />
        </>
      )}
      {category !== 'All' && (
        <>
          <Section
            className="print:block"
            heading={config.title}
            items={filterItemsByCategory(category)}
          />
        </>
      )}
    </div>
  );
}
