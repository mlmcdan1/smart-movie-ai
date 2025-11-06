'use client';

import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: any[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-2 sm:px-0">
        <h2 className="text-lg font-semibold uppercase tracking-[0.35em] text-white/70 sm:text-xl">
          {title}
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto px-1 sm:px-0 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {movies.map((movie) => (
          <div key={movie.id} className="flex w-36 flex-shrink-0 sm:w-44 lg:w-48">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
