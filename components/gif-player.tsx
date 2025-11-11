'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';

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
  alt = 'GIF animation',
}: {
  src: string;
  still: string;
  alt?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      setIsLoading(true);
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoading(false);
      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
      };
    }
  }, [isPlaying, src]);

  if (hasError) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Failed to load GIF
      </div>
    );
  }

  return (
    <div className="relative inline-block group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={isPlaying ? src : still}
        alt={alt}
        className="max-w-full h-auto rounded-lg"
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        disabled={isLoading}
        className="absolute bottom-4 right-4 p-2 bg-black/70 hover:bg-black/90 disabled:opacity-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
        aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
}
