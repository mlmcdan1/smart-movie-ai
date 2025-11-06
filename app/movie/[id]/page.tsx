import { notFound } from 'next/navigation';

type Movie = {
  title: string;
  overview: string;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
  runtime?: number;
  genres?: Array<{ id: number; name: string }>;
  spoken_languages?: Array<{ iso_639_1: string; name: string; english_name: string }>;
};

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
  );

  if (!movieRes.ok) return notFound();

  const movie: Movie = await movieRes.json();

  const videoRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
  );
  const videoData = await videoRes.json();
  const trailer = videoData.results?.find(
    (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
  );

  const background = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/banner.jpg';
  const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : '—';
  const genres = movie.genres?.map((genre) => genre.name).join(' • ') || '—';
  const runtime = movie.runtime ? `${movie.runtime} min` : '—';
  const language = movie.spoken_languages?.[0]?.english_name || '—';

  return (
    <main className="relative isolate overflow-hidden text-white">
      <div className="absolute inset-0">
        <img src={background} alt={`${movie.title} backdrop`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col gap-12 px-6 py-16 md:flex-row md:items-start md:px-12 lg:px-16">
        <article className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
            Premier Spotlight
          </div>
          <header className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">{movie.title}</h1>
            <p className="text-base leading-relaxed text-white/75 md:text-lg">{movie.overview}</p>
          </header>

          <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:grid-cols-2">
            <div className="space-y-1 text-sm">
              <p className="text-white/50">Release</p>
              <p className="font-semibold text-white">{movie.release_date || '—'}</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-white/50">Rating</p>
              <p className="font-semibold text-white">{movie.vote_average?.toFixed(1) ?? '—'} / 10</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-white/50">Runtime</p>
              <p className="font-semibold text-white">{runtime}</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-white/50">Language</p>
              <p className="font-semibold text-white">{language}</p>
            </div>
            <div className="space-y-1 text-sm sm:col-span-2">
              <p className="text-white/50">Genres</p>
              <p className="font-semibold text-white/85">{genres}</p>
            </div>
          </section>

          {trailer && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-white/70">Official Trailer</h2>
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.9)]">
                <iframe
                  className="aspect-video w-full"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}
        </article>

        <aside className="w-full max-w-xs space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/75 backdrop-blur md:sticky md:top-28 md:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">Quick facts</p>
          <ul className="space-y-3">
            <li className="flex items-center justify-between gap-4">
              <span className="text-white/50">Year</span>
              <span className="font-semibold text-white">{releaseYear}</span>
            </li>
            <li className="flex items-center justify-between gap-4">
              <span className="text-white/50">TMDb</span>
              <span className="font-semibold text-white">{movie.vote_average?.toFixed(1) ?? '—'}</span>
            </li>
            <li className="flex items-center justify-between gap-4">
              <span className="text-white/50">Runtime</span>
              <span className="font-semibold text-white">{runtime}</span>
            </li>
            <li className="flex items-center justify-between gap-4">
              <span className="text-white/50">Language</span>
              <span className="font-semibold text-white">{language}</span>
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
