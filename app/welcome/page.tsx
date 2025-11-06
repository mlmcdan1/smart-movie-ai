'use client';

import Link from 'next/link';
import type { IconType } from 'react-icons';
import { FiArrowRight, FiClock, FiCompass, FiPlay, FiZap } from 'react-icons/fi';

const stats = [
  { label: 'Curated collections', value: '1,200+' },
  { label: 'AI guided matches', value: '98%' },
  { label: 'Film lovers worldwide', value: '500K+' },
];

const features: Array<{ title: string; description: string; icon: IconType }> = [
  {
    title: 'Smarter discovery',
    description: 'Use natural-language prompts and mood filters to surface the perfect film in seconds.',
    icon: FiZap,
  },
  {
    title: 'Personal watchflows',
    description: 'Build collaborative watchlists, sync progress across devices, and stay in the loop effortlessly.',
    icon: FiClock,
  },
  {
    title: 'Trend radar',
    description: 'Catch hidden gems before they trend with daily briefs from critics, AI, and the SmartFlix community.',
    icon: FiCompass,
  },
];

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <img
        src="/images/ImageBackground.jpg"
        alt="SmartFlix background"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/75 to-[#05070d]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_65%)]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-6 md:px-12 lg:px-20">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
            <span>SmartFlix</span>
          </div>
          <Link
            href="/login"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            Sign in
          </Link>
        </header>

        <section className="flex w-full flex-1 flex-col items-center justify-center px-6 pb-16 md:px-12 lg:px-20">
          <div className="w-full max-w-5xl space-y-10 text-center md:text-left">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium text-white/80 backdrop-blur md:mx-0">
              <FiZap className="text-base text-cyan-300" />
              <span>AI-curated movie intelligence</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                Discover your next favorite film with confidence.
              </h1>
              <p className="text-lg leading-relaxed text-white/70 md:text-xl">
                SmartFlix is your cinematic concierge. Combine human taste with AI precision to uncover the perfect
                watchlist for every mood, moment, and watch party.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-3 rounded-full bg-cyan-500 px-7 py-3 text-base font-semibold text-black transition hover:bg-cyan-400"
              >
                Start free trial
                <FiPlay className="text-lg transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/ai-helper"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3 text-base font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
              >
                Preview the AI guide
                <FiArrowRight className="text-lg transition group-hover:translate-x-1.5" />
              </Link>
            </div>

            <div className="grid gap-6 pt-12 sm:grid-cols-3">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left shadow-[0_12px_40px_-18px_rgba(0,0,0,0.65)] backdrop-blur"
                >
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.3em] text-white/60">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-6 pb-16 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-5xl">
            <h2 className="mb-8 text-center text-2xl font-semibold text-white/90 md:text-left">
              Why film lovers switch to SmartFlix
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.title}
                    className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent p-6 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.8)] backdrop-blur"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                      <Icon className="text-xl text-cyan-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-white/70">{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
