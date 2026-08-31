'use client';

import { Button, Card } from '@heroui/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                    Inner Eye Consultancy Services LLP
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                    Smart & Automated <br />
                    <span className="text-blue-600">Attendance Portal</span>
                </h1>

                <p className="text-slate-600 text-lg">
                    Track daily employee check-ins, automated working hour calculations, and dynamic leave deductions in one unified workplace platform.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link href="/login">
                        <Button color="primary" size="lg" className="font-semibold shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white" endContent={<ArrowRight className="w-5 h-5" />}>
                            Access Dashboard
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="bordered" size="lg" className="font-semibold border-slate-300">
                            Explore Features
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center gap-6 pt-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time Tracking</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> HR Analytics</span>
                </div>
            </div>

            {/* Hero Visual Mockup */}
            <div className="relative">
                <Card className="p-5 bg-white/80 backdrop-blur-lg border border-slate-200 shadow-2xl rounded-2xl">
                    <Card.Header className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                JD
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">John Doe</h4>
                                <p className="text-xs text-slate-500">Software Engineer</p>
                            </div>
                        </div>
                        <span className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">
                            Checked In
                        </span>
                    </Card.Header>

                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-3 text-center">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500">Check-In Time</p>
                                <p className="font-bold text-slate-800 text-sm mt-1">09:15 AM</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500">Hours Today</p>
                                <p className="font-bold text-blue-600 text-sm mt-1">7h 45m</p>
                            </div>
                        </div>
                    </div>

                    <Card.Footer>
                        <Button color="danger" variant="flat" className="w-full font-medium" disabled>
                            Check-Out (Demo)
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        </section>
    );
}