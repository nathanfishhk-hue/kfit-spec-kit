'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.from('.hero-text', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      })
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Environment preset="warehouse" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Sphere args={[2, 100, 100]} scale={2.5}>
            <MeshDistortMaterial
              color="#f97316"
              distort={0.4}
              speed={2}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
          <Sphere args={[2, 100, 100]} scale={2.5} position={[0, 0, -0.5]}>
            <meshStandardMaterial
              color="#ea580c"
              transparent
              opacity={0.1}
              wireframe
            />
          </Sphere>
        </Canvas>
      </div>

      <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-text text-7xl md:text-8xl font-display font-bold text-white mb-4"
        >
          TRANSFORM
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-text text-5xl md:text-6xl font-display text-kfit-500 mb-8"
        >
          HERE. THRIVE EVERYWHERE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hero-text text-lg text-gray-300 max-w-2xl mb-12"
        >
          KFIT is Knysna's largest and most popular gym for results, support, and a positive training atmosphere.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="hero-text flex gap-6"
        >
          <Link href="/auth">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249, 115, 22, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-kfit-600 text-white font-display font-bold text-lg rounded-full transition-all"
            >
              START YOUR JOURNEY
            </motion.button>
          </Link>
          <Link href="/facilities">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white font-display font-bold text-lg rounded-full transition-all"
            >
              EXPLORE FACILITIES
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}