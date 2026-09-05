'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@heroui/react';
import {
    LogOut,
    ShieldCheck,
    Check,
    X,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    // Fetch all leave requests
    const fetchLeaveRequests = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                'http://localhost:5000/api/leaves/all',
                {
                    cache: 'no-store',
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch leaves');
            }

            setLeaveRequests(data.leaves || []);

        } catch (error) {
            console.error('Fetch leave requests error:', error);
            toast.error(error.message || 'Failed to load leave requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaveRequests();
    }, []);


    // Approve Leave + Deduct Balance
    const handleApprove = async (id) => {
        try {
            setProcessingId(id);

            const response = await fetch(
                `http://localhost:5000/api/leaves/${id}/approve`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to approve leave');
            }

            toast.success(data.message);

            // Refresh leave requests
            await fetchLeaveRequests();

        } catch (error) {
            console.error('Approve leave error:', error);
            toast.error(error.message || 'Failed to approve leave');
        } finally {
            setProcessingId(null);
        }
    };


    // Reject Leave
    const handleReject = async (id) => {
        try {
            setProcessingId(id);

            const response = await fetch(
                `http://localhost:5000/api/leaves/${id}/reject`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reject leave');
            }

            toast.success(data.message);

            // Refresh leave requests
            await fetchLeaveRequests();

        } catch (error) {
            console.error('Reject leave error:', error);
            toast.error(error.message || 'Failed to reject leave');
        } finally {
            setProcessingId(null);
        }
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
                            <h1 className="font-bold text-slate-800 text-base">
                                HR Admin Portal
                            </h1>

                            <p className="text-xs text-slate-500">
                                InnerEye Consultancy
                            </p>
                        </div>
                    </div>

                    <Link href="/login">
                        <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                            className="rounded-xl font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </Link>

                </div>
            </header>


            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800">
                        Leave Approval & Deduction Panel
                    </h2>

                    <p className="text-sm text-slate-500">
                        Approve requests to automatically calculate and deduct employee leave balance.
                    </p>
                </div>


                <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">

                    <h3 className="text-lg font-bold text-slate-800 border-b pb-3">
                        Leave Requests
                    </h3>


                    {loading ? (

                        <div className="text-center py-10 text-sm text-slate-500">
                            Loading leave requests...
                        </div>

                    ) : leaveRequests.length === 0 ? (

                        <div className="text-center py-10 text-sm text-slate-500">
                            No leave requests found.
                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {leaveRequests.map((req) => (

                                <div
                                    key={req._id}
                                    className="p-4 border rounded-xl bg-slate-50 space-y-3"
                                >

                                    <div className="flex justify-between items-center">

                                        <span className="font-bold text-slate-800">
                                            {req.name} ({req.employeeId})
                                        </span>

                                        <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-bold">
                                            {req.totalDays} Day(s) Leave
                                        </span>

                                    </div>


                                    <p className="text-xs text-slate-600">
                                        <strong>Dates:</strong>{' '}
                                        {req.startDate} - {req.endDate}
                                        {' | '}
                                        <strong>Type:</strong>{' '}
                                        {req.leaveType}
                                    </p>


                                    <p className="text-xs text-slate-500">
                                        "{req.reason}"
                                    </p>


                                    <div className="pt-2 border-t flex gap-2">

                                        {req.status === 'Pending' ? (

                                            <>

                                                <Button
                                                    size="sm"
                                                    isDisabled={processingId === req._id}
                                                    onClick={() =>
                                                        handleApprove(req._id)
                                                    }
                                                    className="w-full bg-emerald-600 text-white font-semibold flex items-center justify-center gap-1"
                                                >
                                                    <Check className="w-4 h-4" />

                                                    {processingId === req._id
                                                        ? 'Processing...'
                                                        : 'Approve & Deduct'}
                                                </Button>


                                                <Button
                                                    size="sm"
                                                    isDisabled={processingId === req._id}
                                                    onClick={() =>
                                                        handleReject(req._id)
                                                    }
                                                    className="w-full bg-rose-100 text-rose-700 font-semibold flex items-center justify-center gap-1"
                                                >
                                                    <X className="w-4 h-4" />

                                                    Reject
                                                </Button>

                                            </>

                                        ) : (

                                            <span
                                                className={`text-xs font-bold ${req.status === 'Approved'
                                                        ? 'text-emerald-600'
                                                        : 'text-rose-600'
                                                    }`}
                                            >
                                                {req.status}
                                            </span>

                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </Card>

            </main>

        </div>
    );
}