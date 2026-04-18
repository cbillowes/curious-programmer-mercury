import { ReactNode } from "react";
import { getBookmarks } from "@/db/bookmarks";
import { getLikes } from "@/db/likes";
import { BiCodeCurly } from "react-icons/bi";
import { FaMagic, FaNodeJs } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaPeopleGroup, FaStackOverflow } from "react-icons/fa6";
import { RiNextjsFill } from "react-icons/ri";
import { SiClojure, SiGooglecloud } from "react-icons/si";
import { TbTools } from "react-icons/tb";

import { getArticles } from "@/lib/articles";
import { cn, getPageMetadata, slugify } from "@/lib/utils";
import { Articles } from "@/components/articles";
import { ImageContainer } from "@/components/image-container";
import { Link } from "@/components/link";
import { Page } from "@/components/page";

function Socials() {
  return (
    <>
      <Link
        href="https://github.com/cbillowes"
        title="GitHub Profile"
        className="flex items-center justify-center transition-all duration-300 hover:scale-125"
        hideExternal={true}
      >
        <FaGithub className="text-2xl text-black dark:text-white" />
      </Link>
      <Link
        href="https://www.linkedin.com/in/cbouwer/"
        title="LinkedIn Profile"
        className="flex items-center justify-center transition-all duration-300 hover:scale-125"
        hideExternal={true}
      >
        <FaLinkedin className="text-2xl text-black dark:text-white" />
      </Link>
      <Link
        href="https://stackoverflow.com/users/849986/clarice-bouwer"
        title="Stack Overflow Profile"
        className="flex items-center justify-center transition-all duration-300 hover:scale-125"
        hideExternal={true}
      >
        <FaStackOverflow className="text-2xl text-black dark:text-white" />
      </Link>
      <div>|</div>
      <Link
        href="https://clojure.org/"
        title="Clojure"
        className="flex items-center justify-center transition-all duration-300 hover:scale-125"
        hideExternal={true}
      >
        <SiClojure className="text-2xl text-black dark:text-white" />
      </Link>
      <Link
        href="https://nodejs.org/"
        title="Node.js"
        className="flex items-center justify-center transition-all duration-300 hover:scale-125"
        hideExternal={true}
      >
        <FaNodeJs className="text-2xl text-black dark:text-white" />
      </Link>
      <Link
        href="https://nextjs.org/"
        title="Next.js"
        className="flex items-center justify-center transition-all duration-300 hover:scale-125"
        hideExternal={true}
      >
        <RiNextjsFill className="text-2xl text-black dark:text-white" />
      </Link>
      <Link
        href="https://cloud.google.com/"
        title="Google Cloud"
        className="flex items-center justify-center transition-all duration-300 hover:scale-125"
        hideExternal={true}
      >
        <SiGooglecloud className="text-2xl text-black dark:text-white" />
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
          "mb-4 flex h-10 w-10 items-center justify-center rounded-md lg:h-16 lg:w-16",
          className,
        )}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{heading}</h3>
      <ul className="my-6 space-y-4 lg:mb-0">
        {tags.map((tag) => (
          <li key={tag} className="flex space-x-2.5">
            <svg
              className="h-5 w-5 shrink-0 text-white"
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
            className="h-5 w-5 shrink-0 text-white"
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
    title: "Home",
    description:
      "Explore a spectrum of skills at Curious Programmer—soft to technical. Articles, courses, and notes for continuous learning in software engineering.",
    slug: "/",
    image: "/hero/home.png",
    type: "website",
  });
}

