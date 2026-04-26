import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import NextButton from '@/components/NextButton'
import { getTestimonials, type Testimonial } from '@/lib/api'

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTestimonials()
      .then((t) => setItems(t))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      data-testid="page-testimonials"
      className="bg-[#0B0F17] py-[120px] lg:py-[160px] min-h-[calc(100vh-72px)]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <PageHeader
          label="INVESTOR STORIES"
          title="Trusted by Thousands Worldwide"
          description="Real reviews from miners using Tesla Mining today."
        />

        {loading ? (
          <div className="text-center text-[#94A3B8] text-sm">Loading reviews…</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((t) => (
              <div
                key={t.id}
                data-testid={`testimonial-${t.id}`}
                className="bg-[#111827] border border-[#1E293B] rounded-2xl p-7 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-[#10B981] fill-[#10B981]"
                    />
                  ))}
                </div>
                <p className="text-base text-[#F8FAFC] italic leading-relaxed mb-6 flex-1">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-sm font-semibold text-[#F8FAFC]">{t.name}</div>
                    <div className="text-xs text-[#94A3B8]">{t.location}</div>
                    <div className="text-xs text-[#3B82F6] mt-1">{t.investment}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <NextButton
            to="/faq"
            fromPage="testimonials"
            label="Read FAQs"
            testId="testimonials-next"
          />
        </div>
      </div>
    </section>
  )
}
