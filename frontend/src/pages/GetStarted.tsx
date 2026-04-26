import { Send, ShieldCheck, Clock, Zap } from 'lucide-react'
import { useEffect } from 'react'
import PageHeader from '@/components/PageHeader'
import { TELEGRAM_URL, trackCta } from '@/lib/api'

const perks = [
  {
    icon: ShieldCheck,
    title: 'Verified Brokers',
    text: 'Every deposit handled by FINRA-certified brokers, never AI bots.',
  },
  {
    icon: Clock,
    title: 'Replies in Minutes',
    text: 'Average response time on Telegram is under 4 minutes, 24/7.',
  },
  {
    icon: Zap,
    title: 'Live in 2 Hours',
    text: 'Once funded, your hash power goes live within 2 hours.',
  },
]

export default function GetStarted() {
  useEffect(() => {
    trackCta('get-started-view', 'get-started')
  }, [])

  const handleTelegramClick = () => {
    trackCta('telegram-redirect', 'get-started')
    window.open(TELEGRAM_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      data-testid="page-get-started"
      className="bg-[#0B0F17] py-[120px] lg:py-[160px] min-h-[calc(100vh-72px)]"
    >
      <div className="max-w-[900px] mx-auto px-6">
        <PageHeader
          label="LAST STEP"
          title="Talk to a Broker on Telegram"
          description="Click the button below to message our team directly. We'll match you with a plan, walk you through KYC, and have your account live the same day."
        />

        <div className="flex flex-col items-center gap-6 mb-16">
          <button
            type="button"
            onClick={handleTelegramClick}
            data-testid="get-started-telegram-cta"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#3B82F6] hover:bg-[#60A5FA] text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_32px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_48px_rgba(59,130,246,0.6)]"
          >
            <Send size={22} strokeWidth={2} />
            Message @TMBsupport_X on Telegram
          </button>
          <p className="text-xs text-[#94A3B8] tracking-wide">
            Opens Telegram in a new tab • No forms • No spam
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {perks.map((perk) => {
            const Icon = perk.icon
            return (
              <div
                key={perk.title}
                data-testid={`perk-${perk.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-[rgba(59,130,246,0.12)] flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#3B82F6]" strokeWidth={1.6} />
                </div>
                <h3 className="text-base font-semibold text-[#F8FAFC] mb-2">
                  {perk.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{perk.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
