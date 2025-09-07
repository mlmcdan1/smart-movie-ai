import Link from "next/link";

type Movie = {
    id: number;
    title: string;
    poster_path: string;
  };

  export default function MovieCard({ movie }: { movie: Movie }) {
    return (
      <Link href={`/movie/${movie.id}`}>
        <div className="bg-gray-800 rounded p-2 text-white shadow hover:scale-105 transition cursor-pointer">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded mb-2"
            />
          ) : (
            <div className="w-full h-[300px] bg-gray-600 flex items-center justify-center rounded mb-2">
              <span className="text-sm">No Image</span>
            </div>
          )}
          <h2 className="text-sm font-semibold">{movie.title}</h2>
          </div>
          </Link>
        );
    }