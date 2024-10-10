import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
  openGraph: {
    title: "Dust Hunters",
    description: "『 掃除 x 狩 』のお掃除支援アプリです。",
    url: Setting.FRONT_URL,
    images: [
      {
        url: `${Setting.FRONT_URL}/images/layouts/ogp.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
