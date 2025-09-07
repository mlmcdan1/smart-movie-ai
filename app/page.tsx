import { fetchPopularMovies, fetchTrendingMovies, fetchTopRatedMovies, fetchUpcomingMovies } from "@/lib/tmdb";
import MovieRow from "@/components/MovieRow";
import Hero from "@/components/Hero";



export default async function Home() {
  const [popularMovies, trendingMovies, topRatedMovies, upcomingMovies] = await Promise.all([
    fetchPopularMovies(),
    fetchTrendingMovies(),
    fetchTopRatedMovies(),
    fetchUpcomingMovies()
  ]);

  return (
    <div>
      <Hero/>
      <MovieRow title="Trending Now" movies={trendingMovies}/>
      <MovieRow title="Popular Movies" movies={popularMovies}/>
      <MovieRow title="Top Rated" movies={topRatedMovies}/>
      <MovieRow title="Upcoming" movies={upcomingMovies}/>
    </div>
  );
}
