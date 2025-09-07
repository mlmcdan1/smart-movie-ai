'use client';
import { useEffect, useState } from 'react';

type Props = {
    movieId: number;
    title: string;
    backdropPath: string;
};

export default function TrailerShowcaseCard({ movieId, title, backdropPath }: Props) {
    const [videoKey, setVideoKey] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            const res = await fetch(
                ``
            )
        }
    })
}