'use client';

import React, { useEffect, useState} from 'react';

type Movie = {
    title: string;
    overview: string;
    backdrop_path: string;
};

export default function Hero() {
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`);
                const data = await res.json();
                const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
                setMovie(randomMovie);
            } catch (error) {
                console.error('Failed to fetch movie:', error);
            }
        }

        fetchMovie();
    }, []);
    
    const imageUrl = movie?.backdrop_path 
    ?  `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/banner.jpg'; //fallback image
  return (
    <section 
        className="relative h-[80vh] w-full bg-cover bg-center bg-no-repeat text-white" 
        style={{ backgroundImage: `url('${imageUrl}')` }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="relative z-10 p-10 max-w-3xl">
        <h1 className='text-5xl font-extrabold mb-4'>
            {movie?.title || 'Featured Movie'}
        </h1>
        <p className='text-lg mb-6'>
            {movie?.overview || 'This is a short description or tagline for the featured movie.'}
        </p>
        <div className="flex gap-4">
          <button className="bg-cyan-500 text-white px-5 py-2 rounded hover:bg-cyan-600">Watch Now</button>
          <button className="bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-600">More Info</button>
        </div>
      </div>
    </section>
  );
}