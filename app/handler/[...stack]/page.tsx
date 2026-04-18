import { StackHandler } from "@stackframe/stack";

import { getPageMetadata } from "@/lib/utils";
import { Page } from "@/components/page";

export async function generateMetadata() {
  return getPageMetadata({
    title: "Account | Curious Programmer",
    description:
      "Your gateway to exclusive content and personalized settings on Curious Programmer.",
    slug: "handler",
    image: "/home.png",
    type: "website",
  });
}

export default function Handler() {
  return (
    <Page>
      <div className="mx-auto max-w-sm px-5 py-8 md:max-w-3xl lg:max-w-5xl">
        <StackHandler fullPage />
      </div>
    </Page>
  );
}
