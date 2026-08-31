'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { ShieldCheck, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Brand Logo - Left Side */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-xl text-slate-800 group transition-all duration-300"
                >
                    <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:bg-blue-700 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-md shadow-blue-500/20">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="tracking-tight">
                        InnerEye <span className="text-blue-600 group-hover:text-blue-700 transition-colors">AMS</span>
                    </span>
                </Link>

                {/* Action Buttons with Interactive Hover Effects - Right Side */}
                <div className="flex items-center gap-3">

                    {/* Login Button */}
                    <Link href="/login">
                        <Button
                            variant="flat"
                            color="primary"
                            size="md"
                            className="font-medium text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.2 active:translate-y-0 transition-all duration-200 rounded-xl"
                            startContent={<LogIn className="w-4 h-4" />}
                        >
                            Portal Login
                        </Button>
                    </Link>

                    {/* Register Button */}
                    <Link href="/register">
                        <Button
                            color="primary"
                            size="md"
                            className="font-medium bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 hover:-active:translate-y-0 transition-all duration-200 rounded-xl"
                            startContent={<UserPlus className="w-4 h-4" />}
                        >
                            Register Account
                        </Button>
                    </Link>

                </div>

            </div>
        </nav>
    );
}