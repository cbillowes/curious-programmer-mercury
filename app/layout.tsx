import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { ThemeModeScript, ThemeProvider } from 'flowbite-react';
import { StackProvider, StackTheme } from '@stackframe/stack';
import { Open_Sans, Fira_Code } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { flowbiteTheme } from '@/components/theme';
import { ProgressBar } from '@/components/progress-bar';
import { stackServerApp } from '@/stack/server';
import { CookieBanner } from '@/components/cookie-banner';
import { ScrollProgress } from '@/components/scroll-progress';
import { WebVitals } from '@/app/web-vitals';
import './globals.css';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieConsent = cookieStore.get('cookie-consent');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${openSans.variable} ${firaCode.variable} antialiased`}>
        <StackProvider app={stackServerApp}>
          <Suspense fallback={null}>
            <ProgressBar>
              <ThemeProvider theme={flowbiteTheme}>
                <StackTheme>
                  <ScrollProgress>{children}</ScrollProgress>
                  <CookieBanner value={cookieConsent?.value} />
                </StackTheme>
              </ThemeProvider>
            </ProgressBar>
          </Suspense>
        </StackProvider>
      </body>
      <GoogleAnalytics gaId="G-475QC81Y7F" />
      <WebVitals />
    </html>
  );
}
