import { UserCheck, Clock4, BarChart3 } from 'lucide-react';

export default function WorkflowSection() {
    const steps = [
        {
            icon: UserCheck,
            step: '01',
            title: 'Quick Check-In',
            desc: 'Employees log in and mark attendance with a single click at the start of their workday.',
        },
        {
            icon: Clock4,
            step: '02',
            title: 'Automated Tracking',
            desc: 'System tracks total active hours, breaks, and late arrivals in real-time.',
        },
        {
            icon: BarChart3,
            step: '03',
            title: 'HR Insights',
            desc: 'HR admins view overall company presence and automated monthly leave reports.',
        },
    ];

    return (
        <section className="bg-slate-100 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900">How InnerEye AMS Works</h2>
                    <p className="text-slate-600 mt-2">Simple three-step workflow built for maximum efficiency.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 relative space-y-4 shadow-sm">
                                <span className="text-4xl font-extrabold text-blue-100 absolute top-6 right-6">
                                    {item.step}
                                </span>
                                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                                <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}