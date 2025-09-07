import type { ReactNode } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-[#0a0a0a] text-white'>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
