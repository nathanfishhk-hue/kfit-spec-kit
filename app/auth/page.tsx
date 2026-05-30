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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black text-white mb-4">
            WELCOME TO <span className="text-orange-500">KFIT</span>
          </h1>
          <p className="text-white/60">Transform Here. Thrive Everywhere.</p>
        </div>

        <form onSubmit={handleLogin} className="bg-gradient-to-b from-zinc-900 to-black border-2 border-orange-700/30 rounded-3xl p-10 space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-black/50 border-2 border-orange-700/30 rounded-xl text-white placeholder-white/40"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-black/50 border-2 border-orange-700/30 rounded-xl text-white placeholder-white/40"
            required
          />
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-black rounded-full"
            >
              LOGIN
            </button>
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              className="flex-1 py-4 border-2 border-orange-600 text-orange-500 font-black rounded-full"
            >
              SIGN UP
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}