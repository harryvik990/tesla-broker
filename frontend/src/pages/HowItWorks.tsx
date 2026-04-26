import { useEffect, useState } from 'react'
import PageHeader from '@/components/PageHeader'
import NextButton from '@/components/NextButton'
import { getSteps, type Step } from '@/lib/api'

export default function HowItWorks() {
  const [steps, setSteps] = useState<Step[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSteps()
      .then((s) => setSteps(s))
      .catch(() => setSteps([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      data-testid="page-how-it-works"
      className="bg-[#0B0F17] py-[120px] lg:py-[160px] min-h-[calc(100vh-72px)]"
    >
      <div className="max-w-[1100px] mx-auto px-6">
        <PageHeader
          label="GET STARTED"
          title="Four Steps to Passive Crypto Income"
          description="From account creation to your first payout in under 24 hours."
        />

        {loading ? (
          <div className="text-center text-[#94A3B8] text-sm">Loading steps…</div>
        ) : (
          <div className="relative max-w-[820px] mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#1E293B] hidden md:block" />
            <div className="space-y-12">
              {steps.map((step) => (
                <div
                  key={step.number}
                  data-testid={`step-${step.number}`}
                  className="relative flex gap-8"
                >
                  <div className="relative flex-shrink-0 hidden md:flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#0B0F17] border border-[#1E293B] flex items-center justify-center z-10">
                      <span className="text-lg font-bold text-[#3B82F6]">{step.number}</span>
                    </div>
                  </div>
                  <div className="md:hidden flex-shrink-0">
                    <span className="text-3xl font-bold text-[#3B82F6]">{step.number}</span>
                  </div>
                  <div className="pb-4">
                    <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">{step.title}</h3>
                    <p className="text-base text-[#94A3B8] leading-relaxed max-w-[520px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <NextButton
            to="/plans"
            fromPage="how-it-works"
            label="See Investment Plans"
            testId="how-it-works-next"
          />
        </div>
      </div>
    </section>
  )
}
