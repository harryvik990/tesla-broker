import type { ReactNode } from 'react'

interface PageHeaderProps {
  label: string
  title: ReactNode
  description?: string
}

export default function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="text-center max-w-[760px] mx-auto mb-14">
      <p className="text-section-label text-[#3B82F6] mb-4" data-testid="page-label">
        {label}
      </p>
      <h1 className="text-display-2 text-[#F8FAFC] mb-6" data-testid="page-title">
        {title}
      </h1>
      {description && (
        <p className="text-body-large text-[#94A3B8]" data-testid="page-description">
          {description}
        </p>
      )}
    </div>
  )
}
