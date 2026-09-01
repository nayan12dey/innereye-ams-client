'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Clock,
    CalendarDays,
    UserCheck,
    ShieldCheck,
    LogOut,
    Menu,
    X,
    Building2
} from 'lucide-react';
import { Button } from '@heroui/react';

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Check if current route is admin or employee
    const isAdmin = pathname.includes('/admin');

    const employeeLinks = [
        { name: 'Dashboard', href: '/dashboard/employee', icon: LayoutDashboard },
        { name: 'My Attendance', href: '/dashboard/employee/attendance', icon: Clock },
        { name: 'Leave Applications', href: '/dashboard/employee/leaves', icon: CalendarDays },
    ];

    const adminLinks = [
        { name: 'Admin Overview', href: '/dashboard/admin', icon: ShieldCheck },
        { name: 'Live Logs', href: '/dashboard/admin/logs', icon: UserCheck },
        { name: 'Leave Management', href: '/dashboard/admin/leaves', icon: CalendarDays },
    ];

    const currentLinks = isAdmin ? adminLinks : employeeLinks;

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Button
                    isIconOnly
                    size="sm"
                    className="bg-white border border-slate-200 shadow-md rounded-xl text-slate-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Backdrop for Mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
        fixed top-0 left-0 bottom-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

                {/* Top Section: Brand & Nav Links */}
                <div className="p-6 space-y-8">

                    {/* Brand Logo */}
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-md shadow-blue-500/20">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-extrabold text-slate-800 text-base tracking-tight leading-none">InnerEye</h2>
                            <p className="text-[11px] font-semibold text-slate-400 mt-1">AMS Portal</p>
                        </div>
                    </div>

                    {/* Role Indicator Badge */}
                    <div className="px-3 py-2 bg-slate-100/80 rounded-xl flex items-center justify-between border border-slate-200/60">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                            {isAdmin ? 'Admin Mode' : 'Employee Portal'}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-purple-500' : 'bg-emerald-500'}`} />
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-1.5">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Main Menu</p>
                        {currentLinks.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all
                    ${isActive
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                  `}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Section: Footer / Switch Portal & Logout */}
                <div className="p-4 border-t border-slate-100 space-y-2">

                    {/* Quick Switch Link (For Demo Testing) */}
                    <Link href={isAdmin ? '/dashboard/employee' : '/dashboard/admin'}>
                        <Button size="sm" variant="flat" className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium rounded-xl text-xs">
                            Switch to {isAdmin ? 'Employee' : 'Admin'}
                        </Button>
                    </Link>

                    <Link href="/login">
                        <Button size="sm" variant="light" color="danger" className="w-full font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Button>
                    </Link>

                </div>

            </aside>
        </>
    );
}