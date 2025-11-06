'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLoader } from 'react-icons/fi';
import Hero from './Hero';
import MovieRow from './MovieRow';
import useAuth from '@/hooks/useAuth';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '@/lib/tmdb';

export default function HomeClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [movies, setMovies] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    async function loadMovies() {
      const [popular, trending, topRated, upcoming] = await Promise.all([
        fetchPopularMovies(),
        fetchTrendingMovies(),
        fetchTopRatedMovies(),
        fetchUpcomingMovies(),
      ]);
      setMovies([popular, trending, topRated, upcoming]);
      setLoaded(true);
    }

    if (user) {
      loadMovies();
    }
  }, [user]);

  if (loading || !loaded || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
          <FiLoader className="animate-spin text-lg text-cyan-300" />
          Loading feed
        </div>
      </div>
    );
  }

  const [popularMovies, trendingMovies, topRatedMovies, upcomingMovies] = movies;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-10 md:px-12 lg:px-16">
      <Hero />
      <section className="space-y-12 pb-12">
        <MovieRow title="Trending Now" movies={trendingMovies} />
        <MovieRow title="Popular Movies" movies={popularMovies} />
        <MovieRow title="Top Rated" movies={topRatedMovies} />
        <MovieRow title="Upcoming Premieres" movies={upcomingMovies} />
      </section>
    </div>
  );
}
