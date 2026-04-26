import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import NextButton from '@/components/NextButton'
import { getFaqs, type Faq } from '@/lib/api'

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    getFaqs()
      .then((f) => setFaqs(f))
      .catch(() => setFaqs([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      data-testid="page-faq"
      className="bg-[#0B0F17] py-[120px] lg:py-[160px] min-h-[calc(100vh-72px)]"
    >
      <div className="max-w-[820px] mx-auto px-6">
        <PageHeader
          label="SUPPORT"
          title="Frequently Asked Questions"
          description="Quick answers to the questions our brokers hear most often."
        />

        {loading ? (
          <div className="text-center text-[#94A3B8] text-sm">Loading FAQs…</div>
        ) : (
          <div>
            {faqs.map((faq) => {
              const isOpen = openId === faq.id
              return (
                <div
                  key={faq.id}
                  data-testid={`faq-${faq.id}`}
                  className="border-b border-[#1E293B]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                    aria-expanded={isOpen}
                    data-testid={`faq-toggle-${faq.id}`}
                  >
                    <span className="text-base font-semibold text-[#F8FAFC] pr-4 group-hover:text-[#3B82F6] transition-colors duration-300">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-[#94A3B8] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      isOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                  >
                    <p className="text-base text-[#94A3B8] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <NextButton
            to="/get-started"
            fromPage="faq"
            label="Get Started"
            testId="faq-next"
          />
        </div>
      </div>
    </section>
  )
}
