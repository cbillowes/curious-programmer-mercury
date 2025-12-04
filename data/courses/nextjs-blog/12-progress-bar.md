---
title: Add a progress bar to your blog
parent: /courses/nextjs-blog
date: 2025-12-02
abstract:
  In this chapter, you will learn how to add a progress bar to your blog to improve user experience when navigating between pages.
---

There is a bit of a lag when navigating between pages.
This dampens the user experience as users won't necessarily know that the page is transitioning.
To improve user experience, we can add a progress bar at the top of each page that indicates when a page is loading.

In this chapter, you're going to do the following:

- Install nprogress
- Configure the styles
- Create a progress bar component
- Add the progress bar to your layout

## Install nprogress

Install nprogress - a popular library for showing loading progress bars.

```bash
npm install nprogress
npm install --save-dev @types/nprogress
```

## Configure the styles

Configure the nprogress component in your Global stylesheet.

```css:title=app/globals.css
/* NProgress styles */
#nprogress {
  @apply pointer-events-none;
}

#nprogress .bar {
  @apply bg-pink-500 dark:bg-pink-300 fixed z-100 top-0 left-0 w-full h-1;
}

#nprogress .peg {
  @apply block absolute right-0 w-[100px] h-full opacity-100 rotate-3 translate-x-0 -translate-y-1 shadow-[0_0_10px_#cc0000,0_0_5px_#cc0000];
}

#nprogress .spinner {
  @apply hidden;
}
```

## Configure the progress bar

Create a new component that will handle the progress bar logic.

```tsx:title=components/progress-bar.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
});

export function ProgressBar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();

    // Start progress on link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.href;
      const currentUrl = window.location.href;

      if (href !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation = () => {
      const anchors = document.querySelectorAll('a[href]');
      anchors.forEach((anchor) => {
        anchor.addEventListener('click', handleAnchorClick as EventListener);
      });
    };

    // Initial setup
    handleMutation();

    // Watch for new links being added
    const observer = new MutationObserver(handleMutation);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      const anchors = document.querySelectorAll('a[href]');
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, [pathname, searchParams]);

  return <>{children}</>;
}
```

## Add the progress bar to your layout

Update your root layout to include the `ProgressBar` component.

```tsx:title=app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body>
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Suspense fallback={null}>
              <ProgressBar>
                <ThemeProvider theme={flowbiteTheme}>
                  <Navigation />
                  {children}
                </ThemeProvider>
              </ProgressBar>
            </Suspense>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
```

## Conclusion

Voila! You have successfully added a progress bar to your blog to improve user experience when navigating between pages.

In the next chapter, you will learn how to asynchronously like and unlike components using Next.js API routes.
