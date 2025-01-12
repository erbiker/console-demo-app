import MainNav, { MobileNav } from '@/components/MainNavigation';
import ContextProviders from '@/components/providers';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Access Control',
  description: 'A simple access control system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ContextProviders>
          <MobileNav className="md:hidden" />
          <MainNav className="hidden md:flex" />
          {children}
        </ContextProviders>
      </body>
    </html>
  );
}
