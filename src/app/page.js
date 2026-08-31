'use client';

import Navbar from '@/components/Navbar';
import { Button, Card, Link } from '@heroui/react';
import { Clock, CalendarCheck, ArrowRight, CheckCircle2, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
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
                <Button color="primary" size="lg" className="font-semibold shadow-lg shadow-blue-500/20" endContent={<ArrowRight className="w-5 h-5" />}>
                  Access Dashboard
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="bordered" size="lg" className="font-semibold">
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
            <Card className="p-4 bg-white/70 backdrop-blur-lg border border-slate-200 shadow-2xl rounded-2xl">
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

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Key Portal Features</h2>
            <p className="text-slate-600 mt-2">Designed for high precision and corporate workflow efficiency.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-4 border border-slate-100 hover:shadow-lg transition-shadow">
              <Card.Header className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Time & Hours Tracking</h3>
              </Card.Header>
              <p className="text-sm text-slate-600 px-3 pb-3">Calculates working hours automatically upon check-in and check-out logs.</p>
            </Card>

            <Card className="p-4 border border-slate-100 hover:shadow-lg transition-shadow">
              <Card.Header className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Leave Deduction Logic</h3>
              </Card.Header>
              <p className="text-sm text-slate-600 px-3 pb-3">Automatic computation of leave balance deductions based on half-days and absences.</p>
            </Card>

            <Card className="p-4 border border-slate-100 hover:shadow-lg transition-shadow">
              <Card.Header className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">HR Analytics Dashboard</h3>
              </Card.Header>
              <p className="text-sm text-slate-600 px-3 pb-3">Complete overview for administrators to monitor attendance trends and requests.</p>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        © 2026 Inner Eye Consultancy Services LLP. All rights reserved.
      </footer>
    </div>
  );
}