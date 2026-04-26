import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 88;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '72px' }}
    >
      {/* Background Effect */}
      <div className="hero-background">
        <div className="hero-grid" />
        <div className="hero-shimmer" />
        <div className="hero-vignette" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <p
              className={`text-section-label text-[#3B82F6] mb-6 transition-all duration-500 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              TESLA PARTNERSHIP PROGRAM
            </p>

            <h1
              className={`text-display-1 text-[#F8FAFC] mb-6 transition-all duration-600 delay-100 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Blockchain Mining Solutions — Backed by Tesla
            </h1>

            <p
              className={`text-body-large text-[#94A3B8] max-w-[560px] mb-8 transition-all duration-600 delay-200 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Institutional-grade cryptocurrency mining investments managed by certified brokers. Earn passive income through sustainable, high-yield blockchain operations.
            </p>

            <div
              className={`flex flex-wrap gap-4 mb-8 transition-all duration-500 delay-400 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <a
                href="#plans"
                onClick={(e) => handleScroll(e, '#plans')}
                className="inline-flex items-center px-8 py-4 bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_32px_rgba(59,130,246,0.5)]"
              >
                Start Mining Today
              </a>
              <a
                href="#plans"
                onClick={(e) => handleScroll(e, '#plans')}
                className="inline-flex items-center px-8 py-4 border border-[#1E293B] hover:border-[#3B82F6] text-[#F8FAFC] hover:text-[#3B82F6] font-semibold rounded-lg transition-all duration-300"
              >
                View Our Plans
              </a>
            </div>

            <div
              className={`flex flex-wrap gap-6 text-xs text-[#94A3B8] tracking-wide transition-all duration-400 delay-600 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-[#10B981]">✓</span> Regulated operations
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#10B981]">✓</span> Daily payouts
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#10B981]">✓</span> 99.9% uptime
              </span>
            </div>
          </div>

          {/* Right: Image */}
          <div
            className={`order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-800 ${
              loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '200ms' }}
          >
            <img
              src="/images/hero-mining-rig.jpg"
              alt="Futuristic Mining Hardware"
              className="max-w-[400px] lg:max-w-[480px] w-full rounded-2xl shadow-[0_0_64px_rgba(59,130,246,0.15)]"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
