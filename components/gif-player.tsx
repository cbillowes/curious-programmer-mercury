"use client";

import { useState } from "react";
import { Spinner } from "flowbite-react";
import { FaPause, FaPlay } from "react-icons/fa6";

export function parseAst(text: string): {
  filename: string;
  caption: string;
  source?: string;
} | null {
  // Pattern: gif:filename.gif:caption=Some caption text (from SOURCE)"
  const gifPattern = /gif:([^:]+):caption=(.+?)(?:\s+\(from\s+([^)]+)\))?"/;
  const match = text.match(gifPattern);

  if (!match) return null;

  return {
    filename: `/articles/${match[1]}`,
    caption: match[2],
    source: match[3] || undefined,
  };
}

export function GifPlayer({
  src,
  still,
  alt = "GIF animation",
}: {
  src: string;
  still: string;
  alt?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePlayToggle = () => {
    if (!isPlaying) {
      setIsLoading(true);
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };
      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
      };
    } else {
      setIsPlaying(false);
    }
  };

  if (hasError) {
    return <div className="rounded bg-red-100 p-4 text-red-700">Failed to load GIF</div>;
  }

  return (
    <div className="text-center">
      <div className="group relative inline-block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={isPlaying ? src : still} alt={alt} className="h-auto max-w-full rounded-lg" />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Spinner size="lg" />
          </div>
        )}
        <button
          onClick={handlePlayToggle}
          disabled={isLoading}
          className="absolute right-4 bottom-4 rounded-full bg-black/70 p-2 opacity-0 transition-all group-hover:opacity-100 hover:bg-black/90 disabled:opacity-50"
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? (
            <FaPause className="h-5 w-5 text-white" />
          ) : (
            <FaPlay className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
      <p className="text-center text-sm!">{alt}</p>
    </div>
  );
}
