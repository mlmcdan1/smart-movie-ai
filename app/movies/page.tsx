import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '@/lib/tmdb';

const filterBadges = ['Trending', 'Action', 'Romance', 'Animation', 'Horror', 'Sci-Fi', 'Drama'];

const surfaceGradient =
  'rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_-45px_rgba(15,23,42,0.9)] backdrop-blur';

function MovieRail({ title, items }: { title: string; items: any[] }) {
  if (!items?.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-white/70 md:text-xl">{title}</h2>
        <span className="text-xs uppercase tracking-[0.3em] text-white/40">Curated today</span>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-2 pr-1">
        {items.map((movie) => (
          <div key={movie.id} className="w-40 flex-shrink-0 sm:w-44 lg:w-48">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}

function HighlightCard({ movie, tone }: { movie: any; tone: 'cyan' | 'violet' }) {
  const palette =
    tone === 'cyan'
      ? 'from-cyan-400/25 via-cyan-300/10 to-transparent text-white'
      : 'from-violet-400/20 via-fuchsia-400/10 to-transparent text-white';

  return (
    <Link
      href={`/movie/${movie.id}`}
      className={`relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden ${surfaceGradient}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${palette}`} />
      {movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      )}
      <div className="relative z-10 space-y-4 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
          {tone === 'cyan' ? 'Feature Spotlight' : 'Tonight’s Pick'}
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold leading-tight md:text-3xl">{movie.title}</h3>
          <p className="line-clamp-3 text-sm text-white/75 md:text-base">{movie.overview}</p>
        </div>
        <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          <span>{movie.release_date?.slice(0, 4) ?? '—'}</span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>TMDb {movie.vote_average?.toFixed(1) ?? '—'}</span>
        </div>
      </div>
    </Link>
  );
}

export default async function MoviesPage() {
  const [trending, popular, topRated, upcoming] = await Promise.all([
    fetchTrendingMovies(),
    fetchPopularMovies(),
    fetchTopRatedMovies(),
    fetchUpcomingMovies(),
  ]);

  const hero = trending?.slice(0, 2) ?? [];

  return (
    <main className="mx-auto w-full max-w-6xl space-y-12 px-6 py-16 text-white md:px-12 lg:px-16">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
          Movie Lounge
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]">
            Tonight’s marquee picks and curated rails.
          </h1>
          <p className="max-w-2xl text-base text-white/70 md:text-lg">
            Sink into cinematic worlds tailored by SmartFlix. Browse curated highlights, seasonal spotlights, and the
            rails everyone is streaming right now.
          </p>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {hero.map((movie: any, index: number) => (
          <HighlightCard key={movie.id} movie={movie} tone={index === 0 ? 'cyan' : 'violet'} />
        ))}
      </section>

      <section className={`px-6 py-5 ${surfaceGradient}`}>
        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
          {filterBadges.map((badge) => (
            <button
              key={badge}
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/65 transition hover:border-white/30 hover:text-white"
            >
              {badge}
            </button>
          ))}
        </div>
      </section>

      <MovieRail title="Trending in Film" items={trending?.slice(0, 10) || []} />
      <MovieRail title="Popular right now" items={popular?.slice(0, 10) || []} />
      <MovieRail title="Critics love" items={topRated?.slice(0, 10) || []} />
      <MovieRail title="Upcoming premieres" items={upcoming?.slice(0, 10) || []} />
    </main>
  );
}
