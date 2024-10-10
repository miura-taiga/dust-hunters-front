import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNavigation, UserAvatar } from "@/components/layouts";
import { AuthProvider } from "@/contexts/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dust Hunters",
  description: "Generated by create next app",
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
