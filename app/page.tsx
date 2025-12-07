import { getArticles } from '@/lib/articles';
import { Link } from '@/components/link';
import { FaNodeJs } from 'react-icons/fa';
import {
  FaGithub,
  FaLinkedin,
  FaPeopleGroup,
  FaStackOverflow,
} from 'react-icons/fa6';
import { RiNextjsFill } from 'react-icons/ri';
import { SiClojure, SiGooglecloud } from 'react-icons/si';
import { Page } from '@/components/page';
import { Articles } from '@/components/articles';
import { cn, getPageMetadata, slugify } from '@/lib/utils';
import { getBookmarks } from '@/db/bookmarks';
import { getLikes } from '@/db/likes';
import { ReactNode } from 'react';
import { TbTools } from 'react-icons/tb';
import { BiCodeCurly } from 'react-icons/bi';
import { ImageContainer } from '@/components/image-container';

function Socials() {
  return (
    <>
      <Link
        href="https://github.com/cbillowes"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
        hideExternal={true}
      >
        <FaGithub className="text-black dark:text-white text-2xl" />
      </Link>
      <Link
        href="https://www.linkedin.com/in/cbouwer/"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
        hideExternal={true}
      >
        <FaLinkedin className="text-black dark:text-white text-2xl" />
      </Link>
      <Link
        href="https://stackoverflow.com/users/849986/clarice-bouwer"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
        hideExternal={true}
      >
        <FaStackOverflow className="text-black dark:text-white text-2xl" />
      </Link>
      <div>|</div>
      <Link
        href="https://clojure.org/"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
        hideExternal={true}
      >
        <SiClojure className="text-black dark:text-white text-2xl" />
      </Link>
      <Link
        href="https://nodejs.org/"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
        hideExternal={true}
      >
        <FaNodeJs className="text-black dark:text-white text-2xl" />
      </Link>
      <Link
        href="https://nextjs.org/"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
        hideExternal={true}
      >
        <RiNextjsFill className="text-black dark:text-white text-2xl" />
      </Link>
      <Link
        href="https://cloud.google.com/"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
        hideExternal={true}
      >
        <SiGooglecloud className="text-black dark:text-white text-2xl" />
      </Link>
    </>
  );
}

function Tags({
  heading,
  tags,
  className,
  icon,
}: {
  heading: string;
  tags: string[];
  className: string;
  icon: ReactNode;
}) {
  return (
    <div>
      <div
        className={cn(
          'flex justify-center items-center mb-4 w-10 h-10 rounded-md lg:h-16 lg:w-16',
          className,
        )}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{heading}</h3>
      <ul className="my-6 lg:mb-0 space-y-4">
        {tags.map((tag) => (
          <li key={tag} className="flex space-x-2.5">
            <svg
              className="shrink-0 w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="leading-tight text-white">
              <Link href={`/tag/${slugify(tag)}`}>{tag}</Link>
            </span>
          </li>
        ))}
        <li className="flex space-x-2.5">
          <svg
            className="shrink-0 w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="leading-tight text-white">
            <Link href="/tags">... and more</Link>
          </span>
        </li>
      </ul>
    </div>
  );
}

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Home',
    description:
      'Explore a spectrum of skills at Curious Programmer—soft to technical. Articles, courses, and notes for continuous learning in software engineering.',
    slug: '/',
    image: '/hero/home.png',
    type: 'website',
  });
}

