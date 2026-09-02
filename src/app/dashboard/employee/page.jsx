'use client';

import { useState, useEffect } from 'react';
import { Card, Button } from '@heroui/react';
import {
    Clock, LogOut, CalendarCheck, CheckCircle2, AlertCircle, Briefcase, TrendingUp, PlusCircle, Calendar, X
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function EmployeeDashboard() {
    const [currentTime, setCurrentTime] = useState(null);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTimestamp, setCheckInTimestamp] = useState(null);
    const [elapsedTime, setElapsedTime] = useState('0h 0m 0s');

    // Leave System State
    const [leaveBalance, setLeaveBalance] = useState(18);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leaveData, setLeaveData] = useState({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });

    // Live Clock & Working Hours Calculation Engine
    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            if (isCheckedIn && checkInTimestamp) {
                const diffMs = now - checkInTimestamp;
                const totalSeconds = Math.floor(diffMs / 1000);
                const hrs = Math.floor(totalSeconds / 3600);
                const mins = Math.floor((totalSeconds % 3600) / 60);
                const secs = totalSeconds % 60;
                setElapsedTime(`${hrs}h ${mins}m ${secs}s`);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [isCheckedIn, checkInTimestamp]);

    const handleToggleCheckIn = () => {
        if (!isCheckedIn) {
            setIsCheckedIn(true);
            setCheckInTimestamp(new Date());
        } else {
            setIsCheckedIn(false);
            setCheckInTimestamp(null);
            setElapsedTime('0h 0m 0s');
        }
    };

    const handleLeaveSubmit = (e) => {
        e.preventDefault();
        toast.success(`Leave request for ${leaveData.type} submitted successfully!`);
        setIsModalOpen(false);
        setLeaveData({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white p-2 rounded-xl">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="font-bold text-slate-800 text-base">Employee Portal</h1>
                            <p className="text-xs text-slate-500">InnerEye AMS</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-slate-800">Rahul Sharma</p>
                            <p className="text-xs text-slate-500">Software Engineer (IECS-1042)</p>
                        </div>
                        <Link href="/login">
                            <Button size="sm" variant="flat" color="danger" className="rounded-xl font-medium">
                                <LogOut className="w-4 h-4" /> Logout
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-xl flex flex-col justify-between">
                        <div className="space-y-2">
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-400/30 inline-block">
                                Welcome Back 👋
                            </span>
                            <h2 className="text-2xl md:text-3xl font-extrabold">Rahul Sharma</h2>
                            <p className="text-slate-300 text-sm">
                                Have a productive day! Track your shift hours in real time.
                            </p>
                        </div>

                        <div className="pt-6 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Current Date & Time</p>
                                <p className="text-lg font-bold text-white mt-0.5">
                                    {currentTime ? currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Loading...'}
                                </p>
                            </div>
                            <div className="text-2xl font-mono font-bold text-blue-400 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
                                {currentTime ? currentTime.toLocaleTimeString() : '00:00:00 AM'}
                            </div>
                        </div>
                    </Card>

                    {/* Dynamic Working Timer Action Card */}
                    <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col justify-between items-center text-center space-y-4">
                        <div className="space-y-1">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${isCheckedIn ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                <span className={`w-2 h-2 rounded-full ${isCheckedIn ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                                {isCheckedIn ? 'Currently On Duty' : 'Not Checked In'}
                            </span>
                            <h3 className="text-lg font-bold text-slate-800 pt-2">Today's Shift Tracker</h3>
                            {isCheckedIn && (
                                <div className="text-xl font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 mt-1">
                                    {elapsedTime}
                                </div>
                            )}
                        </div>

                        <Button
                            size="lg"
                            color={isCheckedIn ? "danger" : "primary"}
                            onClick={handleToggleCheckIn}
                            className={`w-full font-bold shadow-lg py-6 rounded-xl transition-all ${isCheckedIn ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            <Clock className="w-5 h-5" />
                            {isCheckedIn ? 'Check-Out Now' : 'Check-In Now'}
                        </Button>
                    </Card>
                </div>

                {/* Stats Section with Live Leave Balance */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-slate-800">Performance Summary</h3>
                    <Button
                        color="primary"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-2"
                    >
                        <PlusCircle className="w-5 h-5" /> Apply For Leave
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase">Available Leave Balance</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{leaveBalance} Days</h3>
                                <p className="text-xs text-emerald-600 font-medium mt-1">Annual Quota</p>
                            </div>
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <CalendarCheck className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase">Shift Time Today</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{isCheckedIn ? elapsedTime : '0h 0m'}</h3>
                                <p className="text-xs text-blue-600 font-medium mt-1">Live Calculation</p>
                            </div>
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase">Punctuality Rate</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">96%</h3>
                                <p className="text-xs text-emerald-600 font-medium mt-1">On-Time Score</p>
                            </div>
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>
                </div>
            </main>

            {/* Leave Application Modal Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <h3 className="text-lg font-bold text-slate-800">Apply for Leave</h3>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleLeaveSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1">Leave Type</label>
                                <select
                                    value={leaveData.type}
                                    onChange={(e) => setLeaveData({ ...leaveData, type: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm outline-none"
                                >
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Earned Leave">Earned Leave</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 block mb-1">Start Date</label>
                                    <input type="date" required value={leaveData.startDate} onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 block mb-1">End Date</label>
                                    <input type="date" required value={leaveData.endDate} onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1">Reason</label>
                                <input type="text" placeholder="Reason for leave" required value={leaveData.reason} onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-sm" />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button type="button" variant="flat" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit" color="primary" className="bg-blue-600 text-white">Submit Request</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}



