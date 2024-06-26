import type { Metadata } from 'next';

import './globals.css';
import NavBar from '@/components/NavBar';
import { exo_2, orbitron } from './fonts';

export const metadata: Metadata = {
  title: {
    default: 'Indie Fan Reviews',
    template: '%s | Indie Fan Reviews',
  },
  description: 'Best indie game reviews on this solar sistem',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${exo_2.variable} ${orbitron.variable}`}>
      <body className="bg-blue-50 flax flex-col px-4 py-2 min-h-screen">
        <header>
          <NavBar />
        </header>
        <main className="grow py-3">{children}</main>
        <footer className="border-t py-3 text-center text-xs text-slate-500 sticky top-[100vh]">
          Game data and images courtesy of{' '}
          <a
            className="text-orange-800 hover:underline"
            href="https://rawg.io"
            target="_blank"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}
