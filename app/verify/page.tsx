'use client';

import { useEffect } from 'react';
import { signInWithEmailLink } from 'firebase/auth';
import { FiLoader } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

export default function VerifyPage() {
  const router = useRouter();

  useEffect(() => {
    const email = window.localStorage.getItem('emailForSignIn');
    if (!email) return;

    if (auth && window.location.href) {
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
          router.push('/');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [router]);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-3xl flex-col items-center justify-center px-6 text-center text-white/80 md:px-12 lg:px-16">
      <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-12 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.9)]">
        <FiLoader className="mx-auto animate-spin text-4xl text-cyan-300" />
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">Verifying your sign-in link</h1>
          <p>Hang tight—we&apos;re securing your session and will redirect you as soon as everything checks out.</p>
        </div>
      </div>
    </main>
  );
}
