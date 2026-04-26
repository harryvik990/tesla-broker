import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Seattle, WA',
    avatar: '/images/avatar-sarah.jpg',
    quote:
      'I started with the Starter plan to test the waters. Within 3 months I upgraded to Pro. The daily payouts are consistent and the dashboard makes everything transparent.',
    rating: 5,
    investment: 'Pro Miner — $2,500',
  },
  {
    name: 'James K.',
    location: 'London, UK',
    avatar: '/images/avatar-james.jpg',
    quote:
      'As a financial advisor, I vetted this platform thoroughly. The broker credentials check out, the Tesla partnership is verifiable, and my clients have seen steady 1.2% daily returns.',
    rating: 5,
    investment: 'Enterprise Miner — $10,000',
  },
  {
    name: 'Elena R.',
    location: 'Singapore',
    avatar: '/images/avatar-elena.jpg',
    quote:
      'The AI switching between blockchain networks is brilliant. While my friends struggle with which coin to mine, Tesla Mining automatically optimizes for the highest yield every day.',
    rating: 5,
    investment: 'Pro Miner — $2,500',
  },
  {
    name: 'Marcus T.',
    location: 'Austin, TX',
    avatar: '/images/avatar-marcus.jpg',
    quote:
      'I was skeptical about cloud mining until I saw the Tesla energy infrastructure firsthand during a facility tour. The operational transparency here is unlike anything else in the industry.',
    rating: 5,
    investment: 'Starter + Pro — $3,000',
  },
];

export default function Testimonials() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section className="bg-[#111827] py-[80px] lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-500 ${
            headerVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-section-label text-[#3B82F6] mb-4">INVESTOR STORIES</p>
          <h2 className="text-display-2 text-[#F8FAFC]">Trusted by Thousands Worldwide</h2>
        </div>

        {/* Testimonial Cards - Horizontal scroll on mobile */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`snap-center flex-shrink-0 w-[340px] lg:w-auto bg-[#0B0F17] border border-[#1E293B] rounded-2xl p-8 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} className="text-[#10B981] fill-[#10B981]" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-base text-[#F8FAFC] italic leading-relaxed mb-6">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <div className="text-sm font-semibold text-[#F8FAFC]">{testimonial.name}</div>
          <div className="text-xs text-[#94A3B8]">{testimonial.location}</div>
          <div className="text-xs text-[#3B82F6] mt-1">{testimonial.investment}</div>
        </div>
      </div>
    </div>
  );
}
