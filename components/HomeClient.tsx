'use client';

import MovieRow from "./MovieRow";
import Hero from "./Hero";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPopularMovies, fetchTrendingMovies, fetchTopRatedMovies, fetchUpcomingMovies } from "@/lib/tmdb";

export default function HomeClient(){
    const { user, loading } = useAuth();
    const router = useRouter();
    const [movies, setMovies] = useState<any[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [loading, user, router]);

    useEffect(() => {
        async function loadMovies() {
            const [popular, trending, topRated, upcoming] = await Promise.all([
                fetchPopularMovies(),
                fetchTrendingMovies(),
                fetchTopRatedMovies(),
                fetchUpcomingMovies(),
            ]);
            setMovies([popular, trending, topRated, upcoming]);
            setLoaded(true);
        }

        if (user) {
            loadMovies();
        }
    }, [user]);

    if (loading || !loaded || !user) {
        return <p className="text-white p-4">Loading...</p>
    }

    const [popularMovies, trendingMovies, topRatedMovies, upcomingMovies] = movies;

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