import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NCC Robotics Workshop Registration',
  description: 'Register for the NCC Robotics Workshop - Learn Arduino, AI, and cutting-edge robotics technology',
  keywords: 'robotics, workshop, NCC, Arduino, AI, programming, engineering',
  authors: [{ name: 'NCC Robotics Team' }],
  openGraph: {
    title: 'NCC Robotics Workshop Registration',
    description: 'Join our comprehensive robotics workshop and learn cutting-edge technology',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}