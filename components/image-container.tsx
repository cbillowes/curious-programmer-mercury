import { cn } from '@/lib/utils';
import Image from 'next/image';

export function ImageContainer({
  width,
  height,
  src,
  alt,
  className,
  containerClassName,
  priority = false,
  fill = true,
}: {
  width: number;
  height: number;
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  return (
    <div
      className={cn('relative max-w-full', containerClassName)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Image
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        src={src}
        alt={alt}
        className={cn(fill ? 'object-cover' : 'object-contain', className)}
        priority={priority}
        fill={fill}
      />
    </div>
  );
}
