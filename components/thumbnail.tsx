import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Credit } from '@/components/credit';

function ThumbnailImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const classNames = cn(`w-full object-cover w-full h-50`);
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
  credit,
  creditSource,
  creditLink,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
  creditSource?: string;
  creditLink?: string;
}) {
  return (
    <div className="relative">
      <ThumbnailImage src={src} alt={alt} width={width} height={height} />
      <Credit
        credit={credit}
        creditSource={creditSource}
        creditLink={creditLink}
      />
    </div>
  );
}
