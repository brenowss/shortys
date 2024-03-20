import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ToastContainer from './components/Toast/ToastContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shortys - URL Shortener',
  description: 'Rocket-fast URL shortener 🚀',
  icons: '/icon.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
