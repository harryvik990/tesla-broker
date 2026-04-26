import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is Tesla Mining Investments officially partnered with Tesla?',
    answer:
      'Yes. We operate through a formal energy supply and infrastructure partnership with Tesla Energy. Our mining facilities utilize Tesla\'s Megapack battery storage and solar grid systems. Partnership documentation is available to verified investors upon request.',
  },
  {
    question: 'How are my funds protected?',
    answer:
      'All client funds are held in segregated accounts with our licensed broker partners. We maintain full regulatory compliance with FINRA and undergo quarterly third-party audits. Additionally, our Tesla Energy infrastructure provides operational redundancy and 99.97% uptime.',
  },
  {
    question: 'When can I withdraw my earnings?',
    answer:
      'Daily mining rewards are calculated at 00:00 UTC and immediately available for withdrawal. There are no lock-up periods. You can withdraw to any crypto wallet or request a fiat bank transfer with a 24-48 hour processing window.',
  },
  {
    question: 'What cryptocurrencies do you mine?',
    answer:
      'Our AI-powered systems dynamically allocate hash power across Bitcoin, Ethereum, Litecoin, and other SHA-256 and Scrypt networks based on real-time profitability analysis. This ensures optimal daily yields regardless of individual coin volatility.',
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'No. Our pricing is fully transparent. The one-time plan fee covers your entire contract period. A small 2% maintenance fee is deducted from daily yields to cover facility operations — this is clearly displayed in your dashboard. There are no withdrawal fees, setup charges, or surprises.',
  },
  {
    question: 'Can I visit the mining facility?',
    answer:
      'Enterprise tier investors are invited to quarterly facility tours at our Nevada and Texas locations. Pro tier investors can join annual virtual facility tours with live Q&A with our operations team.',
  },
];

export default function FAQ() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#0B0F17] py-[80px] lg:py-[120px]">
      <div className="max-w-[800px] mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-500 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <p className="text-section-label text-[#3B82F6] mb-4">SUPPORT</p>
          <h2 className="text-display-2 text-[#F8FAFC]">Frequently Asked Questions</h2>
        </div>

        {/* Accordion */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`border-b border-[#1E293B] transition-all duration-400 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
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
  );
}
