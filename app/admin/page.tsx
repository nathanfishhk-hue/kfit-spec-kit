'use client'

import { motion } from 'framer-motion'
import { Users, Calendar, CreditCard, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-black pt-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-7xl font-black text-white mb-4">
            ADMIN <span className="text-orange-500">PANEL</span>
          </h1>
          <p className="text-white/60">Manage members, classes, and operations</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {[
            { label: 'TOTAL MEMBERS', value: '150+', icon: Users, color: 'text-blue-500' },
            { label: 'ACTIVE BOOKINGS', value: '45', icon: Calendar, color: 'text-green-500' },
            { label: 'MONTHLY REVENUE', value: 'R85,000', icon: CreditCard, color: 'text-orange-500' },
            { label: 'PENDING', value: '3', icon: BarChart3, color: 'text-yellow-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-b from-zinc-900 to-black border-2 border-orange-700/30 rounded-3xl p-8 text-center"
            >
              <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
              <p className="text-white/60 text-sm">{stat.label}</p>
              <p className="text-4xl font-black text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-b from-zinc-900 to-black border-2 border-orange-700/30 rounded-3xl p-10"
          >
            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
              <Users className="w-8 h-8 text-orange-500" />
              MEMBER MANAGEMENT
            </h2>
            <div className="space-y-4">
              <Link href="/admin/members">
                <button className="w-full p-4 border-2 border-orange-600 rounded-xl text-left text-white font-bold">
                  View All Members
                </button>
              </Link>
              <Link href="/admin/bookings">
                <button className="w-full p-4 border-2 border-orange-600 rounded-xl text-left text-white font-bold">
                  Manage Bookings
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-b from-zinc-900 to-black border-2 border-orange-700/30 rounded-3xl p-10"
          >
            <h2 className="text-3xl font-black text-white mb-8">SETTINGS</h2>
            <div className="space-y-4">
              <Link href="/admin/payments">
                <button className="w-full p-4 border-2 border-orange-600 rounded-xl text-left text-white font-bold">
                  Payment Reports
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}