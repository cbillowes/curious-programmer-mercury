"use client";

import { useEffect, useState } from "react";
import { useStackApp } from "@stackframe/stack";
import { Button, Spinner, Tooltip } from "flowbite-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { IS_DEV } from "@/lib/config";
import { cn, getSignInUrlWithReturnTo } from "@/lib/utils";

export function Like({
  slug,
  likes = [],
  onChange,
}: {
  slug: string;
  likes: string[];
  onChange?: (liked: boolean) => void;
}) {
  const stackApp = useStackApp();
  const liked = likes.includes(slug);
  const [content, setContent] = useState(liked ? "Liked" : "Add to your likes");
  const [isLiked, setIsLiked] = useState(liked);
  const [isBusy, setIsBusy] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await stackApp.getUser();
      setIsSignedIn(!!user?.id);
    })();
  }, [stackApp]);

  const handleLike = async () => {
    setIsBusy(true);
    try {
      const result = await fetch("/api/like/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, like: !isLiked }),
      });
      const { message, added } = await result.json();
      setContent(message);
      setIsLiked(added);
      if (onChange) {
        onChange(added);
      }
    } catch (error) {
      if (IS_DEV) console.error(error);
      setContent("An error occurred. Please try again later.");
    } finally {
      setIsBusy(false);
    }
  };

  if (!isSignedIn) {
    return (
      <Tooltip content="You need to be signed in to like this" placement="top">
        <Button
          href={getSignInUrlWithReturnTo()}
          color="alternative"
          size="xs"
          className={cn(
            "inline-flex cursor-pointer items-center gap-2 font-medium text-gray-900 dark:text-white",
          )}
        >
          <FaRegHeart aria-label="Like this" size={16} />
        </Button>
      </Tooltip>
    );
  }

  return (
    <Tooltip content={content} placement="top">
      <Button
        onClick={handleLike}
        color="alternative"
        size="xs"
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 font-medium text-gray-900 dark:text-white",
          isLiked && "text-gray-900 dark:text-white",
        )}
      >
        {isBusy ? (
          <Spinner size="sm" />
        ) : isLiked ? (
          <FaHeart aria-label="Remove your like" size={16} />
        ) : (
          <FaRegHeart aria-label="Like this" size={16} />
        )}
      </Button>
    </Tooltip>
  );
}
