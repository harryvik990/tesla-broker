import { useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { trackVisit } from '@/lib/api'

interface NextButtonProps {
  to: string
  fromPage: string
  label?: string
  testId?: string
  variant?: 'primary' | 'ghost'
  /** Optional plan id ("starter" | "pro" | "enterprise") to forward to /get-started */
  planId?: string
}

export default function NextButton({
  to,
  fromPage,
  label = 'Next',
  testId,
  variant = 'primary',
  planId,
}: NextButtonProps) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await trackVisit(fromPage)
    setLoading(false)
    const target = planId ? `${to}?plan=${encodeURIComponent(planId)}` : to
    navigate(target)
  }

  if (variant === 'ghost') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        data-testid={testId || `next-btn-${fromPage}`}
        className="inline-flex items-center gap-2 px-8 py-4 border border-[#1E293B] hover:border-[#3B82F6] text-[#F8FAFC] hover:text-[#3B82F6] font-semibold rounded-lg transition-all duration-300 disabled:opacity-60"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : null}
        {label}
        {!loading && <ArrowRight size={18} />}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      data-testid={testId || `next-btn-${fromPage}`}
      className="inline-flex items-center gap-2 px-8 py-4 bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_32px_rgba(59,130,246,0.5)] disabled:opacity-60 disabled:hover:translate-y-0"
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : null}
      {label}
      {!loading && <ArrowRight size={18} />}
    </button>
  )
}
