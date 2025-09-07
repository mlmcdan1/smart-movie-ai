'use client';

import MovieCard from './MovieCard';

interface MovieRowProps {
    title: string;
    movies: any[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
    if(!movies || movies.length === 0) return null;

    return (
        <div className='mb-8'>
            <h2 className='text-xl sm:text-2xl font-semibold mb-4 px-4'>
                {title}
            </h2>
            <div className='flex gap-4 overflow-x-auto px-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent'>
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className='flex-shrink-0 w-40 sm:w-48'
                    >
                        <MovieCard movie={movie}/>
                    </div>    
                ))}
            </div>
        </div>
    );
}