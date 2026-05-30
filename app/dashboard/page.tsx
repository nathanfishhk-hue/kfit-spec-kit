'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CreditCard, User, Dumbbell, Calendar, LogOut } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black pt-32 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-7xl font-black text-white mb-4">
            WELCOME <span className="text-orange-500">BACK</span>
          </h1>
          <p className="text-white/60 text-xl">Ready to crush your goals today?</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-b from-zinc-900 to-black border-2 border-orange-700/30 rounded-3xl p-10"
          >
            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
              <User className="w-8 h-8 text-orange-500" />
              MEMBERSHIP STATUS
            </h2>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-5xl font-black text-orange-500">ACTIVE</p>
                <p className="text-white/60">Renew or upgrade your plan</p>
              </div>
              <Link href="/memberships">
                <button className="px-8 py-3 bg-orange-600 text-white font-bold rounded-full">
                  VIEW PLANS
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-b from-zinc-900 to-black border-2 border-orange-700/30 rounded-3xl p-10"
          >
            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
              <Calendar className="w-8 h-8 text-orange-500" />
              UPCOMING CLASSES
            </h2>
            <p className="text-white/60 mb-6">No upcoming classes booked</p>
            <Link href="/classes">
              <button className="w-full py-3 border-2 border-orange-600 text-orange-500 font-bold rounded-full">
                BOOK A CLASS
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-b from-zinc-900 to-black border-2 border-orange-700/30 rounded-3xl p-10"
        >
          <h2 className="text-3xl font-black text-white mb-8">QUICK ACTIONS</h2>
          <div className="grid grid-cols-3 gap-6">
            <Link href="/payments">
              <div className="p-6 border-2 border-orange-600 rounded-2xl text-center cursor-pointer hover:bg-orange-600/10">
                <CreditCard className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <p className="text-white font-bold">PAYMENTS</p>
              </div>
            </Link>
            <Link href="/profile">
              <div className="p-6 border-2 border-orange-600 rounded-2xl text-center cursor-pointer hover:bg-orange-600/10">
                <User className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <p className="text-white font-bold">PROFILE</p>
              </div>
            </Link>
            <Link href="/facilities">
              <div className="p-6 border-2 border-orange-600 rounded-2xl text-center cursor-pointer hover:bg-orange-600/10">
                <Dumbbell className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <p className="text-white font-bold">FACILITIES</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}