export default async function Home() {
  const bookmarks = await getBookmarks();
  const likes = await getLikes();
  return (
    <Page>
      <section className="bg-gray-50 dark:bg-gray-900 py-5">
        <div className="px-4 sm:px-32 grid max-w-5xl xl:px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <div className="lg:hidden flex items-center justify-start">
              <ImageContainer
                width={32}
                height={32}
                src="/headshot.webp"
                className="w-32 h-32 border-4 border-white rounded-full"
                alt="Clarice Bouwer head shot"
                priority={true}
              />
              <div className="flex gap-4 ml-4 flex-wrap">
                <Socials />
              </div>
            </div>
            <h1 className="max-w-5xl mb-8 text-4xl font-extrabold tracking-tighter lg:leading-16 md:text-5xl xl:text-6xl text-black dark:text-white">
              Leading teams with{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r to-blue-600 from-green-400">
                empathy
              </span>{' '}
              &amp; crafting solutions with{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r to-pink-600 from-violet-400">
                precision
              </span>
              .
            </h1>
            <p className="max-w-5xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">
              A highly accomplished and passionate polyglot full-stack software
              engineer with {new Date().getFullYear() - 2005} years of
              experience delivering impactful digital solutions across diverse
              industries, including digital media, event registration, cloud
              computing, and InsureTech demonstrating strong leadership skills
              and a diverse technical skill set including DevOps and Artificial
              Intelligence.
            </p>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">
              Currently co-leading a remote team of 15 across Cloudsure Limited
              and Simply Financial Services, where I spearhead the development
              of a cutting-edge digital life insurance platform using
              Clojure-based polylith architecture on a complex distributed
              system with over 15 repositories. Proven track record for driving
              innovation and leading high-performing teams through systems
              thinking and empathy.
            </p>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">
              Dedicated to crafting elegant, high-quality code, fostering strong
              development practices, and delivering exceptional user
              experiences.
            </p>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              About me
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              My blog
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-4 lg:flex justify-end">
            <div>
              <div className="flex justify-center items-center flex-col">
                <ImageContainer
                  width={210}
                  height={210}
                  src="/headshot.webp"
                  className="w-[210px] h-[210px] object-cover border-8 border-white rounded-full"
                  alt="Clarice Bouwer head shot"
                  priority={true}
                />
                <div className="mt-2 text-center font-bold">Clarice Bouwer</div>
                <div className="mb-4 text-center">Senior Software Engineer</div>
              </div>
              <div className="flex gap-4 justify-around mt-4">
                <Socials />
              </div>
              <div className="mt-8 flex justify-center items-center gap-4">
                <ImageContainer
                  width={48}
                  height={48}
                  src="/unicorn.png"
                  alt="Unicorn emoji"
                  priority={true}
                />
                <ImageContainer
                  width={48}
                  height={48}
                  src="/mac.png"
                  alt="Woman technologist emoji"
                  priority={true}
                />
                <ImageContainer
                  width={48}
                  height={48}
                  src="/rocket.png"
                  alt="Rocket emoji"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="dark:border-t-blue-900 border-t-blue-400" />
      <section className="bg-blue-600 dark:bg-blue-950">
        <div className="py-8 px-4 mx-auto max-w-7xl sm:py-16 lg:px-6">
          <div className="max-w-5xl mx-auto mb-8 lg:mb-16">
            <h2 className="mt-8 mb-4 lg:mb-8 text-3xl font-extrabold tracking-tighter leading-tight text-white md:text-4xl">
              I learn things, then I share knowledge
            </h2>
            <p className="font-light sm:text-xl text-white">
              I love learning new things and how to improve on existing things,
              so I share the gems I uncover along the way. ✨
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:gap-12 md:space-y-0">
            <Tags
              heading="Soft Skills"
              tags={[
                'Mindset',
                'Relationships',
                'Communication',
                'Productivity',
                'Personal brand',
              ]}
              className="bg-yellow-900"
              icon={<FaPeopleGroup className="size-8 text-yellow-300" />}
            />
            <Tags
              heading="Software Engineering"
              tags={['JavaScript', 'Clojure', 'ClojureScript', 'React']}
              className="bg-green-900"
              icon={<BiCodeCurly className="size-8 text-green-300" />}
            />
            <Tags
              heading="Engineering Toolkit"
              tags={[
                'Visual Studio Code',
                'MacOS',
                'DevTools',
                'Storybook',
                'Git',
              ]}
              className="bg-purple-900"
              icon={<TbTools className="size-8 text-purple-300" />}
            />
          </div>
        </div>
      </section>
      <hr className="dark:border-blue-900 border-blue-400" />
      <aside
        aria-label="Related articles"
        className="py-8 bg-white dark:bg-gray-900 lg:py-16 antialiased"
      >
        <div className="px-4 mx-auto w-full max-w-5xl">
          <h2 className="mt-8 mb-4 lg:mb-8 text-3xl font-extrabold tracking-tighter leading-tight text-gray-900 dark:text-white md:text-4xl">
            Featured articles
          </h2>
          <div>
            <div className="relative">
              <div className="bg-white duration-700 ease-in-out dark:bg-gray-900 mb-4">
                <Articles
                  bookmarks={bookmarks.map((b) => b.slug)}
                  likes={likes.map((l) => l.slug)}
                  data={getArticles()
                    .filter((a) => a.featured)
                    .sort((a, b) => b.number - a.number)
                    .slice(0, 9)}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </Page>
  );
}
