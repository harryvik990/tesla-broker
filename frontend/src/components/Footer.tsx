import { Link } from 'react-router-dom'
import { Send, Twitter, Linkedin } from 'lucide-react'
import { TELEGRAM_URL } from '@/lib/api'

const platformLinks = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Investment Plans', to: '/plans' },
  { label: 'Reviews', to: '/testimonials' },
  { label: 'FAQ', to: '/faq' },
]

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#0B0F17] border-t border-[#1E293B]"
    >
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight mb-4">
              <div className="w-8 h-8 bg-[#3B82F6] rounded-md flex items-center justify-center text-white text-sm font-bold">
                T
              </div>
              <span>Tesla Mining</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 max-w-[280px]">
              Institutional-grade blockchain mining investments powered by Tesla Energy.
            </p>
            <div className="flex gap-4">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-telegram-link"
                className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors duration-300"
                aria-label="Telegram"
              >
                <Send size={20} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-4">
              Contact
            </h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
              Talk directly to a certified broker on Telegram. We respond within minutes.
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-contact-telegram"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-[0_4px_24px_rgba(59,130,246,0.3)]"
            >
              <Send size={16} strokeWidth={2} />
              Message us on Telegram
            </a>
          </div>
        </div>

        <div className="border-t border-[#1E293B] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#94A3B8]">
            © 2024 Tesla Mining Brokers. All rights reserved.
          </p>
          <p className="text-xs text-[#94A3B8]">
            Tesla® is a registered trademark of Tesla, Inc. Used under license.
          </p>
        </div>
      </div>
    </footer>
  )
}
