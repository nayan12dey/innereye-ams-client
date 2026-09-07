export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center space-y-4">

                {/* Modern Corporate Spinner */}
                <div className="relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-3 border-slate-200 border-t-blue-600 animate-spin" />
                    <span className="absolute text-[10px] font-bold text-slate-700 tracking-tighter">
                        IECS
                    </span>
                </div>

                {/* Company Branding */}
                <div className="text-center space-y-1">
                    <h1 className="text-sm font-semibold text-slate-900 tracking-tight">
                        INNER EYE CONSULTANCY SERVICES
                    </h1>
                    <p className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
                        Loading...
                    </p>
                </div>

            </div>
        </div>
    );
}