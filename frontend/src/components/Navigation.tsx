import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Plans', to: '/plans' },
  { label: 'Reviews', to: '/testimonials' },
  { label: 'FAQ', to: '/faq' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav
        data-testid="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(11,15,23,0.9)] backdrop-blur-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
            : 'bg-[rgba(11,15,23,0.7)] backdrop-blur-[20px]'
        } border-b border-[#1E293B]`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link
            to="/"
            data-testid="nav-logo"
            className="flex items-center gap-2 text-white font-bold text-lg tracking-tight"
          >
            <div className="w-8 h-8 bg-[#3B82F6] rounded-md flex items-center justify-center text-white text-sm font-bold">
              T
            </div>
            <span>Tesla Mining</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                data-testid={`nav-link-${link.to.replace('/', '') || 'home'}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 tracking-wide ${
                    isActive ? 'text-white' : 'text-[#94A3B8] hover:text-white'
                  }`
                }
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              to="/get-started"
              data-testid="nav-cta-start"
              className="inline-flex items-center px-6 py-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_32px_rgba(59,130,246,0.5)]"
            >
              Start Mining
            </Link>
          </div>

          <button
            data-testid="nav-mobile-toggle"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0F17] pt-[72px] md:hidden">
          <div className="flex flex-col items-center gap-8 pt-12">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-xl font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-[#94A3B8] hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/get-started"
              className="mt-4 inline-flex items-center px-8 py-4 bg-[#3B82F6] text-white text-lg font-semibold rounded-lg"
            >
              Start Mining
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
