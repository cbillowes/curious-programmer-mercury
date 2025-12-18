import { cn } from '@/lib/utils';
import { Tooltip } from 'flowbite-react';
import { ReactNode, useState } from 'react';
import { FaLink } from 'react-icons/fa6';

export function getHeadingId(children: string | ReactNode) {
  return typeof children === 'string'
    ? children.replace(/\s+/g, '-').toLowerCase()
    : '';
}

export function HeadingLink({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: string | ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = window.location.href.split('#')[0];
    await navigator.clipboard.writeText(`${url}#${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="heading flex items-center justify-start gap-1">
      <button
        onClick={handleCopy}
        className="heading-anchor text-black! dark:text-white! cursor-pointer"
        aria-label={copied ? 'Link copied!' : 'Copy link to heading'}
      >
        <Tooltip
          content={copied ? 'Link copied!' : 'Copy link to heading'}
          className="z-50"
        >
          <a href={`#${id}`}>
            <FaLink
              className={cn(
                'text-gray-800 dark:text-gray-100 opacity-50 size-4 cursor-pointer hover:opacity-100',
                className,
              )}
            />
          </a>
        </Tooltip>
      </button>
      <a id={id} className="heading"></a>
      {children}
    </div>
  );
}
