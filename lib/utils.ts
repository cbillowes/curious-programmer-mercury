import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import removeMd from 'remove-markdown';
import { WEBSITE_URL } from './config';

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

export function extractExcerpt(
  content: string,
  maxLength: number = 160,
): string {
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

export function toProperCase(value: string) {
  return value.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[',\.]+/gi, '')
    .replace(/[^a-z0-9]+/gi, '-');
}

export function slugifyTag(tag: string): string {
  const slug = tag.replace(/\s+/g, '-').toLowerCase();
  return `/tag/${slug}`;
}

export function getCanonicalUrl(slug: string): string {
  const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;
  return `${WEBSITE_URL}${normalizedSlug}`;
}

export function getPageMetadata({
  title,
  description,
  slug,
  image,
  date,
  type = 'website',
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
  date?: Date;
  type: 'article' | 'website';
}) {
  const canonicalUrl = getCanonicalUrl(slug);
  // These images are converted automatically through the process-webp script
  const imageUrl = getCanonicalUrl(`${image.replace('.webp', '.png')}`);
  const pageTitle = `${title} | Curious Programmer${
    title.length < 20 ? ' - A curious place for a curious mind' : ''
  }`;
  const imageExtension = imageUrl.split('.').pop()?.toLowerCase();
  const imageType =
    imageExtension === 'png'
      ? 'image/png'
      : imageExtension === 'jpg' || imageExtension === 'jpeg'
      ? 'image/jpeg'
      : imageExtension === 'gif'
      ? 'image/gif'
      : 'image/webp';

  return {
    title: pageTitle,
    authors: [{ name: 'Clarice Bouwer' }],
    description: `${description.substring(0, 140)}${
      description.length > 140 ? '...' : ''
    }`,
    imageUrl,
    url: canonicalUrl,
    type,
    openGraph: {
      siteName: 'Curious Programmer',
      title: pageTitle,
      description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: imageType,
        },
      ],
      type: type,
      publishedTime: date,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
