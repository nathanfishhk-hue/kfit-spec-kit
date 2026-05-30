'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

export default function AuthPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) router.push('/dashboard')
    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-display font-bold text-white mb-2">
            WELCOME TO <span className="text-kfit-500">KFIT</span>
          </h1>
          <p className="text-gray-400">Transform Here. Thrive Everywhere.</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 border border-kfit-700 rounded-2xl p-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-black/30 border border-kfit-600 rounded-lg text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-black/30 border border-kfit-600 rounded-lg text-white"
            required
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-kfit-600 text-white rounded-lg"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              disabled={loading}
              className="flex-1 py-3 border border-kfit-600 text-kfit-500 rounded-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}