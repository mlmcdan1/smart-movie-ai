import Link from 'next/link';
import {
  fetchOnTheAirSeries,
  fetchPopularSeries,
  fetchTopRatedSeries,
  fetchTrendingSeries,
} from '@/lib/tmdb';

const surfaceGradient =
  'rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_-45px_rgba(15,23,42,0.9)] backdrop-blur';

const filterBadges = ['Now streaming', 'Binge-worthy', 'New seasons', 'Docu-series', 'Comedy', 'Drama', 'Sci-Fi'];

function SeriesHighlight({ show, tone }: { show: any; tone: 'amber' | 'indigo' }) {
  const palette =
    tone === 'amber'
      ? 'from-amber-300/25 via-amber-200/15 to-transparent text-white'
      : 'from-indigo-400/25 via-indigo-300/10 to-transparent text-white';
  const title = show.name || show.original_name || 'Untitled Series';

  return (
    <Link
      href={`https://www.themoviedb.org/tv/${show.id}`}
      target="_blank"
      className={`relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden ${surfaceGradient}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${palette}`} />
      {show.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w780${show.backdrop_path}`}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      )}
      <div className="relative z-10 space-y-4 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
          {tone === 'amber' ? 'Fresh Episodes' : 'Weekend Binge'}
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold leading-tight md:text-3xl">{title}</h3>
          <p className="line-clamp-3 text-sm text-white/75 md:text-base">{show.overview}</p>
        </div>
        <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          <span>{show.first_air_date?.slice(0, 4) ?? '—'}</span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>TMDb {show.vote_average?.toFixed(1) ?? '—'}</span>
        </div>
      </div>
    </Link>
  );
}

function SeriesRow({ title, shows }: { title: string; shows: any[] }) {
  if (!shows?.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-white/70 md:text-xl">{title}</h2>
        <span className="text-xs uppercase tracking-[0.3em] text-white/40">Updated hourly</span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shows.map((show) => {
          const name = show.name || show.original_name || 'Untitled Series';
          return (
            <Link
              key={show.id}
              href={`https://www.themoviedb.org/tv/${show.id}`}
              target="_blank"
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-white/80 shadow-[0_14px_40px_-25px_rgba(15,23,42,0.85)] transition hover:border-white/25 hover:text-white"
            >
              {show.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={name}
                  className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-60 w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-sm text-white/60">
                  No art yet
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2 px-4 py-4">
                <p className="text-sm font-semibold text-white">{name}</p>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{show.first_air_date?.slice(0, 4) ?? '—'}</span>
                  <span>⭐ {show.vote_average?.toFixed(1) ?? '—'}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default async function SeriesPage() {
  const [trending, popular, topRated, onAir] = await Promise.all([
    fetchTrendingSeries(),
    fetchPopularSeries(),
    fetchTopRatedSeries(),
    fetchOnTheAirSeries(),
  ]);
  const hero = trending?.slice(0, 2) ?? [];

  return (
    <main className="mx-auto w-full max-w-6xl space-y-12 px-6 py-16 text-white md:px-12 lg:px-16">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
          Series Hub
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]">
            One feed for your next binge-worthy obsession.
          </h1>
          <p className="max-w-2xl text-base text-white/70 md:text-lg">
            Discover what’s trending, what just dropped, and the classics worth revisiting. All the arcs, cliffhangers,
            and limited series SmartFlix can’t stop talking about.
          </p>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {hero.map((show: any, index: number) => (
          <SeriesHighlight key={show.id} show={show} tone={index === 0 ? 'amber' : 'indigo'} />
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

      <SeriesRow title="Trending today" shows={trending?.slice(0, 8) || []} />
      <SeriesRow title="Popular this week" shows={popular?.slice(0, 8) || []} />
      <SeriesRow title="Critically acclaimed" shows={topRated?.slice(0, 8) || []} />
      <SeriesRow title="Currently airing" shows={onAir?.slice(0, 8) || []} />
    </main>
  );
}
