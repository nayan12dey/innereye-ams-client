'use client';

import { Button } from '@heroui/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CtaSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="bg-slate-900 rounded-3xl p-8 md:p-14 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                <div className="space-y-3 max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Ready to Streamline Employee Attendance?
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base">
                        Start tracking working hours and leave management with ease and efficiency today.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <Link href="/login">
                        <Button size="lg" color="primary" className="font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl" endContent={<ArrowRight className="w-5 h-5" />}>
                            Get Started Now
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}