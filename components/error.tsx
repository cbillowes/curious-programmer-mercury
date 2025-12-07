'use client';

import { useEffect } from 'react';
import { Button } from 'flowbite-react';
import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { Container } from '@/components/container';

export function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Page>
      <Container>
        <PageHeading>Something went wrong</PageHeading>
        <div className="flex items-center justify-center gap-4">
          <p>An unexpected error has occurred. Please try again later.</p>
          <Button onClick={reset}>Try Again</Button>
        </div>
      </Container>
    </Page>
  );
}
