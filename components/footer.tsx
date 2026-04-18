import Link from "next/link";
import { useThemeMode } from "flowbite-react";
import GitHubButton from "react-github-btn";

import { ImageContainer } from "@/components/image-container";

export function Footer() {
  const { mode } = useThemeMode();

  return (
    <footer className="border-t border-b border-gray-300 bg-white p-4 md:p-8 lg:p-10 dark:border-gray-600 dark:bg-gray-800 print:hidden">
      <div className="mx-auto max-w-7xl text-center">
        <Link
          href="/"
          className="flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <ImageContainer
            width={44}
            height={44}
            src={mode === "dark" ? "/icon-dark.webp" : "/icon-light.webp"}
            alt="Curious Programmer"
            priority={true}
            fill={false}
          />
        </Link>
        <p className="my-6 text-gray-500 dark:text-gray-400">
          Curious Programmer
          <br /> A curious place for a curious mind. Made with ❤️ with Next.js.
        </p>
        <div className="mb-2 flex justify-center gap-2">
          <GitHubButton
            href="https://github.com/cbillowes"
            data-color-scheme={mode}
            data-size="large"
            aria-label="Follow @cbillowes on GitHub"
          >
            Follow @cbillowes
          </GitHubButton>
          <GitHubButton
            href="https://github.com/cbillowes/curious-programmer-mercury"
            data-color-scheme={mode}
            data-icon="octicon-star"
            data-size="large"
            aria-label="Star cbillowes/curious-programmer-mercury on GitHub"
          >
            Star
          </GitHubButton>
        </div>
        <ul className="mb-6 flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
          <li>
            <a href="/privacy" className="mr-4 hover:underline md:mr-6">
              Privacy policy
            </a>
          </li>
          <li>
            <a href="/community" className="mr-4 hover:underline md:mr-6">
              Community guidelines
            </a>
          </li>
          <li>
            <a
              href="https://github.com/cbillowes/curious-programmer-mercury"
              className="mr-4 hover:underline md:mr-6"
            >
              Source code
            </a>
          </li>
          <li>
            <a
              href="https://react-icons.github.io/react-icons/"
              className="mr-4 hover:underline md:mr-6"
            >
              React icons
            </a>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2015-{new Date().getFullYear()}{" "}
          <Link href="/" className="hover:underline">
            Curious Programmer
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
