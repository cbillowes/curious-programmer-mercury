import { TbBook, TbSchool, TbScribble } from "react-icons/tb";

import { cn } from "@/lib/utils";
import { Link } from "@/components/link";

export function Type({
  type,
  className,
  showType = true,
}: {
  type?: "scribble" | "article" | "course" | "page";
  className?: string;
  showType?: boolean;
}) {
  if (!type) return;

  return (
    <div
      className={cn(
        `mt-5 mb-6 flex flex-col items-center text-center uppercase xl:mt-0`,
        className,
      )}
    >
      <span
        className={cn(
          "-start-3 mb-4 flex h-12 w-12 items-center justify-center rounded-full text-4xl text-white ring-8",
          type === "scribble" && "bg-blue-500 ring-blue-300",
          type === "article" && "bg-pink-500 ring-pink-300",
          type === "course" && "bg-violet-500 ring-violet-300",
          type === "page" && "bg-red-500 ring-red-300",
        )}
      >
        {type === "scribble" && (
          <Link href="/scribbles">
            <TbScribble />
          </Link>
        )}
        {type === "article" && (
          <Link href="/blog">
            <TbBook />
          </Link>
        )}
        {["course", "page"].includes(type) && (
          <Link href="/courses">
            <TbSchool />
          </Link>
        )}
      </span>
      {showType && type}
    </div>
  );
}
