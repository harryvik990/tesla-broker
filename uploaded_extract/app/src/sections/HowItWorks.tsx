import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const steps = [
  {
    number: '01',
    title: 'Quick Registration',
    description:
      'Sign up with your email and complete our streamlined KYC verification. Our broker partners handle compliance securely.',
  },
  {
    number: '02',
    title: 'Select Investment Tier',
    description:
      'Pick from our range of mining contracts starting at $500. Higher tiers unlock priority energy allocation and bonus yields.',
  },
  {
    number: '03',
    title: 'Deposit & Launch',
    description:
      'Fund your account via bank transfer, card, or crypto deposit. Your mining hardware goes live within 2 hours of confirmation.',
  },
  {
    number: '04',
    title: 'Automated Payouts',
    description:
      'Mining rewards are calculated every 24 hours and credited to your dashboard. Withdraw anytime to your wallet or bank.',
  },
];

export default function HowItWorks() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="how-it-works" className="bg-[#111827] py-[100px] lg:py-[160px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-[40%_60%] gap-16">
          {/* Left: Sticky Header */}
          <div
            ref={headerRef}
            className={`lg:sticky lg:top-[120px] lg:self-start transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <p className="text-section-label text-[#3B82F6] mb-4">GET STARTED</p>
            <h2 className="text-display-2 text-[#F8FAFC] mb-6">
              Four Steps to Passive Crypto Income
            </h2>
            <p className="text-body-large text-[#94A3B8]">
              From account creation to your first payout in under 24 hours.
            </p>
          </div>

          {/* Right: Steps */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#1E293B] hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <StepItem key={step.number} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`relative flex gap-8 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline dot + number */}
      <div className="relative flex-shrink-0 hidden md:flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-[#0B0F17] border border-[#1E293B] flex items-center justify-center z-10">
          <span className="text-lg font-bold text-[#3B82F6]">{step.number}</span>
        </div>
      </div>

      {/* Mobile number */}
      <div className="md:hidden flex-shrink-0">
        <span className="text-3xl font-bold text-[#3B82F6]">{step.number}</span>
      </div>

      {/* Content */}
      <div className="pb-4">
        <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">{step.title}</h3>
        <p className="text-base text-[#94A3B8] leading-relaxed max-w-[480px]">
          {step.description}
        </p>
      </div>
    </div>
  );
}
