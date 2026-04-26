import { useEffect, useState } from 'react'
import NextButton from '@/components/NextButton'
import { getStats, type Stat } from '@/lib/api'
import { useCountUp } from '@/hooks/useCountUp'

function StatItem({ stat }: { stat: Stat }) {
  const { count, ref } = useCountUp(stat.value, 1800)
  const decimals = stat.decimals ?? 0
  const display =
    decimals > 0
      ? (count / Math.pow(10, decimals)).toFixed(decimals)
      : count.toLocaleString()

  return (
    <div ref={ref} className="text-center" data-testid={`stat-${stat.id}`}>
      <div className="text-heading-3 text-[#F8FAFC] font-bold mb-2">
        {stat.prefix || ''}
        {display}
        {stat.suffix || ''}
      </div>
      <div className="text-xs text-[#94A3B8] uppercase tracking-wide font-medium">
        {stat.label}
      </div>
    </div>
  )
}

export default function Home() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(() => setStats([]))
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <section
        data-testid="page-home"
        className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden"
        style={{ paddingTop: '72px' }}
      >
        <div className="hero-background">
          <div className="hero-grid" />
          <div className="hero-shimmer" />
          <div className="hero-vignette" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16 w-full">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p
                className={`text-section-label text-[#3B82F6] mb-6 transition-all duration-500 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                TESLA PARTNERSHIP PROGRAM
              </p>
              <h1
                className={`text-display-1 text-[#F8FAFC] mb-6 transition-all duration-700 delay-100 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Blockchain Mining Solutions — Backed by Tesla
              </h1>
              <p
                className={`text-body-large text-[#94A3B8] max-w-[560px] mb-8 transition-all duration-700 delay-200 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Institutional-grade cryptocurrency mining investments managed by certified
                brokers. Earn passive income through sustainable, high-yield blockchain
                operations.
              </p>

              <div
                className={`flex flex-wrap gap-4 mb-8 transition-all duration-500 delay-300 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                <NextButton
                  to="/how-it-works"
                  fromPage="home"
                  label="Start Mining Today"
                  testId="home-cta-primary"
                />
              </div>

              <div className="flex flex-wrap gap-6 text-xs text-[#94A3B8] tracking-wide">
                <span className="flex items-center gap-2">
                  <span className="text-[#10B981]">✓</span> Regulated operations
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#10B981]">✓</span> Daily payouts
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#10B981]">✓</span> 99.9% uptime
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <img
                src="/images/hero-mining-rig.jpg"
                alt="Futuristic Mining Hardware"
                className="max-w-[400px] lg:max-w-[480px] w-full rounded-2xl shadow-[0_0_64px_rgba(59,130,246,0.15)]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        data-testid="home-stats"
        className="bg-[#111827] border-y border-[#1E293B] py-12"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          {stats.length === 0 ? (
            <div className="text-center text-[#94A3B8] text-sm">Loading live stats…</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((s) => (
                <StatItem key={s.id} stat={s} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
