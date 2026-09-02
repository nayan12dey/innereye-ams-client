import Sidebar from '@/components/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Component */}
            <Sidebar />

            {/* Dynamic Dashboard Page Content */}
            <div className="flex-1 lg:pl-64 transition-all duration-300">
                {children}
            </div>
             <Toaster />
        </div>
    );
}