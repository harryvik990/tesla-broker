import { Send, ShieldCheck, Clock, Zap } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { buildTelegramLink, trackCta } from '@/lib/api'

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

const PLAN_LABELS: Record<string, string> = {
  starter: 'Starter Miner ($500)',
  pro: 'Pro Miner ($2,500)',
  enterprise: 'Enterprise Miner ($10,000)',
}

function buildPrefill(planLabel?: string): string {
  if (planLabel) {
    return `Hi @TMBsupport_X — I'm interested in the ${planLabel} plan. Can you walk me through next steps?`
  }
  return "Hi @TMBsupport_X — I'd like to learn more about Tesla Mining plans."
}

export default function GetStarted() {
  const [searchParams] = useSearchParams()
  const planId = searchParams.get('plan') || ''
  const planLabel = planId ? PLAN_LABELS[planId] : undefined

  const prefillMessage = useMemo(() => buildPrefill(planLabel), [planLabel])
  const telegramHref = useMemo(
    () => buildTelegramLink(prefillMessage),
    [prefillMessage]
  )

  useEffect(() => {
    trackCta(planId ? `get-started-view-${planId}` : 'get-started-view', 'get-started')
  }, [planId])

  const handleTelegramClick = () => {
    trackCta(
      planId ? `telegram-redirect-${planId}` : 'telegram-redirect',
      'get-started'
    )
  }

  return (
    <section
      data-testid="page-get-started"
      className="bg-[#0B0F17] py-[120px] lg:py-[160px] min-h-[calc(100vh-72px)]"
    >
      <div className="max-w-[900px] mx-auto px-6">
        <PageHeader
          label="LAST STEP"
          title={
            planLabel
              ? `Ready to start with ${planLabel}?`
              : 'Talk to a Broker on Telegram'
          }
          description={
            planLabel
              ? `Click below to message our team — your selected plan is already in the message. We'll walk you through KYC and have your account live the same day.`
              : `Click the button below to message our team directly. We'll match you with a plan, walk you through KYC, and have your account live the same day.`
          }
        />

        {planLabel && (
          <div
            data-testid="selected-plan-pill"
            className="mb-8 mx-auto w-fit px-4 py-2 rounded-full bg-[rgba(59,130,246,0.12)] border border-[rgba(59,130,246,0.3)] text-sm text-[#60A5FA]"
          >
            Selected plan:{' '}
            <span className="font-semibold text-white">{planLabel}</span>
          </div>
        )}

        <div className="flex flex-col items-center gap-6 mb-16">
          <a
            href={telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTelegramClick}
            data-testid="get-started-telegram-cta"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#3B82F6] hover:bg-[#60A5FA] text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_32px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_48px_rgba(59,130,246,0.6)]"
          >
            <Send size={22} strokeWidth={2} />
            Message @TMBsupport_X on Telegram
          </a>
          <p className="text-xs text-[#94A3B8] tracking-wide text-center max-w-md">
            Opens Telegram with your message ready to send. No forms · No spam.
          </p>
          {planLabel && (
            <details className="text-xs text-[#94A3B8] max-w-lg w-full">
              <summary
                data-testid="prefill-preview-toggle"
                className="cursor-pointer text-center hover:text-white"
              >
                Preview pre-filled message
              </summary>
              <p
                data-testid="prefill-preview"
                className="mt-3 px-4 py-3 rounded-lg bg-[#111827] border border-[#1E293B] text-[#94A3B8] italic"
              >
                "{prefillMessage}"
              </p>
            </details>
          )}
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
