import { cn, slugify } from "@/lib/utils";
import { Link } from "@/components/link";

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
    <Link href={`/tag/${slugify(tag)}`} className={className}>
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

export function Tags({ tags, isButton, redirect, additionalClasses }: TagsProps) {
  if (tags && tags.length === 0) return <span></span>;

  const prefix = isButton ? "" : "#";

  return (
    tags && (
      <div className="flex flex-wrap justify-center">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            tag={tag}
            className={cn(
              "transition-colors",
              isButton &&
                "mx-1 mt-4 inline-block rounded bg-yellow-300 px-4 py-1 text-yellow-900 hover:bg-pink-600 hover:text-white",
              !isButton &&
                "ml-2 leading-loose text-black hover:text-pink-600 dark:text-white hover:dark:text-pink-400",
              redirect && "cursor-pointer",
              additionalClasses,
            )}
            prefix={prefix}
            redirect={redirect}
          />
        ))}
      </div>
    )
  );
}
