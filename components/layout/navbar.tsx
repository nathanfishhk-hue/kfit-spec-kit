'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Dumbbell } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/memberships', label: 'MEMBERSHIPS' },
  { href: '/classes', label: 'CLASSES' },
  { href: '/facilities', label: 'FACILITIES' },
  { href: '/trainers', label: 'TRAINERS' },
  { href: '/about', label: 'WHY CHOOSE US' },
  { href: '/contact', label: 'CONTACT' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-kfit-700"
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-kfit-500" />
          <span className="text-2xl font-display font-bold text-white">
            KFIT PERSELLO'S
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-kfit-500 ${
                pathname === item.href ? 'text-kfit-500' : 'text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/dashboard" className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-kfit-600 text-white rounded-full font-medium"
                >
                  DASHBOARD
                </motion.div>
              </Link>
            </>
          ) : (
            <Link href="/auth">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-kfit-600 text-white rounded-full font-medium"
              >
                JOIN NOW
              </motion.div>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-black/95"
      >
        <div className="flex flex-col p-4 gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-kfit-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              DASHBOARD
            </Link>
          ) : (
            <Link href="/auth" onClick={() => setIsOpen(false)}>
              JOIN NOW
            </Link>
          )}
        </div>
      </motion.div>
    </motion.header>
  )
}