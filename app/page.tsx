'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Dumbbell, Users, Calendar, CreditCard } from 'lucide-react'
import { useRef } from 'react'

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div ref={heroRef} className="bg-black text-white">
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <Image
            src="https://www.kfit.co.za/wp-content/uploads/2026/04/front-e1776114122399.png"
            alt="KFIT Gym Front"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600">
                KFIT
              </span>
              <br />
              <span className="text-3xl md:text-5xl font-light text-white/80">Persello's Fitness Centre</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-16 font-light">
              Transform Here. Thrive Everywhere.
              <br />Knysna's largest and most popular gym with state-of-the-art equipment.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-xl rounded-full flex items-center gap-3"
                >
                  START YOUR JOURNEY
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </Link>
              <Link href="/facilities">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 border-2 border-white/50 text-white font-bold text-xl rounded-full backdrop-blur-sm"
                >
                  EXPLORE FACILITIES
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-40 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-8xl font-black mb-6">
              PREMIUM <span className="text-orange-500">EQUIPMENT</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              From 1kg to 50kg dumbbells, Olympic bars, cardio machines and functional training zones
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                src: 'https://www.kfit.co.za/wp-content/uploads/2026/04/bench_weights.webp',
                alt: 'Dumbbells',
                title: 'STRENGTH TRAINING',
              },
              {
                src: 'https://www.kfit.co.za/wp-content/uploads/2026/04/Dumbbells-e1779630158396.png',
                alt: 'Weights',
                title: 'MODERN EQUIPMENT',
              },
              {
                src: 'https://www.kfit.co.za/wp-content/uploads/2026/04/DSCF1393-1-scaled.webp',
                alt: 'Cardio',
                title: 'CARDIO ZONE',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-8">
                  <h3 className="text-3xl font-black">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-40 bg-gradient-to-t from-orange-950 to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl md:text-8xl font-black mb-6">
              WHY <span className="text-orange-500">CHOOSE US</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            {[
              { icon: Dumbbell, text: 'State-of-the-art equipment' },
              { icon: Users, text: 'Elite personal trainers' },
              { icon: Calendar, text: 'Flexible hours' },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <item.icon className="w-20 h-20 text-orange-500 mx-auto mb-6" />
                <p className="text-2xl font-bold">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://www.kfit.co.za/wp-content/uploads/2026/04/Untitled-design_20260404_185516_0000-1024x585.webp"
          alt="Transform"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-6xl md:text-8xl font-black mb-8">
              READY TO <span className="text-orange-500">TRANSFORM</span>?
            </h2>
            <Link href="/memberships">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-16 py-6 bg-orange-600 text-white font-black text-2xl rounded-full"
              >
                VIEW MEMBERSHIPS
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}