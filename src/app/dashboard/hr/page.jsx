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
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';

export default function HRDashboard() {
    const router = useRouter();

    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [logoutLoading, setLogoutLoading] = useState(false);

    // Fetch all leave requests
    const fetchLeaveRequests = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/leaves/all`,
                {
                    cache: 'no-store',
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to fetch leave requests'
                );
            }

            setLeaveRequests(data.leaves || []);

        } catch (error) {
            console.error('Fetch leave requests error:', error);

            toast.error(
                error.message || 'Failed to load leave requests'
            );

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
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/leaves/${id}/approve`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to approve leave'
                );
            }

            toast.success(
                data.message || 'Leave approved successfully'
            );

            // Refresh leave requests
            await fetchLeaveRequests();

        } catch (error) {
            console.error('Approve leave error:', error);

            toast.error(
                error.message || 'Failed to approve leave'
            );

        } finally {
            setProcessingId(null);
        }
    };


    // Reject Leave
    const handleReject = async (id) => {
        try {
            setProcessingId(id);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/leaves/${id}/reject`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to reject leave'
                );
            }

            toast.success(
                data.message || 'Leave rejected successfully'
            );

            // Refresh leave requests
            await fetchLeaveRequests();

        } catch (error) {
            console.error('Reject leave error:', error);

            toast.error(
                error.message || 'Failed to reject leave'
            );

        } finally {
            setProcessingId(null);
        }
    };


    // Actual Logout
    const handleLogout = async () => {
        try {
            setLogoutLoading(true);

            await signOut();

            toast.success('Logged out successfully');

            // Give toast time to appear before redirect
            setTimeout(() => {
                router.push('/login');
            }, 800);

        } catch (error) {
            console.error('Logout error:', error);

            toast.error('Failed to logout');
            setLogoutLoading(false);
        }
    };

    
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
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


                    {/* Actual Logout */}
                    <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        onClick={handleLogout}
                        isDisabled={logoutLoading}
                        className="rounded-xl font-medium"
                    >
                        <LogOut className="w-4 h-4" />

                        {logoutLoading
                            ? 'Logging out...'
                            : 'Logout'}
                    </Button>

                </div>
            </header>


            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* Page Heading */}
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800">
                        Leave Approval & Deduction Panel
                    </h2>

                    <p className="text-sm text-slate-500">
                        Approve requests to automatically calculate and deduct
                        employee leave balance.
                    </p>
                </div>


                {/* Leave Requests */}
                <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">

                    <h3 className="text-lg font-bold text-slate-800 border-b pb-3">
                        Leave Requests
                    </h3>


                    {/* Loading */}
                    {loading ? (

                        <div className="text-center py-10 text-sm text-slate-500">
                            Loading leave requests...
                        </div>

                    ) : leaveRequests.length === 0 ? (

                        /* Empty State */
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

                                    {/* Employee Info */}
                                    <div className="flex justify-between items-center gap-3">

                                        <span className="font-bold text-slate-800">
                                            {req.name || 'Employee'} ({req.employeeId})
                                        </span>

                                        <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-bold whitespace-nowrap">
                                            {req.totalDays} Day(s) Leave
                                        </span>

                                    </div>


                                    {/* Leave Details */}
                                    <p className="text-xs text-slate-600">

                                        <strong>Dates:</strong>{' '}

                                        {req.startDate} - {req.endDate}

                                        {' | '}

                                        <strong>Type:</strong>{' '}

                                        {req.leaveType}

                                    </p>


                                    {/* Reason */}
                                    <p className="text-xs text-slate-500">
                                        "{req.reason}"
                                    </p>


                                    {/* Actions */}
                                    <div className="pt-2 border-t flex gap-2">

                                        {req.status === 'Pending' ? (

                                            <>
                                                {/* Approve */}
                                                <Button
                                                    size="sm"
                                                    isDisabled={
                                                        processingId === req._id
                                                    }
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


                                                {/* Reject */}
                                                <Button
                                                    size="sm"
                                                    isDisabled={
                                                        processingId === req._id
                                                    }
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

                                            /* Final Status */
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