'use client';

import type { ReactNode } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isWelcomePage = pathname === '/welcome';
  return (
    <html lang="en">
      <body className={`${isWelcomePage ? 'bg-transparent' : 'bg-black'} text-white min-h-screen`}>
        <AuthProvider>
          <div className="relative min-h-screen overflow-hidden">
            {!isWelcomePage && (
              <>
                <div className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b from-[#03040a] via-[#05060f] to-[#080611]" />
                <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15),_transparent_55%)]" />
              </>
            )}
            <div className="relative z-10 flex min-h-screen flex-col">
              {!isWelcomePage && <Navbar />}
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
