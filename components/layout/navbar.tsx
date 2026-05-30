'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/memberships', label: 'MEMBERSHIPS' },
  { href: '/classes', label: 'CLASSES' },
  { href: '/facilities', label: 'FACILITIES' },
  { href: '/trainers', label: 'TRAINERS' },
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
    <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-orange-700/30">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="https://www.kfit.co.za/wp-content/uploads/2024/04/kfitLogoBlack.webp"
            alt="KFIT Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-2xl font-black text-white ml-3">KFIT PERSCELLO'S</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                pathname === item.href ? 'text-orange-500' : 'text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <Link href="/dashboard">
              <button className="px-6 py-2 bg-orange-600 text-white rounded-full font-bold">
                DASHBOARD
              </button>
            </Link>
          ) : (
            <Link href="/auth">
              <button className="px-6 py-2 bg-orange-600 text-white rounded-full font-bold">
                JOIN NOW
              </button>
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

      <div
        className={`md:hidden overflow-hidden bg-black transition-all ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col p-4 gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-orange-500 py-2"
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
      </div>
    </header>
  )
}