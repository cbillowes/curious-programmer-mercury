'use client';

import { cn, getSignInUrlWithReturnTo } from '@/lib/utils';
import { Button, Spinner, Tooltip } from 'flowbite-react';
import { useStackApp } from '@stackframe/stack';
import { useEffect, useState } from 'react';
import { FaBookmark } from 'react-icons/fa6';
import { FiBookmark } from 'react-icons/fi';

export function Bookmark({
  slug,
  bookmarks = [],
  onChange,
}: {
  slug: string;
  bookmarks: string[];
  onChange?: (bookmarked: boolean) => void;
}) {
  const stackApp = useStackApp();
  const bookmarked = bookmarks.includes(slug);
  const [content, setContent] = useState(
    bookmarked ? 'Bookmarked' : 'Add to your bookmarks',
  );
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [isBusy, setIsBusy] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await stackApp.getUser();
      setIsSignedIn(!!user?.id);
    })();
  }, [stackApp]);

  const handleBookmark = async () => {
    setIsBusy(true);
    const result = await fetch('/api/bookmark/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug, bookmark: !isBookmarked }),
    });
    const { message, added } = await result.json();
    setContent(message);
    setIsBookmarked(added);
    setIsBusy(false);
    if (onChange) {
      onChange(added);
    }
  };

  if (!isSignedIn) {
    return (
      <Tooltip
        content="You need to be signed in to bookmark this"
        placement="top"
      >
        <Button
          href={getSignInUrlWithReturnTo()}
          color="alternative"
          size="xs"
          className={cn(
            'cursor-pointer inline-flex gap-2 items-center font-medium text-gray-900 dark:text-white',
          )}
        >
          <FiBookmark aria-label="Bookmark this" size={16} />
        </Button>
      </Tooltip>
    );
  }

  return (
    <Tooltip content={content} placement="top">
      <Button
        onClick={handleBookmark}
        color="alternative"
        size="xs"
        className={cn(
          'cursor-pointer inline-flex gap-2 items-center font-medium text-gray-900 dark:text-white',
          isBookmarked && 'text-gray-900 dark:text-white',
        )}
      >
        {isBusy ? (
          <Spinner size="sm" />
        ) : isBookmarked ? (
          <FaBookmark aria-label="Remove your bookmark" size={16} />
        ) : (
          <FiBookmark aria-label="Bookmark this" size={16} />
        )}
      </Button>
    </Tooltip>
  );
}
