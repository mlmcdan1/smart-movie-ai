'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FiCheck, FiLock, FiSmile } from 'react-icons/fi';
import { auth } from '@/lib/firebase';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords must match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError(err?.message || 'Unable to create your account. Please try again.');
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl flex-col px-6 py-16 md:px-12 lg:px-16">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_-45px_rgba(15,23,42,0.9)]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.22),_transparent_60%)]" />

        <div className="relative z-10 grid gap-10 px-8 py-12 md:grid-cols-[1fr,1fr] md:px-12 lg:px-16">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
              <FiSmile className="text-base text-cyan-300" />
              New members
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                Join the SmartFlix community.
              </h1>
              <p className="text-white/70">
                Personalize your cinematic universe with AI-powered discovery, collaborative watchlists, and release
                alerts tailored to your taste.
              </p>
            </div>

            <ul className="space-y-3 text-sm text-white/80">
              {['AI-crafted recommendations', 'Watchflow tracking and sync', 'Early access to upcoming premieres'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <FiCheck className="text-cyan-300" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
              Already have access?{' '}
              <Link href="/login" className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
                Sign in
              </Link>
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur">
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.8)] outline-none transition focus:border-cyan-300/70 focus:text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-2xl border border-white/15 bg-black/60 px-11 py-3 text-sm text-white/90 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.8)] outline-none transition focus:border-cyan-300/70 focus:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.8)] outline-none transition focus:border-cyan-300/70 focus:text-white"
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
              >
                Create account
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
