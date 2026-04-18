import { Article, Course, Scribble } from "@/.content-collections/generated";
import { Badge } from "flowbite-react";

import { cn, slugifyTag } from "@/lib/utils";
import { Bookmark } from "@/components/bookmark";
import { ImageContainer } from "@/components/image-container";
import { Like } from "@/components/like";
import { Link } from "@/components/link";
import { Metadata } from "@/components/metadata";
import { Ribbon } from "@/components/ribbon";
import { Thumbnail } from "@/components/thumbnail";
import { Type } from "@/components/type";

export function Preview({
  index,
  data,
  bookmarks,
  likes,
}: {
  index: number;
  data: Article | Scribble | Course;
  bookmarks: string[];
  likes: string[];
}) {
  const isEven = index % 2 === 0;
  const { title, slug, date, abstract, tags, number, timeToRead, cover, type } = data;
  return (
    <section
      key={index}
      className={cn(
        "relative mx-auto flex max-w-full flex-col-reverse justify-center p-5 md:mt-12 md:w-6/12 xl:mb-16 xl:w-screen",
        isEven ? "xl:flex-row-reverse" : "xl:flex-row",
      )}
    >
      <div
        className={cn(
          `border-none border-gray-300 xl:mx-8 xl:w-1/2 xl:border-dashed dark:border-gray-600`,
          isEven ? "xl:border-l xl:pl-8 xl:text-left" : "xl:border-r xl:pr-8 xl:text-right",
        )}
      >
        <Type
          type={type}
          className={cn(
            "hidden xl:inline-block",
            isEven ? "xl:items-start xl:text-left" : "xl:items-end xl:text-right",
          )}
        />
        <h2
          className={cn(
            "mt-8 text-2xl font-bold tracking-tighter md:text-4xl xl:mt-0",
            "hover:bg-linear-to-r hover:bg-clip-text hover:text-transparent",
            type === "scribble" && "hover:from-blue-600 hover:to-green-600",
            type === "article" && "hover:from-pink-600 hover:to-blue-600",
            type === "course" && "hover:from-violet-600 hover:to-red-600",
          )}
        >
          <Link href={slug} title={title}>
            {title}
          </Link>
        </h2>
        <div className="mb-4 leading-loose">
          <div
            className={cn(
              "mb-3 flex items-center space-x-2",
              isEven ? "xl:justify-start" : "xl:flex-row-reverse",
            )}
          >
            <ImageContainer
              width={32}
              height={32}
              className={cn("rounded-full border-2 border-white", isEven ? "xl:mr-2" : "xl:ml-4")}
              src="/headshot.webp"
              alt="Clarice Bouwer"
              priority={true}
              fill={true}
            />
            <div className="font-medium dark:text-white">
              <div>Clarice Bouwer</div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <Metadata date={date} timeToRead={timeToRead} type={type} />
              </div>
            </div>
          </div>
          <p className={cn("mt-2 text-lg font-light", isEven ? "xl:text-left" : "xl:text-right")}>
            {abstract}
          </p>
        </div>
        <div
          className={`flex flex-wrap items-center gap-2 ${
            isEven ? "xl:flex-row" : "xl:flex-row-reverse"
          }`}
        >
          {slug && <Bookmark bookmarks={bookmarks} slug={slug} />}
          {slug && <Like likes={likes} slug={slug} />}
          <Link
            role="button"
            className={cn(
              "transform rounded bg-pink-600 px-3 py-1 text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-600",
              isEven ? "xl:mr-2" : "xl:ml-4",
            )}
            href={slug}
            title={title}
          >
            Read more
          </Link>
          <div
            className={cn(
              "mt-3 flex w-full flex-wrap gap-2",
              isEven ? "xl:justify-start" : "xl:justify-end",
            )}
          >
            {tags?.map((tag) => (
              <Link key={tag} href={slugifyTag(tag)}>
                <Badge key={tag} className="rounded-sm px-2 py-1 text-sm font-medium">
                  # {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "relative w-full text-left xl:w-1/2",
          isEven ? "xl:text-right" : "xl:text-left",
        )}
      >
        <Ribbon>#{number}</Ribbon>
        <div className={cn(isEven ? "xl:justify-end" : "xl:justify-start")}>
          <Thumbnail
            width={575}
            height={350}
            src={cover ?? "default-01.png"}
            alt={title ?? "Hero image"}
            className="w-full rounded-lg"
            credit={data.credit}
            creditLink={data.creditLink}
            creditSource={data.creditSource}
            featured={data.featured}
          />
        </div>
      </div>
    </section>
  );
}
