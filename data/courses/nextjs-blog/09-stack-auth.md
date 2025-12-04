---
title: Set up Stack Auth for seamless authentication
parent: /courses/nextjs-blog
date: 2025-12-01
abstract:
  Get out-of-the-box authentication with Stack Auth.
  In this chapter, you will learn how to set up Stack Auth for your Next.js blog to enable user authentication.
---

Likes has to be a feature for authenticated users only,
as stipulated in your `likes` table in the previous chapter.

```ts:title=db/schema.ts
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const likes = pgTable('likes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  // We need the userId to associate likes with users
  userId: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
});
```

We are going to look at [Stack Auth](https://stack-auth.com/) for authentication.

In this chapter, you're going to do the following:

- Create a Stack Auth project
- Install Stack Auth SDK
- Protect routes for authenticated users only
- Add navigation links for login, logout, and profile
- Sign in and view your users in the Stack Auth dashboard

[Stack Auth](https://docs.stack-auth.com/docs/overview) is a powerful, 100% open-source, out-of-the-box authentication solution that works great with Next.js.
You will need an account and you can use the free tier plan for this course.
It provides features like social logins, email/password authentication, and user management, and it is super powerful and easy to use.

## Create a Stack Auth project

Go to [app.stack-auth.com](https://app.stack-auth.com/), create a new project.

## Install the Stack Auth SDK

```bash
npx @stackframe/init-stack@latest
```

Create your API keys by copying them from the Stack Auth dashboard.

```text:title=.env.local
NEXT_PUBLIC_STACK_PROJECT_ID=your-project-id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your=publishable-client-key
STACK_SECRET_SERVER_KEY=your-secret-server-key
```

Navigate to <http://localhost:3000/handler/signup> to see the sign up page in action.

You can close the setup.

Take some time to configure your Stack Auth settings in your project.
There are many options to explore, such as enabling social logins, customizing email templates, and allowing sign up and user deletion features.

## Protect routes

Create a zone for protecting routes for authenticated users only.
You can call this anything really.

```ts:title=app/zone/layout.tsx
import { stackServerApp } from '@/stack/server';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await stackServerApp.getUser({ or: 'redirect' });
  return children;
}
```

Create a protected page inside the zone. We will elaborate with likes later on.

```ts:title=app/zone/page.tsx
export default function ZonePage() {
  return <h1>Welcome to the protected zone!</h1>;
}
```

Navigate to <http://localhost:3000/zone> to see the protected page in action.
You should be asked to login first.

## Add navigation links

You can create a simple navigation component to put on your home page for now:

```tsx:title=components/navigation.tsx
'use client';

import { useStackApp, useUser } from '@stackframe/stack';
import Link from 'next/link';

export function Navigation() {
  const app = useStackApp();
  const user = useUser();

  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/zone">Dashboard</Link>
            </li>
            <li>
              <Link href={app.urls.accountSettings}>Profile</Link>
            </li>
            <li>
              <Link href={app.urls.signOut}>Logout</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href={app.urls.signIn}>Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
```

Let's add the navigation and a Suspense Boundary (required for `useUser`).
A suspense boundary is needed because the user data is fetched asynchronously.

```tsx:title=app/layout.tsx
// This is a snippet of app/layout.tsx for brevity
// You may have more in your layout file so copy and paste the relevant parts
import { Suspense } from 'react';
import { Navigation } from '@/components/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Suspense fallback={null}>
              {/* Navigation added here */}
              <Navigation />
              {children}
            </Suspense>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
```

## Sign in and view your users

Sign into your blog and then navigate to the Stack Auth [dashboard](https://app.stack-auth.com/).

You will see your user appear under the **Authentication** > **Users** section.
You can view details about your user, such as their email, sign-in method, and creation date.
You can manage their account.
You can impersonate or delete their accounts.

## Conclusion

That's it :tada:
Stack Auth is phenomenal. In a few easy steps, you have set up authentication for your Next.js blog.

In the next chapter, you will learn how to use your Neon database to get, set and remove likes on your blog.
