'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { FiCheckCircle, FiMail, FiSend } from 'react-icons/fi';
import { auth } from '@/lib/firebase';

const highlights = [
  'Access SmartFlix Originals and curated collections',
  'Sync watchlists and progress across every device',
  'Get tailored nightly picks powered by AI',
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email) return;
    setError('');

    const actionCodeSettings = {
      url: typeof window !== 'undefined' ? `${window.location.origin}/verify` : '',
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('emailForSignIn', email);
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || 'Unable to send sign-in link. Please try again.');
    }
  };

  if (submitted) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-3xl flex-col items-center justify-center px-6 text-center text-white/80 md:px-12 lg:px-16">
        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-12 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.9)]">
          <FiMail className="mx-auto text-4xl text-cyan-300" />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">Check your inbox</h1>
            <p>
              We sent a secure sign-in link to <span className="text-white">{email}</span>. Open the email on this device
              to complete login.
            </p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setEmail('');
              setError('');
              router.replace('/login');
            }}
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
            type="button"
          >
            Send a different email
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl flex-col px-6 py-16 md:px-12 lg:px-16">
      <div className="relative grid gap-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_-45px_rgba(15,23,42,0.9)] md:grid-cols-[1.1fr,1fr]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_60%)]" />

        <div className="relative z-10 flex flex-col justify-center gap-6 px-8 py-10 sm:px-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
            <FiSend className="text-base text-cyan-300" />
            Magic link sign-in
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Sign into SmartFlix in one click.
            </h1>
            <p className="text-white/70">
              We&apos;ll email you a secure link—no passwords, no friction. Just tap and you&apos;re ready to stream.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-white/75">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <FiCheckCircle className="flex-shrink-0 text-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">New to SmartFlix? Join us in minutes.</p>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-8 py-10 sm:px-10">
          <div className="space-y-6 rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">Email sign-in</h2>
            <div className="space-y-4">
              <div className="space-y-2 text-left">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.8)] outline-none transition focus:border-cyan-300/70 focus:text-white"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
            </div>
            <button
              onClick={handleLogin}
              className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!email}
              type="button"
            >
              Email me a sign-in link
            </button>
            <p className="text-sm text-white/60">
              New to SmartFlix?{' '}
              <Link href="/signup" className="text-cyan-300 underline underline-offset-4 transition hover:text-cyan-200">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
