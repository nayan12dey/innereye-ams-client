'use client';

import { useState } from 'react';
import { Card, Button } from '@heroui/react';
import { Users, UserCheck, Clock, CalendarCheck2, LogOut, ShieldCheck, Check, X, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
    const [leaveRequests, setLeaveRequests] = useState([
        { id: 1, name: 'Rahul Sharma', empId: 'IECS-1042', type: 'Casual Leave', days: 2, dates: 'Sep 05 - Sep 06', reason: 'Personal work', status: 'Pending' },
        { id: 2, name: 'Priya Das', empId: 'IECS-1088', type: 'Sick Leave', days: 1, dates: 'Sep 02', reason: 'Doctor Visit', status: 'Pending' },
    ]);

    // Leave Deduction Trigger Logic
    const handleApprove = (id) => {
        setLeaveRequests(prev => prev.map(req => {
            if (req.id === id) {
                toast.success(`Approved ${req.days} day(s) leave for ${req.name}. Leave balance deducted.`);
                return { ...req, status: 'Approved' };
            }
            return req;
        }));
    };

    const handleReject = (id) => {
        setLeaveRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white p-2 rounded-xl">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="font-bold text-slate-800 text-base">HR Admin Portal</h1>
                            <p className="text-xs text-slate-500">InnerEye Consultancy</p>
                        </div>
                    </div>
                    <Link href="/login">
                        <Button size="sm" variant="flat" color="danger" className="rounded-xl font-medium">
                            <LogOut className="w-4 h-4" /> Logout
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800">Leave Approval & Deduction Panel</h2>
                    <p className="text-sm text-slate-500">Approve requests to automatically calculate and deduct employee leave balance.</p>
                </div>

                <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-3">Pending Approvals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {leaveRequests.map((req) => (
                            <div key={req.id} className="p-4 border rounded-xl bg-slate-50 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-slate-800">{req.name} ({req.empId})</span>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-bold">{req.days} Day(s) Leave</span>
                                </div>
                                <p className="text-xs text-slate-600"><strong>Dates:</strong> {req.dates} | <strong>Type:</strong> {req.type}</p>
                                <p className="text-xs text-slate-500">"{req.reason}"</p>

                                <div className="pt-2 border-t flex gap-2">
                                    {req.status === 'Pending' ? (
                                        <>
                                            <Button size="sm" onClick={() => handleApprove(req.id)} className="w-full bg-emerald-600 text-white font-semibold flex items-center justify-center gap-1">
                                                <Check className="w-4 h-4" /> Approve & Deduct
                                            </Button>
                                            <Button size="sm" onClick={() => handleReject(req.id)} className="w-full bg-rose-100 text-rose-700 font-semibold flex items-center justify-center gap-1">
                                                <X className="w-4 h-4" /> Reject
                                            </Button>
                                        </>
                                    ) : (
                                        <span className={`text-xs font-bold ${req.status === 'Approved' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {req.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </main>
        </div>
    );
}