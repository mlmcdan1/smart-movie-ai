'use client';

import { useEffect, useMemo, useState } from 'react';
import { FiFilm, FiInfo, FiPlay, FiStar } from 'react-icons/fi';

type Movie = {
  title: string;
  overview: string;
  backdrop_path: string;
  release_date?: string;
  vote_average?: number;
};

const FALLBACK_IMAGE = '/banner.jpg';

export default function Hero() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
        );
        const data = await res.json();
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    }

    fetchMovie();
  }, []);

  const background = useMemo(() => {
    if (movie?.backdrop_path) {
      return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    }
    return FALLBACK_IMAGE;
  }, [movie?.backdrop_path]);

  const releaseYear = movie?.release_date ? movie.release_date.slice(0, 4) : '—';
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : '—';
  const synopsis =
    movie?.overview?.length && movie.overview.length > 260
      ? `${movie.overview.slice(0, 257)}…`
      : movie?.overview || 'This cinematic spotlight updates every session with a fresh recommendation.';

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_-45px_rgba(15,23,42,0.9)]">
      <div className="absolute inset-0">
        <img
          src={background}
          alt={movie?.title || 'Featured film backdrop'}
          className="h-full w-full object-cover transition duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.25),_transparent_55%)]" />
      </div>

      <div className="relative z-10 flex min-h-[60vh] items-end px-6 pb-10 pt-32 md:px-12 lg:px-16">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
            <FiFilm className="text-sm text-cyan-300" />
            Spotlight
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {movie?.title || 'Tonight’s cinematic highlight'}
            </h1>
            <p className="text-base leading-relaxed text-white/75 md:text-lg">{synopsis}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <FiStar className="text-base text-cyan-300" />
              TMDb {rating}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <FiFilm className="text-base text-cyan-300" />
              {releaseYear}
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="group inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400">
              <FiPlay className="text-base transition group-hover:translate-x-0.5" />
              Watch trailer
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:text-white">
              <FiInfo className="text-base" />
              More info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
