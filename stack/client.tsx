import { StackClientApp } from '@stackframe/stack';
import { STACK_PROJECT_ID, STACK_PUBLISHABLE_CLIENT_KEY } from '@/lib/config';

export const stackClientApp = new StackClientApp({
  tokenStore: 'nextjs-cookie',
  baseUrl: 'https://api.stack-auth.com',
  projectId: STACK_PROJECT_ID,
  publishableClientKey: STACK_PUBLISHABLE_CLIENT_KEY,
  urls: {
    home: '/',
  },
});
