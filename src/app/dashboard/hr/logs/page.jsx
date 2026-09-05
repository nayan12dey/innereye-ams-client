'use client';

import { useEffect, useState } from 'react';
import { Card } from '@heroui/react';
import {
    Clock,
    CalendarDays,
    Users,
    CheckCircle2,
    LogIn,
    LogOut,
    Loader2,
    AlertCircle,
} from 'lucide-react';

export default function HRLogsPage() {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch all attendance records
    const fetchAttendance = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(
                'http://localhost:5000/api/attendance/all'
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to fetch attendance records'
                );
            }

            setAttendance(data.attendance || []);
        } catch (error) {
            console.error('Attendance fetch error:', error);
            setError(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    // Format date
    const formatDate = (date) => {
        if (!date) return '-';

        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    // Format time
    const formatTime = (time) => {
        if (!time) return '-';

        return new Date(time).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    // Format working hours
    const formatWorkingHours = (hours) => {
        if (!hours || hours <= 0) return '-';

        const totalMinutes = Math.round(hours * 60);
        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;

        return `${h}h ${m}m`;
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

            {/* Header */}
            <div className="max-w-7xl mx-auto space-y-6">

                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-blue-100 rounded-xl">
                            <Clock className="w-6 h-6 text-blue-600" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-800">
                                Attendance Logs
                            </h1>

                            <p className="text-sm text-slate-500">
                                Monitor employee attendance and working hours.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    {/* Total Records */}
                    <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                    Total Records
                                </p>

                                <h2 className="text-2xl font-extrabold text-slate-800 mt-1">
                                    {attendance.length}
                                </h2>
                            </div>

                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                    </Card>

                    {/* Checked In */}
                    <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                    Currently Present
                                </p>

                                <h2 className="text-2xl font-extrabold text-emerald-600 mt-1">
                                    {
                                        attendance.filter(
                                            (item) => item.status === 'Present'
                                        ).length
                                    }
                                </h2>
                            </div>

                            <div className="p-3 bg-emerald-100 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>
                        </div>
                    </Card>

                    {/* Checked Out */}
                    <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                    Checked Out
                                </p>

                                <h2 className="text-2xl font-extrabold text-purple-600 mt-1">
                                    {
                                        attendance.filter(
                                            (item) => item.status === 'Checked Out'
                                        ).length
                                    }
                                </h2>
                            </div>

                            <div className="p-3 bg-purple-100 rounded-xl">
                                <LogOut className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                    </Card>

                </div>

                {/* Attendance Table */}
                <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="p-5 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-slate-600" />

                            <h2 className="text-lg font-bold text-slate-800">
                                Employee Attendance
                            </h2>
                        </div>

                        <p className="text-xs text-slate-500 mt-1">
                            Complete attendance history of employees.
                        </p>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />

                            <p className="text-sm text-slate-500 mt-3">
                                Loading attendance records...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="flex flex-col items-center justify-center py-16 px-6">
                            <AlertCircle className="w-10 h-10 text-rose-500" />

                            <p className="text-sm font-semibold text-slate-700 mt-3">
                                Failed to load attendance
                            </p>

                            <p className="text-xs text-slate-500 mt-1 text-center">
                                {error}
                            </p>

                            <button
                                onClick={fetchAttendance}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && attendance.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Clock className="w-10 h-10 text-slate-300" />

                            <p className="text-sm font-semibold text-slate-600 mt-3">
                                No attendance records found
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                                Employee attendance will appear here.
                            </p>
                        </div>
                    )}

                    {/* Desktop Table */}
                    {!loading && !error && attendance.length > 0 && (
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[900px]">

                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                                            Employee
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                                            Employee ID
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                                            Date
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                                            Check-In
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                                            Check-Out
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                                            Working Hours
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">

                                    {attendance.map((record) => (
                                        <tr
                                            key={record._id}
                                            className="hover:bg-slate-50 transition"
                                        >

                                            {/* Employee */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">

                                                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <Users className="w-4 h-4 text-blue-600" />
                                                    </div>

                                                    <span className="font-semibold text-slate-800 text-sm">
                                                        {record.name || 'Unknown Employee'}
                                                    </span>

                                                </div>
                                            </td>

                                            {/* Employee ID */}
                                            <td className="px-5 py-4">
                                                <span className="text-sm font-medium text-slate-600">
                                                    {record.employeeId}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <CalendarDays className="w-4 h-4 text-slate-400" />
                                                    {formatDate(record.date)}
                                                </div>
                                            </td>

                                            {/* Check In */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <LogIn className="w-4 h-4 text-emerald-500" />

                                                    <span className="text-sm font-medium text-slate-700">
                                                        {formatTime(record.checkIn)}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Check Out */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <LogOut className="w-4 h-4 text-rose-500" />

                                                    <span className="text-sm font-medium text-slate-700">
                                                        {formatTime(record.checkOut)}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Working Hours */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">

                                                    <Clock className="w-4 h-4 text-blue-500" />

                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {formatWorkingHours(
                                                            record.workingHours
                                                        )}
                                                    </span>

                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">

                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${record.status === 'Checked Out'
                                                            ? 'bg-purple-100 text-purple-700'
                                                            : 'bg-emerald-100 text-emerald-700'
                                                        }`}
                                                >
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${record.status === 'Checked Out'
                                                                ? 'bg-purple-500'
                                                                : 'bg-emerald-500'
                                                            }`}
                                                    />

                                                    {record.status}
                                                </span>

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </Card>

            </div>
        </div>
    );
}

