import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Stats from '@/sections/Stats';
import Features from '@/sections/Features';
import HowItWorks from '@/sections/HowItWorks';
import Plans from '@/sections/Plans';
import Testimonials from '@/sections/Testimonials';
import FAQ from '@/sections/FAQ';
import CTABanner from '@/sections/CTABanner';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F17]">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Plans />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
