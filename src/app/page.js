'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import WorkflowSection from '@/components/home/WorkflowSection';
import CtaSection from '@/components/home/CtaSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <WorkflowSection />
        <CtaSection />
      </div>
      <Footer />
    </div>
  );
}