'use client'

import { useAuth } from '@/hooks/use-auth'
import { motion } from 'framer-motion'
import { Users, Calendar, CreditCard, BarChart3, Settings, Dumbbell } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/client'

export default function AdminDashboardPage() {
  const { user, loading, role } = useAuth()
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeBookings: 0,
    monthlyRevenue: 0,
    pendingPayments: 0,
  })

  useEffect(() => {
    if (user && role === 'admin') {
      fetchStats()
    }
  }, [user, role])

  const fetchStats = async () => {
    const { count: memberCount } = await supabase.from('users').select('*', { count: 'exact' })
    const { count: bookingCount } = await supabase.from('bookings').select('*', { count: 'exact' }).eq('status', 'booked')
    const { data: payments } = await supabase.from('payments').select('amount').eq('status', 'completed')
    
    setStats({
      totalMembers: memberCount || 0,
      activeBookings: bookingCount || 0,
      monthlyRevenue: payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0,
      pendingPayments: 0,
    })
  }

  if (loading || role !== 'admin') return <div className="h-screen bg-black flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-black pt-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-display font-bold text-white mb-2">
            ADMIN <span className="text-kfit-500">CONTROL PANEL</span>
          </h1>
          <p className="text-gray-400">Manage members, classes, and operations</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'TOTAL MEMBERS', value: stats.totalMembers, icon: Users, color: 'text-blue-500' },
            { label: 'ACTIVE BOOKINGS', value: stats.activeBookings, icon: Calendar, color: 'text-green-500' },
            { label: 'MONTHLY REVENUE', value: `R${stats.monthlyRevenue}`, icon: CreditCard, color: 'text-kfit-500' },
            { label: 'PENDING PAYMENTS', value: stats.pendingPayments, icon: BarChart3, color: 'text-yellow-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-kfit-900/30 to-black border border-kfit-700 rounded-2xl p-6"
            >
              <stat.icon className={`h-8 w-8 ${stat.color} mb-3`} />
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-kfit-900/30 to-black border border-kfit-700 rounded-3xl p-8"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <Users className="h-6 w-6 text-kfit-500" />
              MEMBER MANAGEMENT
            </h2>
            <div className="space-y-4">
              <Link href="/admin/members">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                  className="w-full p-4 border border-kfit-600 rounded-xl text-left text-white"
                >
                  View All Members
                </motion.button>
              </Link>
              <Link href="/admin/bookings">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                  className="w-full p-4 border border-kfit-600 rounded-xl text-left text-white"
                >
                  Manage Bookings
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-kfit-900/30 to-black border border-kfit-700 rounded-3xl p-8"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <Settings className="h-6 w-6 text-kfit-500" />
              SETTINGS
            </h2>
            <div className="space-y-4">
              <Link href="/admin/classes">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                  className="w-full p-4 border border-kfit-600 rounded-xl text-left text-white"
                >
                  Manage Classes
                </motion.button>
              </Link>
              <Link href="/admin/payments">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                  className="w-full p-4 border border-kfit-600 rounded-xl text-left text-white"
                >
                  Payment Reports
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}