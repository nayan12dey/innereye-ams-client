'use client';

import { useState } from 'react';
import { Card, Button } from '@heroui/react';
import {
    Users,
    UserCheck,
    Clock,
    CalendarCheck2,
    LogOut,
    ShieldCheck,
    Check,
    X,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    // Mock State for Leave Requests to test Approve/Reject dynamically
    const [leaveRequests, setLeaveRequests] = useState([
        { id: 1, name: 'Rahul Sharma', empId: 'IECS-1042', type: 'Casual Leave', dates: 'Sep 05 - Sep 06', reason: 'Personal work at hometown', status: 'Pending' },
        { id: 2, name: 'Priya Das', empId: 'IECS-1088', type: 'Sick Leave', dates: 'Sep 02 - Sep 03', reason: 'High fever and doctors visit', status: 'Pending' },
        { id: 3, name: 'Ankit Roy', empId: 'IECS-1015', type: 'Earned Leave', dates: 'Sep 10 - Sep 14', reason: 'Family vacation trip', status: 'Pending' },
    ]);

    const handleApprove = (id) => {
        setLeaveRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Approved' } : req));
    };

    const handleReject = (id) => {
        setLeaveRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
    };

    const attendanceLogs = [
        { name: 'Rahul Sharma', empId: 'IECS-1042', dept: 'Engineering', inTime: '09:15 AM', outTime: '06:10 PM', hours: '8h 55m', status: 'On Time' },
        { name: 'Priya Das', empId: 'IECS-1088', dept: 'Design', inTime: '09:42 AM', outTime: '--', hours: 'In Progress', status: 'Late Arrival' },
        { name: 'Ankit Roy', empId: 'IECS-1015', dept: 'Marketing', inTime: '09:02 AM', outTime: '06:00 PM', hours: '8h 58m', status: 'On Time' },
        { name: 'Sneha Kapur', empId: 'IECS-1029', dept: 'HR & Admin', inTime: '08:55 AM', outTime: '05:50 PM', hours: '8h 55m', status: 'On Time' },
        { name: 'Vikram Singh', empId: 'IECS-1090', dept: 'Engineering', inTime: '--', outTime: '--', hours: '0h', status: 'On Leave' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Top Navigation Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white p-2 rounded-xl">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="font-bold text-slate-800 text-base">HR & Admin Portal</h1>
                            <p className="text-xs text-slate-500">InnerEye Consultancy Services LLP</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-slate-800">Admin Control</p>
                            <p className="text-xs text-slate-500">admin@innereye.com</p>
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

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* Page Title */}
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800">Company Attendance Overview</h2>
                    <p className="text-sm text-slate-500">Track real-time employee check-ins, working hours, and manage leave approvals.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <Card className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Workforce</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">128</h3>
                                <p className="text-xs text-slate-500 font-medium mt-1">Active Employees</p>
                            </div>
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Users className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Present Today</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">114</h3>
                                <p className="text-xs text-emerald-600 font-medium mt-1">89% Attendance Rate</p>
                            </div>
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                                <UserCheck className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Late Arrivals</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">6</h3>
                                <p className="text-xs text-amber-600 font-medium mt-1">After 09:30 AM</p>
                            </div>
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Leaves</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
                                    {leaveRequests.filter(r => r.status === 'Pending').length}
                                </h3>
                                <p className="text-xs text-blue-600 font-medium mt-1">Requires Action</p>
                            </div>
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                <CalendarCheck2 className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>

                </div>

                {/* Leave Requests Management Section */}
                <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Pending Leave Requests</h3>
                            <p className="text-xs text-slate-500">Review and respond to employee time-off applications</p>
                        </div>
                        <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-3 py-1 rounded-full">
                            {leaveRequests.length} Total Requests
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {leaveRequests.map((req) => (
                            <div key={req.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col justify-between space-y-3">
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-slate-800 text-sm">{req.name}</span>
                                        <span className="text-[11px] font-semibold text-slate-400">{req.empId}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-600">
                                        <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{req.type}</span>
                                        <span className="font-medium text-slate-500">{req.dates}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2 pt-1">
                                        <span className="font-semibold text-slate-700">Reason:</span> "{req.reason}"
                                    </p>
                                </div>

                                {/* Status Action */}
                                <div className="pt-2 border-t border-slate-200/80">
                                    {req.status === 'Pending' ? (
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                onClick={() => handleApprove(req.id)}
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1"
                                            >
                                                <Check className="w-3.5 h-3.5" /> Approve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="flat"
                                                onClick={() => handleReject(req.id)}
                                                className="w-full bg-rose-100 hover:bg-rose-200 text-rose-700 font-semibold rounded-lg text-xs flex items-center justify-center gap-1"
                                            >
                                                <X className="w-3.5 h-3.5" /> Reject
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center py-1">
                                            <span className={`inline-flex items-center gap-1 text-xs font-bold ${req.status === 'Approved' ? 'text-emerald-600' : 'text-rose-600'
                                                }`}>
                                                {req.status === 'Approved' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                                {req.status}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Live Attendance Table */}
                <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Today's Employee Attendance</h3>
                            <p className="text-xs text-slate-500">Real-time check-in and check-out logs for today</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search employee..."
                                    className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
                                    <th className="py-3 px-4">Employee</th>
                                    <th className="py-3 px-4">Department</th>
                                    <th className="py-3 px-4">Check-In</th>
                                    <th className="py-3 px-4">Check-Out</th>
                                    <th className="py-3 px-4">Total Hours</th>
                                    <th className="py-3 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {attendanceLogs.map((log, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <p className="font-bold text-slate-800">{log.name}</p>
                                            <p className="text-[11px] text-slate-400">{log.empId}</p>
                                        </td>
                                        <td className="py-3.5 px-4 font-medium text-slate-600">{log.dept}</td>
                                        <td className="py-3.5 px-4">{log.inTime}</td>
                                        <td className="py-3.5 px-4">{log.outTime}</td>
                                        <td className="py-3.5 px-4 font-semibold text-slate-800">{log.hours}</td>
                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${log.status === 'On Time'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : log.status === 'Late Arrival'
                                                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                                                }`}>
                                                {log.status === 'On Time' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                {log.status === 'Late Arrival' && <AlertCircle className="w-3.5 h-3.5" />}
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

        </div>
    );
}