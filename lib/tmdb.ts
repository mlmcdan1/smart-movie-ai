const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies() {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    return data.results;
}

export async function fetchTrendingMovies() {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
  }
  
  export async function fetchTopRatedMovies() {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
  }
  
  export async function fetchUpcomingMovies() {
    const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
  }