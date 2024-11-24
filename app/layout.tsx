import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UDP/TCP Messaging Tool',
  description: 'A web-based tool for sending and receiving UDP and TCP messages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              UDP/TCP Messaging Tool
            </Link>
            <div className="space-x-4">
              <Link href="/udp" className="hover:text-gray-300">
                UDP
              </Link>
              <Link href="/tcp" className="hover:text-gray-300">
                TCP
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}