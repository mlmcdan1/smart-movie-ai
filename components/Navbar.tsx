'use client';

import React, { useState } from 'react';
import Link from "next/link";

const links = [
    { name: 'Home', href: '/'},
    { name: 'Movies', href: '/movies' },
    { name: 'Series', href: '/series' },
    { name: 'Original', href: '/originals' }, 
];

export default function Navbar() {
    const [active, setActive] = useState('');

    return (
        <nav className='w-full px-6 py-4 bg-[#0a0a0a] text-white shadow-lg flex justify-between items-center z-50 border-b border-gray-800'>
            <div className='text-3xl font-extrabold text-cyan-400 tracking-wide cursor-pointer'>
                SmartFlix
            </div>

            <ul className='flex space-x-6 text-lg font-medium'>
                {links.map((link) => (
                    <li 
                        key={link.name}
                        className='relative group cursor-pointer'
                    >
                        <Link 
                            href={link.href}
                            className={`transition-colors duration-300 ${
                                active === link.name ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
                            }`}
                            onClick={() => setActive(link.name)}
                        >
                            {link.name}
                            <span
                                className={`absolute left-0 -bottom-1 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${
                                    active === link.name ? 'scale-x-100' : ''
                                }`}
                            >
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}