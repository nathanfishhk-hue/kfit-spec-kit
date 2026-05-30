'use client'

import { useAuth } from '@/hooks/use-auth'
import { motion } from 'framer-motion'
import { Calendar, CreditCard, User, Dumbbell, Clock, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/client'

type Booking = Database['public']['Tables']['bookings']['Row']
type Class = Database['public']['Tables']['classes']['Row']

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [bookings, setBookings] = useState<(Booking & Class)[]>([])
  const [membership, setMembership] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    const { data: userData } = await supabase
      .from('users')
      .select('membership_type, membership_end')
      .eq('id', user?.id)
      .single()
    
    setMembership(userData?.membership_type || null)

    const { data: bookingData } = await supabase
      .from('bookings')
      .select(`*, classes:classes(*)`)
      .eq('user_id', user?.id)
      .eq('status', 'booked')
    
    setBookings(bookingData || [])
  }

  if (loading) return <div className="h-screen bg-black flex items-center justify-center">Loading...</div>
  if (!user) return <div className="h-screen bg-black flex items-center justify-center">Redirecting to auth...</div>

  return (
    <div className="min-h-screen bg-black pt-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-display font-bold text-white mb-2">
            WELCOME BACK
          </h1>
          <p className="text-kfit-500 text-xl">Ready to crush your goals today?</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-gradient-to-br from-kfit-900/30 to-black border border-kfit-700 rounded-3xl p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                <User className="h-6 w-6 text-kfit-500" />
                MEMBERSHIP STATUS
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-display font-bold text-kfit-500">
                    {membership ? membership.replace('_', ' ').toUpperCase() : 'NO ACTIVE MEMBERSHIP'}
                  </p>
                  <p className="text-gray-400 mt-2">Renew or upgrade your plan</p>
                </div>
                <Link href="/memberships">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-kfit-600 text-white rounded-full font-medium"
                  >
                    VIEW PLANS
                  </motion.button>
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-kfit-900/30 to-black border border-kfit-700 rounded-3xl p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-kfit-500" />
                UPCOMING CLASSES
              </h2>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-kfit-700/30"
                    >
                      <div>
                        <p className="text-white font-bold">{booking.name}</p>
                        <p className="text-gray-400">with {booking.trainer_name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-kfit-500 font-medium">{booking.day_of_week}</p>
                        <p className="text-gray-400">{booking.start_time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No upcoming classes booked</p>
              )}
              <Link href="/classes" className="block mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-3 border border-kfit-600 text-kfit-500 rounded-full font-medium"
                >
                  BOOK A CLASS
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-kfit-900/30 to-black border border-kfit-700 rounded-3xl p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-kfit-500" />
                QUICK ACTIONS
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/payments">
                  <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                    className="p-4 border border-kfit-600 rounded-xl text-center cursor-pointer"
                  >
                    <CreditCard className="h-8 w-8 text-kfit-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">PAYMENTS</p>
                  </motion.div>
                </Link>
                <Link href="/profile">
                  <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                    className="p-4 border border-kfit-600 rounded-xl text-center cursor-pointer"
                  >
                    <User className="h-8 w-8 text-kfit-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">PROFILE</p>
                  </motion.div>
                </Link>
                <Link href="/facilities">
                  <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                    className="p-4 border border-kfit-600 rounded-xl text-center cursor-pointer"
                  >
                    <Dumbbell className="h-8 w-8 text-kfit-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">FACILITIES</p>
                  </motion.div>
                </Link>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="p-4 border border-red-600 rounded-xl text-center cursor-pointer"
                >
                  <LogOut className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">LOGOUT</p>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-kfit-900/30 to-black border border-kfit-700 rounded-3xl p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                GYM HOURS
              </h2>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Mon - Thu</span>
                  <span className="text-kfit-500">5:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span className="text-kfit-500">5:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-kfit-500">7:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-red-500">CLOSED</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}