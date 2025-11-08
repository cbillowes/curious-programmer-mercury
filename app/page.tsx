import Backdrop from '@/components/backdrop';
import { getArticles } from '@/lib/articles';
import { getCourses } from '@/lib/courses';
import { getResume } from '@/lib/resume';
import { getScribbles } from '@/lib/scribbles';
import Image from 'next/image';
import { Link } from '@/components/link';
import { FaNodeJs } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa6';
import { RiNextjsFill } from 'react-icons/ri';
import { SiClojure, SiGooglecloud } from 'react-icons/si';

function Socials() {
  return (
    <>
      <Link
        href="https://github.com/cbillowes"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
      >
        <FaGithub className="text-black dark:text-white text-2xl" />
      </Link>
      <Link
        href="https://www.linkedin.com/in/cbouwer/"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
      >
        <FaLinkedin className="text-black dark:text-white text-2xl" />
      </Link>
      <Link
        href="https://stackoverflow.com/users/849986/clarice-bouwer"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
      >
        <FaStackOverflow className="text-black dark:text-white text-2xl" />
      </Link>
      <div>
        |
      </div>
      <Link
        href="https://clojure.org/"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
      >
        <SiClojure className="text-black dark:text-white text-2xl" />
      </Link>
      <Link
        href="https://nodejs.org/"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
      >
        <FaNodeJs className="text-black dark:text-white text-2xl" />
      </Link>
      <Link
        href="https://nextjs.org/"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
      >
        <RiNextjsFill className="text-black dark:text-white text-2xl" />
      </Link>
      <Link
        href="https://cloud.google.com/"
        className="flex justify-center items-center hover:scale-125 transition-all duration-300"
      >
        <SiGooglecloud className="text-black dark:text-white text-2xl" />
      </Link>
    </>
  );
}

