import { cn } from '@/lib/utils';
import NextLink from 'next/link';

export function Link(props: React.ComponentProps<'a'>) {
  const { href, className, children, ...rest } = props;
  const combinedClassName = cn(
    'text-blue-600 hover:underline dark:text-blue-400',
    className,
  );

  if (typeof href === 'string' && href.startsWith('http')) {
    return (
      <a
        {...rest}
        href={href}
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href ?? ''} className={combinedClassName} {...rest}>
      {children}
    </NextLink>
  );
}
