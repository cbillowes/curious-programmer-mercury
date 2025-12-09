import Image from 'next/image';
import { ReactNode } from 'react';
import { Page } from '@/components/page';
import { Container } from '@/components/container';
import { PageHeading } from '@/components/page-heading';
import { Link } from '@/components/link';
import { ImageContainer } from '@/components/image-container';
import { Timeline } from '@/components/timeline';
import { cn, getPageMetadata } from '@/lib/utils';
import { FaCheckCircle, FaSpider } from 'react-icons/fa';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { SiLevelsdotfyi } from 'react-icons/si';
import { GiDramaMasks } from 'react-icons/gi';

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
      <div
        className={cn('flex justify-center items-center mb-4 py-3', className)}
      >
        <div className=" w-10 h-10 text-3xl">{icon}</div>
        <h3 className="mb-2 pt-1 text-xl font-bold dark:text-white text-gray-900">
          {title}
        </h3>
      </div>
      <ul className="my-6 lg:mb-0 space-y-4">
        {items?.map((item) => (
          <li key={item} className="flex space-x-2.5">
            <svg
              className={cn('shrink-0 w-5 h-5', className)}
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
            <span className="leading-relaxed text-gray-500 dark:text-gray-400">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

function ContactNavItems() {
  return (
    <>
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
        <Link href="https://linkedin.com/in/cbouwer">
          linkedin.com/in/cbouwer
        </Link>
      </span>
      <p className="text-center">Grand Baie, Mauritius &middot; Remote</p>
    </>
  );
}

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Resume',
    description:
      'A highly accomplished and passionate polyglot full-stack software engineer with 20 years of experience delivering impactful digital solutions.',
    slug: '/resume',
    image: '/hero/headshot.webp',
    type: 'website',
  });
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
            className="rounded-full mb-4 border-4 border-white"
            containerClassName="mx-auto"
            priority={true}
          />
          <PageHeading>Clarice Bouwer</PageHeading>
          <h3 className="text-lg font-semibold">
            Senior Software Engineer at Arity Craft Limited
          </h3>
          <nav className="flex md:hidden mb-2 flex-col justify-center items-start space-x-4 space-y-4">
            <ContactNavItems />
          </nav>
        </section>
        <section className="max-w-3xl mx-auto mt-4">
          <div>
            <p className="mb-4 leading-relaxed text-lg">
              A seasoned polyglot full-stack software engineer specializing in
              web development with 20 years of experience delivering digital
              solutions across industries such as media, event registration,
              cloud, virtualization, and InsureTech.
            </p>
            <p className="mb-4 leading-relaxed text-lg">
              Recently co-led a remote team of 15 at Cloudsure Limited and
              Simply Financial Services, building a next-generation digital life
              insurance platform on a Clojure-based Polylith architecture
              spanning more than 15 repositories.
            </p>
            <p className="mb-4 leading-relaxed text-lg">
              Proven track record highlights innovation, systems thinking, and
              empathetic leadership in guiding high-performing teams. Dedicated
              to writing elegant code, fostering strong development practices,
              and creating exceptional user experiences.
            </p>
          </div>
        </section>
        <aside className="max-w-5xl px-5 mx-auto mt-12 mb-2 grid md:grid-cols-3 gap-8 print:grid-cols-3">
          <Pillar
            title="Experience"
            icon={<SiLevelsdotfyi />}
            className="text-pink-600 ring-pink-400 ring-2 rounded-full"
            items={[
              `${
                new Date().getFullYear() - 2005
              } years of professional experience`,
              `Diverse skill set and industry exposure in web development`,
              `UX & DevX centric approach to building products`,
              `Team collaboration and leadership`,
              `Strong communication, problem-solving and analytical skills`,
            ]}
          />
          <Pillar
            title="Attributes"
            icon={<FaCheckCircle />}
            className="text-green-600 ring-green-400 ring-2 rounded-full"
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
            className="text-blue-600 ring-blue-400 ring-2 rounded-full"
            items={[
              `Deliver high-value solutions while reducing waste`,
              `Full ownership of work, accountability and exceed expectations`,
              `Open, honest, and respectful communication`,
              `Lead by listening, fostering collaboration and inspiring innovation`,
              `Reduce costs and build user-centric products and features`,
            ]}
          />
        </aside>
        <main className="max-w-5xl px-5 mx-auto">
          <Timeline />
        </main>
      </Container>
    </Page>
  );
}
