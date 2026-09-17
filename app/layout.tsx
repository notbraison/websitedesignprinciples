import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web Design Principles',
  description: 'The principles of web design that convert users.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
