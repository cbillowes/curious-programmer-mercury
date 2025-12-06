import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Credit } from '@/components/credit';
import { FeaturedBadge } from '@/components/articles';

function ThumbnailImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const classNames = cn(`w-full object-cover w-full h-50`, className);
  if (src.startsWith('http')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={classNames}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    );
  }
  return (
    <Image
      className={classNames}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

export function Thumbnail({
  src,
  alt,
  width,
  height,
  className,
  credit,
  creditSource,
  creditLink,
  featured,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  credit?: string;
  creditSource?: string;
  creditLink?: string;
  featured?: boolean;
}) {
  return (
    <div className="relative">
      {featured && (
        <div className="absolute top-2 left-2 bg-white rounded-md px-2 py-1 shadow-md z-10">
          <FeaturedBadge featured={featured} />
        </div>
      )}
      <ThumbnailImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
      <Credit
        credit={credit}
        creditSource={creditSource}
        creditLink={creditLink}
      />
    </div>
  );
}
