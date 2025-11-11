import { cn } from '@/lib/utils';
import { Link } from './link';
import _ from 'lodash';

type TagProps = {
  tag: string;
  prefix: string;
  className?: string;
  redirect?: boolean;
};

export function Tag({ tag, prefix, className, redirect }: TagProps) {
  if (!tag) return <span></span>;
  if (!redirect)
    return (
      <span className={className}>
        {prefix}
        {tag}
      </span>
    );
  return (
    <Link
      href={`/tag/${_.kebabCase(tag)}`}
      title={tag.toLowerCase()}
      className={className}
    >
      {prefix}
      {tag}
    </Link>
  );
}

type TagsProps = {
  tags: string[];
  isButton?: boolean;
  redirect?: boolean;
  additionalClasses?: string;
};

export function Tags({
  tags,
  isButton,
  redirect,
  additionalClasses,
}: TagsProps) {
  if (tags && tags.length === 0) return <span></span>;

  const prefix = isButton ? '' : '#';

  return (
    tags &&
    tags.map((tag, index) => {
      return (
        <Tag
          key={index}
          tag={tag}
          className={cn(
            'transition-colors',
            isButton &&
              'py-1 bg-primary-600 text-primary-200 px-4 rounded mx-1 mt-4 inline-block hover:text-white hover:bg-pink-600',
            !isButton &&
              'ml-2 text-black dark:text-white leading-loose hover:text-pink-600 hover:dark:text-pink-400',
            redirect && 'cursor-pointer',
            additionalClasses,
          )}
          prefix={prefix}
          redirect={redirect}
        />
      );
    })
  );
}
