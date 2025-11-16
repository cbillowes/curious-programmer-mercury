import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Thumbnail({
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
  const classNames = cn(
    `w-full object-cover w-full h-50`,
  );
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
