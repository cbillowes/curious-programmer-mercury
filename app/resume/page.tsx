import { ReactNode } from "react";
import Image from "next/image";
import { FaCheckCircle, FaSpider } from "react-icons/fa";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { GiDramaMasks } from "react-icons/gi";
import { SiLevelsdotfyi } from "react-icons/si";

import { cn, getPageMetadata } from "@/lib/utils";
import { Container } from "@/components/container";
import { ImageContainer } from "@/components/image-container";
import { Link } from "@/components/link";
import { Page } from "@/components/page";
import { PageHeading } from "@/components/page-heading";
import { Timeline } from "@/components/timeline";

export async function generateMetadata() {
  return getPageMetadata({
    title: "Resume",
    description:
      "A highly accomplished and passionate polyglot full-stack software engineer with 20 years of experience delivering impactful digital solutions.",
    slug: "/resume",
    image: "/hero/headshot.webp",
    type: "website",
  });
}

const Pillar = ({
  icon,
  title,
  items,
  className,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
  className?: string;
}) => {
  return (
    <aside>
      <div className={cn("flex items-center justify-center py-2 print:p-0", className)}>
        <div className="h-10 w-10 text-3xl print:hidden">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white print:text-sm">{title}</h3>
      </div>
      <ul className="my-6 space-y-4 lg:mb-0 print:my-2">
        {items?.map((item) => (
          <li key={item} className="flex space-x-2.5">
            <svg
              className={cn("h-5 w-5 shrink-0", className)}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="leading-relaxed text-gray-500 dark:text-gray-400">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

function ContactNavItems() {
  return (
    <div className="mx-auto max-w-sm text-center md:max-w-3xl lg:max-w-5xl">
      <div className="mx-auto my-2 flex flex-wrap items-center justify-center gap-2">
        <span className="flex items-center justify-start space-x-2">
          <FaSpider className="size-4" />
          <Link href="https://curiousprogrammer.dev">curiousprogrammer.dev</Link>
        </span>
        <span className="flex items-center justify-start space-x-2">
          <FaGithub className="size-4" />
          <Link href="https://github.com/cbillowes">github.com/cbillowes</Link>
        </span>
        <span className="flex items-center justify-start space-x-2">
          <FaLinkedinIn className="size-4" />
          <Link href="https://linkedin.com/in/cbouwer">linkedin.com/in/cbouwer</Link>
        </span>
      </div>
      <p className="text-center">Grand Baie, Mauritius &middot; Remote</p>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Page>
      <Container>
        <section className="text-center">
          <ImageContainer
            width={96}
            height={96}
            src="/headshot.webp"
            alt="Head shot of Clarice Bouwer"
            className="mb-4 rounded-full border-4 border-white"
            containerClassName="mx-auto"
            priority={true}
          />
          <div className="print:hidden">
            <PageHeading>Clarice Bouwer</PageHeading>
          </div>
          <div className="hidden print:block">
            <h1 className="text-lg font-bold print:text-base">Clarice Bouwer</h1>
          </div>
          <h2 className="text-lg font-semibold print:text-base">
            Senior Software Engineer at Arity Craft Limited
          </h2>
          <nav className="mb-2 flex flex-col items-start justify-center space-y-4 space-x-4">
            <ContactNavItems />
          </nav>
        </section>
        <section className="mx-auto mt-4 max-w-3xl print:m-0">
          <div>
            <p className="mb-4 text-lg leading-relaxed">
              A seasoned polyglot full-stack software engineer specializing in web development with
              20 years of experience delivering digital solutions across industries such as media,
              event registration, cloud, virtualization, and InsureTech.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
              Recently co-led a remote team of 15 at Cloudsure Limited and Simply Financial
              Services, building a next-generation digital life insurance platform on a
              Clojure-based Polylith architecture spanning more than 15 repositories.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
              Proven track record highlights innovation, systems thinking, and empathetic leadership
              in guiding high-performing teams. Dedicated to writing elegant code, fostering strong
              development practices, and creating exceptional user experiences.
            </p>
          </div>
        </section>
        <aside className="mx-auto mt-12 mb-2 grid max-w-sm gap-8 px-5 md:max-w-3xl md:grid-cols-3 lg:max-w-5xl print:mt-5 print:grid-cols-3">
          <Pillar
            title="Experience"
            icon={<SiLevelsdotfyi />}
            className="rounded-full text-pink-600 ring-2 ring-pink-400"
            items={[
              `${new Date().getFullYear() - 2005} years of professional experience`,
              `Diverse skill set and industry exposure in web development`,
              `UX & DevX centric approach to building products`,
              `Team collaboration and leadership`,
              `Strong communication, problem-solving and analytical skills`,
            ]}
          />
          <Pillar
            title="Attributes"
            icon={<FaCheckCircle />}
            className="rounded-full text-green-600 ring-2 ring-green-400"
            items={[
              `Curious, adaptable, and quick learner`,
              `Creative problem solver with a growth mindset`,
              `Committed to continuous learning and improvement`,
              `People-first culture and team player`,
              `Empathetic leader and mentor`,
              `Accountable and takes ownership`,
            ]}
          />
          <Pillar
            title="Values"
            icon={<GiDramaMasks />}
            className="rounded-full text-blue-600 ring-2 ring-blue-400"
            items={[
              `Deliver high-value solutions while reducing waste`,
              `Full ownership of work, accountability and exceed expectations`,
              `Open, honest, and respectful communication`,
              `Lead by listening, fostering collaboration and inspiring innovation`,
              `Reduce costs and build user-centric products and features`,
            ]}
          />
        </aside>
        <main className="mx-auto max-w-sm px-5 md:max-w-3xl lg:max-w-5xl">
          <Timeline />
        </main>
      </Container>
    </Page>
  );
}