export default function Home() {
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 py-5">
        <Backdrop />
        <div className="px-4 sm:px-32 grid max-w-7xl xl:px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <div className="lg:hidden flex items-center justify-start">
              <Image
                src="/headshot.webp"
                className="w-32 h-32 object-cover"
                alt="Clarice Bouwer head shot"
                width={128}
                height={128}
              />
              <div className="flex gap-4 ml-4 flex-wrap">
                <Socials />
              </div>
            </div>
            <h1 className="max-w-2xl mb-8 text-4xl font-extrabold tracking-tighter lg:leading-16 md:text-5xl xl:text-6xl text-black dark:text-white">
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
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">
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
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black dark:text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
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
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 text-black dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              My blog
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <div>
              <div className="flex justify-center items-center flex-col">
                <Image
                  src="/headshot.webp"
                  className="w-[300px] h-[300px] object-cover"
                  alt="Clarice Bouwer head shot"
                  width={910}
                  height={910}
                />
                <div className="mt-2 text-center font-bold">Clarice Bouwer</div>
                <div className="mb-4 text-center">Senior Software Engineer</div>
              </div>
              <div className="flex gap-4 justify-around mt-4">
                <Socials />
              </div>
              <div className="mt-8 flex justify-center items-center">
                <Image
                  src="/unicorn.png"
                  alt="Unicorn emoji"
                  className="inline-block w-16 h-16 ml-4"
                  width={64}
                  height={64}
                />
                <Image
                  src="/mac.png"
                  alt="Woman technologist emoji"
                  className="inline-block w-16 h-16 ml-4"
                  width={64}
                  height={64}
                />
                <Image
                  src="/rocket.png"
                  alt="Rocket emoji"
                  className="inline-block w-16 h-16 ml-4"
                  width={64}
                  height={64}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="dark:border-blue-900 border-blue-400" />
      <section className="bg-gray-100 dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-7xl sm:py-16 lg:px-6">
          <div className="max-w-3xl mb-8 lg:mb-16">
            <h2 className="mt-8 mb-4 lg:mb-8 text-3xl font-extrabold tracking-tighter leading-tight text-gray-900 text-black dark:text-white md:text-4xl">
              I learn things, then I share knowledge
            </h2>
            <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
              I&rsquo;m love learning new things or how to improve on existing
              things, so I share the gems I uncover along the way. ✨
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 bg-primary-100 rounded dark:bg-primary-900 lg:h-16 lg:w-16">
                <svg
                  className="w-5 h-5 text-primary-600 dark:text-primary-300 lg:w-8 lg:h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                Soft Skills
              </h3>
              <ul className="my-6 lg:mb-0 space-y-4">
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-primary-600 dark:text-primary-500"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/mindset">Mindset</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-primary-600 dark:text-primary-500"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/relationships">Relationships</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-primary-600 dark:text-primary-500"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/communication">Communication</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-primary-600 dark:text-primary-500"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/productivity">Productivity</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-primary-600 dark:text-primary-500"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/personal-brand">Personal brand</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-primary-600 dark:text-primary-500"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tags">...and more</Link>
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 bg-purple-100 rounded dark:bg-purple-900 lg:h-16 lg:w-16">
                <svg
                  className="w-5 h-5 text-purple-600 dark:text-purple-300 lg:w-8 lg:h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                Software Engineering
              </h3>
              <ul className="my-6 lg:mb-0 space-y-4">
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-purple-600 dark:text-purple-500"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/java-script">JavaScript</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-purple-600 dark:text-purple-500"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/clojure">Clojure</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-purple-600 dark:text-purple-500"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/clojure-script">ClojureScript</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-purple-600 dark:text-purple-500"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/react">React</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-purple-600 dark:text-purple-500"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tags">...and more</Link>
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 bg-teal-100 rounded dark:bg-teal-900 lg:h-16 lg:w-16">
                <svg
                  className="w-5 h-5 text-teal-600 dark:text-teal-300 lg:w-8 lg:h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                Engineering Toolkit
              </h3>
              <ul className="my-6 lg:mb-0 space-y-4">
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-teal-500 dark:text-teal-400"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/visual-studio-code">
                      Visual Studio Code
                    </Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-teal-500 dark:text-teal-400"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/mac-os">MacOS</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-teal-500 dark:text-teal-400"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/dev-tools">DevTools</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-teal-500 dark:text-teal-400"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/storybook">Storybook</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-teal-500 dark:text-teal-400"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tag/git">Git</Link>
                  </span>
                </li>
                <li className="flex space-x-2.5">
                  <svg
                    className="shrink-0 w-5 h-5 text-teal-500 dark:text-teal-400"
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
                  <span className="leading-tight text-gray-500 dark:text-gray-400">
                    <Link href="/tags">...and more</Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <hr className="dark:border-blue-900 border-blue-400" />
      <aside
        aria-label="Related articles"
        className="py-8 bg-white dark:bg-gray-900 lg:py-16 antialiased"
      >
        <div className="px-4 mx-auto w-full max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Featured articles
          </h2>
          <div>
            <div className="relative">
              <div className="bg-white duration-700 ease-in-out dark:bg-gray-900 mb-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {/* {edges.map(({ node }) => (
                    <article
                      key={node.fields.slug}
                      className="relative p-4 mx-auto w-full bg-white rounded-lg shadow-md border border-gray-200 dark:border-gray-800 dark:bg-gray-800"
                    >
                      <Ribbon>#{node.fields.number}</Ribbon>
                      <Link href={node.fields.slug}>
                        <Thumbnail {...node.fields.hero} />
                      </Link>
                      <div className="flex items-center mb-3 space-x-2">
                        <Image
                          className="w-8 h-8 rounded-full"
                          src="/avatar.png"
                          alt="Clarice Bouwer"
                        />
                        <div className="font-medium text-black dark:text-white">
                          <div>Clarice Bouwer</div>
                          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <Metadata
                              date={node.fields.date}
                              timeToRead={node.timeToRead}
                              type={node.fields.type}
                            />
                          </div>
                        </div>
                      </div>
                      <h3 className="mb-2 text-xl font-bold tracking-tighter text-gray-900 lg:text-2xl text-black dark:text-white">
                        <Link href={node.fields.slug}>
                          {node.frontmatter.title}
                        </Link>
                      </h3>
                      <p className="mb-3 text-gray-500 dark:text-gray-400">
                        {node.excerpt}
                      </p>
                      <Link
                        href={node.fields.slug}
                        className="inline-flex items-center font-medium
                          text-primary-600 hover:text-blue-800
                          dark:text-primary-500 hover:dark:text-blue-600 hover:no-underline"
                      >
                        {' '}
                        Read more{' '}
                        <svg
                          className="mt-px ml-1 w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                    </article>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
