import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Zap, Shield, Cpu } from 'lucide-react';

const features = [
  {
    icon: Zap,
    iconColor: '#3B82F6',
    title: 'Powered by Tesla',
    description:
      'Our mining facilities leverage Tesla\'s renewable energy grid and battery storage technology, reducing costs by 40% while maintaining carbon-neutral operations.',
  },
  {
    icon: Shield,
    iconColor: '#10B981',
    title: 'Licensed & Regulated',
    description:
      'All investment accounts are managed through FINRA-certified brokers with full regulatory compliance, audited financials, and segregated client funds.',
  },
  {
    icon: Cpu,
    iconColor: '#A78BFA',
    title: 'AI-Optimized Mining',
    description:
      'Proprietary algorithms dynamically switch between the most profitable blockchain networks in real-time, maximizing your daily yield without manual intervention.',
  },
];

export default function Features() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="features" className="bg-[#0B0F17] py-[100px] lg:py-[160px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-[640px] mx-auto mb-16 transition-all duration-600 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-section-label text-[#3B82F6] mb-4">WHY INVEST WITH US</p>
          <h2 className="text-display-2 text-[#F8FAFC] mb-6">
            The Smart Way to Mine Cryptocurrency
          </h2>
          <p className="text-body-large text-[#94A3B8]">
            We combine Tesla's sustainable energy infrastructure with institutional-grade mining operations to deliver consistent, transparent returns.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`group bg-[#111827] border border-[#1E293B] rounded-2xl p-8 transition-all duration-400 hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_0_32px_rgba(59,130,246,0.06)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${feature.iconColor}15` }}
      >
        <Icon size={24} style={{ color: feature.iconColor }} strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">{feature.title}</h3>
      <p className="text-base text-[#94A3B8] leading-relaxed">{feature.description}</p>
    </div>
  );
}
