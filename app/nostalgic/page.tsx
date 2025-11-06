import Image from 'next/image';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import { fetchCompanyMovies, fetchNetworkShows } from '@/lib/tmdb';

type NetworkConfig = {
  id: string;
  badge: string;
  title: string;
  description: string;
  heroGradient: string;
  railGradient: string;
};

const networkConfigs: NetworkConfig[] = [
  {
    id: '44',
    badge: 'Disney Channel',
    title: 'Disney Channel Rewind',
    description: 'From Kim Possible missions to That’s So Raven visions—the era of theme songs stuck in your head.',
    heroGradient: 'from-rose-400/20 via-amber-300/10 to-transparent',
    railGradient: 'from-rose-400/15 via-orange-300/10 to-transparent',
  },
  {
    id: '56',
    badge: 'Cartoon Network',
    title: 'Cartoon Network Classics',
    description: 'Action blocks, weird science, and late-night Toonami breaks that defined the 2000s.',
    heroGradient: 'from-cyan-400/25 via-sky-400/10 to-transparent',
    railGradient: 'from-cyan-400/15 via-blue-400/10 to-transparent',
  },
  {
    id: '13',
    badge: 'Nickelodeon',
    title: 'Nickelodeon Icons',
    description: 'Orange soda, slime, and sitcom chaos—from sketch shows to superhero goofs.',
    heroGradient: 'from-violet-400/25 via-fuchsia-400/10 to-transparent',
    railGradient: 'from-violet-400/15 via-purple-400/10 to-transparent',
  },
];

const movieStudios = [
  {
    id: '2', // Walt Disney Pictures
    title: 'Disney 2000s Movie Night',
    description: 'Blockbusters, animated adventures, and the birth of modern franchises.',
  },
  {
    id: '674', // Nickelodeon Movies
    title: 'Nickelodeon on the Big Screen',
    description: 'Rugrats road trips, SpongeBob shenanigans, and Jimmy Neutron genius.',
  },
];

const imageBase = 'https://image.tmdb.org/t/p';

function buildImagePath(path?: string | null, size: 'poster' | 'backdrop' = 'poster') {
  if (!path) return null;
  const width = size === 'poster' ? 'w500' : 'w1280';
  return `${imageBase}/${width}${path}`;
}

export default async function NostalgicPage() {
  const [networkData, studioMovies] = await Promise.all([
    Promise.all(
      networkConfigs.map(async (config) => {
        try {
          const shows = await fetchNetworkShows(config.id);
          return { ...config, shows: shows || [] };
        } catch {
          return { ...config, shows: [] };
        }
      })
    ),
    Promise.all(
      movieStudios.map(async (studio) => {
        try {
          const movies = await fetchCompanyMovies(studio.id);
          return { ...studio, movies: movies || [] };
        } catch {
          return { ...studio, movies: [] };
        }
      })
    ),
  ]);

  const heroEntries = networkData
    .map((network) => ({
      ...network,
      show: network.shows[0],
    }))
    .filter((entry) => entry.show)
    .slice(0, 2);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-12 px-6 py-16 text-white md:px-12 lg:px-16">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
          Nostalgic Feed
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]">
            Saturday-morning energy, weekday syndication feels.
          </h1>
          <p className="max-w-2xl text-base text-white/70 md:text-lg">
            SmartFlix bottled the 2000s cartoon line-up: Cartoon Network, Nick, Jetix, Disney Channel. Relive the hero
            transformations, after-school cliffhangers, and marathons fueled by sugary cereal.
          </p>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {heroEntries.map((feature) => {
          const backdrop = buildImagePath(feature.show.backdrop_path || feature.show.poster_path, 'backdrop');
          const synopsis = feature.show.overview || feature.description;
          const year = feature.show.first_air_date?.slice(0, 4) ?? '—';
          return (
          <article
            key={`${feature.badge}-hero`}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-[0_30px_80px_-45px_rgba(15,23,42,0.9)] backdrop-blur"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.heroGradient}`} />
            {backdrop && (
              <Image
                src={backdrop}
                alt={feature.show.name || feature.show.original_name || feature.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-45"
              />
            )}
            <div className="relative z-10 space-y-5 p-8 md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                {feature.badge}
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                  {feature.show.name || feature.show.original_name}
                </h2>
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">{year}</p>
                <p className="text-sm text-white/75 md:text-base line-clamp-4">{synopsis}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Press Play
              </div>
            </div>
          </article>
        );
        })}
      </section>

      {networkData.map((network) => (
        <section key={network.id} className="space-y-5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
              {network.badge}
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white md:text-3xl">{network.title}</h2>
              <p className="max-w-3xl text-sm text-white/70 md:text-base">{network.description}</p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {network.shows.slice(0, 8).map((show: any) => (
              <ShowCard key={show.id} show={show} gradient={network.railGradient} />
            ))}
          </div>
        </section>
      ))}

      {studioMovies.map((studio) =>
        studio.movies.length ? (
          <section key={studio.id} className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-white/70 md:text-xl">
                {studio.title}
              </h2>
              <p className="text-sm text-white/60">{studio.description}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {studio.movies.slice(0, 8).map((movie: any) => (
                <div key={movie.id} className="w-full">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}
    </main>
  );
}

function ShowCard({ show, gradient }: { show: any; gradient: string }) {
  const name = show.name || show.original_name || 'Untitled Series';
  const image = buildImagePath(show.poster_path);
  const year = show.first_air_date?.slice(0, 4) ?? '—';
  const rating = show.vote_average ? show.vote_average.toFixed(1) : '—';

  return (
    <Link
      href={`https://www.themoviedb.org/tv/${show.id}`}
      target="_blank"
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] text-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.85)] backdrop-blur transition hover:border-white/25"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`} />
      <div className="relative z-10 flex flex-col gap-4 p-5">
        {image ? (
          <div className="overflow-hidden rounded-2xl border border-white/15">
            <Image
              src={image}
              alt={name}
              width={320}
              height={450}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-44 w-full items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-xs uppercase tracking-[0.3em] text-white/60">
            No art yet
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/60">
            <span>{year}</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>TMDb {rating}</span>
          </div>
          <p className="text-sm text-white/75 line-clamp-3">{show.overview}</p>
        </div>
      </div>
    </Link>
  );
}
