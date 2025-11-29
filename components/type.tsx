import { cn } from '@/lib/utils';
import { Link } from './link';
import { TbBook, TbSchool, TbScribble } from 'react-icons/tb';

export function Type({
  type,
  className,
  showType = true,
}: {
  type: 'scribble' | 'article' | 'course' | 'page';
  className?: string;
  showType?: boolean;
}) {
  return (
    <div
      className={cn(
        `uppercase mb-6 text-center mt-5 xl:mt-0 flex flex-col items-center`,
        className,
      )}
    >
      <span
        className={cn(
          'flex items-center justify-center w-12 h-12 rounded-full text-4xl -start-3 ring-8 mb-4 text-white',
          type === 'scribble' && 'bg-blue-500 ring-blue-300',
          type === 'article' && 'bg-pink-500 ring-pink-300',
          type === 'course' && 'bg-violet-500 ring-violet-300',
          type === 'page' && 'bg-red-500 ring-red-300',
        )}
      >
        {type === 'scribble' && (
          <Link href="/scribbles">
            <TbScribble />
          </Link>
        )}
        {type === 'article' && (
          <Link href="/blog">
            <TbBook />
          </Link>
        )}
        {['course', 'page'].includes(type) && (
          <Link href="/courses">
            <TbSchool />
          </Link>
        )}
      </span>
      {showType && type}
    </div>
  );
}
