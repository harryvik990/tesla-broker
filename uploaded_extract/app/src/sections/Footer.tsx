import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Twitter, Linkedin, MessageCircle } from 'lucide-react';

const quickLinks = [
  { label: 'About Us', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Investment Plans', href: '#plans' },
  { label: 'Dashboard Login', href: '#' },
];

const legalLinks = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Broker Licenses', href: '#' },
];

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 88;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="footer" className="bg-[#0B0F17] border-t border-[#1E293B]">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-6 pt-20 pb-10"
      >
        {/* Main Grid */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {/* Brand Column */}
          <div className="lg:col-span-1">
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
              <a href="#" className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors duration-300" aria-label="Twitter">
                <Twitter size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors duration-300" aria-label="Telegram">
                <MessageCircle size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@teslamining.com"
                  className="text-sm text-[#3B82F6] hover:underline transition-colors duration-300"
                >
                  support@teslamining.com
                </a>
              </li>
              <li className="text-sm text-[#94A3B8]">+1 (800) 555-TMIN</li>
              <li className="text-sm text-[#94A3B8]">Mon-Fri, 9AM-6PM EST</li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div
          className={`border-t border-[#1E293B] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-400 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-xs text-[#94A3B8]">
            © 2024 Tesla Mining Brokers. All rights reserved.
          </p>
          <p className="text-xs text-[#94A3B8]">
            Tesla® is a registered trademark of Tesla, Inc. Used under license.
          </p>
        </div>
      </div>
    </footer>
  );
}
