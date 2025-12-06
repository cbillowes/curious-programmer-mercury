import { Container } from '@/components/container';
import { Link } from '@/components/link';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { getPageMetadata } from '@/lib/utils';

export async function generateMetadata() {
  return getPageMetadata({
    title: 'Community Guidelines',
    description:
      'Essentially, words can hurt. Be nice but clear! That is the essence of the way you need to communicate.',
    slug: '/community',
    image: '/hero/community-guidelines.webp',
    type: 'website',
  });
}

export default function CommunityPage() {
  return (
    <Page>
      <Container>
        <PageHeading>Community Guidelines</PageHeading>
        <div id="article" className="max-w-3xl mx-auto px-4">
          <p>Last updated: 21 November 2025</p>
          <p>
            Essentially, words can hurt. Be nice but clear! That is the essence
            of the way you need to communicate.
          </p>
          <h2>Things to know</h2>
          <ul>
            <li>
              Comments run on the third-party{' '}
              <Link href="https://utteranc.es">Utterances</Link> platform.
              Utterances does not collect any personal information, does not
              log, write or retain any data, sets a cookie to store the github
              api token. Utterances may employ third-party companies and
              individuals due to the following reasons: Utterances uses GitHub
              issues to store issues and comments.
            </li>
            <li>
              Your thoughts are important to me. I read, moderate and allow all
              comments that are not offensive.
            </li>
          </ul>
          <h2>Tone and Attitude</h2>
          <ul>
            <li>Be inviting, passionate and share your thoughts.</li>
            <li>Please do not personally attack or use hurtful words.</li>
            <li>
              Do not criticize a brand, company or product, and attacking people
              on the basis of their race, religion, sex, gender, sexual
              orientation, disability or age.
            </li>
            <li>
              No racism, sexism, homophobia or other forms of hate-speech!
            </li>
          </ul>
          <h2>Clarity and Intent</h2>
          <ul>
            <li>
              Be clear and intentional to avoid ambiguity in your messages.
            </li>
            <li>
              Do not &ldquo;shout&rdquo;, be sarcastic, condescending or mean.
            </li>
          </ul>
        </div>
      </Container>
    </Page>
  );
}
