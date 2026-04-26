import { useCountUp } from '@/hooks/useCountUp';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function StatItem({ value, prefix = '', suffix = '', label, decimals = 0 }: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}) {
  const { count, ref } = useCountUp(value, 2000);
  const { ref: animRef, isVisible } = useScrollAnimation();

  const displayValue = decimals > 0 
    ? (count / Math.pow(10, decimals)).toFixed(decimals)
    : count.toLocaleString();

  return (
    <div
      ref={(el) => {
        // Merge refs
        if (el) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          (animRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }
      }}
      className={`text-center transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="text-heading-3 text-[#F8FAFC] font-bold mb-2">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-xs text-[#94A3B8] uppercase tracking-wide font-medium">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-[#111827] border-y border-[#1E293B] py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <StatItem value={2400} prefix="$" suffix="B+" label="Total Assets Managed" />
          <StatItem value={147000} suffix="+" label="Active Miners" />
          <StatItem value={18200000} prefix="$" label="Paid Out This Month" />
          <StatItem value={9997} suffix="%" label="Network Uptime" decimals={2} />
        </div>
      </div>
    </section>
  );
}
