import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NCC Robotics Workshop Registration',
  description: 'Register for the NCC Robotics Workshop - Learn Arduino, AI, and cutting-edge robotics technology',
  icons: {
    icon: '/ncc.png',
    shortcut: '/ncc.png',
    apple: '/ncc.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ncc.png" type="image/png" />
        <link rel="shortcut icon" href="/ncc.png" type="image/png" />
        <link rel="apple-touch-icon" href="/ncc.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}