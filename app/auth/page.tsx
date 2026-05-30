'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

export default function AuthPage() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.push('/dashboard')
    })
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-kfit-900/20 via-black to-black z-0" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-display font-bold text-white mb-2">
            WELCOME TO <span className="text-kfit-500">KFIT</span>
          </h1>
          <p className="text-gray-400">Transform Here. Thrive Everywhere.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-kfit-700 rounded-2xl p-6">
          <Auth
            supabaseClient={supabase}
            providers={[]}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#f97316',
                    brandAccent: '#ea580c',
                  },
                },
              },
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}