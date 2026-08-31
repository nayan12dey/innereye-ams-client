'use client';

import { Card } from '@heroui/react';
import { Clock, CalendarCheck, Users, ShieldCheck, Zap, FileSpreadsheet } from 'lucide-react';

export default function FeaturesSection() {
    const features = [
        {
            icon: Clock,
            color: 'bg-blue-50 text-blue-600',
            title: 'Time & Hours Tracking',
            desc: 'Calculates working hours automatically upon check-in and check-out logs with high precision.',
        },
        {
            icon: CalendarCheck,
            color: 'bg-emerald-50 text-emerald-600',
            title: 'Leave Deduction Logic',
            desc: 'Automatic computation of leave balance deductions based on half-days and unapproved absences.',
        },
        {
            icon: Users,
            color: 'bg-purple-50 text-purple-600',
            title: 'HR Analytics Dashboard',
            desc: 'Complete overview for administrators to monitor team attendance trends and daily presence.',
        },
        {
            icon: ShieldCheck,
            color: 'bg-amber-50 text-amber-600',
            title: 'Secure Authentication',
            desc: 'Role-based access control ensuring employees and HR administrators access relevant data safely.',
        },
        {
            icon: Zap,
            color: 'bg-rose-50 text-rose-600',
            title: 'Instant Status Updates',
            desc: 'Real-time check-in and check-out updates without manual delay or time discrepancy.',
        },
        {
            icon: FileSpreadsheet,
            color: 'bg-indigo-50 text-indigo-600',
            title: 'Automated Reports',
            desc: 'Generate monthly attendance logs and leave summaries instantly for payroll processing.',
        },
    ];

    return (
        <section id="features" className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-slate-900">Key Portal Features</h2>
                <p className="text-slate-600 mt-2">Designed for high precision and seamless corporate workflow efficiency.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {features.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <Card key={idx} className="p-5 border border-slate-200/80 bg-white hover:shadow-xl transition-all duration-300 rounded-2xl">
                            <Card.Header className="flex flex-col items-start gap-3">
                                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                            </Card.Header>
                            <p className="text-sm text-slate-600 px-3 pb-3">{item.desc}</p>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}