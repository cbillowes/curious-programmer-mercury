import { stackServerApp } from '@/stack/server';

export default async function MyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await stackServerApp.getUser({ or: 'redirect' });
  return children;
}
