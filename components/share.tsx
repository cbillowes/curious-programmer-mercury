import { WEBSITE_URL } from '@/lib/config';
import {
  FaHackerNewsSquare,
  FaRedditSquare,
  FaWhatsappSquare,
} from 'react-icons/fa';
import {
  FaBluesky,
  FaFacebook,
  FaLinkedin,
  FaMastodon,
  FaSquareThreads,
  FaTelegram,
} from 'react-icons/fa6';

export function ShareWidget({ title, url }: { title: string; url: string }) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(`${WEBSITE_URL}/${url}`);
  return (
    <section className="mt-8 p-8">
      <h2 className="mb-8 mx-2 text-center">Share this article on…</h2>
      <ul className="flex gap-8 justify-center items-center flex-wrap w-full">
        <li>
          <a
            href={`https://tootpick.org/#text=${encodedTitle}%20-%20${encodedUrl}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="block hover:bg-white rounded-full border-2 border-transparent hover:border-white"
          >
            <FaMastodon className="text-4xl text-gray-700 dark:text-gray-200 hover:text-[#1877F2] hover:dark:text-[#1877F2]" />
          </a>
        </li>
        <li>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="block hover:bg-white rounded-full border-2 border-transparent hover:border-white"
          >
            <FaFacebook className="text-4xl text-gray-700 dark:text-gray-200 hover:text-[#1877F2] hover:dark:text-[#1877F2]" />
          </a>
        </li>
        <li className="text-white">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="block hover:bg-white rounded-md border-2 border-transparent"
          >
            <FaLinkedin className="text-4xl text-gray-700 dark:text-gray-200 hover:text-[#0077B5] hover:dark:text-[#0077B5]" />
          </a>
        </li>
        <li>
          <a
            href={`https://bsky.app/intent/compose?text=${encodedTitle}%20-%20${encodedUrl}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="block border-2 border-transparent"
          >
            <FaBluesky className="text-4xl text-gray-700 dark:text-gray-200 hover:text-[#0085ff] hover:dark:text-[#0085ff]" />
          </a>
        </li>
        <li>
          <a
            href={`https://www.threads.net/intent/post?url=${encodedUrl}&amp;text=${encodedTitle}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="block hover:bg-white rounded-md border-2 border-transparent"
          >
            <FaSquareThreads className="text-4xl text-gray-700 dark:text-gray-200 hover:text-[#000000] hover:dark:text-[#000000]" />
          </a>
        </li>
        <li>
          <a
            href={`https://www.reddit.com/submit?url=${encodedUrl}&amp;title=${encodedTitle}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="block hover:bg-white rounded-md border-2 border-transparent"
          >
            <FaRedditSquare className="text-4xl text-gray-700 dark:text-gray-200 hover:text-[#FF4500] hover:dark:text-[#FF4500]" />
          </a>
        </li>
        <li>
          <a
            href={`https://news.ycombinator.com/submitlink?u=${encodedUrl}&amp;t=${encodedTitle}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="block hover:bg-white rounded-md border-2 border-transparent"
          >
            <FaHackerNewsSquare className="text-4xl text-gray-700 dark:text-gray-200 hover:text-[#fd6600] hover:dark:text-[#fd6600]" />
          </a>
        </li>
        <li>
          <a
            href={`https://api.whatsapp.com/send/?text=${encodedUrl}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="block hover:bg-white rounded-md border-2 border-transparent"
          >
            <FaWhatsappSquare className="text-4xl text-gray-700 dark:text-gray-200 hover:text-[#075E54] hover:dark:text-[#075E54]" />
          </a>
        </li>
        <li>
          <a
            href={`https://telegram.me/share/url?url=${encodedUrl}&amp;text=${encodedTitle}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="block hover:bg-white rounded-full border-2 border-transparent hover:border-white"
          >
            <FaTelegram className="text-4xl text-gray-700 dark:text-gray-200 hover:text-[#24A1DE] hover:dark:text-[#24A1DE]" />
          </a>
        </li>
      </ul>
    </section>
  );
}
