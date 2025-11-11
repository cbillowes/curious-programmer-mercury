import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import removeMd from 'remove-markdown';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const toDateString = (date: Date) => {
  return new Date(date).toLocaleDateString('en-MU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown
  const text = removeMd(content).replace(/\s+/g, ' ').trim();

  // If content is shorter than maxLength, return as is
  if (text.length <= maxLength) {
    return text;
  }

  // Cut at maxLength and find last complete word
  let excerpt = text.slice(0, maxLength);
  const lastSpace = excerpt.lastIndexOf(' ');

  if (lastSpace > 0) {
    excerpt = excerpt.slice(0, lastSpace);
  }

  return excerpt + '...';
}
