import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section
      data-testid="page-not-found"
      className="min-h-[calc(100vh-72px)] flex items-center justify-center px-6"
    >
      <div className="text-center max-w-md">
        <p className="text-section-label text-[#3B82F6] mb-4">404</p>
        <h1 className="text-display-2 text-[#F8FAFC] mb-6">Page not found</h1>
        <p className="text-body-large text-[#94A3B8] mb-8">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-8 py-4 bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold rounded-lg transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
