'use client';

import { cn } from '@/lib/utils';
import { Button, Spinner, Tooltip } from 'flowbite-react';
import { useState } from 'react';
import { FaBookmark } from 'react-icons/fa6';
import { MdBookmarkRemove } from 'react-icons/md';

export function Bookmark({
  slug,
  bookmarks,
  onChange,
}: {
  slug: string;
  bookmarks: string[];
  onChange?: (bookmarked: boolean) => void;
}) {
  const bookmarked = bookmarks.includes(slug);
  const [content, setContent] = useState(
    bookmarked ? 'Bookmarked' : 'Add to your bookmarks',
  );
  const [color, setColor] = useState('red');
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [isBusy, setIsBusy] = useState(false);

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
    setColor(added ? 'green' : 'red');
    setIsBookmarked(added);
    setIsBusy(false);
    if (onChange) {
      onChange(added);
    }
  };

  return (
    <Tooltip content={content} placement="top" color={color}>
      <Button
        title="Bookmark"
        onClick={handleBookmark}
        color="alternative"
        size="xs"
        className={cn(
          'cursor-pointer inline-flex gap-2 items-center font-medium text-gray-900 dark:text-white',
          isBookmarked && 'text-pink-600 dark:text-pink-500',
        )}
      >
        {isBusy ? (
          <Spinner size="sm" />
        ) : isBookmarked ? (
          <MdBookmarkRemove size={20} />
        ) : (
          <FaBookmark size={14} />
        )}
      </Button>
    </Tooltip>
  );
}
