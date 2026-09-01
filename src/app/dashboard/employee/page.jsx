'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Modal, TextField, Label, InputGroup, Select, ListBox } from '@heroui/react';
import {
    Clock,
    LogOut,
    CalendarCheck,
    CheckCircle2,
    AlertCircle,
    Briefcase,
    TrendingUp,
    PlusCircle,
    Calendar,
    X
} from 'lucide-react';
import Link from 'next/link';

export default function EmployeeDashboard() {
    const [currentTime, setCurrentTime] = useState(null);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState(null);

    // Modal Open State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leaveData, setLeaveData] = useState({
        type: 'Casual Leave',
        startDate: '',
        endDate: '',
        reason: ''
    });

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleToggleCheckIn = () => {
        if (!isCheckedIn) {
            setIsCheckedIn(true);
            setCheckInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } else {
            setIsCheckedIn(false);
            setCheckInTime(null);
        }
    };

    const handleLeaveSubmit = (e) => {
        e.preventDefault();
        console.log('Leave Submitted:', leaveData);
        setIsModalOpen(false);
        setLeaveData({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });
    };

    const logs = [
        { date: 'Sep 01, 2026', checkIn: '09:15 AM', checkOut: '06:10 PM', hours: '8h 55m', status: 'On Time' },
        { date: 'Aug 31, 2026', checkIn: '09:28 AM', checkOut: '06:30 PM', hours: '9h 02m', status: 'Late Arrival' },
        { date: 'Aug 28, 2026', checkIn: '09:05 AM', checkOut: '06:00 PM', hours: '8h 55m', status: 'On Time' },
        { date: 'Aug 27, 2026', checkIn: '09:10 AM', checkOut: '06:15 PM', hours: '9h 05m', status: 'On Time' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Top Header */}
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
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* Welcome & Check-In Box */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-xl flex flex-col justify-between">
                        <div className="space-y-2">
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-400/30 inline-block">
                                Welcome Back 👋
                            </span>
                            <h2 className="text-2xl md:text-3xl font-extrabold">Rahul Sharma</h2>
                            <p className="text-slate-300 text-sm">
                                Have a productive day! Don't forget to mark your check-out before leaving.
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

                    <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col justify-between items-center text-center space-y-4">
                        <div className="space-y-1">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${isCheckedIn ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                <span className={`w-2 h-2 rounded-full ${isCheckedIn ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                                {isCheckedIn ? 'Currently Checked In' : 'Not Checked In Yet'}
                            </span>
                            <h3 className="text-lg font-bold text-slate-800 pt-2">Attendance Action</h3>
                            <p className="text-xs text-slate-500">
                                {isCheckedIn ? `Checked in at ${checkInTime}` : 'Click below to log your entry for today'}
                            </p>
                        </div>

                        <Button
                            size="lg"
                            color={isCheckedIn ? "danger" : "primary"}
                            onClick={handleToggleCheckIn}
                            className={`w-full font-bold shadow-lg py-6 rounded-xl transition-all ${isCheckedIn
                                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                                }`}
                        >
                            <Clock className="w-5 h-5" />
                            {isCheckedIn ? 'Check-Out Now' : 'Check-In Now'}
                        </Button>

                        <p className="text-[11px] text-slate-400">
                            Standard office time: 09:00 AM - 06:00 PM
                        </p>
                    </Card>
                </div>

                {/* Stats Grid & Leave Apply Action */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-slate-800">Performance Summary</h3>
                    <Button
                        color="primary"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-2 shadow-md shadow-blue-500/20"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Apply For Leave
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Card className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Leave Balance</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">18 Days</h3>
                                <p className="text-xs text-emerald-600 font-medium mt-1">Annual Paid Quota</p>
                            </div>
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <CalendarCheck className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hours Worked (This Month)</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">168 hrs</h3>
                                <p className="text-xs text-blue-600 font-medium mt-1">Avg 8.4 hrs/day</p>
                            </div>
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Punctuality Rate</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">96%</h3>
                                <p className="text-xs text-emerald-600 font-medium mt-1">+2% from last month</p>
                            </div>
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Logs Table */}
                <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Recent Attendance Activity</h3>
                            <p className="text-xs text-slate-500">Your daily check-in and check-out summary</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Check-In</th>
                                    <th className="py-3 px-4">Check-Out</th>
                                    <th className="py-3 px-4">Total Hours</th>
                                    <th className="py-3 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {logs.map((log, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3.5 px-4 font-medium text-slate-800">{log.date}</td>
                                        <td className="py-3.5 px-4">{log.checkIn}</td>
                                        <td className="py-3.5 px-4">{log.checkOut}</td>
                                        <td className="py-3.5 px-4 font-semibold text-slate-800">{log.hours}</td>
                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${log.status === 'On Time'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                }`}>
                                                {log.status === 'On Time' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                                                {log.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

            </main>

            {/* Leave Application Modal Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 relative space-y-4">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Apply for Leave</h3>
                                    <p className="text-xs text-slate-500">Submit request for HR approval</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleLeaveSubmit} className="space-y-4">

                            {/* Leave Type */}
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-700 block">Leave Type</label>
                                <select
                                    value={leaveData.type}
                                    onChange={(e) => setLeaveData({ ...leaveData, type: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Earned Leave">Earned Leave</option>
                                </select>
                            </div>

                            {/* Start & End Date */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-700 block">Start Date</label>
                                    <input
                                        type="date"
                                        value={leaveData.startDate}
                                        onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-700 block">End Date</label>
                                    <input
                                        type="date"
                                        value={leaveData.endDate}
                                        onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-700 block">Reason for Leave</label>
                                <input
                                    type="text"
                                    placeholder="E.g., Personal work or medical emergency"
                                    value={leaveData.reason}
                                    onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Modal Footer Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <Button
                                    type="button"
                                    variant="flat"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-xl font-medium"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold px-5"
                                >
                                    Submit Request
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

