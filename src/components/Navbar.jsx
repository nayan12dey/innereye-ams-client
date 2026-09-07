'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { ShieldCheck, LogIn, UserPlus, Menu, X, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSession, signOut } from '@/lib/auth-client';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const handleLogout = async () => {
        try {
            await signOut();
            toast.success('Logged out successfully!');
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to log out');
        }
    };

    return (
        <nav className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                {/* Brand Logo - Left Side */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-lg sm:text-xl text-slate-800 group transition-all duration-300"
                >
                    <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:bg-blue-700 transition-all duration-300 shadow-md shadow-blue-500/20">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="tracking-tight">
                        InnerEye <span className="text-blue-600 group-hover:text-blue-700 transition-colors">AMS</span>
                    </span>
                </Link>

                {/* Desktop Action Buttons (Hidden on Mobile) */}
                <div className="hidden md:flex items-center gap-3">
                    {isPending ? (
                        <div className="h-9 w-32 bg-slate-100 animate-pulse rounded-xl" />
                    ) : session?.user ? (
                        <div className="flex items-center gap-4">
                            {/* User Profile Info Badge */}
                            <div className="flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                                <div className="p-1 bg-blue-100 text-blue-600 rounded-lg">
                                    <User className="w-4 h-4" />
                                </div>
                                <div className="text-left leading-tight">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-bold text-slate-800">{session.user.name}</span>
                                        {session.user.role && (
                                            <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded-md uppercase tracking-wider">
                                                {session.user.role}
                                            </span>
                                        )}
                                    </div>
                                    {session.user.empId && (
                                        <p className="text-[11px] font-medium text-slate-500">
                                            ID: {session.user.empId}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Button
                                size="sm"
                                variant="flat"
                                color="danger"
                                onClick={handleLogout}
                                className="font-medium rounded-xl"
                                startContent={<LogOut className="w-4 h-4" />}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button
                                    variant="flat"
                                    color="primary"
                                    size="sm"
                                    className="font-medium text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-200 rounded-xl"
                                    startContent={<LogIn className="w-4 h-4" />}
                                >
                                    Portal Login
                                </Button>
                            </Link>

                            <Link href="/register">
                                <Button
                                    color="primary"
                                    size="sm"
                                    className="font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 rounded-xl"
                                    startContent={<UserPlus className="w-4 h-4" />}
                                >
                                    Register Account
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger Toggle Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 shadow-lg">
                    {isPending ? (
                        <div className="h-10 w-full bg-slate-100 animate-pulse rounded-xl" />
                    ) : session?.user ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                                <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                                    <User className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-slate-800">{session.user.name}</span>
                                        {session.user.role && (
                                            <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded-md uppercase tracking-wider">
                                                {session.user.role}
                                            </span>
                                        )}
                                    </div>
                                    {session.user.empId && (
                                        <p className="text-xs text-slate-500 font-medium">ID: {session.user.empId}</p>
                                    )}
                                </div>
                            </div>
                            <Button
                                color="danger"
                                variant="flat"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    handleLogout();
                                }}
                                className="w-full justify-center font-medium rounded-xl"
                                startContent={<LogOut className="w-4 h-4" />}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block w-full">
                                <Button
                                    variant="flat"
                                    color="primary"
                                    className="w-full justify-center font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-xl"
                                    startContent={<LogIn className="w-4 h-4" />}
                                >
                                    Portal Login
                                </Button>
                            </Link>

                            <Link href="/register" onClick={() => setIsMenuOpen(false)} className="block w-full">
                                <Button
                                    color="primary"
                                    className="w-full justify-center font-medium bg-blue-600 text-white rounded-xl"
                                    startContent={<UserPlus className="w-4 h-4" />}
                                >
                                    Register Account
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

