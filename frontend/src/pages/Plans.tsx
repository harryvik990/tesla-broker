import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import NextButton from '@/components/NextButton'
import { getPlans, type Plan } from '@/lib/api'

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPlans()
      .then((p) => setPlans(p))
      .catch(() => setError('Unable to load plans right now. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      data-testid="page-plans"
      className="bg-[#0B0F17] py-[120px] lg:py-[160px] min-h-[calc(100vh-72px)]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <PageHeader
          label="INVESTMENT PLANS"
          title="Choose Your Mining Contract"
          description="Transparent pricing. No hidden fees. Daily returns."
        />

        {loading && (
          <div className="text-center text-[#94A3B8] text-sm">Loading plans…</div>
        )}

        {error && (
          <div
            data-testid="plans-error"
            className="text-center text-red-400 text-sm"
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                data-testid={`plan-card-${plan.id}`}
                className={`relative bg-[#111827] rounded-2xl border transition-all duration-400 hover:-translate-y-1 flex flex-col ${
                  plan.featured
                    ? 'shadow-[0_0_48px_rgba(59,130,246,0.1)] hover:shadow-[0_0_64px_rgba(59,130,246,0.2)]'
                    : 'border-[#1E293B] hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_0_32px_rgba(59,130,246,0.06)]'
                }`}
                style={{
                  borderTopColor: plan.featured ? plan.borderColor : undefined,
                  borderTopWidth: plan.featured ? '3px' : '1px',
                }}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-[#10B981] text-[#0B0F17] text-xs font-semibold rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#F8FAFC]">{plan.price}</span>
                    <span className="text-sm text-[#94A3B8] ml-2">/{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          size={16}
                          className="text-[#10B981] mt-0.5 flex-shrink-0"
                          strokeWidth={2.5}
                        />
                        <span className="text-sm text-[#94A3B8]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <NextButton
                    to="/get-started"
                    fromPage={`plans-${plan.id}`}
                    label={plan.cta}
                    testId={`plan-cta-${plan.id}`}
                    planId={plan.id}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <NextButton
            to="/testimonials"
            fromPage="plans"
            label="See What Investors Say"
            testId="plans-next"
            variant="ghost"
          />
        </div>
      </div>
    </section>
  )
}
