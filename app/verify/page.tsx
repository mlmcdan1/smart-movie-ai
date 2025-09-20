'use client';
import { useEffect } from 'react';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import { signInWithEmailLink } from 'firebase/auth';

export default function VerifyPage() {
    const router = useRouter();

    useEffect(() => {
        const email = window.localStorage.getItem('emailForSignIn');
        if (!email) return;

        if (auth && window.location.href) {
            signInWithEmailLink(auth, email, window.location.href)
            .then(() => {
                window.localStorage.removeItem('emailForSignIn');
                router.push('/');
            })
            .catch((err) => {
                console.error(err);
            });
        }
    }, []);

    return (
        <div className='text-white min-h-screen flex items-center justify-center bg-black'>
            <p>Verifying your sign-in link...</p>
        </div>
    );
}