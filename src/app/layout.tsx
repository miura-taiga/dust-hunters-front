import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { BottomNavigation, Loading, UserAvatar } from '@/components/layouts';
import { Setting } from '@/config';
import { AuthProvider } from '@/contexts/auth';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dust Hunters',
  description: '『 掃除 x 狩 』のお掃除支援アプリです。',
  icons: {
    icon: '/images/favicon/favicon.png',
  },
  openGraph: {
    title: 'Dust Hunters',
    description: '『 掃除 x 狩 』のお掃除支援アプリです。',
    url: Setting.FRONT_URL,
    images: [
      {
        url: `${Setting.FRONT_URL}/images/layouts/ogp.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${Setting.FRONT_URL}/images/layouts/ogp.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense fallback={<Loading />}>
        <GoogleAnalytics />
      </Suspense>
      <body className={inter.className}>
        <AuthProvider>
          <UserAvatar />
          <BottomNavigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
