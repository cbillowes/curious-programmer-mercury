import Link from 'next/link';
import { useThemeMode } from 'flowbite-react';
import { ImageContainer } from '@/components/image-container';
import GitHubButton from 'react-github-btn';

export function Footer() {
  const { mode } = useThemeMode();

  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800 border-t border-b border-gray-300 dark:border-gray-600 print:hidden">
      <div className="mx-auto max-w-7xl text-center">
        <Link
          href="/"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <ImageContainer
            width={44}
            height={44}
            src={mode === 'dark' ? '/icon-dark.webp' : '/icon-light.webp'}
            alt="Curious Programmer"
            priority={true}
            fill={false}
          />
        </Link>
        <p className="my-6 text-gray-500 dark:text-gray-400">
          Curious Programmer
          <br /> A curious place for a curious mind. Made with ❤️ with Next.js.
        </p>
        <div className="flex justify-center gap-2 mb-2">
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
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
            <a
              href="https://curiousprogrammer.dev/privacy"
              className="mr-4 hover:underline md:mr-6 "
            >
              Privacy policy
            </a>
          </li>
          <li>
            <a
              href="https://curiousprogrammer.dev/community"
              className="mr-4 hover:underline md:mr-6"
            >
              Community guidelines
            </a>
          </li>
          <li>
            <a
              href="https://github.com/cbillowes/curious-programmer-mercury"
              className="mr-4 hover:underline md:mr-6 "
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
          © 2015-{new Date().getFullYear()}{' '}
          <Link href="/" className="hover:underline">
            Curious Programmer
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
