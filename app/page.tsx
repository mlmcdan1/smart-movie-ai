'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import('@/components/HomeClient'), { ssr: false });

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/welcome');
    }
  }, [user]);

  if (!user) return null;

  return <HomeClient />;
}