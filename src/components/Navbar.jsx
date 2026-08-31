'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { ShieldCheck, User, LogIn } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-800">
                    <div className="bg-blue-600 text-white p-2 rounded-lg">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span>InnerEye <span className="text-blue-600">AMS</span></span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
                    <Link href="#about" className="hover:text-blue-600 transition-colors">About Us</Link>
                    <Link href="#contact" className="hover:text-blue-600 transition-colors">Contact</Link>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <Link href="/login">
                        <Button variant="flat" color="primary" startContent={<LogIn className="w-4 h-4" />}>
                            Portal Login
                        </Button>
                    </Link>
                </div>

            </div>
        </nav>
    );
}