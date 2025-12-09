'use client';

import { ReactNode, useState } from 'react';
import { Button } from 'flowbite-react';
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

const color = {
  education: {
    button: 'bg-pink-800 text-pink-100',
    heading: 'text-pink-500',
  },
  career: {
    button: 'bg-orange-700 text-orange-100',
    heading: 'text-orange-500',
  },
  testimonial: {
    button: 'bg-green-800 text-green-100',
    heading: 'text-green-500',
  },
  podcast: {
    button: 'bg-blue-800 text-blue-100',
    heading: 'text-blue-500',
  },
  talk: {
    button: 'bg-teal-800 text-teal-100',
    heading: 'text-teal-500',
  },
  project: {
    button: 'bg-purple-800 text-purple-100',
    heading: 'text-purple-500',
  },
  publication: {
    button: 'bg-yellow-300 text-yellow-900',
    heading: 'text-yellow-300',
  },
};

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

function PillarButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      title={`Filter by ${children}`}
      className={cn(
        'm-1 hover:ring-5 hover:ring-black/20 dark:hover:ring-white/10 focus:ring-black/20 focus:dark:ring-white/10 bg-black text-white dark:bg-white dark:text-black cursor-pointer hover:text-white',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function Timeline() {
  const [category, setCategory] = useState('Career');
  const items = getResume().filter(
    (resume) => resume.resume.category === category,
  );
  return (
    <div>
      <div className="pt-8 text-center mx-auto leading-loose print:hidden flex justify-center items-center gap-2 flex-wrap">
        <PillarButton
          className={category === 'Career' ? color.career.button : ''}
          onClick={() => setCategory('Career')}
        >
          Career
        </PillarButton>
        <PillarButton
          className={cn(category === 'Education' ? color.education.button : '')}
          onClick={() => setCategory('Education')}
        >
          Qualifications
        </PillarButton>
        <PillarButton
          className={cn(
            category === 'Testimonial' ? color.testimonial.button : '',
          )}
          onClick={() => setCategory('Testimonial')}
        >
          Testimonials
        </PillarButton>
        <PillarButton
          className={cn(category === 'Podcast' ? color.podcast.button : '')}
          onClick={() => setCategory('Podcast')}
        >
          Podcasts
        </PillarButton>
        <PillarButton
          className={cn(category === 'Talk' ? color.talk.button : '')}
          onClick={() => setCategory('Talk')}
        >
          Talks
        </PillarButton>
        <PillarButton
          className={cn(category === 'Project' ? color.project.button : '')}
          onClick={() => setCategory('Project')}
        >
          Projects
        </PillarButton>
        <PillarButton
          className={cn(
            category === 'Publication' ? color.publication.button : '',
          )}
          onClick={() => setCategory('Publication')}
        >
          Publications
        </PillarButton>
        <Button
          title="Print Resume"
          className={cn(
            'bg-black text-white dark:bg-white dark:text-black cursor-pointer hover:text-white',
          )}
          onClick={() => window.print()}
        >
          <FaPrint className="inline" />
        </Button>
      </div>
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
        const nodeColor =
          color[
            (
              node.resume.category || 'Career'
            ).toLowerCase() as keyof typeof color
          ];
        return (
          <section
            key={index}
            className="relative w-full md:mt-3 md:mb-3 p-5 flex justify-center flex-col-reverse xl:flex-row"
          >
            <div className="border-color-3 border-none xl:border-dashed xl:w-2/3 xl:mx-8 xl:text-right xl:border-r xl:pr-8">
              <div
                className={cn(
                  `mb-2 rounded-full size-8 float-right p-2 ${nodeColor.button}`,
                )}
              >
                <ResumeIcon category={category} />
              </div>
              <div className="clear-right"></div>
              {company && (
                <h2 className="text-xl mt-2 xl:mt-0 md:text-2xl font-semibold font-alt-sans">
                  <ResumeIcon
                    category={category}
                    className={`text-4xl rounded-full p-2 mr-1 ${nodeColor.button} inline xl:hidden`}
                  />
                  <Link
                    href={slug}
                    title={`${jobTitle} at ${company}`}
                    className="font-bold"
                  >
                    <span className={nodeColor.heading}>{jobTitle}</span>
                    <br />
                    <span>{company}</span>
                  </Link>
                </h2>
              )}
              {name && (
                <>
                  <h2
                    className={`text-lg mt-2 xl:mt-0 md:text-2xl font-bold font-alt-sans ${nodeColor.heading}`}
                  >
                    <ResumeIcon
                      category={category}
                      className={`text-4xl rounded-full p-2 mr-1 ${nodeColor.button} inline xl:hidden`}
                    />
                    <Link href={slug} title={name}>
                      {name}
                    </Link>
                  </h2>
                  <h3 className="font-black font-alt-sans">{jobTitle}</h3>
                </>
              )}
              <div className="leading-loose mb-4">
                <div className="flex flex-col space-x-2 space-y-0 justify-end">
                  <>
                    <DisplayDates
                      start={start}
                      end={end}
                      category={category}
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
                {category === 'Testimonial' && (
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
                    'rounded py-1 px-3 transform shadow-md hover:bg-blue-600 hover:text-blue-200 xl:mr-2',
                    nodeColor.button,
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
                <div className="pr-3 pt-3">
                  {logo && (
                    <ImageContainer
                      width={128}
                      height={128}
                      src={`/logos/${logo}`}
                      alt={company ?? name ?? 'Logo'}
                      containerClassName={`bg-white rounded-lg px-3 py-2 flex items-center justify-center ${
                        category === 'Testimonial' ? 'rounded-full' : ''
                      }`}
                      priority={true}
                      fill={false}
                    />
                  )}
                </div>
                <div className="w-full xl:w-48 pr-3 pt-3 text-sm text-left print:hidden">
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
    </div>
  );
}
