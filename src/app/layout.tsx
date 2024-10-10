import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { BottomNavigation, UserAvatar } from "@/components/layouts";
import { AuthProvider } from "@/contexts/auth";
import { Setting } from "@/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dust Hunters",
  description: "『 掃除 x 狩 』のお掃除支援アプリです。",
  icons: {
    icon: "/images/favicon/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="DustHunters" />
        <meta property="og:description" content="『 掃除 x 狩』のお掃除支援アプリです。" />
        <meta property="og:image" content={`${Setting.FRONT_URL}/images/layouts/ogp.png`}/>
        <meta property="og:url" content={Setting.FRONT_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${Setting.FRONT_URL}/images/layouts/ogp.png`} />
      </Head>
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
