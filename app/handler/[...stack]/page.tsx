import { Page } from '@/components/page';
import { getPageMetadata } from '@/lib/utils';
import { StackHandler } from '@stackframe/stack';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Account | Curious Programmer',
    description:
      'Your gateway to exclusive content and personalized settings on Curious Programmer.',
    slug: 'handler',
    image: '/home.png',
    type: 'website',
  });
}

export default function Handler() {
  return (
    <Page>
      <div className="max-w-5xl mx-auto px-5 py-8">
        <StackHandler fullPage />
      </div>
    </Page>
  );
}
