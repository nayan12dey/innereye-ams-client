export default function StatsSection() {
    const stats = [
        { label: 'Active Employees', value: '250+' },
        { label: 'Attendance Accuracy', value: '99.9%' },
        { label: 'Hours Tracked', value: '50K+' },
        { label: 'Leave Deductions Saved', value: '100%' },
    ];

    return (
        <section className="bg-blue-600 py-12 text-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, idx) => (
                    <div key={idx} className="space-y-1">
                        <h3 className="text-3xl md:text-4xl font-extrabold">{stat.value}</h3>
                        <p className="text-blue-100 text-xs md:text-sm font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}