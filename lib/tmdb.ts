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

export async function fetchTrendingSeries() {
    const res = await fetch(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
}

export async function fetchPopularSeries() {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    return data.results;
}

export async function fetchTopRatedSeries() {
    const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    return data.results;
}

export async function fetchOnTheAirSeries() {
    const res = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    return data.results;
}

export async function fetchTvDetails(id: string) {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`, {
        next: { revalidate: 60 * 60 }, // refresh every hour
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch TV details for id ${id}`);
    }
    return res.json();
}

function buildQuery(params: Record<string, string | number | boolean | undefined>) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });
    return searchParams.toString();
}

export async function fetchNetworkShows(networkId: string) {
    const query = buildQuery({
        api_key: API_KEY,
        with_networks: networkId,
        'first_air_date.gte': '2000-01-01',
        'first_air_date.lte': '2009-12-31',
        sort_by: 'popularity.desc',
        language: 'en-US',
        include_adult: false,
        page: 1,
    });
    const res = await fetch(`${BASE_URL}/discover/tv?${query}`, {
        next: { revalidate: 60 * 60 },
    });
    const data = await res.json();
    return data.results;
}

export async function fetchCompanyMovies(companyId: string) {
    const query = buildQuery({
        api_key: API_KEY,
        with_companies: companyId,
        'primary_release_date.gte': '2000-01-01',
        'primary_release_date.lte': '2009-12-31',
        sort_by: 'popularity.desc',
        language: 'en-US',
        include_adult: false,
        page: 1,
    });
    const res = await fetch(`${BASE_URL}/discover/movie?${query}`, {
        next: { revalidate: 60 * 60 },
    });
    const data = await res.json();
    return data.results;
}
