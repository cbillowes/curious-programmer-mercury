'use client';

import { Page } from '@/components/page';
import { PageHeading } from '@/components/page-heading';
import { Container } from '@/components/container';
import { Button } from 'flowbite-react';

export function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Page>
      <PageHeading>Something went wrong</PageHeading>
      <Container>
        <p>{error.message}</p>
        <Button onClick={reset}>Try Again</Button>
      </Container>
    </Page>
  );
}
