'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiArrowUpRight, FiLogOut, FiUser } from 'react-icons/fi';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Movies', href: '/movies' },
  { name: 'Series', href: '/series' },
  { name: 'Nostalgic', href: '/nostalgic' },
  { name: 'Ask AI', href: '/ai-helper' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  if (pathname === '/welcome') return null;

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/welcome');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-lg font-semibold uppercase tracking-[0.35em] text-white/80"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] transition group-hover:shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
          SmartFlix
        </Link>

        <ul className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.name} className="relative">
                <Link
                  href={link.href}
                  className={`group relative inline-flex items-center gap-1 rounded-full px-4 py-2 transition ${
                    active
                      ? 'bg-white/10 text-white shadow-[0_8px_30px_-18px_rgba(34,211,238,0.8)]'
                      : 'hover:text-white/95'
                  }`}
                >
                  {link.name}
                  {link.name === 'Ask AI' && <FiArrowUpRight className="text-xs" />}
                  <span
                    className={`pointer-events-none absolute inset-x-2 bottom-1 h-[2px] origin-left rounded bg-cyan-400 transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 text-sm text-white/70">
          {user ? (
            <>
              <span
                className="hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/85 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.8)] md:inline-flex"
                title={user.email ?? 'Profile'}
              >
                <FiUser className="text-base" />
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-red-400/60 hover:text-red-300"
              >
                <FiLogOut className="text-base" />
                Logout
              </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/15 hover:text-white"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
