import { stackServerApp } from '@/stack/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const urlString = headersList.get('x-url');
  const user = await stackServerApp.getUser();
  if (!user) {
    const currentPath = urlString ? new URL(urlString).pathname : '/';
    const encodedPath = encodeURIComponent(currentPath);
    const returnUrl = `${stackServerApp.urls.signIn}?after_auth_return_to=${encodedPath}`;
    return redirect(returnUrl);
  }
  return children;
}
