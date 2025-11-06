import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';

export default function FavoritesPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center text-white md:px-12 lg:px-16">
      <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-12 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.9)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <FiHeart className="text-2xl text-cyan-300" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Your favorite films live here.</h1>
          <p className="text-white/70">
            As you tag titles across SmartFlix, they&apos;ll gather in this cinematic vault—perfect for rewatches and
            sharing recs with friends.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
        >
          Explore movies
        </Link>
      </div>
    </main>
  );
}
