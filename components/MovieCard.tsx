import Link from 'next/link';
import { FiImage } from 'react-icons/fi';

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-white/30 hover:bg-white/[0.08]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-white/50">
            <FiImage className="text-3xl" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity group-hover:opacity-100" />
        <span className="pointer-events-none absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 opacity-0 transition group-hover:opacity-100">
          Details
        </span>
      </div>
      <div className="space-y-1 px-4 py-4">
        <h2 className="text-sm font-semibold text-white/90 transition group-hover:text-white">
          {movie.title}
        </h2>
      </div>
    </Link>
  );
}
