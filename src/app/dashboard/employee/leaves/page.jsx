'use client';

import { useState } from 'react';
import { Card, Button, Input, Select, ListBox, Label } from '@heroui/react';
import {
    CalendarDays,
    Clock,
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useSession } from '@/lib/auth-client';

export default function LeaveApplicationsPage() {
    const { data: session, isPending } = useSession();

    const employeeId = session?.user?.empId;

    const [leaveData, setLeaveData] = useState({
        type: 'Casual Leave',
        startDate: '',
        endDate: '',
        reason: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLeaveSubmit = async (e) => {
        e.preventDefault();

        if (!employeeId) {
            toast.error('Employee information not found');
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch(
                'http://localhost:5000/api/leaves/apply',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        employeeId,
                        leaveType: leaveData.type,
                        startDate: leaveData.startDate,
                        endDate: leaveData.endDate,
                        reason: leaveData.reason,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to submit leave request'
                );
            }

            toast.success(data.message);

            setLeaveData({
                type: 'Casual Leave',
                startDate: '',
                endDate: '',
                reason: '',
            });

        } catch (error) {
            console.error('Leave request error:', error);
            toast.error(
                error.message || 'Failed to submit leave request'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">
                    Leave Applications
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                    Apply for leave and track your leave requests.
                </p>
            </div>

            {/* Leave Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                <Card className="p-5 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                            <CalendarDays className="w-5 h-5" />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Total Leave
                            </p>

                            <h2 className="text-2xl font-bold text-slate-800">
                                18
                            </h2>
                        </div>
                    </div>
                </Card>

                <Card className="p-5 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                            <Clock className="w-5 h-5" />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Pending Requests
                            </p>

                            <h2 className="text-2xl font-bold text-slate-800">
                                0
                            </h2>
                        </div>
                    </div>
                </Card>

                <Card className="p-5 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Approved
                            </p>

                            <h2 className="text-2xl font-bold text-slate-800">
                                0
                            </h2>
                        </div>
                    </div>
                </Card>

            </div>

            {/* Apply Leave */}
            <Card className="p-6 border border-slate-200 shadow-sm mb-8">

                <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-800">
                        Apply for Leave
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Submit a new leave request.
                    </p>
                </div>

                <form
                    onSubmit={handleLeaveSubmit}
                    className="space-y-5"
                >

                    {/* Leave Type Select - HeroUI Official Structure */}
                    <Select
                        className="w-full"
                        placeholder="Select leave type"
                        onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0];
                            if (value) {
                                setLeaveData({
                                    ...leaveData,
                                    type: String(value),
                                });
                            }
                        }}
                    >
                        <Label className="text-xs font-semibold text-slate-700 mb-1 block">Leave Type</Label>
                        <Select.Trigger className="w-full px-3 py-2 border border-slate-200 rounded-xl flex justify-between items-center bg-white text-sm">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-white border border-slate-200 shadow-lg rounded-xl p-1 z-50">
                            <ListBox>
                                <ListBox.Item id="Casual Leave" textValue="Casual Leave" className="px-3 py-2 hover:bg-slate-100 rounded-lg cursor-pointer text-sm">
                                    Casual Leave
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Sick Leave" textValue="Sick Leave" className="px-3 py-2 hover:bg-slate-100 rounded-lg cursor-pointer text-sm">
                                    Sick Leave
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Earned Leave" textValue="Earned Leave" className="px-3 py-2 hover:bg-slate-100 rounded-lg cursor-pointer text-sm">
                                    Earned Leave
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <Input
                            type="date"
                            label="Start Date"
                            value={leaveData.startDate}
                            onChange={(e) =>
                                setLeaveData({
                                    ...leaveData,
                                    startDate: e.target.value,
                                })
                            }
                            isRequired
                        />

                        <Input
                            type="date"
                            label="End Date"
                            value={leaveData.endDate}
                            onChange={(e) =>
                                setLeaveData({
                                    ...leaveData,
                                    endDate: e.target.value,
                                })
                            }
                            isRequired
                        />

                    </div>

                    {/* Reason Textarea */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                            Reason <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Enter reason for leave"
                            value={leaveData.reason}
                            onChange={(e) =>
                                setLeaveData({
                                    ...leaveData,
                                    reason: e.target.value,
                                })
                            }
                            required
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        color="primary"
                        isLoading={isSubmitting}
                        className="font-semibold bg-blue-600 text-white"
                    >
                        Submit Leave Request
                    </Button>

                </form>

            </Card>

            {/* Leave History */}
            <Card className="p-6 border border-slate-200 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-bold text-slate-800">
                        My Leave Requests
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Track your submitted leave applications.
                    </p>
                </div>

                <div className="text-center py-10 text-slate-400">
                    <XCircle className="w-8 h-8 mx-auto mb-2" />

                    <p className="text-sm">
                        No leave requests to display.
                    </p>
                </div>

            </Card>

        </div>
    );
}