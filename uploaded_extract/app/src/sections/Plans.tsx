import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter Miner',
    price: '$500',
    period: 'one-time',
    features: [
      '180-day mining contract',
      '0.8% daily yield',
      '5 TH/s hash power',
      'Daily dashboard access',
      'Email support',
    ],
    cta: 'Get Started',
    featured: false,
    borderColor: '#1E293B',
  },
  {
    name: 'Pro Miner',
    price: '$2,500',
    period: 'one-time',
    badge: 'MOST POPULAR',
    features: [
      '365-day mining contract',
      '1.2% daily yield',
      '25 TH/s hash power',
      'Real-time analytics',
      'Priority email + chat support',
      'Monthly broker review call',
    ],
    cta: 'Start Mining',
    featured: true,
    borderColor: '#3B82F6',
  },
  {
    name: 'Enterprise Miner',
    price: '$10,000',
    period: 'one-time',
    features: [
      '730-day mining contract',
      '1.8% daily yield',
      '120 TH/s hash power',
      'Dedicated account manager',
      'API access for integrations',
      'Custom payout scheduling',
      'Tesla Energy Priority allocation',
    ],
    cta: 'Contact Sales',
    featured: false,
    borderColor: '#10B981',
  },
];

export default function Plans() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="plans" className="bg-[#0B0F17] py-[100px] lg:py-[160px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-[640px] mx-auto mb-16 transition-all duration-600 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-section-label text-[#3B82F6] mb-4">INVESTMENT PLANS</p>
          <h2 className="text-display-2 text-[#F8FAFC] mb-6">Choose Your Mining Contract</h2>
          <p className="text-body-large text-[#94A3B8]">
            Transparent pricing. No hidden fees. Daily returns.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`relative bg-[#111827] rounded-2xl border transition-all duration-400 hover:-translate-y-1 flex flex-col ${
        plan.featured
          ? 'border-t-[3px] shadow-[0_0_48px_rgba(59,130,246,0.1)] hover:shadow-[0_0_64px_rgba(59,130,246,0.2)]'
          : 'border-[#1E293B] hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_0_32px_rgba(59,130,246,0.06)]'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        borderTopColor: plan.featured ? plan.borderColor : undefined,
        borderTopWidth: plan.featured ? '3px' : '1px',
      }}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 bg-[#10B981] text-[#0B0F17] text-xs font-semibold rounded-full">
            {plan.badge}
          </span>
        </div>
      )}

      <div className="p-8 flex-1 flex flex-col">
        {/* Plan Name */}
        <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">{plan.name}</h3>

        {/* Price */}
        <div className="mb-6">
          <span className="text-4xl font-bold text-[#F8FAFC]">{plan.price}</span>
          <span className="text-sm text-[#94A3B8] ml-2">/{plan.period}</span>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check size={16} className="text-[#10B981] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
              <span className="text-sm text-[#94A3B8]">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className={`w-full py-4 rounded-lg font-semibold text-base transition-all duration-300 ${
            plan.featured
              ? 'bg-[#3B82F6] hover:bg-[#60A5FA] text-white shadow-[0_4px_24px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_32px_rgba(59,130,246,0.5)] hover:-translate-y-0.5'
              : 'border border-[#1E293B] hover:border-[#3B82F6] text-[#F8FAFC] hover:text-[#3B82F6]'
          }`}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  );
}
