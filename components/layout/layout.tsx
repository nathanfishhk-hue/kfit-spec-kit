import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Navbar from './navbar'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {children}
      </motion.main>
    </div>
  )
}