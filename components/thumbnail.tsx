import { Credit } from '@/components/credit';
import { FeaturedBadge } from '@/components/articles';
import { ImageContainer } from '@/components/image-container';

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
      <ImageContainer
        width={width ?? 200}
        height={height ?? 150}
        className={className}
        containerClassName="w-full!"
        src={src}
        alt={alt}
      />
      <Credit
        credit={credit}
        creditSource={creditSource}
        creditLink={creditLink}
      />
    </div>
  );
}
