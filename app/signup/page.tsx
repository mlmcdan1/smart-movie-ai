'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignUpPage() { 
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-black text-white px-4'>
            <form
                onSubmit={handleSignUp}
                className='w-full max-w-sm space-y-4'
            >
                <h2 className='text-2xl font-bold'>
                    Create an Account
                </h2>
                {error && 
                    <p className='text-red-500'>
                        {error}
                    </p>}
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-4 py-2 bg-gray-800 rounded'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-ful px-4 py-2 bg-gray-800 rounded'
                    />
                    <button
                        type='submit'
                        className='w-full bg-blue-600 py-2 rounded
                        hover:bg-blue-700'
                    >
                        Sign Up
                    </button>
            </form>

        </div>
    )
}