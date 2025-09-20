'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithEmailLink, sendSignInLinkToEmail } from 'firebase/auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email) return;

        const actionCodeSettings = {
            url: typeof window !== 'undefined' ? window.location.origin + '/verify' : '',
            handleCodeInApp: true,
        };

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            setSubmitted(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='min-h-screen bg-[#0c0c0c] text-white flex items-center justify-center px-4'>
            <div className='w-full max-w-md space-y-6 text-center'>
                <h1 className='text-3xl font-bold'>SmartFlix</h1>
                <h2 className='text-xl font-semibold'>Log in with you email</h2>
                {!submitted ? (
                <>
                    <input
                    type='email'
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-3 rounded bg-[#1a1a1a] 
                    border border-gray-700 text-white'
                />
                <button 
                    onClick={handleLogin}
                    className='w-full bg-blue-600 hover:bg-blue-700
                    text-white font-semibold py-3 rounded'
                >
                    Continue
                </button>
                </>
            ) : (
                <p className='text-sm text-gray-400'>
                    A sign-in link has been sent to your email.
                </p>
            )}
            <p className='text-sm text-gray-400'>
                New to SmartFlix? <a href='/signup' className='underline'>Sign up</a>
            </p>
            <div className='border-t bporder-gray-80 pt-4 text-xs text-gray-500'>
                With this account, you can access SmartFlix Originals, Movies, and Series.
            </div>
            </div>
        </div>
    )
}