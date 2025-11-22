import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <>
      <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800 border-t border-b border-gray-300 dark:border-gray-600 print:hidden">
        <div className="mx-auto max-w-7xl text-center">
          <Link
            href="/"
            className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <div className="block dark:hidden">
              <Image
                src="/icon-light.webp"
                alt="Curious Programmer"
                className="h-11 w-11"
                width={44}
                height={44}
              />
            </div>
            <div className="hidden dark:block">
              <Image
                src="/icon-dark.webp"
                alt="Curious Programmer"
                className="h-11 w-11"
                width={44}
                height={44}
              />
            </div>
          </Link>
          <p className="my-6 text-gray-500 dark:text-gray-400">
            Curious Programmer
            <br /> A curious place for a curious mind. Made with ❤️ with Next.js.
          </p>
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
                href="https://github.com/cbillowes/curious-programmer-tungsten"
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
    </>
  );
}
