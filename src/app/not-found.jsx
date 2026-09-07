import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center space-y-6">

                {/* Clean Icon Badge */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 text-slate-600 rounded-2xl">
                    <FileQuestion className="w-7 h-7" />
                </div>

                {/* 404 Header & Text */}
                <div className="space-y-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                        Error 404
                    </span>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                        Page Not Found
                    </h1>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        The requested page could not be found or may have been moved. Please check the URL or return home.
                    </p>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>

                {/* Branding Footer */}
                <div className="pt-4 border-t border-slate-100">
                    <p className="text-[11px] font-medium text-slate-400">
                        INNER EYE CONSULTANCY SERVICES LLP
                    </p>
                </div>

            </div>
        </div>
    );
}