export default async function HomePage() {
  const articles = getArticles();
  const bookmarks = await getBookmarks();
  const likes = await getLikes();
  const latestArticle = articles[0];
  return (
    <Page>
      <section className="bg-gray-50 py-5 dark:bg-gray-900">
        <div className="mx-auto grid max-w-sm px-4 py-8 sm:px-32 md:max-w-3xl lg:max-w-5xl lg:grid-cols-12 lg:gap-8 xl:gap-0 xl:px-4">
          <div className="mr-auto place-self-center lg:col-span-7">
            <div className="mb-4 flex items-center justify-start md:mb-0 lg:hidden">
              <ImageContainer
                width={32}
                height={32}
                src="/headshot.webp"
                className="h-32 w-32 rounded-full border-4 border-white"
                alt="Clarice Bouwer head shot"
                priority={true}
              />
              <div className="ml-4 flex flex-wrap gap-4">
                <Socials />
              </div>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <Link
                href={latestArticle.slug}
                className="flex w-fit items-center justify-center gap-2 rounded-3xl bg-pink-600 px-3 py-1 text-xs font-medium whitespace-nowrap text-pink-100 ring-4 ring-pink-900"
              >
                <FaMagic /> Latest article
              </Link>
              <Link
                href={latestArticle.slug}
                className="text-xs font-medium text-gray-600 hover:underline dark:text-gray-300"
              >
                {latestArticle.title}
              </Link>
            </div>
            <h1 className="mb-8 max-w-sm text-4xl font-extrabold tracking-tighter text-black md:max-w-3xl md:text-5xl lg:max-w-5xl lg:leading-16 xl:text-6xl dark:text-white">
              Leading teams with{" "}
              <span className="bg-linear-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
                empathy
              </span>{" "}
              &amp; crafting software with{" "}
              <span className="bg-linear-to-r from-violet-400 to-pink-600 bg-clip-text text-transparent">
                precision
              </span>
              .
            </h1>
            <p className="mb-6 max-w-sm font-light text-gray-500 md:max-w-3xl md:text-lg lg:mb-8 lg:max-w-5xl dark:text-gray-300">
              A highly accomplished and passionate polyglot full-stack software engineer with{" "}
              {new Date().getFullYear() - 2005} years of experience delivering impactful digital
              solutions across diverse industries, including digital media, event registration,
              cloud computing, and InsureTech demonstrating strong leadership skills and a diverse
              technical skill set including DevOps and Artificial Intelligence.
            </p>
            <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 dark:text-gray-300">
              Currently co-leading a remote team of 15 across Cloudsure Limited and Simply Financial
              Services, where I spearhead the development of a cutting-edge digital life insurance
              platform using Clojure-based polylith architecture on a complex distributed system
              with over 15 repositories. Proven track record for driving innovation and leading
              high-performing teams through systems thinking and empathy.
            </p>
            <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 dark:text-gray-300">
              Dedicated to crafting elegant, high-quality code, fostering strong development
              practices, and delivering exceptional user experiences.
            </p>
            <Link
              href="/resume"
              className="mr-3 inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              About me
              <svg
                className="-mr-1 ml-2 h-5 w-5"
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
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              My blog
            </Link>
          </div>
          <div className="hidden justify-end lg:col-span-4 lg:mt-0 lg:flex">
            <div>
              <div className="flex flex-col items-center justify-center">
                <ImageContainer
                  width={210}
                  height={210}
                  src="/headshot.webp"
                  className="h-[210px] w-[210px] rounded-full border-8 border-white object-cover"
                  alt="Clarice Bouwer head shot"
                  priority={true}
                />
                <div className="mt-2 text-center font-bold">Clarice Bouwer</div>
                <div className="mb-4 text-center">Senior Software Engineer</div>
              </div>
              <div className="mt-4 flex justify-around gap-4">
                <Socials />
              </div>
              <div className="mt-8 flex items-center justify-center gap-4">
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
      <hr className="border-t-blue-400 dark:border-t-blue-900" />
      <section className="bg-blue-600 dark:bg-blue-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="mx-auto mb-8 max-w-sm px-5 md:max-w-3xl lg:mb-16 lg:max-w-5xl">
            <h2 className="mt-8 mb-4 text-3xl leading-tight font-extrabold tracking-tighter text-white md:text-4xl lg:mb-6">
              I learn things, then I share knowledge
            </h2>
            <p className="font-light text-white sm:text-lg">
              I love learning new things and how to improve on existing things, so I share the gems
              I uncover along the way. ✨
            </p>
          </div>
          <div className="mx-auto max-w-sm space-y-8 px-5 md:grid md:max-w-3xl md:grid-cols-2 md:gap-8 md:space-y-0 lg:max-w-5xl lg:grid-cols-3 xl:gap-12">
            <Tags
              heading="Soft Skills"
              tags={["Mindset", "Relationships", "Communication", "Productivity", "Personal brand"]}
              className="bg-yellow-900"
              icon={<FaPeopleGroup className="size-8 text-yellow-300" />}
            />
            <Tags
              heading="Software Engineering"
              tags={["JavaScript", "Clojure", "ClojureScript", "React"]}
              className="bg-green-900"
              icon={<BiCodeCurly className="size-8 text-green-300" />}
            />
            <Tags
              heading="Engineering Toolkit"
              tags={["Visual Studio Code", "MacOS", "DevTools", "Storybook", "Git"]}
              className="bg-purple-900"
              icon={<TbTools className="size-8 text-purple-300" />}
            />
          </div>
        </div>
      </section>
      <hr className="border-blue-400 dark:border-blue-900" />
      <aside
        aria-label="Related articles"
        className="bg-white py-8 antialiased lg:py-16 dark:bg-gray-900"
      >
        <div className="mx-auto w-full max-w-sm px-4 md:max-w-3xl lg:max-w-5xl">
          <h2 className="mt-8 mb-4 text-3xl leading-tight font-extrabold tracking-tighter text-gray-900 md:text-4xl lg:mb-8 dark:text-white">
            Featured articles
          </h2>
          <div>
            <div className="relative">
              <div className="mb-4 bg-white duration-700 ease-in-out dark:bg-gray-900">
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
