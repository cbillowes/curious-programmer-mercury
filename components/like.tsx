'use client';

import { cn } from '@/lib/utils';
import { Button, Spinner, Tooltip } from 'flowbite-react';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { RiHeartFill } from 'react-icons/ri';

export function Like({
  slug,
  likes = [],
  onChange,
}: {
  slug: string;
  likes: string[];
  onChange?: (liked: boolean) => void;
}) {
  const liked = likes.includes(slug);
  const [content, setContent] = useState(liked ? 'Liked' : 'Add to your likes');
  const [isLiked, setIsLiked] = useState(liked);
  const [isBusy, setIsBusy] = useState(false);

  const handleLike = async () => {
    setIsBusy(true);
    const result = await fetch('/api/like/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug, like: !isLiked }),
    });
    const { message, added } = await result.json();
    setContent(message);
    setIsLiked(added);
    setIsBusy(false);
    if (onChange) {
      onChange(added);
    }
  };

  return (
    <Tooltip content={content} placement="top">
      <Button
        onClick={handleLike}
        color="alternative"
        size="xs"
        className={cn(
          'cursor-pointer inline-flex gap-2 items-center font-medium text-gray-900 dark:text-white',
          isLiked && 'text-pink-600 dark:text-pink-500',
        )}
      >
        {isBusy ? (
          <Spinner size="sm" />
        ) : isLiked ? (
          <RiHeartFill size={20} />
        ) : (
          <Heart size={14} />
        )}
      </Button>
    </Tooltip>
  );
}
