// app/movie/[id]/page.tsx
import { notFound } from "next/navigation";

export default async function MovieDetail({ params }: { params: { id: string } }) {
  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
  );

  if (!movieRes.ok) return notFound();

  const movie = await movieRes.json();

  const videoRes = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
  );
  const videoData = await videoRes.json();
  const trailer = videoData.results?.find(
    (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return (
    <div className="relative text-white">
      <div
        className="absolute inset-0 bg-black/70 z-10"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80 z-20" />
      </div>

      <div className="relative z-30 p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p className="text-lg mb-6">{movie.overview}</p>
        <p className="text-sm text-gray-300 mb-2">Release date: {movie.release_date}</p>
        <p className="text-sm text-gray-300 mb-4">Rating: {movie.vote_average} / 10</p>

        {trailer && (
          <div className="aspect-video w-full mt-6">
            <iframe
              className="w-full h-full rounded shadow-lg"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
}