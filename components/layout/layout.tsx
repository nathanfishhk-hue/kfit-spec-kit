import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {children}
    </div>
  )
}