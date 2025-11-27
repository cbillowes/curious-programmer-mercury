import { ThemeModeScript, ThemeProvider } from 'flowbite-react';
import { StackProvider, StackTheme } from '@stackframe/stack';
import { stackClientApp } from '@/stack/client';
import { Open_Sans, Fira_Code } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { flowbiteTheme } from '@/components/theme';
import { Suspense } from 'react';
import { ProgressBar } from '@/components/progress-bar';
import './globals.css';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
});

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
      <body className={`${openSans.variable} ${firaCode.variable} antialiased`}>
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Suspense fallback={null}>
              <ProgressBar>
                <ThemeProvider theme={flowbiteTheme}>{children}</ThemeProvider>
              </ProgressBar>
            </Suspense>
          </StackTheme>
        </StackProvider>
      </body>
      <GoogleAnalytics gaId="G-475QC81Y7F" />
    </html>
  );
}
