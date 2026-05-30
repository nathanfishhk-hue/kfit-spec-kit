'use client'

import Hero3D from '@/components/three/hero-3d'
import { motion } from 'framer-motion'
import { Dumbbell, Users, Clock, Shield } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Dumbbell,
    title: 'STATE-OF-THE-ART EQUIPMENT',
    description: 'From 1kg to 50kg dumbbells and full Olympic setup',
  },
  {
    icon: Users,
    title: 'ELITE TRAINERS',
    description: 'Qualified professionals with 10+ years experience',
  },
  {
    icon: Clock,
    title: 'FLEXIBLE HOURS',
    description: 'Open 5am-8pm weekdays, extended weekend access',
  },
  {
    icon: Shield,
    title: 'SECURE ACCESS',
    description: 'Barcode entry system with 24/7 security monitoring',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero3D />
      
      <section className="bg-black py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-display font-bold text-center text-white mb-16"
          >
            WHY <span className="text-kfit-500">CHOOSE KFIT</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-kfit-900/20 to-black border border-kfit-700/50 rounded-3xl p-8 text-center"
              >
                <feature.icon className="h-16 w-16 text-kfit-500 mx-auto mb-6" />
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 bg-gradient-to-r from-kfit-900 via-kfit-700 to-kfit-900 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-display font-bold text-white mb-8"
          >
            READY TO <span className="text-kfit-200">TRANSFORM</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-white/80 mb-12 max-w-2xl mx-auto"
          >
            Join Knysna's most equipped gym with flexible membership options for every lifestyle.
          </motion.p>

          <Link href="/memberships">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(249, 115, 22, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-white text-kfit-900 font-display font-bold text-2xl rounded-full"
            >
              VIEW MEMBERSHIPS
            </motion.button>
          </Link>
        </div>
      </section>
    </>
  )
}