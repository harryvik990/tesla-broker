import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CTABanner() {
  const { ref, isVisible } = useScrollAnimation();

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
    <section className="bg-[#0B0F17] py-20 lg:py-[80px]">
      <div className="max-w-[800px] mx-auto px-6">
        <div
          ref={ref}
          className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          {/* Card Shimmer Background */}
          <div className="cta-card-shimmer">
            <div className="cta-card-grid" />
            <div className="cta-card-glow" />
          </div>

          {/* Border overlay */}
          <div className="absolute inset-0 rounded-3xl border border-[rgba(59,130,246,0.2)] pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl shadow-[0_0_64px_rgba(59,130,246,0.1)] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 p-12 lg:p-16 text-center">
            <h2
              className={`text-display-2 text-[#F8FAFC] mb-6 transition-all duration-500 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              Start Building Your Crypto Portfolio Today
            </h2>

            <p
              className={`text-body-large text-[#94A3B8] max-w-[560px] mx-auto mb-8 transition-all duration-500 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              Join 147,000+ investors earning daily passive income through Tesla-powered blockchain mining.
            </p>

            <div
              className={`transition-all duration-500 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <a
                href="#plans"
                onClick={(e) => handleScroll(e, '#plans')}
                className="inline-flex items-center px-8 py-4 bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_32px_rgba(59,130,246,0.5)]"
              >
                Get Started — $500 Minimum
              </a>
            </div>

            <p
              className={`mt-6 text-xs text-[#94A3B8] tracking-wide transition-all duration-400 delay-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              No lock-up period • Daily withdrawals • Regulated operations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
